import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// ---------------------------------------------------------------------------
// Zod schema for contact form validation
// ---------------------------------------------------------------------------

const SECTOR_VALUES = ['industrial', 'tech', 'defense', 'other'] as const;

const contactApiSchema = z.object({
  name: z.string().min(1, 'Name is required').transform((v) => v.trim()),
  company: z.string().min(1, 'Company is required').transform((v) => v.trim()),
  email: z
    .string()
    .email('Please enter a valid email address')
    .transform((v) => v.trim().toLowerCase()),
  sector: z.enum(SECTOR_VALUES, {
    message: 'Sector must be one of: industrial, tech, defense, other',
  }),
  challenge: z.string().min(1, 'Challenge is required').transform((v) => v.trim()),
  privacy: z.literal(true, {
    message: 'You must accept the privacy policy',
  }),
  // Honeypot field — bots that fill it are silently accepted
  website: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter
// ---------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max requests per window per IP

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

/**
 * Periodically clean up expired rate-limit entries to prevent unbounded
 * memory growth. Runs at most once every 10 minutes.
 */
let lastCleanup = Date.now();
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;

function cleanupRateLimitStore(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [ip, entry] of rateLimitStore) {
    if (now >= entry.resetAt) {
      rateLimitStore.delete(ip);
    }
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    // ----- Content-Type check ------------------------------------------------
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, message: 'Content-Type must be application/json' },
        { status: 400 },
      );
    }

    // ----- Rate limiting -----------------------------------------------------
    cleanupRateLimitStore();
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests' },
        { status: 429 },
      );
    }

    // ----- Parse body --------------------------------------------------------
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, errors: ['Invalid JSON body'] },
        { status: 400 },
      );
    }

    // ----- Validate ----------------------------------------------------------
    const result = contactApiSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const data = result.data;

    // ----- Honeypot check ----------------------------------------------------
    // If the hidden "website" field has a value, it is almost certainly a bot.
    // Return 200 silently so the bot thinks the submission succeeded.
    if (data.website) {
      return NextResponse.json(
        { success: true, message: 'Message sent successfully' },
        { status: 200 },
      );
    }

    // ----- Send email (placeholder) ------------------------------------------
    // TODO: Integrate a real email service (Resend, SendGrid, AWS SES, etc.)
    // Target email: info@dualys.eu
    // The implementation should:
    //   1. Send a notification email to info@dualys.eu with the form data
    //   2. Optionally send a confirmation email to the submitter
    //   3. Handle delivery failures gracefully
    console.log('[Contact Form Submission]', {
      name: data.name,
      company: data.company,
      email: data.email,
      sector: data.sector,
      challenge: data.challenge,
      submittedAt: new Date().toISOString(),
      ip,
    });

    // ----- Success -----------------------------------------------------------
    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('[Contact API Error]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
