import { unstable_cache } from 'next/cache';
import { FEATURED_TUTORS_QUERY, TUTORS_QUERY } from '@/queries/tutors';
import { client } from '@/sanity/client';
import type { Tutor } from '@/types/tutor';

const options = { next: { revalidate: 30 } };

export async function getTutors(): Promise<Tutor[]> {
  const tutors = await client.fetch(TUTORS_QUERY, {}, options);
  return tutors || [];
}

export const getFeaturedTutors = unstable_cache(
  async (): Promise<Tutor[]> => {
    const tutors = await client.fetch(FEATURED_TUTORS_QUERY);
    return tutors || [];
  },
  ['featured-tutors'],
  { revalidate: 3600, tags: ['featured-tutors'] },
);
