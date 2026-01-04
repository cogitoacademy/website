import { useTranslations } from "next-intl";

export default function EventsPage() {
  const t = useTranslations("nav");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t("events")}</h1>
      <p className="text-muted-foreground">Events page - coming soon</p>
    </div>
  );
}
