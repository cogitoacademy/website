import { z } from 'zod';
import type { Tutor } from '@/types/tutor';

const nullableText = z.string().nullable();

const tutorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  profileImageUrl: nullableText,
  shortBio: nullableText,
  affiliation: nullableText,
  education: z.array(z.object({ university: z.string(), degree: z.string() })),
  achievements: z.array(
    z.object({
      competitionName: z.string(),
      year: z.number().int(),
      awards: z.array(z.string()),
    }),
  ),
  experiences: z.array(
    z.object({
      role: z.string(),
      organization: z.string(),
      startYear: z.number().int(),
      endYear: z.number().int().nullable(),
      description: z.string(),
    }),
  ),
  subjects: z.array(
    z.object({
      id: z.string().min(1),
      slug: z.string(),
      name: z.string(),
      nameId: nullableText,
      parent: z.object({
        id: z.string().min(1),
        slug: z.string(),
        name: z.string(),
        nameId: nullableText,
        lightTextColor: nullableText,
        lightBackgroundColor: nullableText,
        darkTextColor: nullableText,
        darkBackgroundColor: nullableText,
      }),
    }),
  ),
  modality: z.enum(['online', 'offline', 'both']).nullable(),
});

export function publicTutorsEndpoint(apiUrl: string) {
  return apiUrl.replace(/\/+$/, '') + '/rpc/publicContent/tutors/list';
}

export function publicTutorsRequestOptions(): RequestInit {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ json: {} }),
    cache: 'no-store',
  };
}

export async function parsePublicTutorsResponse(response: Response): Promise<Tutor[]> {
  if (!response.ok) {
    throw new Error('Tutor request failed with ' + response.status);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error('Tutor API returned invalid JSON', { cause: error });
  }

  const parsed = z
    .object({ json: z.array(tutorSchema), meta: z.array(z.unknown()).optional() })
    .safeParse(payload);

  if (!parsed.success) {
    throw new Error('Tutor API returned an invalid oRPC response envelope');
  }

  return parsed.data.json as Tutor[];
}

export type PublicTutorsLoadResult =
  | { status: 'success'; items: Tutor[] }
  | { status: 'failure'; error: unknown };

function isNextDynamicServerUsage(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    error.digest === 'DYNAMIC_SERVER_USAGE'
  );
}

export async function tryLoadPublicTutors(
  read: () => Promise<Tutor[]>,
): Promise<PublicTutorsLoadResult> {
  try {
    return { status: 'success', items: await read() };
  } catch (error) {
    if (isNextDynamicServerUsage(error)) throw error;
    return { status: 'failure', error };
  }
}
