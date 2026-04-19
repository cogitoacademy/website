'use client';

import { IdentificationBadgeIcon } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import TutorFilters from '@/components/tutor-filters';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { LOCATIONS } from '@/lib/config/locations';
import type { CompetitionCategory, Tutor } from '@/types/tutor';
import { TutorsGrid } from './landing/tutors-grid';

interface TutorListProps {
  tutors: Tutor[];
  categories: CompetitionCategory[];
}

export default function TutorList({ tutors, categories }: TutorListProps) {
  const t = useTranslations('tutors');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const locationMatch =
        selectedLocations.length === 0 ||
        (tutor.locations && tutor.locations.some((loc) => selectedLocations.includes(loc)));

      const categoryMatch =
        selectedCategories.length === 0 ||
        (tutor.competitionFields &&
          tutor.competitionFields.some((cat) => selectedCategories.includes(cat._id)));

      const searchMatch =
        searchQuery === '' || tutor.name.toLowerCase().includes(searchQuery.toLowerCase());

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
    setSearchQuery('');
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
        <Empty className="h-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IdentificationBadgeIcon />
            </EmptyMedia>
            <EmptyTitle>{t('noTutorsTitle')}</EmptyTitle>
            <EmptyDescription className="text-pretty">
              {tutors.length === 0 ? t('loading') : t('noTutors')}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <TutorsGrid tutors={filteredTutors} showAll />
      )}
    </div>
  );
}
