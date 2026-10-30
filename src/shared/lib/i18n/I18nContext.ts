import { createContext } from 'react';
import type { Language } from './translations';
import type { TranslateFn } from './getTranslation';

export interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslateFn;
  supportedLanguages: readonly Language[];
  languageNames: Record<Language, string>;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
