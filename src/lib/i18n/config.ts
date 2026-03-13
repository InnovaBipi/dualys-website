export const locales = ['en', 'fr', 'es', 'ca'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ca';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  ca: 'Català',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  es: '🇪🇸',
  ca: '🏴󠁥󠁳󠁣󠁴󠁿',
};
