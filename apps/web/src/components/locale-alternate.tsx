'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import type { BlogLocale } from '@/lib/blog-api';

type LocaleAlternate = {
  locale: BlogLocale;
  /** Path without the locale prefix, e.g. `/blog/english-slug`. */
  path: string;
} | null;

type LocaleSwitchState = {
  alternate: LocaleAlternate;
  hidden: boolean;
};

const INITIAL_STATE: LocaleSwitchState = { alternate: null, hidden: false };
const SwitchContext = createContext<LocaleSwitchState>(INITIAL_STATE);
const SetSwitchContext = createContext<(value: LocaleSwitchState) => void>(() => {});

export function LocaleAlternateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LocaleSwitchState>(INITIAL_STATE);

  return (
    <SetSwitchContext.Provider value={setState}>
      <SwitchContext.Provider value={state}>{children}</SwitchContext.Provider>
    </SetSwitchContext.Provider>
  );
}

export function useLocaleSwitch() {
  return useContext(SwitchContext);
}

/**
 * Registers the sibling-language path for the current page so the header and
 * mobile language toggles can open the correct translated URL.
 */
export function SetLocaleAlternate({
  locale,
  path,
}: {
  locale: BlogLocale;
  path: string;
}) {
  const setState = useContext(SetSwitchContext);

  useEffect(() => {
    setState({ alternate: { locale, path }, hidden: false });
    return () => setState(INITIAL_STATE);
  }, [locale, path, setState]);

  return null;
}

/**
 * Hides the language toggle on a page that has no translated sibling, such as a
 * single-language blog article. The reader can switch language from the blog
 * index instead.
 */
export function HideLocaleSwitch() {
  const setState = useContext(SetSwitchContext);

  useEffect(() => {
    setState({ alternate: null, hidden: true });
    return () => setState(INITIAL_STATE);
  }, [setState]);

  return null;
}
