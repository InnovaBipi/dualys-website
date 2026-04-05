import { Inter, Outfit } from 'next/font/google';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HubSpotProvider } from '@/components/shared/HubSpotProvider';
import { CookieConsent } from '@/components/shared/CookieConsent';
import '@/app/globals.css';

/** Routes that render as standalone landing pages without Header/Footer */
const LANDING_ROUTES = ['/pre-evaluacion'];

// Body text font - Inter (Google Fonts)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Display/heading font - Outfit (Google Fonts)
// Geometric sans-serif, closest free alternative to TOSH A
// Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700'],
});

/**
 * Original brand font: TOSH A (Adobe Fonts)
 * Currently using Outfit as a free alternative with similar geometric characteristics.
 *
 * To enable TOSH A in the future:
 * 1. Add Adobe Fonts kit to your Creative Cloud subscription
 * 2. Create a project kit with TOSH A font at https://fonts.adobe.com
 * 3. Add the kit embed code to the <head>
 * 4. Update --font-display CSS variable to use 'tosh-a'
 */

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  // Detect landing pages that should render without Header/Footer
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isLanding = LANDING_ROUTES.some((route) => pathname.includes(route));

  return (
    <html lang={locale} className={`${inter.variable} ${outfit.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          {!isLanding && <Header />}
          <main className="flex-1">{children}</main>
          {!isLanding && <Footer />}
          <CookieConsent />
        </NextIntlClientProvider>
        {process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID && (
          <HubSpotProvider
            portalId={process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}
            locale={locale}
          />
        )}
      </body>
    </html>
  );
}
