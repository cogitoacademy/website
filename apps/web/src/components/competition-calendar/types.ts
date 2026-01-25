export type CalendarView = "month" | "week" | "day" | "agenda";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  location?: string;

  // For Sanity-sourced events
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
  color?: EventColor;
}

export type EventColor = "sky" | "amber" | "violet" | "rose" | "emerald" | "orange";
