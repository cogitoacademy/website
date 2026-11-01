import { describe, expect, test } from 'bun:test';
import {
  filterTutors,
  getLocalizedCategoryName,
  getTutorCategories,
} from '../src/lib/tutor-directory.ts';

function tutor(id, modality, parentId, subjectId, name = id) {
  const parent = {
    id: parentId,
    slug: parentId,
    name: 'Mathematics',
    nameId: 'Matematika',
    lightTextColor: null,
    lightBackgroundColor: null,
    darkTextColor: null,
    darkBackgroundColor: null,
  };

  return {
    id,
    name,
    profileImageUrl: null,
    shortBio: null,
    affiliation: null,
    education: [],
    achievements: [],
    experiences: [],
    subjects: [
      {
        id: subjectId,
        slug: subjectId,
        name: 'Algebra',
        nameId: 'Aljabar',
        parent,
      },
    ],
    modality,
  };
}

describe('tutor directory filters', () => {
  const tutors = [
    tutor('online', 'online', 'math', 'algebra', 'Ada'),
    tutor('offline', 'offline', 'science', 'biology', 'Bima'),
    tutor('both', 'both', 'math', 'geometry', 'Citra'),
    tutor('unknown', null, 'science', 'chemistry', 'Dewi'),
  ];

  test('collects each active parent category once and supports the optional Indonesian label', () => {
    const categories = getTutorCategories(tutors);
    expect(categories.map((category) => category.id)).toEqual(['math', 'science']);
    expect(getLocalizedCategoryName(categories[0], 'id')).toBe('Matematika');
    expect(getLocalizedCategoryName({ ...categories[0], nameId: null }, 'id')).toBe('Mathematics');
  });

  test('includes both-format tutors in either modality filter and excludes unknown modality', () => {
    expect(
      filterTutors(tutors, { modalities: ['online'], categoryIds: [], searchQuery: '' }).map(
        (item) => item.id,
      ),
    ).toEqual(['online', 'both']);
    expect(
      filterTutors(tutors, { modalities: ['offline'], categoryIds: [], searchQuery: '' }).map(
        (item) => item.id,
      ),
    ).toEqual(['offline', 'both']);
  });

  test('combines parent-category filters with name search', () => {
    expect(
      filterTutors(tutors, { modalities: [], categoryIds: ['math'], searchQuery: 'citr' }).map(
        (item) => item.id,
      ),
    ).toEqual(['both']);
    expect(
      filterTutors(tutors, { modalities: [], categoryIds: ['science'], searchQuery: '' }).map(
        (item) => item.id,
      ),
    ).toEqual(['offline', 'unknown']);
  });
});
