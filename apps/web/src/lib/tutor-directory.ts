import type { Tutor, TutorCategory } from '@/types/tutor';

export function getTutorCategories(tutors: Tutor[]): TutorCategory[] {
  const categories = new Map<string, TutorCategory>();
  for (const tutor of tutors) {
    for (const subject of tutor.subjects) {
      categories.set(subject.parent.id, subject.parent);
    }
  }
  return [...categories.values()];
}

export function getLocalizedCategoryName(category: TutorCategory, locale: string) {
  return locale === 'id' ? category.nameId || category.name : category.name;
}

export function filterTutors(
  tutors: Tutor[],
  filters: { modalities: string[]; categoryIds: string[]; searchQuery: string },
): Tutor[] {
  const query = filters.searchQuery.trim().toLowerCase();

  return tutors.filter((tutor) => {
    const modalityMatch =
      filters.modalities.length === 0 ||
      filters.modalities.some(
        (modality) => tutor.modality === modality || tutor.modality === 'both',
      );
    const categoryMatch =
      filters.categoryIds.length === 0 ||
      tutor.subjects.some((subject) => filters.categoryIds.includes(subject.parent.id));
    const searchMatch = query === '' || tutor.name.toLowerCase().includes(query);

    return modalityMatch && categoryMatch && searchMatch;
  });
}
