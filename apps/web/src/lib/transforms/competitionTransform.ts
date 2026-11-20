import type {
  CalendarCompetition,
  CompetitionColor,
  CompetitionPalette,
} from '@/components/competition-calendar/types';
import type { CalendarLocale, PublicCompetition } from '@/lib/calendar-api';
import { CORE_CATEGORIES, resolveCoreCategorySlug } from '@/lib/config/coreCategories';

function firstText(...values: Array<string | null | undefined>) {
  return values.find((value): value is string => Boolean(value?.trim()));
}

function getPalette(
  palette: NonNullable<PublicCompetition['categories']>[number]['parentColors'],
): CompetitionPalette | undefined {
  if (!palette) return undefined;

  const { lightTextColor, lightBackgroundColor, darkTextColor, darkBackgroundColor } = palette;
  if (!lightTextColor || !lightBackgroundColor || !darkTextColor || !darkBackgroundColor) {
    return undefined;
  }

  return { lightTextColor, lightBackgroundColor, darkTextColor, darkBackgroundColor };
}

/**
 * Resolve a localized field from either the app's localized projection
 * (`title`) or its explicit bilingual pair (`titleEn` / `titleId`).
 * Indonesian falls back to English so a missing translation never blanks the
 * event, which keeps both locale routes compatible during the app rollout.
 */
function getLocalizedValue(
  competition: PublicCompetition,
  field: 'title' | 'description' | 'location',
  locale: CalendarLocale,
): string | undefined {
  const localized = competition[field];
  const english = competition[`${field}En`];
  const indonesian = competition[`${field}Id`];

  return locale === 'id'
    ? firstText(indonesian, localized, english)
    : firstText(english, localized, indonesian);
}

function getCategoryName(
  category: NonNullable<PublicCompetition['categories']>[number],
  locale: CalendarLocale,
) {
  return locale === 'id' ? firstText(category.nameId, category.name) || '' : category.name;
}

function isAllDayEvent(startDate: Date, endDate: Date) {
  return (
    startDate.getHours() === 0 &&
    startDate.getMinutes() === 0 &&
    startDate.getSeconds() === 0 &&
    endDate.getHours() === 0 &&
    endDate.getMinutes() === 0 &&
    endDate.getSeconds() === 0
  );
}

/**
 * Transform an app-served competition into the calendar view model.
 */
export function competitionToCalendarCompetition(
  competition: PublicCompetition,
  locale: CalendarLocale = 'id',
): CalendarCompetition {
  const startDate = new Date(competition.startDate);
  const endDate = new Date(competition.endDate);

  const categories = (competition.categories ?? []).map((category) => {
    const appSlug = category.coreCategory ?? category.slug ?? '';
    const coreSlug = resolveCoreCategorySlug(appSlug);
    return {
      name: getCategoryName(category, locale),
      coreCategory: coreSlug ?? appSlug,
      color: coreSlug ? CORE_CATEGORIES[coreSlug].brandColor : 'primary-500',
      // Keep the established soft calendar treatment for the seven defaults;
      // custom app categories carry their own authored palette.
      palette: coreSlug ? undefined : getPalette(category.parentColors),
    };
  });

  const title = getLocalizedValue(competition, 'title', locale) || 'Untitled Competition';

  return {
    id: competition.id,
    title,
    description: getLocalizedValue(competition, 'description', locale),
    start: startDate,
    end: endDate,
    allDay: isAllDayEvent(startDate, endDate),
    location: getLocalizedValue(competition, 'location', locale),
    categories,
    color: (categories[0]?.color || 'primary-500') as CompetitionColor,
    palette: categories[0]?.palette,
    educationLevels: competition.educationLevels || [],
    scale: competition.scale || undefined,
    organizer: competition.organizer || undefined,
    registrationDeadline: competition.registrationDeadline
      ? new Date(competition.registrationDeadline)
      : undefined,
    registrationLink: competition.registrationLink || undefined,
    socialMediaLink: competition.socialMediaLink || undefined,
  };
}
