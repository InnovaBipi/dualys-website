import { makeRouteHandler } from '@keystatic/next/route-handler';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import config from '../../../../../keystatic.config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const keystatic = makeRouteHandler({ config });

// ─── Custom OAuth implementation to work around Keystatic bug #1497 ───
// Keystatic's built-in OAuth state generation fails on Vercel serverless.
// We implement login + callback ourselves and proxy everything else.

const CLIENT_ID = process.env.KEYSTATIC_GITHUB_CLIENT_ID!;
const CLIENT_SECRET = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET!;
const SECRET = process.env.KEYSTATIC_SECRET!;

function encrypt(value: string): string {
  const key = Buffer.from(SECRET.slice(0, 32).padEnd(32, '0'));
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(value: string): string | null {
  try {
    const key = Buffer.from(SECRET.slice(0, 32).padEnd(32, '0'));
    const [ivHex, encHex] = value.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encHex, 'hex');
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    return decipher.update(encrypted) + decipher.final('utf8');
  } catch {
    return null;
  }
}

function getParams(req: NextRequest): string {
  const url = new URL(req.url);
  return url.pathname.replace(/^\/api\/keystatic\/?/, '');
}

async function handleLogin(req: NextRequest) {
  const url = new URL(req.url);
  const callbackUrl = `${url.origin}/api/keystatic/github/oauth/callback`;
  const state = randomBytes(20).toString('hex');

  const githubUrl = new URL('https://github.com/login/oauth/authorize');
  githubUrl.searchParams.set('client_id', CLIENT_ID);
  githubUrl.searchParams.set('redirect_uri', callbackUrl);
  githubUrl.searchParams.set('state', state);

  const response = NextResponse.redirect(githubUrl.toString());
  response.cookies.set('ks-state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  });
  response.cookies.set('ks-redirect', '/keystatic', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  });
  return response;
}

async function handleCallback(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code) {
    return new NextResponse('Missing code', { status: 400 });
  }

  // Validate state
  const cookieStore = await cookies();
  const storedState = cookieStore.get('ks-state')?.value;
  if (!state || !storedState || state !== storedState) {
    return new NextResponse('Invalid state — please try logging in again', { status: 401 });
  }

  // Exchange code for token
  const tokenUrl = new URL('https://github.com/login/oauth/access_token');
  tokenUrl.searchParams.set('client_id', CLIENT_ID);
  tokenUrl.searchParams.set('client_secret', CLIENT_SECRET);
  tokenUrl.searchParams.set('code', code);
  tokenUrl.searchParams.set('redirect_uri', `${url.origin}/api/keystatic/github/oauth/callback`);

  const tokenRes = await fetch(tokenUrl.toString(), {
    method: 'POST',
    headers: { Accept: 'application/json' },
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    return new NextResponse(`Token exchange failed: ${tokenRes.status} ${text}`, { status: 401 });
  }

  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    return new NextResponse(`GitHub error: ${tokenData.error_description || tokenData.error}`, { status: 401 });
  }

  // Set the cookies that Keystatic's frontend expects
  const redirectTo = cookieStore.get('ks-redirect')?.value || '/keystatic';
  const response = NextResponse.redirect(new URL(redirectTo, url.origin));

  // Keystatic expects 'keystatic-gh-access-token' cookie
  response.cookies.set('keystatic-gh-access-token', tokenData.access_token, {
    sameSite: 'lax',
    secure: true,
    httpOnly: false, // Keystatic frontend needs to read this
    maxAge: tokenData.expires_in || 28800,
    path: '/',
  });

  // If refresh token is provided (GitHub App tokens)
  if (tokenData.refresh_token) {
    response.cookies.set('keystatic-gh-refresh-token', encrypt(tokenData.refresh_token), {
      sameSite: 'lax',
      secure: true,
      httpOnly: true,
      maxAge: tokenData.refresh_token_expires_in || 15811200,
      path: '/',
    });
  }

  // Clean up state cookies
  response.cookies.delete('ks-state');
  response.cookies.delete('ks-redirect');

  return response;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ params: string[] }> }
) {
  const path = getParams(req);

  if (path === 'github/login') {
    return handleLogin(req);
  }
  if (path.startsWith('github/oauth/callback')) {
    return handleCallback(req);
  }

  // Proxy everything else to Keystatic's handler
  return (keystatic.GET as Function)(req, context);
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ params: string[] }> }
) {
  return (keystatic.POST as Function)(req, context);
}
