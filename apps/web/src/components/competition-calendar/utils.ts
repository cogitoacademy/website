import { isSameDay } from "date-fns";

import type { CalendarCompetition, CompetitionColor } from "./types";

/**
 * Get CSS classes for event colors
 */
export function getCompetitionColorClasses(
	color?: CompetitionColor | string,
): string {
	const eventColor = color || "sky";

	switch (eventColor) {
		case "sky":
			return "bg-sky-200/50 hover:bg-sky-200/40 text-sky-950/80 dark:bg-sky-400/25 dark:hover:bg-sky-400/20 dark:text-sky-200 shadow-sky-700/8";
		case "amber":
			return "bg-amber-200/50 hover:bg-amber-200/40 text-amber-950/80 dark:bg-amber-400/25 dark:hover:bg-amber-400/20 dark:text-amber-200 shadow-amber-700/8";
		case "violet":
			return "bg-violet-200/50 hover:bg-violet-200/40 text-violet-950/80 dark:bg-violet-400/25 dark:hover:bg-violet-400/20 dark:text-violet-200 shadow-violet-700/8";
		case "rose":
			return "bg-rose-200/50 hover:bg-rose-200/40 text-rose-950/80 dark:bg-rose-400/25 dark:hover:bg-rose-400/20 dark:text-rose-200 shadow-rose-700/8";
		case "emerald":
			return "bg-emerald-200/50 hover:bg-emerald-200/40 text-emerald-950/80 dark:bg-emerald-400/25 dark:hover:bg-emerald-400/20 dark:text-emerald-200 shadow-emerald-700/8";
		case "orange":
			return "bg-orange-200/50 hover:bg-orange-200/40 text-orange-950/80 dark:bg-orange-400/25 dark:hover:bg-orange-400/20 dark:text-orange-200 shadow-orange-700/8";

		// New colors based on core categories
		case "tertiary-blue-300": // Model United Nations (Old - Fallback to 500)
			return "bg-tertiary-blue-100 hover:bg-tertiary-blue-100/80 text-tertiary-blue-900/80 dark:bg-tertiary-blue-500/25 dark:hover:bg-tertiary-blue-500/20 dark:text-tertiary-blue-200 shadow-tertiary-blue-700/8";
		case "tertiary-blue-400": // Model United Nations (Fallback to 500)
			return "bg-tertiary-blue-100 hover:bg-tertiary-blue-100/80 text-tertiary-blue-900/80 dark:bg-tertiary-blue-500/25 dark:hover:bg-tertiary-blue-500/20 dark:text-tertiary-blue-200 shadow-tertiary-blue-700/8";
		case "tertiary-blue-500": // Model United Nations (New) - Blue shadow 500, bg 100
			return "bg-tertiary-blue-100 hover:bg-tertiary-blue-100/80 text-tertiary-blue-900/80 dark:bg-tertiary-blue-500/25 dark:hover:bg-tertiary-blue-500/20 dark:text-tertiary-blue-200 shadow-tertiary-blue-700/8";
		case "tertiary-pink-300": // Pidato - Pink shadow 500, bg 100
			return "bg-tertiary-pink-100 hover:bg-tertiary-pink-100/80 text-tertiary-pink-900/80 dark:bg-tertiary-pink-400/25 dark:hover:bg-tertiary-pink-400/20 dark:text-tertiary-pink-200 shadow-tertiary-pink-700/8";
		case "tertiary-red-600": // Olimpiade - Red shadow 500, bg 100
			return "bg-tertiary-red-100 hover:bg-tertiary-red-100/80 text-tertiary-red-900/80 dark:bg-tertiary-red-400/25 dark:hover:bg-tertiary-red-400/20 dark:text-tertiary-red-200 shadow-tertiary-red-700/8";
		case "tertiary-yellow-600": // World Scholar's Cup - Yellow shadow 400, bg 100
			return "bg-tertiary-yellow-100 hover:bg-tertiary-yellow-100/80 text-tertiary-yellow-900/80 dark:bg-tertiary-yellow-400/25 dark:hover:bg-tertiary-yellow-400/20 dark:text-tertiary-yellow-200 shadow-tertiary-yellow-700/8";
		case "primary-500": // KTI dan Esai - Orange/Primary shadow 400, bg 100
			return "bg-primary-100 hover:bg-primary-100/80 text-primary-900/80 dark:bg-primary-500/25 dark:hover:bg-primary-500/20 dark:text-primary-200 shadow-primary-700/8";
		case "secondary-500": // Debat - Purple shadow 500, bg 100
			return "bg-secondary-100 hover:bg-secondary-100/80 text-secondary-900/80 dark:bg-secondary-500/25 dark:hover:bg-secondary-500/20 dark:text-secondary-200 shadow-secondary-700/8";
		case "tertiary-green-600": // Business Plan - Green shadow 600, bg 100
			return "bg-tertiary-green-100 hover:bg-tertiary-green-100/80 text-tertiary-green-900/80 dark:bg-tertiary-green-400/25 dark:hover:bg-tertiary-green-400/20 dark:text-tertiary-green-200 shadow-tertiary-green-700/8";

		default:
			return "bg-sky-200/50 hover:bg-sky-200/40 text-sky-950/80 dark:bg-sky-400/25 dark:hover:bg-sky-400/20 dark:text-sky-200 shadow-sky-700/8";
	}
}

