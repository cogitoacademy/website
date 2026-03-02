import { client } from '@/sanity/client';
import { COMPETITION_CATEGORIES_QUERY } from '@/queries/tutors';
import type { CompetitionCategory } from '@/types/tutor';
import { LOCATIONS } from '@/lib/config/locations';

export function getLocations() {
  return LOCATIONS;
}

export async function getCompetitionCategories(): Promise<CompetitionCategory[]> {
  const categories = await client.fetch(COMPETITION_CATEGORIES_QUERY);
  return categories || [];
}
