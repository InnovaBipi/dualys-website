import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { getAllVerticalSlugs } from '@/data/verticals';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dualys.eu';

// Static routes with priorities per briefing v2.0 sitemap
const staticRoutes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/servicios', priority: 0.95, changeFrequency: 'monthly' },
  { path: '/sectores', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/metodologia', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/nosotros', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/recursos', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/legal/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/legal/terms', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/legal/cookies', priority: 0.3, changeFrequency: 'yearly' },
];

// Dynamic vertical detail routes
const verticalRoutes = getAllVerticalSlugs().map((slug) => ({
  path: `/sectores/${slug}`,
  priority: 0.85,
  changeFrequency: 'monthly' as const,
}));

const routes = [...staticRoutes, ...verticalRoutes];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}${route.path}`;

      const alternates: Record<string, string> = {};
      for (const altLocale of locales) {
        alternates[altLocale] = `${baseUrl}/${altLocale}${route.path}`;
      }
      alternates['x-default'] = `${baseUrl}/ca${route.path}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return sitemapEntries;
}
