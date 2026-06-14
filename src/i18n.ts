export type Lang = 'es' | 'en';

/** Resolve Astro.currentLocale to a supported language (defaults to Spanish). */
export function getLang(currentLocale: string | undefined): Lang {
  return currentLocale === 'en' ? 'en' : 'es';
}
