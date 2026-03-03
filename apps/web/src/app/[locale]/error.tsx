"use client";

import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error: _error, reset }: ErrorProps) {
  const t = useTranslations("error.generic");

  return (
    <Empty className="min-h-[calc(100vh-200px)] px-4 py-16">
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="size-12 bg-tertiary-red-100 text-tertiary-red-400"
        >
          <AlertCircle className="size-6" strokeWidth={1.5} />
        </EmptyMedia>

        <EmptyTitle className="font-[family-name:var(--font-lexend-deca)] font-medium text-2xl text-tertiary-red-400 md:text-3xl">
          {t("title")}
        </EmptyTitle>

        <EmptyDescription className="text-muted-foreground text-sm md:text-base">
          {t("description")}
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="mt-2 flex-row items-center justify-center">
        <button onClick={reset} className={cn(buttonVariants({ size: "md" }))}>
          {t("button")}
        </button>

        <Link
          href="/"
          className={cn(buttonVariants({ size: "md", variant: "gray" }))}
        >
          {t("backButton")}
        </Link>
      </EmptyContent>
    </Empty>
  );
}
