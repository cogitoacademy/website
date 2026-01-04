"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

import { usePathname } from "next/navigation";


export default function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();

  const getPathWithoutLocale = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === locale) {
      segments.shift();
    }
    return segments.length > 0 ? `/${segments.join("/")}` : "/";
  };

  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <Link
      href={pathWithoutLocale}
      locale={locale === "en" ? "id" : "en"}
      scroll={false}
      className={cn(
        buttonVariants(),
        "px-3 py-1 text-sm border rounded-md hover:bg-accent transition-colors"
      )}
    >
      {locale === "en" ? "EN" : "ID"}
    </Link>
  );
}
