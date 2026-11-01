import { notFound, permanentRedirect } from 'next/navigation';

export default async function LegacyActivitiesPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (
    !['en', 'id'].includes(locale) ||
    !['townhall-and-101-series', 'simulation-days'].includes(category)
  )
    notFound();
  permanentRedirect(`/${locale}/activities`);
}
