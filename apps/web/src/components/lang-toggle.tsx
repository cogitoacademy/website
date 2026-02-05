"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { GlobeIcon } from "@phosphor-icons/react/dist/ssr";
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
      className={cn(buttonVariants({ size: "lg" }), "transition-colors")}
    >
      <GlobeIcon className="size-5" />
      {targetLocale.toUpperCase()}
    </Link>
  );
}
