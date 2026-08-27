import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import AchievementArchive from '@/components/achievements/achievement-archive';
import NavbarResolver from '@/components/navbar-resolver';
import { getApprovedAchievements } from '@/lib/achievements';
import { BASE_URL } from '@/lib/constants';
import type { AchievementLocale, ApprovedAchievement } from '@/types/achievement';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === 'id';
  const title = isId ? 'Catatan Prestasi' : 'Achievement Archive';
  const description = isId
    ? 'Lihat catatan prestasi siswa Cogito Academy yang telah diverifikasi dan dipilih untuk tampil secara publik.'
    : 'Explore verified Cogito Academy student achievements selected for the public record.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `${BASE_URL}/og-image-cogito.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [`${BASE_URL}/og-image-cogito.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/achievements`,
    },
  };
}

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let achievements: ApprovedAchievement[] = [];
  let hasError = false;

  try {
    achievements = await getApprovedAchievements();
  } catch (error) {
    hasError = true;
    console.error('Failed to fetch approved achievements:', error);
  }

  return (
    <>
      <NavbarResolver className="bg-background-primary" />
      <AchievementArchive
        achievements={achievements}
        locale={(locale === 'en' ? 'en' : 'id') as AchievementLocale}
        hasError={hasError}
      />
    </>
  );
}
