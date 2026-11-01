'use client';

import { IdentificationBadgeIcon } from '@phosphor-icons/react/dist/ssr';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import TutorFilters from '@/components/tutor-filters';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { filterTutors, getLocalizedCategoryName, getTutorCategories } from '@/lib/tutor-directory';
import type { Tutor } from '@/types/tutor';
import { TutorsGrid } from './landing/tutors-grid';

interface TutorListProps {
  tutors: Tutor[];
  loadFailed?: boolean;
}

export default function TutorList({ tutors, loadFailed = false }: TutorListProps) {
  const locale = useLocale();
  const t = useTranslations('tutors');
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(
    () =>
      getTutorCategories(tutors).sort((left, right) =>
        getLocalizedCategoryName(left, locale).localeCompare(
          getLocalizedCategoryName(right, locale),
        ),
      ),
    [tutors, locale],
  );
  const filteredTutors = useMemo(
    () =>
      filterTutors(tutors, {
        modalities: selectedModalities,
        categoryIds: selectedCategories,
        searchQuery,
      }),
    [tutors, selectedModalities, selectedCategories, searchQuery],
  );

  const handleModalityToggle = (value: string) => {
    setSelectedModalities((prev) =>
      prev.includes(value) ? prev.filter((modality) => modality !== value) : [...prev, value],
    );
  };

  const handleCategoryToggle = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((categoryId) => categoryId !== id) : [...prev, id],
    );
  };

  const handleClearAll = () => {
    setSelectedModalities([]);
    setSelectedCategories([]);
    setSearchQuery('');
  };

  return (
    <div>
      {tutors.length > 0 && (
        <TutorFilters
          categories={categories}
          selectedModalities={selectedModalities}
          selectedCategories={selectedCategories}
          searchQuery={searchQuery}
          onModalityChange={handleModalityToggle}
          onCategoryChange={handleCategoryToggle}
          onSearchChange={setSearchQuery}
          onClearAll={handleClearAll}
        />
      )}

      {filteredTutors.length === 0 ? (
        <Empty className="h-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IdentificationBadgeIcon />
            </EmptyMedia>
            <EmptyTitle>{loadFailed ? t('unavailableTitle') : t('noTutorsTitle')}</EmptyTitle>
            <EmptyDescription className="text-pretty">
              {loadFailed
                ? t('unavailableDescription')
                : tutors.length === 0
                  ? t('emptyDirectory')
                  : t('noTutors')}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <TutorsGrid tutors={filteredTutors} showAll />
      )}
    </div>
  );
}
