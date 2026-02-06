"use client";

import * as m from "motion/react-m";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import TutorCard from "@/components/tutor-card";
import TutorFilters from "@/components/tutor-filters";
import { LOCATIONS } from "@/lib/config/locations";
import type { CompetitionCategory, Tutor } from "@/types/tutor";

interface TutorListProps {
  tutors: Tutor[];
  categories: CompetitionCategory[];
}

export default function TutorList({ tutors, categories }: TutorListProps) {
  const t = useTranslations("tutors");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const locationMatch =
        selectedLocations.length === 0 ||
        (tutor.locations &&
          tutor.locations.some((loc) => selectedLocations.includes(loc)));

      const categoryMatch =
        selectedCategories.length === 0 ||
        (tutor.competitionFields &&
          tutor.competitionFields.some((cat) =>
            selectedCategories.includes(cat._id),
          ));

      const searchMatch =
        searchQuery === "" ||
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase());

      return locationMatch && categoryMatch && searchMatch;
    });
  }, [tutors, selectedLocations, selectedCategories, searchQuery]);

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
    setSearchQuery("");
  };

  return (
    <div>
      <TutorFilters
        locations={LOCATIONS}
        categories={categories}
        selectedLocations={selectedLocations}
        selectedCategories={selectedCategories}
        searchQuery={searchQuery}
        onLocationChange={handleLocationToggle}
        onCategoryChange={handleCategoryToggle}
        onSearchChange={setSearchQuery}
        onClearAll={handleClearAll}
      />

      {filteredTutors.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            {tutors.length === 0 ? t("loading") : t("noTutors")}
          </p>
        </div>
      ) : (
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {filteredTutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </m.div>
      )}
    </div>
  );
}
