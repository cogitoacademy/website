import type { Event, SanityEvent } from "@/types/sanity/event";

/**
 * Extract localized value from Sanity internationalized array
 */
function getLocalizedValue(
  arr?: Array<{ _key: string; value: string }>,
  locale = "id",
): string | undefined {
  if (!arr || arr.length === 0) return undefined;

  const localized = arr.find((item) => item._key === locale);
  if (localized) return localized.value;

  return arr[0]?.value;
}

/**
 * Compute event status based on date vs today
 */
function computeStatus(date: Date): "upcoming" | "past" {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(date);
  eventDate.setHours(0, 0, 0, 0);

  return eventDate >= today ? "upcoming" : "past";
}

/**
 * Transform a Sanity Event document to a frontend Event
 */
export function sanityToEvent(sanityEvent: SanityEvent, locale = "id"): Event {
  const title = getLocalizedValue(sanityEvent.title, locale);
  const description = getLocalizedValue(sanityEvent.description, locale);
  const place = getLocalizedValue(sanityEvent.place, locale);
  const summary = getLocalizedValue(sanityEvent.summary, locale);
  const date = new Date(sanityEvent.date);

  return {
    id: sanityEvent._id,
    title: title || "Untitled Event",
    slug: sanityEvent.slug.current,
    category: sanityEvent.category,
    imageUrl: sanityEvent.imageUrl,
    description,
    date,
    time: sanityEvent.time,
    place,
    summary,
    registrationLink: sanityEvent.registrationLink,
    status: computeStatus(date),
  };
}
