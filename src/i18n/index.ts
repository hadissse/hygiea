import en, { type TranslationKey } from './en';
import ar from './ar';

const dictionaries = { en, ar } as const;
type Locale = keyof typeof dictionaries;

let currentLocale: Locale = 'ar';

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function t(key: TranslationKey): string {
  return (dictionaries[currentLocale] as Record<string, string>)[key] ?? dictionaries.en[key];
}

export type { TranslationKey };
