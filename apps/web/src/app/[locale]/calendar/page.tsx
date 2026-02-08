import { Suspense } from "react";
import type { CalendarCompetition } from "@/components/competition-calendar/types";
import NavbarResolver from "@/components/navbar-resolver";
import { sanityToCalendarCompetition } from "@/lib/transforms/competitionTransform";
import { COMPETITIONS_QUERY } from "@/queries/competitions";
import { client } from "@/sanity/client";
import type { SanityCompetition } from "@/types/sanity/competition";
import CalendarClient from "./calendar";

async function CalendarContent() {
  console.log("Fetching competitions from Sanity (server-side)...");

  try {
    const sanityCompetitions = await client.fetch<SanityCompetition[]>(COMPETITIONS_QUERY);
    console.log("Sanity competitions fetched:", sanityCompetitions.length);

    const calendarCompetitions = sanityCompetitions
      .map((c) => sanityToCalendarCompetition(c))
      .filter(Boolean) as CalendarCompetition[];

    console.log("Transformed calendar competitions:", calendarCompetitions.length);

    return <CalendarClient initialCompetitions={calendarCompetitions} />;
  } catch (error) {
    console.error("Failed to fetch competitions:", error);
    return <CalendarClient initialCompetitions={[]} />;
  }
}

export default function CompetitionCalendarPage() {
  return (
    <>
      <NavbarResolver />
      <main className="relative z-3 mx-auto max-w-7xl gap-y-15 space-y-15 px-4">
        <div className="space-y-2">
          <h1 className="font-semibold text-4xl">
            Temukan <span className="font-extrabold text-primary-500 italic">Panggung Duniamu</span>{" "}
            Selanjutnya
          </h1>
          <p className="max-w-2xl">
            Dari kompetisi nasional hingga panggung internasional, kami menyediakan akses ke ribuan
            peluang prestasi yang telah dikurasi secara sistematis untukmu.
          </p>
        </div>
        <Suspense
          fallback={<div className="min-h-screen text-muted-foreground">Loading calendar...</div>}
        >
          <CalendarContent />
        </Suspense>
      </main>
    </>
  );
}
