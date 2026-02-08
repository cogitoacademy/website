/**
 * Sanity Event Document Type (Kegiatan)
 * Used for Monthly Townhall and Cogito 101 Series events
 */
export interface SanityEvent {
  _id: string;
  title: Array<{ _key: string; value: string }>;
  slug: { current: string };
  category: "monthly-townhall" | "cogito-101-series";
  imageUrl?: string;
  description?: Array<{ _key: string; value: string }>;
  date: string;
  time?: string;
  place?: Array<{ _key: string; value: string }>;
  summary?: Array<{ _key: string; value: string }>;
  registrationLink?: string;
}

/**
 * Transformed Event for frontend display
 * Status is computed from date vs today (not stored in Sanity)
 */
export interface Event {
  id: string;
  title: string;
  slug: string;
  category: "monthly-townhall" | "cogito-101-series";
  imageUrl?: string;
  description?: string;
  date: Date;
  time?: string;
  place?: string;
  summary?: string;
  registrationLink?: string;
  status: "upcoming" | "past";
}
