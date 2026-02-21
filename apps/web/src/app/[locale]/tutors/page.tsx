import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import NavbarResolver from "@/components/navbar-resolver";
import TutorList from "@/components/tutor-list";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { getTutors } from "@/lib/tutors";
import { COMPETITION_CATEGORIES_QUERY } from "@/queries/tutors";
import { client } from "@/sanity/client";
import type { CompetitionCategory } from "@/types/tutor";

const HEADLINE = {
  id: {
    before: "Asah Kapasitas Diri dan Kemampuan Berpikir Bersama ",
    highlight: "#TutorJuara",
    after: "",
  },
  en: {
    before: "Sharpen Your Potential and Thinking Skills with ",
    highlight: "#TutorJuara",
    after: "",
  },
};

async function TutorContent({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "en" ? "en" : "id";
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

          <h1 className="font-semibold text-2xl text-neutral-1000 sm:text-3xl md:text-4xl lg:text-5xl min-[450px]:max-w-[420px] sm:max-w-[500px] md:max-w-2xl lg:max-w-4xl">
            {headline.before}
            <span className="font-extrabold text-primary-500">{headline.highlight}</span>
            {headline.after}
          </h1>
          {/*<p className="text-muted-foreground">{t("description")}</p>z*/}
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
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-6 w-96" />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4 p-6">
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-24 w-24 shrink-0 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-24" />
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
