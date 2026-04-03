import { reader } from './reader';
import type { Locale } from '@/lib/i18n/config';

const COLLECTION_MAP = {
  ca: 'recursos_ca',
  es: 'recursos_es',
  en: 'recursos_en',
  fr: 'recursos_fr',
} as const;

type CollectionKey = (typeof COLLECTION_MAP)[Locale];

function getCollectionKey(locale: Locale): CollectionKey {
  return COLLECTION_MAP[locale];
}

export async function getAllRecursos(locale: Locale) {
  const key = getCollectionKey(locale);
  const entries = await reader.collections[key].all();

  return entries
    .filter(({ entry }) => !entry.draft)
    .sort(
      (a, b) =>
        new Date(b.entry.publishedAt ?? '').getTime() -
        new Date(a.entry.publishedAt ?? '').getTime()
    )
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      summary: entry.summary,
      publishedAt: entry.publishedAt,
      category: entry.category,
      coverImage: entry.coverImage,
      featured: entry.featured,
      author: entry.author,
    }));
}

export async function getRecursoBySlug(locale: Locale, slug: string) {
  const key = getCollectionKey(locale);
  return reader.collections[key].read(slug, { resolveLinkedFiles: true });
}

export async function getRecursosSlugs(locale: Locale) {
  const key = getCollectionKey(locale);
  return reader.collections[key].list();
}
