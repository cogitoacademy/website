"use client";

import { type CalendarEvent, EventCalendar } from "@/components/competition-calendar";

interface CalendarClientProps {
  initialEvents: CalendarEvent[];
}

export default function CalendarClient({ initialEvents }: CalendarClientProps) {
  return <EventCalendar events={initialEvents} readOnly />;
}
