import { afterEach, describe, expect, mock, test } from 'bun:test';
import {
  getPublicCompetitions,
  parsePublicCalendarResponse,
  publicCalendarEndpoint,
  publicCalendarRequestOptions,
} from '../src/lib/calendar-api.ts';
import { competitionToCalendarCompetition } from '../src/lib/transforms/competitionTransform.ts';

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

const competition = {
  id: 'competition-1',
  title: 'English title',
  titleEn: 'English title',
  titleId: 'Judul Indonesia',
  description: 'English description',
  descriptionEn: 'English description',
  descriptionId: 'Deskripsi Indonesia',
  location: 'Jakarta, Indonesia',
  locationEn: 'Jakarta, Indonesia',
  locationId: 'Jakarta, Indonesia',
  startDate: '2026-12-05T01:00:00.000Z',
  endDate: '2026-12-06T12:00:00.000Z',
  categories: [
    {
      id: 'category-1',
      slug: 'mun',
      name: 'MUN',
      nameId: 'MUN',
    },
  ],
  educationLevels: ['sma'],
  scale: 'international',
  organizer: 'Cogito Academy',
  registrationDeadline: '2026-11-30T17:00:00.000Z',
  registrationLink: 'https://example.com/register',
  socialMediaLink: 'https://example.com/social',
};

describe('public competition calendar API', () => {
  test('builds the public calendar RPC endpoint and locale-aware no-store request', () => {
    expect(publicCalendarEndpoint('http://127.0.0.1:4300/')).toBe(
      'http://127.0.0.1:4300/rpc/publicContent/calendar/list',
    );

    const options = publicCalendarRequestOptions('id');
    expect(options.method).toBe('POST');
    expect(options.cache).toBe('no-store');
    expect(options.headers['Content-Type']).toBe('application/json');
    expect(JSON.parse(options.body)).toEqual({ json: { locale: 'id' } });
  });

  test('accepts a valid empty calendar and the public competition projection', async () => {
    await expect(
      parsePublicCalendarResponse(Response.json({ json: [], meta: [] })),
    ).resolves.toEqual([]);
    await expect(parsePublicCalendarResponse(Response.json({ json: [] }))).resolves.toEqual([]);
    await expect(
      parsePublicCalendarResponse(Response.json({ json: [competition], meta: [] })),
    ).resolves.toEqual([competition]);
  });

  test('requires a title in either localized or explicit bilingual form', async () => {
    await expect(
      parsePublicCalendarResponse(
        Response.json({
          json: [{ ...competition, title: undefined, titleEn: undefined, titleId: undefined }],
        }),
      ),
    ).rejects.toThrow('invalid oRPC response envelope');
    await expect(
      parsePublicCalendarResponse(
        Response.json({
          json: [{ ...competition, title: undefined, titleId: undefined }],
        }),
      ),
    ).resolves.toHaveLength(1);
  });

  test('rejects transport, JSON, envelope and shape failures', async () => {
    await expect(parsePublicCalendarResponse(new Response(null, { status: 503 }))).rejects.toThrow(
      'Competition calendar request failed with 503',
    );
    await expect(parsePublicCalendarResponse(new Response('{', { status: 200 }))).rejects.toThrow(
      'Competition calendar API returned invalid JSON',
    );
    await expect(parsePublicCalendarResponse(Response.json({ json: [] }))).resolves.toEqual([]);
    await expect(
      parsePublicCalendarResponse(Response.json({ json: [{ ...competition, startDate: 'soon' }] })),
    ).rejects.toThrow('invalid oRPC response envelope');
    await expect(getPublicCompetitions('', 'en')).rejects.toThrow(
      'COGITO_APP_API_URL is not configured',
    );
  });

  test('requests the current locale from the app and returns its competitions', async () => {
    globalThis.fetch = mock(async (url, options) => {
      expect(url).toBe('http://localhost:3001/rpc/publicContent/calendar/list');
      expect(options.method).toBe('POST');
      expect(options.cache).toBe('no-store');
      expect(JSON.parse(options.body)).toEqual({ json: { locale: 'en' } });
      return Response.json({ json: [competition] });
    });

    const result = await getPublicCompetitions('http://localhost:3001/', 'en');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('competition-1');
  });
});

describe('competition calendar transform', () => {
  test('uses Indonesian content and category labels for the id locale', () => {
    const event = competitionToCalendarCompetition(competition, 'id');

    expect(event.title).toBe('Judul Indonesia');
    expect(event.description).toBe('Deskripsi Indonesia');
    expect(event.location).toBe('Jakarta, Indonesia');
    expect(event.categories?.[0]).toEqual({
      name: 'MUN',
      coreCategory: 'mun',
      color: 'tertiary-blue-500',
    });
    expect(event.color).toBe('tertiary-blue-500');
    expect(event.start).toBeInstanceOf(Date);
    expect(event.registrationDeadline).toBeInstanceOf(Date);
  });

  test('uses English content for the en locale', () => {
    const event = competitionToCalendarCompetition(competition, 'en');

    expect(event.title).toBe('English title');
    expect(event.description).toBe('English description');
  });

  test('falls back to English when an Indonesian translation is missing', () => {
    const event = competitionToCalendarCompetition(
      {
        ...competition,
        titleId: null,
        descriptionId: '',
        locationId: null,
      },
      'id',
    );

    expect(event.title).toBe('English title');
    expect(event.description).toBe('English description');
    expect(event.location).toBe('Jakarta, Indonesia');
  });

  test('supports app-localized fields without explicit bilingual pairs', () => {
    const event = competitionToCalendarCompetition(
      {
        ...competition,
        title: 'Judul dari aplikasi',
        titleEn: undefined,
        titleId: undefined,
      },
      'id',
    );

    expect(event.title).toBe('Judul dari aplikasi');
  });

  test('keeps events without categories visible with the default color', () => {
    const event = competitionToCalendarCompetition({ ...competition, categories: [] }, 'en');

    expect(event.categories).toEqual([]);
    expect(event.color).toBe('primary-500');
  });
});

describe('app competition catalog compatibility', () => {
  test('maps canonical app category slugs to the existing calendar colors', () => {
    const event = competitionToCalendarCompetition(
      {
        ...competition,
        categories: [
          {
            id: 'category-2',
            slug: 'competition-model-united-nations',
            name: 'MUN',
            nameId: 'MUN',
          },
        ],
      },
      'en',
    );

    expect(event.color).toBe('tertiary-blue-500');
    expect(event.categories?.[0]?.coreCategory).toBe('mun');
  });

  test('carries the app category palette so custom categories keep their colors', () => {
    const palette = {
      lightTextColor: 'oklch(0.3 0.1 20)',
      lightBackgroundColor: 'oklch(0.95 0.03 20)',
      darkTextColor: 'oklch(0.95 0.02 20)',
      darkBackgroundColor: 'oklch(0.3 0.04 20)',
    };
    const event = competitionToCalendarCompetition(
      {
        ...competition,
        categories: [
          {
            id: 'category-3',
            slug: 'competition-robotics',
            name: 'Robotics',
            nameId: 'Robotika',
            parentColors: palette,
          },
        ],
      },
      'id',
    );

    expect(event.categories?.[0]).toEqual({
      name: 'Robotika',
      coreCategory: 'competition-robotics',
      color: 'primary-500',
      palette,
    });
    expect(event.palette).toEqual(palette);
  });
});
