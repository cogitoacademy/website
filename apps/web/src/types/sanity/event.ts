/**
 * Sanity Event Document Type
 */
export interface SanityEvent {
  _id: string;
  title: Array<{ _key: string; value: string }>;
  description?: Array<{ _key: string; value: string }>;
  categories?: Array<{
    _id: string;
    name: string;
    coreCategory: string;
  }>;
  educationLevels?: Array<{
    _id: string;
    name: string;
  }>;
  eventDate: {
    startDate: string;
    endDate: string;
  };
  scale?: {
    name: string;
  };
  location?: Array<{ _key: string; value: string }>;
  organizer?: string;
  registrationDeadline?: string;
  registrationLink?: string;
  socialMediaLink?: string;
}
