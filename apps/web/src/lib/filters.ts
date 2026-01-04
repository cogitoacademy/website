import { client } from "@/sanity/client";
import { LOCATIONS_QUERY, COMPETITION_CATEGORIES_QUERY } from "@/queries/tutors";
import type { CompetitionCategory, Location } from "@/types/tutor";

export async function getLocations(): Promise<Location[]> {
  const locations = await client.fetch(LOCATIONS_QUERY);
  return locations || [];
}

export async function getCompetitionCategories(): Promise<CompetitionCategory[]> {
  const categories = await client.fetch(COMPETITION_CATEGORIES_QUERY);
  return categories || [];
}
