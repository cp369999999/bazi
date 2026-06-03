"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  defaultLanguage,
  dictionaries,
  isLanguageCode,
  languageStorageKey,
  languages,
  type LanguageCode,
  type SiteDictionary
} from "./i18n";

interface I18nContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: SiteDictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(defaultLanguage);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const urlLanguage = search.get("lang");
    const storedLanguage = window.localStorage.getItem(languageStorageKey);
    const nextLanguage = isLanguageCode(urlLanguage)
      ? urlLanguage
      : isLanguageCode(storedLanguage)
        ? storedLanguage
        : defaultLanguage;

    applyLanguage(nextLanguage, false);
  }, []);

  const applyLanguage = (nextLanguage: LanguageCode, updateUrl = true) => {
    const languageMeta = languages.find((item) => item.code === nextLanguage) ?? languages[0];
    setLanguageState(nextLanguage);
    document.documentElement.lang = languageMeta.htmlLang;
    window.localStorage.setItem(languageStorageKey, nextLanguage);

    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", nextLanguage);
      window.history.replaceState({}, "", url);
    }
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage: (nextLanguage) => applyLanguage(nextLanguage),
      t: dictionaries[language]
    }),
    [language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return value;
}
