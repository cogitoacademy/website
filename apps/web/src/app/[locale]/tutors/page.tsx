import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import NavbarResolver from '@/components/navbar-resolver';
import TutorList from '@/components/tutor-list';
import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import { BASE_URL } from '@/lib/constants';
import { getTutors } from '@/lib/tutors';
import { COMPETITION_CATEGORIES_QUERY } from '@/queries/tutors';
import { client } from '@/sanity/client';
import type { CompetitionCategory } from '@/types/tutor';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === 'id';

  const title = isId ? '#TutorJuara' : '#ChampionTutors';
  const description = isId
    ? 'Bertemu dengan tim tutor berpengalaman kami yang ahli dalam berbagai bidang perlombaan termasuk MUN, WSC, Debat, dan Olympiad.'
    : 'Meet our experienced tutor team who are experts in various competition fields including MUN, WSC, Debate, and Olympiads.';

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
          alt: 'Cogito Academy Tutors',
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [`${BASE_URL}/og-image-cogito.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/tutors`,
    },
  };
}

const HEADLINE = {
  id: {
    before: 'Belajar Langsung dari Para ',
    highlight: '#TutorJuara',
    after: '',
  },
  en: {
    before: 'Learn Directly from the ',
    highlight: '#ChampionTutors',
    after: '',
  },
};

async function TutorContent({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === 'en' ? 'en' : 'id';
  const headline = HEADLINE[lang];

  const [tutors, categories] = await Promise.all([
    getTutors(),
    client.fetch<CompetitionCategory[]>(
      COMPETITION_CATEGORIES_QUERY,
      {},
      { next: { revalidate: 1800 } },
    ),
  ]);

  return (
    <main className="min-h-screen bg-background-primary">
      <Container className="relative z-3 max-w-7xl gap-y-15 py-0">
        <div className="max-w-4xl space-y-2">
          {/*<h1 className="font-bold text-4xl">{t("title")}</h1>*/}

          <h1 className="font-semibold text-2xl text-neutral-1000 sm:max-w-[500px] sm:text-3xl md:max-w-2xl md:text-4xl lg:max-w-4xl lg:text-5xl min-[450px]:max-w-[420px]">
            {headline.before}
            <span className="font-extrabold text-primary-500">{headline.highlight}</span>
            {headline.after}
          </h1>
        </div>

        <TutorList tutors={tutors} categories={categories} />
      </Container>
    </main>
  );
}

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function TutorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <NavbarResolver className="bg-background-primary" />
      <Suspense
        fallback={
          <div className="min-h-screen bg-background-primary">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-8 space-y-2">
                <Skeleton className="h-12 w-80" />
                <Skeleton className="h-12 w-80" />
              </div>
              <div className="mt-8 mb-4 flex justify-between space-y-2">
                <Skeleton className="h-8 w-72" />
                <Skeleton className="h-8 w-72" />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* eslint-disable react/jsx-key -- skeleton placeholders intentionally use index */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`tutor-skeleton-${i}`}
                    className="flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-sm"
                  >
                    <div className="relative h-60 w-full shrink-0 bg-muted">
                      <Skeleton className="absolute top-5 right-5 z-2 h-10 w-10 rounded-full" />
                    </div>
                    <div className="relative -mt-2 flex flex-1 flex-col rounded-xl bg-neutral-100 p-2.5">
                      <Skeleton className="h-6 w-3/4 rounded-md" />
                      <Skeleton className="mt-1 mb-2.5 h-3 w-full rounded-md" />
                      <div className="mt-auto mb-0 flex flex-wrap gap-2">
                        <Skeleton className="h-5 w-16 rounded-md" />
                        <Skeleton className="h-5 w-20 rounded-md" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <TutorContent params={params} />
      </Suspense>
    </>
  );
}
