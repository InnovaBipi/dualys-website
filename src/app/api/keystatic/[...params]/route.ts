import { NextResponse } from 'next/server';

const isKeystatic =
  process.env.NODE_ENV === 'development' ||
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET
  );

let cachedHandler: { GET: Function; POST: Function } | null = null;

async function getHandler() {
  if (!isKeystatic) return null;
  if (cachedHandler) return cachedHandler;

  const { makeRouteHandler } = await import('@keystatic/next/route-handler');
  const { default: config } = await import('../../../../../keystatic.config');
  cachedHandler = makeRouteHandler({ config });
  return cachedHandler;
}

const notConfigured = () =>
  NextResponse.json(
    { error: 'Keystatic CMS is not configured in this environment' },
    { status: 404 }
  );

export async function GET(
  req: Request,
  context: { params: Promise<{ params: string[] }> }
) {
  const handler = await getHandler();
  if (!handler) return notConfigured();
  return handler.GET(req, context);
}

export async function POST(
  req: Request,
  context: { params: Promise<{ params: string[] }> }
) {
  const handler = await getHandler();
  if (!handler) return notConfigured();
  return handler.POST(req, context);
}
