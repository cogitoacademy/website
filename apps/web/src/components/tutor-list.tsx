"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import TutorFilters from "@/components/tutor-filters";
import TutorCard from "@/components/tutor-card";
import type { Tutor, CompetitionCategory, Location } from "@/types/tutor";

interface TutorListProps {
	tutors: Tutor[];
	locations: Location[];
	categories: CompetitionCategory[];
}

export default function TutorList({
	tutors,
	locations,
	categories,
}: TutorListProps) {
	const t = useTranslations("tutors");
	const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const filteredTutors = useMemo(() => {
		return tutors.filter((tutor) => {
			const locationMatch =
				selectedLocations.length === 0 ||
				(tutor.location && selectedLocations.includes(tutor.location._id));

			const categoryMatch =
				selectedCategories.length === 0 ||
				(tutor.competitionFields &&
					tutor.competitionFields.some((cat) =>
						selectedCategories.includes(cat._id),
					));

			return locationMatch && categoryMatch;
		});
	}, [tutors, selectedLocations, selectedCategories]);

	const handleLocationToggle = (id: string) => {
		setSelectedLocations((prev) =>
			prev.includes(id) ? prev.filter((loc) => loc !== id) : [...prev, id],
		);
	};

	const handleCategoryToggle = (id: string) => {
		setSelectedCategories((prev) =>
			prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id],
		);
	};

	const handleClearAll = () => {
		setSelectedLocations([]);
		setSelectedCategories([]);
	};

	return (
		<>
			<TutorFilters
				locations={locations}
				categories={categories}
				selectedLocations={selectedLocations}
				selectedCategories={selectedCategories}
				onLocationChange={handleLocationToggle}
				onCategoryChange={handleCategoryToggle}
				onClearAll={handleClearAll}
			/>

			{filteredTutors.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-muted-foreground">
						{tutors.length === 0 ? t("loading") : t("noTutors")}
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredTutors.map((tutor) => (
						<TutorCard key={tutor._id} tutor={tutor} />
					))}
				</div>
			)}
		</>
	);
}
