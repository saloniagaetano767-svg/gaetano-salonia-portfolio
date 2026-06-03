import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { de } from "./locales/de";
import { en } from "./locales/en";
import { it } from "./locales/it";
import type { Locale, Translation } from "./types";

const STORAGE_KEY = "portfolio-locale";

const translations: Record<Locale, Translation> = { EN: en, DE: de, IT: it };

const htmlLang: Record<Locale, string> = {
  EN: "en",
  DE: "de",
  IT: "it",
};

interface LocaleContextValue {
  locale: Locale;
  t: Translation;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "EN";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "DE" || stored === "IT" || stored === "EN") return stored;
  } catch {
    // Some browser privacy settings make storage access throw during render.
  }
  return "EN";
}

function writeStoredLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Keep locale switching functional in-memory when persistence is blocked.
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writeStoredLocale(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLang[locale];
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      t: translations[locale],
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within LocaleProvider");
  }
  return ctx;
}

export type { Locale, Translation };