/**
 * Get CSS classes for border radius based on event position in multi-day events
 */
export function getBorderRadiusClasses(
	isFirstDay: boolean,
	isLastDay: boolean,
): string {
	if (isFirstDay && isLastDay) {
		return "rounded"; // Both ends rounded
	}
	if (isFirstDay) {
		return "rounded-l rounded-r-none"; // Only left end rounded
	}
	if (isLastDay) {
		return "rounded-r rounded-l-none"; // Only right end rounded
	}
	return "rounded-none"; // No rounded corners
}

/**
 * Check if an event is a multi-day event
 */
export function isMultiDayEvent(event: CalendarCompetition): boolean {
	const eventStart = new Date(event.start);
	const eventEnd = new Date(event.end);
	return event.allDay || eventStart.getDate() !== eventEnd.getDate();
}

/**
 * Filter events for a specific day
 */
export function getEventsForDay(
	events: CalendarCompetition[],
	day: Date,
): CalendarCompetition[] {
	return events
		.filter((event) => {
			const eventStart = new Date(event.start);
			return isSameDay(day, eventStart);
		})
		.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

/**
 * Sort events with multi-day events first, then by start time
 */
export function sortEvents(
	events: CalendarCompetition[],
): CalendarCompetition[] {
	return [...events].sort((a, b) => {
		const aIsMultiDay = isMultiDayEvent(a);
		const bIsMultiDay = isMultiDayEvent(b);

		if (aIsMultiDay && !bIsMultiDay) return -1;
		if (!aIsMultiDay && bIsMultiDay) return 1;

		return new Date(a.start).getTime() - new Date(b.start).getTime();
	});
}

/**
 * Get multi-day events that span across a specific day (but don't start on that day)
 */
export function getSpanningEventsForDay(
	events: CalendarCompetition[],
	day: Date,
): CalendarCompetition[] {
	return events.filter((event) => {
		if (!isMultiDayEvent(event)) return false;

		const eventStart = new Date(event.start);
		const eventEnd = new Date(event.end);

		// Only include if it's not the start day but is either the end day or a middle day
		return (
			!isSameDay(day, eventStart) &&
			(isSameDay(day, eventEnd) || (day > eventStart && day < eventEnd))
		);
	});
}

/**
 * Get all events visible on a specific day (starting, ending, or spanning)
 */
export function getAllEventsForDay(
	events: CalendarCompetition[],
	day: Date,
): CalendarCompetition[] {
	return events.filter((event) => {
		const eventStart = new Date(event.start);
		const eventEnd = new Date(event.end);
		return (
			isSameDay(day, eventStart) ||
			isSameDay(day, eventEnd) ||
			(day > eventStart && day < eventEnd)
		);
	});
}

/**
 * Get all events for a day (for agenda view)
 */
export function getAgendaEventsForDay(
	events: CalendarCompetition[],
	day: Date,
): CalendarCompetition[] {
	return events
		.filter((event) => {
			const eventStart = new Date(event.start);
			const eventEnd = new Date(event.end);
			return (
				isSameDay(day, eventStart) ||
				isSameDay(day, eventEnd) ||
				(day > eventStart && day < eventEnd)
			);
		})
		.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

/**
 * Add hours to a date
 */
export function addHoursToDate(date: Date, hours: number): Date {
	const result = new Date(date);
	result.setHours(result.getHours() + hours);
	return result;
}
