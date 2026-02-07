"use client";

import {
	type CalendarCompetition,
	EventCalendar,
} from "@/components/competition-calendar";

interface CalendarClientProps {
	initialCompetitions: CalendarCompetition[];
}

export default function CalendarClient({
	initialCompetitions,
}: CalendarClientProps) {
	return <EventCalendar events={initialCompetitions} readOnly />;
}
