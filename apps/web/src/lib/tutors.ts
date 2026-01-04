import { client } from "@/sanity/client";
import { TUTORS_QUERY } from "@/queries/tutors";
import type { Tutor } from "@/types/tutor";

const options = { next: { revalidate: 30 } };

export async function getTutors(): Promise<Tutor[]> {
	const tutors = await client.fetch(TUTORS_QUERY, {}, options);
	return tutors || [];
}
