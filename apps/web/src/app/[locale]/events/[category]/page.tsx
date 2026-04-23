import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  EventsGrid,
  type SerializedEvent,
} from "@/components/events/events-grid";
import NavbarResolver from "@/components/navbar-resolver";
import { routing } from "@/i18n/routing";
import { BASE_URL } from "@/lib/constants";
import { sanityToEvent } from "@/lib/transforms/eventTransform";
import { EVENTS_BY_CATEGORY_QUERY } from "@/queries/events";
import { client } from "@/sanity/client";
import type { Event, SanityEvent } from "@/types/sanity/event";

const VALID_CATEGORIES = [
  "townhall-and-101-series",
  "simulation-days",
] as const;
type CategorySlug = (typeof VALID_CATEGORIES)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const isId = locale === "id";

  const titles: Record<string, { id: string; en: string }> = {
    "townhall-and-101-series": {
      id: "Townhall & 101 Series",
      en: "Townhall & 101 Series",
    },
    "simulation-days": {
      id: "Simulation Days",
      en: "Simulation Days",
    },
  };

  const descriptions: Record<string, { id: string; en: string }> = {
    "townhall-and-101-series": {
      id: "Dapatkan inspirasi dan wawasan mendasar melalui sesi informatif yang dirancang untuk membantumu memulai perjalanan di dunia kompetisi.",
      en: "Gain fresh insights and foundational knowledge through inspirational sessions designed to help you kickstart your competitive career.",
    },
    "simulation-days": {
      id: "Uji kemampuanmu dalam simulasi satu hari untuk ajang seperti MUN atau WSC, baik secara daring maupun luring.",
      en: "Test your skills in a one-day realistic simulation of WSC, MUN, and more-available both online and in-person.",
    },
  };

  const title =
    titles[category]?.[isId ? "id" : "en"] || "Events | Cogito Academy";
  const description = descriptions[category]?.[isId ? "id" : "en"] || "";

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
      canonical: `${BASE_URL}/${locale}/events/${category}`,
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
  "townhall-and-101-series": {
    headline: {
      id: {
        before: "Perluas ",
        highlight: "Cakrawalamu",
        after: ", Asah Kemampuanmu",
      },
      en: {
        before: "Broaden Your ",
        highlight: "Horizons",
        after: ", Sharpen Your Skills",
      },
    },
    subtitle: {
      id: "Dapatkan inspirasi dan wawasan mendasar melalui sesi informatif yang dirancang untuk membantumu memulai perjalanan di dunia kompetisi.",
      en: "Gain fresh insights and foundational knowledge through inspirational sessions designed to help you kickstart your competitive career.",
    },
  },
  "simulation-days": {
    headline: {
      id: {
        before: "Asah Kemampuanmu dengan ",
        highlight: "Simulation Days",
        after: "",
      },
      en: {
        before: "Test Your Skills with ",
        highlight: "Simulation Days",
        after: "",
      },
    },
    subtitle: {
      id: "Uji kemampuanmu dalam simulasi satu hari untuk ajang seperti MUN atau WSC, baik secara daring maupun luring.",
      en: "Test your skills in a one-day realistic simulation of WSC, MUN, and more-available both online and in-person.",
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
  const lang = locale === "en" ? "en" : "id";
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
    console.error("Failed to fetch events:", error);
  }

  // Serialize events for client component (Date -> ISO string)
  const serializedEvents: SerializedEvent[] = events.map((e) => ({
    ...e,
    date: e.date.toISOString(),
  }));

  return (
    <>
      <NavbarResolver />
      <div className="relative z-3 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 min-h-[80vh]">
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

        {serializedEvents.length === 0 && (
          <p>
            {lang === "en"
              ? "No events found."
              : "Tidak ada konten yang ditemukan."}
          </p>
        )}

        {serializedEvents.length > 0 && (
          <EventsGrid events={serializedEvents} lang={lang} />
        )}
      </div>
    </>
  );
}
