import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
      <p className="text-xl text-muted-foreground mb-6">{t("subtitle")}</p>
      <Link
        href="/tutors"
        className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        {t("cta")}
      </Link>
    </div>
  );
}
