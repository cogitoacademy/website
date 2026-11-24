'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import type { BlogLocale } from '@/lib/blog-api';

type LocaleAlternate = {
  locale: BlogLocale;
  /** Path without the locale prefix, e.g. `/blog/english-slug`. */
  path: string;
} | null;

const AlternateContext = createContext<LocaleAlternate>(null);
const SetAlternateContext = createContext<(value: LocaleAlternate) => void>(() => {});

export function LocaleAlternateProvider({ children }: { children: React.ReactNode }) {
  const [alternate, setAlternate] = useState<LocaleAlternate>(null);

  return (
    <SetAlternateContext.Provider value={setAlternate}>
      <AlternateContext.Provider value={alternate}>{children}</AlternateContext.Provider>
    </SetAlternateContext.Provider>
  );
}

export function useLocaleAlternate() {
  return useContext(AlternateContext);
}

/**
 * Registers the sibling-language path for the current page so the header and
 * mobile language toggles can open the correct translated URL. Pages without a
 * registered alternate fall back to the current pathname.
 */
export function SetLocaleAlternate({ locale, path }: { locale: BlogLocale; path: string }) {
  const setAlternate = useContext(SetAlternateContext);

  useEffect(() => {
    setAlternate({ locale, path });
    return () => setAlternate(null);
  }, [locale, path, setAlternate]);

  return null;
}
