import en, { type TranslationKey } from './en';
import ar from './ar';

const dictionaries = { en, ar } as const;
type Locale = keyof typeof dictionaries;

let currentLocale: Locale = 'en';

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function t(key: TranslationKey): string {
  return dictionaries[currentLocale][key];
}

export type { TranslationKey };
