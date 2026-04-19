import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { CalendarSkeleton } from '@/components/competition-calendar/calendar-skeleton';
import type { CalendarCompetition } from '@/components/competition-calendar/types';
import NavbarResolver from '@/components/navbar-resolver';
import { BASE_URL } from '@/lib/constants';
import { sanityToCalendarCompetition } from '@/lib/transforms/competitionTransform';
import { COMPETITIONS_QUERY } from '@/queries/competitions';
import { client } from '@/sanity/client';
import type { SanityCompetition } from '@/types/sanity/competition';
import CalendarClient from './calendar';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === 'id';

  const title = isId ? 'Kalender Lomba' : 'Competition Calendar';
  const description = isId
    ? 'Temukan jadwal kompetisi nasional dan internasional yang telah dikurasi secara sistematis untuk mengembangkan potensi prestasi Anda.'
    : 'Discover national and international competition schedules systematically curated to develop your achievement potential.';

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
          alt: 'Competition Calendar',
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [`${BASE_URL}/og-image-cogito.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/calendar`,
    },
  };
}

/* eslint-disable react-compiler/react-compiler -- Server component with JSX in try/catch is intentional for error boundaries */
async function CalendarContent() {
  try {
    const sanityCompetitions = await client.fetch<SanityCompetition[]>(
      COMPETITIONS_QUERY,
      {},
      { next: { revalidate: 1800 } },
    );

    const calendarCompetitions = sanityCompetitions
      .map((c) => sanityToCalendarCompetition(c))
      .filter(Boolean) as CalendarCompetition[];

    return <CalendarClient initialCompetitions={calendarCompetitions} />;
  } catch (error) {
    console.error('Failed to fetch competitions:', error);
    return <CalendarClient initialCompetitions={[]} />;
  }
}

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function CompetitionCalendarPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <NavbarResolver />
      <div className="relative z-3 mx-auto max-w-7xl gap-y-15 space-y-15 overflow-x-clip px-4">
        <div className="space-y-2">
          <h1 className="font-semibold text-2xl text-neutral-1000 sm:text-3xl md:text-4xl lg:text-5xl">
            {locale === 'en' ? (
              <>
                Your Gateway to the
                <span className="font-extrabold text-primary-500 italic">World Stage</span>
              </>
            ) : (
              <>
                Gerbangmu Menuju{' '}
                <span className="font-extrabold text-primary-500 italic">Panggung Dunia</span>
              </>
            )}
          </h1>
          <p className="max-w-2xl">
            {locale === 'en'
              ? 'From national challenges to global arenas, access a curated list of opportunities tailored for your next big win.'
              : 'Dari kompetisi nasional hingga kancah global, temukan daftar peluang terkurasi yang dirancang khusus untuk target prestasimu berikutnya.'}
          </p>
        </div>
        <Suspense fallback={<CalendarSkeleton locale={locale} />}>
          <CalendarContent />
        </Suspense>
      </div>
    </>
  );
}
