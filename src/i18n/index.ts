import en, { type TranslationKey } from './en';

const dictionaries = { en } as const;
type Locale = keyof typeof dictionaries;

let currentLocale: Locale = 'en';

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function t(key: TranslationKey): string {
  return dictionaries[currentLocale][key];
}

export type { TranslationKey };
