import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { EventsGrid, type SerializedEvent } from '@/components/events/events-grid';
import NavbarResolver from '@/components/navbar-resolver';
import { routing } from '@/i18n/routing';
import { sanityToEvent } from '@/lib/transforms/eventTransform';
import { EVENTS_BY_CATEGORY_QUERY } from '@/queries/events';
import { client } from '@/sanity/client';
import type { Event, SanityEvent } from '@/types/sanity/event';

const VALID_CATEGORIES = ['monthly-townhall', 'cogito-101-series'] as const;
type CategorySlug = (typeof VALID_CATEGORIES)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const isId = locale === 'id';

  const titles: Record<string, { id: string; en: string }> = {
    'monthly-townhall': {
      id: 'Monthly Townhall',
      en: 'Monthly Townhall',
    },
    'cogito-101-series': {
      id: 'Cogito 101 Series',
      en: 'Cogito 101 Series',
    },
  };

  const descriptions: Record<string, { id: string; en: string }> = {
    'monthly-townhall': {
      id: 'Perdalam penguasaan ilmumu melalui dialog langsung bersama para ahli di setiap sesi bulanan Cogito Academy.',
      en: 'Deepen your knowledge through direct dialogue with experts in every monthly session at Cogito Academy.',
    },
    'cogito-101-series': {
      id: 'Seri pengenalan untuk kamu yang ingin memahami lebih dalam tentang dunia kompetisi dan peluang prestasi.',
      en: 'Introduction series for those who want to understand more about the world of competition and achievement opportunities.',
    },
  };

  const title = titles[category]?.[isId ? 'id' : 'en'] || 'Events | Cogito Academy';
  const description = descriptions[category]?.[isId ? 'id' : 'en'] || '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

const CATEGORY_META: Record<
  CategorySlug,
  {
    headline: {
      id: { before: string; highlight: string; after: string };
      en: { before: string; highlight: string; after: string };
    };
    subtitle: { id: string; en: string };
  }
> = {
  'monthly-townhall': {
    headline: {
      id: {
        before: 'Gali ',
        highlight: 'Wawasan Baru',
        after: ' dalam Diskusi Bulanan Kami',
      },
      en: {
        before: 'Discover ',
        highlight: 'New Insights',
        after: ' in Our Monthly Discussions',
      },
    },
    subtitle: {
      id: 'Perdalam penguasaan ilmumu melalui dialog langsung bersama para ahli di setiap sesi bulanan.',
      en: 'Deepen your knowledge through direct dialogue with experts in every monthly session.',
    },
  },
  'cogito-101-series': {
    headline: {
      id: {
        before: 'Kenali ',
        highlight: 'Ragam Peluang',
        after: ' Prestasi Global',
      },
      en: {
        before: 'Discover ',
        highlight: 'Global Achievement',
        after: ' Opportunities',
      },
    },
    subtitle: {
      id: 'Seri pengenalan untuk kamu yang ingin memahami lebih dalam tentang dunia kompetisi dan peluang prestasi.',
      en: 'An introductory series for those who want to dive deeper into competitions and achievement opportunities.',
    },
  },
};

type Props = {
  params: Promise<{
    locale: string;
    category: string;
  }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    VALID_CATEGORIES.map((category) => ({ locale, category })),
  );
}

export default async function EventCategoryPage({ params }: Props) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  if (!VALID_CATEGORIES.includes(category as CategorySlug)) {
    notFound();
  }

  const categorySlug = category as CategorySlug;
  const meta = CATEGORY_META[categorySlug];
  const lang = locale === 'en' ? 'en' : 'id';
  const headline = meta.headline[lang];

  // Fetch events from Sanity
  let events: Event[] = [];
  try {
    const sanityEvents = await client.fetch<SanityEvent[]>(
      EVENTS_BY_CATEGORY_QUERY,
      { category: categorySlug },
      { next: { revalidate: 1800 } },
    );

    events = sanityEvents.map((e) => sanityToEvent(e, lang));
  } catch (error) {
    console.error('Failed to fetch events:', error);
  }

  // Serialize events for client component (Date -> ISO string)
  const serializedEvents: SerializedEvent[] = events.map((e) => ({
    ...e,
    date: e.date.toISOString(),
  }));

  return (
    <>
      <NavbarResolver />
      <main className="relative z-3 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="pb-8 sm:pb-12 md:pb-16">
          <div className="max-w-2xl space-y-3">
            <h1 className="font-bold text-2xl text-neutral-1000 tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {headline.before}
              <em className="text-primary-500">{headline.highlight}</em>
              {headline.after}
            </h1>
            <p className="text-neutral-600 text-sm leading-relaxed sm:text-base">
              {meta.subtitle[lang]}
            </p>
          </div>
        </section>

        {/* Events Grid with Pagination */}
        <EventsGrid events={serializedEvents} lang={lang} />
      </main>
    </>
  );
}
