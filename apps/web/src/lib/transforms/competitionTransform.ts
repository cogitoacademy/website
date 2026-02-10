import type { CalendarCompetition } from "@/components/competition-calendar/types";
import { CORE_CATEGORIES, type CoreCategorySlug } from "@/lib/config/coreCategories";
import type { SanityCompetition } from "@/types/sanity/competition";

/**
 * Extract localized value from Sanity internationalized array
 */
function getLocalizedValue(
  arr?: Array<{ _key: string; value: string }>,
  locale = "id",
): string | undefined {
  if (!arr || arr.length === 0) return undefined;

  // Try to find the requested locale
  const localized = arr.find((item) => item._key === locale);
  if (localized) return localized.value;

  // Fallback to first available value
  return arr[0]?.value;
}

/**
 * Transform Sanity Competition to Calendar Competition
 */
export function sanityToCalendarCompetition(
  sanityCompetition: SanityCompetition,
  locale = "id",
): CalendarCompetition | null {
  // Validate that competition has at least one category with core category
  const firstCategory = sanityCompetition.categories?.[0];
  if (!firstCategory?.coreCategory) {
    console.warn(`Competition ${sanityCompetition._id} is missing core category, skipping`);
    return null;
  }

  // Transform categories with core category colors
  const categories =
    sanityCompetition.categories?.map((cat) => {
      const coreSlug = cat.coreCategory as CoreCategorySlug;
      const coreData = CORE_CATEGORIES[coreSlug];

      // Get color from core category config
      const color = coreData?.brandColor || "primary-500";

      return {
        name: cat.name,
        coreCategory: cat.coreCategory,
        color: color,
      };
    }) || [];

  const eventColor = categories.length > 0 ? categories[0].color : "primary-500";

  // Extract localized strings
  const title = getLocalizedValue(sanityCompetition.title, locale);
  const description = getLocalizedValue(sanityCompetition.description, locale);
  const location = getLocalizedValue(sanityCompetition.location, locale);

  // Parse dates
  const startDate = new Date(sanityCompetition.eventDate.startDate);
  const endDate = new Date(sanityCompetition.eventDate.endDate);

  // Determine if all-day event (if time is exactly 00:00:00)
  const isAllDay =
    startDate.getHours() === 0 &&
    startDate.getMinutes() === 0 &&
    startDate.getSeconds() === 0 &&
    endDate.getHours() === 0 &&
    endDate.getMinutes() === 0 &&
    endDate.getSeconds() === 0;

  return {
    id: sanityCompetition._id,
    title: title || "Untitled Competition",
    description,
    start: startDate,
    end: endDate,
    allDay: isAllDay,
    location,
    categories: categories.map((cat) => ({
      name: cat.name || "",
      coreCategory: cat.coreCategory || "",
      color: cat.color,
    })),
    color: eventColor as any, // Use first category's color as main event color
    educationLevels: sanityCompetition.educationLevels || [],
    scale: sanityCompetition.scale,
    organizer: sanityCompetition.organizer,
    registrationDeadline: sanityCompetition.registrationDeadline
      ? new Date(sanityCompetition.registrationDeadline)
      : undefined,
    registrationLink: sanityCompetition.registrationLink,
    socialMediaLink: sanityCompetition.socialMediaLink,
  };
}
