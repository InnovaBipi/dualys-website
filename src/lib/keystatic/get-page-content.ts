import { reader } from './reader';
import type { Locale } from '@/lib/i18n/config';

const LOCALE_SUFFIX: Record<Locale, string> = {
  ca: 'ca',
  es: 'es',
  en: 'en',
  fr: 'fr',
};

/**
 * Generic singleton reader for page content.
 * @param page - singleton base name (e.g. 'homepage', 'servicios')
 * @param locale - current locale
 * @returns typed page content
 */
export async function getPageContent<T>(
  page: string,
  locale: Locale
): Promise<T> {
  const key = `${page}_${LOCALE_SUFFIX[locale]}` as keyof typeof reader.singletons;
  const content = await (reader.singletons as Record<string, { read: () => Promise<unknown> }>)[key]?.read();
  if (!content) {
    throw new Error(`Missing Keystatic content for "${page}" in locale "${locale}"`);
  }
  return content as T;
}
