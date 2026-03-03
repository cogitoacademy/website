import { FileQuestion } from "lucide-react";
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

export default function NotFound() {
  const t = useTranslations("error.404");

  return (
    <Empty className="min-h-screen px-4 py-16">
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="size-12 bg-neutral-300 text-black"
        >
          <FileQuestion className="size-6" strokeWidth={1.5} />
        </EmptyMedia>

        <EmptyTitle className="font-[family-name:var(--font-lexend-deca)] font-medium text-2xl md:text-3xl">
          {t("title")}
        </EmptyTitle>

        <EmptyDescription className="text-sm md:text-base">
          {t("description")}
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="mt-2">
        <Link
          href="/"
          className={cn(buttonVariants({ size: "md", variant: "gray" }))}
        >
          {t("button")}
        </Link>
      </EmptyContent>
    </Empty>
  );
}
