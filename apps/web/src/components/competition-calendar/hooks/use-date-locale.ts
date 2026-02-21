"use client";

import { id } from "date-fns/locale/id";
import { useLocale } from "next-intl";
import { useMemo } from "react";

/**
 * Returns the date-fns locale object based on the current app locale.
 * For "id" locale, returns Indonesian date-fns locale.
 * For all other locales, returns undefined (date-fns defaults to English).
 */
export function useDateLocale() {
  const locale = useLocale();
  const isId = locale === "id";

  const dateLocale = useMemo(() => (isId ? id : undefined), [isId]);

  return { locale, isId, dateLocale };
}
