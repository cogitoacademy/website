"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

export default function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();

  const targetLocale = locale === "en" ? "id" : "en";

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      scroll={false}
      className={cn(
        buttonVariants(),
        "px-3 py-1 text-sm border rounded-md hover:bg-accent transition-colors",
      )}
    >
      {targetLocale.toUpperCase()}
    </Link>
  );
}
