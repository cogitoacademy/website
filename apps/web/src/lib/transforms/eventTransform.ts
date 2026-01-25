import type { CalendarEvent } from "@/components/competition-calendar/types";
import { CORE_CATEGORIES, type CoreCategorySlug } from "@/lib/config/coreCategories";
import type { SanityEvent } from "@/types/sanity/event";

/**
 * Extract localized value from Sanity internationalized array
 */
function getLocalizedValue(
  arr?: Array<{ _key: string; value: string }>,
  locale: string = "id",
): string | undefined {
  if (!arr || arr.length === 0) return undefined;

  // Try to find the requested locale
  const localized = arr.find((item) => item._key === locale);
  if (localized) return localized.value;

  // Fallback to first available value
  return arr[0]?.value;
}

/**
 * Transform Sanity Event to Calendar Event
 */
export function sanityToCalendarEvent(
  sanityEvent: SanityEvent,
  locale: string = "id",
): CalendarEvent | null {
  // Validate that event has at least one category with core category
  const firstCategory = sanityEvent.categories?.[0];
  if (!firstCategory?.coreCategory) {
    console.warn(`Event ${sanityEvent._id} is missing core category, skipping`);
    return null;
  }

  // Transform categories with core category colors
  const categories =
    sanityEvent.categories?.map((cat) => {
      const coreSlug = cat.coreCategory as CoreCategorySlug;
      const coreData = CORE_CATEGORIES[coreSlug];

      return {
        name: cat.name,
        coreCategory: cat.coreCategory,
        color: coreData?.brandColor || "primary-500",
      };
    }) || [];

  // Extract localized strings
  const title = getLocalizedValue(sanityEvent.title, locale);
  const description = getLocalizedValue(sanityEvent.description, locale);
  const location = getLocalizedValue(sanityEvent.location, locale);

  // Parse dates
  const startDate = new Date(sanityEvent.eventDate.startDate);
  const endDate = new Date(sanityEvent.eventDate.endDate);

  // Determine if all-day event (if time is exactly 00:00:00)
  const isAllDay =
    startDate.getHours() === 0 &&
    startDate.getMinutes() === 0 &&
    startDate.getSeconds() === 0 &&
    endDate.getHours() === 0 &&
    endDate.getMinutes() === 0 &&
    endDate.getSeconds() === 0;

  return {
    id: sanityEvent._id,
    title: title || "Untitled Event",
    description,
    start: startDate,
    end: endDate,
    allDay: isAllDay,
    location,
    categories,
    educationLevels: sanityEvent.educationLevels?.map((level) => level.name) || [],
    scale: sanityEvent.scale?.name,
    organizer: sanityEvent.organizer,
    registrationDeadline: sanityEvent.registrationDeadline
      ? new Date(sanityEvent.registrationDeadline)
      : undefined,
    registrationLink: sanityEvent.registrationLink,
    socialMediaLink: sanityEvent.socialMediaLink,
  };
}
