"use client";

import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error: _error, reset }: ErrorProps) {
  const t = useTranslations("error.generic");

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg text-center relative z-50 bg-tertiary-red-400 rounded-3xl p-6">
        <AlertCircle className="mx-auto mb-3 mt-3 h-12 w-12 text-white" strokeWidth={1.5} />

        <h1 className="mb-4 font-[family-name:var(--font-lexend-deca)] font-medium text-4xl text-white md:text-3xl">
          {t("title")}
        </h1>

        <p className="mb-8 text-base text-white/90 leading-relaxed md:text-lg">
          {t("description")}
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-medium text-neutral-1000 transition-colors duration-200 hover:bg-white/90"
          >
            {t("button")}
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-white/20 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-white/30"
          >
            {t("backButton")}
          </Link>
        </div>
      </div>
    </div>
  );
}
