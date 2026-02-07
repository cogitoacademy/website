import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import CalendarClient from "./calendar";
import NavbarResolver from "@/components/navbar-resolver";
import { client } from "@/sanity/client";
import { EVENTS_QUERY } from "@/queries/events";
import { sanityToCalendarEvent } from "@/lib/transforms/eventTransform";
import type { SanityEvent } from "@/types/sanity/event";
import type { CalendarEvent } from "@/components/competition-calendar/types";

async function CalendarContent() {
  console.log("🔍 Fetching events from Sanity (server-side)...");

  try {
    const sanityEvents = await client.fetch<SanityEvent[]>(EVENTS_QUERY);
    console.log("✅ Sanity events fetched:", sanityEvents.length);

    const calendarEvents = sanityEvents
      .map((e) => sanityToCalendarEvent(e))
      .filter(Boolean) as CalendarEvent[];

    console.log("✅ Transformed calendar events:", calendarEvents.length);

    return <CalendarClient initialEvents={calendarEvents} />;
  } catch (error) {
    console.error("❌ Failed to fetch events:", error);
    return <CalendarClient initialEvents={[]} />;
  }
}

export default function CompetitionCalendarPage() {
  return (
    <>
      <NavbarResolver />
      <main className="z-1 relative gap-y-15 max-w-7xl mx-auto px-4 space-y-15">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold">
            Temukan{" "}
            <span className="text-primary-500 font-extrabold italic">
              Panggung Duniamu
            </span>{" "}
            Selanjutnya
          </h1>
          <p className="max-w-2xl">
            Dari kompetisi nasional hingga panggung internasional, kami
            menyediakan akses ke ribuan peluang prestasi yang telah dikurasi
            secara sistematis untukmu.
          </p>
        </div>
        <Suspense
          fallback={
            <div className="text-muted-foreground min-h-screen">
              Loading calendar...
            </div>
          }
        >
          <CalendarContent />
        </Suspense>
      </main>
    </>
  );
}
