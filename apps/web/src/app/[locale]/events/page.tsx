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
      <Container>
        <h1 className="mb-6 text-3xl font-bold">Competition Calendar</h1>
        <Suspense fallback={<div className="text-muted-foreground">Loading calendar...</div>}>
          <CalendarContent />
        </Suspense>
      </Container>
    </>
  );
}
