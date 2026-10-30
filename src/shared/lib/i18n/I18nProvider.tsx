import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  type Language,
  defaultLanguage,
  supportedLanguages,
  languageNames,
  translations,
} from './translations';
import { I18nContext } from './I18nContext';
import { getTranslation, type TranslateFn } from './getTranslation';

const storageKey = 'landsearch-language';

function getInitialLanguage(): Language {
  const stored = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null;

  if (stored && supportedLanguages.includes(stored as Language)) {
    return stored as Language;
  }

  const browserLanguage = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : null;
  if (browserLanguage && supportedLanguages.includes(browserLanguage as Language)) {
    return browserLanguage as Language;
  }

  return defaultLanguage;
}

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(storageKey, nextLanguage);
  }, []);

  const t = useMemo<TranslateFn>(() => {
    return (key, params) => getTranslation(translations[language], key, params);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      supportedLanguages,
      languageNames,
    }),
    [language, setLanguage, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
