import { z } from 'zod';

const sessionSchema = z.object({
  id: z.string(),
  sequenceNumber: z.number(),
  startAt: z.iso.datetime({ offset: true }),
  endAt: z.iso.datetime({ offset: true }),
  titleEn: z.string(),
  curriculumEn: z.string().nullable(),
  mode: z.enum(['online', 'in_person']),
  state: z.enum(['scheduled', 'completed', 'cancelled']),
  tutor: z.object({ name: z.string() }).nullable(),
});

const classSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(['cohort', 'masterclass']),
  state: z.enum(['published', 'postponed']),
  titleEn: z.string(),
  descriptionEn: z.string(),
  cohortFullRateMarks: z.number().nonnegative().nullable(),
  masterclassRateMarks: z.number().nonnegative().nullable(),
  competition: z.object({ name: z.string() }),
  sessions: z.array(sessionSchema),
});

export type ActivityClass = z.infer<typeof classSchema>;

export async function getActivityClasses(apiUrl: string): Promise<ActivityClass[]> {
  if (!apiUrl) throw new Error('COGITO_APP_API_URL is not configured');
  const response = await fetch(`${apiUrl.replace(/\/+$/, '')}/rpc/classes/list`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ json: {} }),
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Class request failed with ${response.status}`);
  const { json } = z.object({ json: z.array(classSchema) }).parse(await response.json());
  return json
    .filter((item) => item.sessions.length > 0)
    .map((item) => ({
      ...item,
      sessions: item.sessions.toSorted((a, b) => a.sequenceNumber - b.sequenceNumber),
    }));
}
