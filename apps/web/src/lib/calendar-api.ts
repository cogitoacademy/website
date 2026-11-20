import { z } from 'zod';

export const calendarLocales = ['id', 'en'] as const;
export type CalendarLocale = (typeof calendarLocales)[number];

export function isCalendarLocale(value: string): value is CalendarLocale {
  return value === 'id' || value === 'en';
}

const paletteSchema = z.object({
  lightTextColor: z.string().nullable().optional(),
  lightBackgroundColor: z.string().nullable().optional(),
  darkTextColor: z.string().nullable().optional(),
  darkBackgroundColor: z.string().nullable().optional(),
});

const categorySchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  coreCategory: z.string().nullable().optional(),
  name: z.string(),
  nameId: z.string().nullable().optional(),
  parentColors: paletteSchema.nullable().optional(),
});

const nullableText = z.string().nullable().optional();

/**
 * Public competition DTO served by the Cogito app.
 *
 * The app may localize `title`/`description`/`location` for the requested
 * locale (the Activities and blog pattern) and may also expose the explicit
 * `*En`/`*Id` pair. Keeping both shapes accepted lets the website stay
 * bilingual while the app endpoint rolls out.
 */
export const publicCompetitionSchema = z
  .object({
    id: z.string().min(1),
    title: nullableText,
    titleEn: nullableText,
    titleId: nullableText,
    description: nullableText,
    descriptionEn: nullableText,
    descriptionId: nullableText,
    location: nullableText,
    locationEn: nullableText,
    locationId: nullableText,
    startDate: z.iso.datetime({ offset: true }),
    endDate: z.iso.datetime({ offset: true }),
    categories: z.array(categorySchema).optional(),
    educationLevels: z.array(z.string()).optional(),
    scale: z.string().nullable().optional(),
    organizer: z.string().nullable().optional(),
    registrationDeadline: z.iso.datetime({ offset: true }).nullable().optional(),
    registrationLink: z.string().nullable().optional(),
    socialMediaLink: z.string().nullable().optional(),
  })
  .refine(
    (value) => Boolean(value.title?.trim() || value.titleEn?.trim() || value.titleId?.trim()),
    {
      message: 'Competition title is required',
      path: ['title'],
    },
  );

export type PublicCompetition = z.infer<typeof publicCompetitionSchema>;

export function publicCalendarEndpoint(apiUrl: string) {
  return apiUrl.replace(/\/+$/, '') + '/rpc/publicContent/calendar/list';
}

export function publicCalendarRequestOptions(locale: CalendarLocale): RequestInit {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ json: { locale } }),
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  };
}

export async function parsePublicCalendarResponse(
  response: Response,
): Promise<PublicCompetition[]> {
  if (!response.ok) {
    throw new Error(`Competition calendar request failed with ${response.status}`);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error('Competition calendar API returned invalid JSON', { cause: error });
  }

  const parsed = z
    .object({ json: z.array(publicCompetitionSchema), meta: z.array(z.unknown()).optional() })
    .safeParse(payload);

  if (!parsed.success) {
    throw new Error('Competition calendar API returned an invalid oRPC response envelope');
  }

  return parsed.data.json;
}

export async function getPublicCompetitions(
  apiUrl: string,
  locale: CalendarLocale,
): Promise<PublicCompetition[]> {
  if (!apiUrl) throw new Error('COGITO_APP_API_URL is not configured');

  const response = await fetch(
    publicCalendarEndpoint(apiUrl),
    publicCalendarRequestOptions(locale),
  );
  return parsePublicCalendarResponse(response);
}
