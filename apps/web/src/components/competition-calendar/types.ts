export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

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
  | 'sky'
  | 'amber'
  | 'violet'
  | 'rose'
  | 'emerald'
  | 'orange'
  | 'tertiary-blue-300'
  | 'tertiary-blue-400'
  | 'tertiary-blue-500'
  | 'tertiary-pink-300'
  | 'tertiary-red-600'
  | 'tertiary-yellow-600'
  | 'primary-500'
  | 'secondary-500'
  | 'tertiary-green-600';
