export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

export interface CompetitionPalette {
  lightTextColor: string;
  lightBackgroundColor: string;
  darkTextColor: string;
  darkBackgroundColor: string;
}

export interface CalendarCompetition {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  location?: string;

  // Fields supplied by the Cogito app competition catalog
  categories?: Array<{
    name: string;
    coreCategory: string;
    color: string;
    palette?: CompetitionPalette;
  }>;
  palette?: CompetitionPalette;
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
