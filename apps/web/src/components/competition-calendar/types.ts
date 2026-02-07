export type CalendarView = "month" | "week" | "day" | "agenda";

export interface CalendarCompetition {
	id: string;
	title: string;
	description?: string;
	start: Date;
	end: Date;
	allDay?: boolean;
	location?: string;

	// For Sanity-sourced competitions
	categories?: Array<{
		name: string;
		coreCategory: string;
		color: string;
	}>;
	educationLevels?: string[];
	scale?: string;
	organizer?: string;
	registrationDeadline?: Date;
	registrationLink?: string;
	socialMediaLink?: string;

	// For manually created events (backward compatibility)
	color?: CompetitionColor;
}

export type CompetitionColor =
	| "sky"
	| "amber"
	| "violet"
	| "rose"
	| "emerald"
	| "orange";
