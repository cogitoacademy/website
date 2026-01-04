import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import TutorList from "@/components/tutor-list";
import {
	LOCATIONS_QUERY,
	COMPETITION_CATEGORIES_QUERY,
} from "@/queries/tutors";
import { getTutors } from "@/lib/tutors";
import { client } from "@/sanity/client";
import type { CompetitionCategory, Location } from "@/types/tutor";
import { Skeleton } from "@/components/ui/skeleton";

async function TutorContent() {
	console.log("🔍 Fetching data from Sanity...");
	console.log("📊 Sanity Client:", {
		projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
		dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	});

	const [t, tutors, locations, categories] = await Promise.all([
		getTranslations("tutors"),
		getTutors(),
		client.fetch<Location[]>(LOCATIONS_QUERY),
		client.fetch<CompetitionCategory[]>(COMPETITION_CATEGORIES_QUERY),
	]);

	console.log("✅ Fetched data:", {
		tutorsCount: tutors.length,
		locationsCount: locations.length,
		categoriesCount: categories.length,
		tutors: tutors,
		locations,
		categories,
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
				<p className="text-muted-foreground">{t("description")}</p>
			</div>

			<TutorList
				tutors={tutors}
				locations={locations}
				categories={categories}
			/>
		</div>
	);
}

export default function TutorsPage() {
	return (
		<Suspense
			fallback={
				<div className="container mx-auto px-4 py-8">
					<div className="mb-8 space-y-2">
						<Skeleton className="h-12 w-64" />
						<Skeleton className="h-6 w-96" />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(6)].map((_, i) => (
							<div key={i} className="p-6 space-y-4">
								<div className="flex items-start gap-4">
									<Skeleton className="w-24 h-24 rounded-full shrink-0" />
									<div className="flex-1 space-y-2">
										<Skeleton className="h-6 w-32" />
										<Skeleton className="h-4 w-full" />
									</div>
								</div>
								<Skeleton className="h-4 w-40" />
								<Skeleton className="h-4 w-24" />
							</div>
						))}
					</div>
				</div>
			}
		>
			<TutorContent />
		</Suspense>
	);
}
