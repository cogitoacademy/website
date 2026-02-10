"use client";

import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("error.404");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg text-center relative z-3">
        <Sparkles className="mx-auto mb-6 h-10 w-10" strokeWidth={1.5} />

        <h1 className="mb-4 font-[family-name:var(--font-lexend-deca)] font-medium text-4xl md:text-5xl">
          {t("title")}
        </h1>

        <p className="mb-8 text-base leading-relaxed md:text-lg">
          {t("description")}
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-medium text-neutral-1000 transition-colors duration-200 hover:bg-white/90"
        >
          {t("button")}
        </Link>
      </div>
    </div>
  );
}
