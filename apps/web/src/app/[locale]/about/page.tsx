import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("nav");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t("about")}</h1>
      <p className="text-muted-foreground">About page - coming soon</p>
    </div>
  );
}
