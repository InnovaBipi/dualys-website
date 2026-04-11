import type { Metadata } from 'next';
import { locales, type Locale } from '@/lib/i18n/config';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dualys.eu';

interface GenerateMetadataProps {
  title: string;
  description: string;
  locale: Locale;
  path?: string;
  image?: string;
}

export function generatePageMetadata({
  title,
  description,
  locale,
  path = '',
  image = '/og-image.png',
}: GenerateMetadataProps): Metadata {
  const url = `${baseUrl}/${locale}${path}`;

  // Generate alternates for all languages
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${baseUrl}/${loc}${path}`;
  }
  languages['x-default'] = `${baseUrl}/ca${path}`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Dualys',
      locale,
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      },
    }),
  };
}

// Organization schema for JSON-LD
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dualys',
    alternateName: 'Dualys AIE',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Consultora estratégica especializada en facilitar la entrada de empresas industriales, tecnológicas y de software en la cadena de suministro del sector defensa europeo.',
    email: 'info@dualys.eu',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Camí Can Ametller 36 Planta Baixa',
      addressLocality: 'Sant Cugat del Vallès',
      addressRegion: 'Barcelona',
      postalCode: '08195',
      addressCountry: 'ES',
    },
    sameAs: [
      'https://www.linkedin.com/company/dualys-strategy/',
      'https://twitter.com/dualys',
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 48.8566,
        longitude: 2.3522,
      },
      geoRadius: '2000 km',
      name: 'Europe',
    },
    knowsAbout: [
      'Defense sector consulting',
      'Dual-use technology transition',
      'Defense supply chain',
      'AQAP/PECAL certification',
      'European defense market',
    ],
  };
}

// WebSite schema for JSON-LD
export function getWebSiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dualys',
    url: `${baseUrl}/${locale}`,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// WebPage schema for JSON-LD
interface WebPageSchemaProps {
  title: string;
  description: string;
  locale: Locale;
  path: string;
}

export function getWebPageSchema({ title, description, locale, path }: WebPageSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${baseUrl}/${locale}${path}`,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Dualys',
      url: `${baseUrl}/${locale}`,
    },
  };
}

// BreadcrumbList schema for JSON-LD
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}/${locale}${item.url}`,
    })),
  };
}
