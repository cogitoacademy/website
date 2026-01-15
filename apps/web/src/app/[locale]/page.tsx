import { useTranslations } from "next-intl";
import { WordRotateHighlighter } from "@/components/ui/word-rotate-highlighter";
import { Link } from "@/i18n/routing";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="font-bold text-4xl">Wujudkan Prestasi Nyata</div>
      <div className="mb-4 flex items-baseline font-bold text-4xl">
        di Tingkat<span className="w-2"> </span>
        <WordRotateHighlighter
          words={["Internasional", "Regional", "Nasional"]}
          className="italic"
          action="highlight"
          color="#87CEFA"
          highlightDelay={500}
        />{" "}
      </div>
      <p className="mb-6 text-muted-foreground text-xl">{t("subtitle")}</p>
      <Link
        href="/tutors"
        className="inline-block rounded-md bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {t("cta")}
      </Link>
    </div>
  );
}
