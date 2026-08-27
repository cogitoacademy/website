import type { AchievementLocale, ApprovedAchievement } from '@/types/achievement';

export const CATEGORY_LABELS: Record<AchievementLocale, Record<string, string>> = {
  id: {
    competition: 'Kompetisi',
    award: 'Penghargaan',
    certificate: 'Sertifikat',
    leadership: 'Kepemimpinan',
    publication: 'Publikasi',
    other: 'Lainnya',
  },
  en: {
    competition: 'Competition',
    award: 'Award',
    certificate: 'Certificate',
    leadership: 'Leadership',
    publication: 'Publication',
    other: 'Other',
  },
};

export const CATEGORY_STYLES = {
  competition: {
    wash: 'bg-primary-100',
    marker: 'bg-primary-500',
    ink: 'text-primary-700',
    ring: 'border-primary-300',
  },
  award: {
    wash: 'bg-tertiary-yellow-100',
    marker: 'bg-tertiary-yellow-600',
    ink: 'text-tertiary-yellow-1000',
    ring: 'border-tertiary-yellow-400',
  },
  certificate: {
    wash: 'bg-tertiary-blue-100',
    marker: 'bg-tertiary-blue-500',
    ink: 'text-tertiary-blue-1000',
    ring: 'border-tertiary-blue-300',
  },
  leadership: {
    wash: 'bg-secondary-100',
    marker: 'bg-secondary-500',
    ink: 'text-secondary-1000',
    ring: 'border-secondary-300',
  },
  publication: {
    wash: 'bg-tertiary-green-100',
    marker: 'bg-tertiary-green-700',
    ink: 'text-tertiary-green-1000',
    ring: 'border-tertiary-green-300',
  },
  other: {
    wash: 'bg-tertiary-pink-100',
    marker: 'bg-tertiary-pink-600',
    ink: 'text-tertiary-pink-1000',
    ring: 'border-tertiary-pink-300',
  },
} as const;

export type CategoryStyle = (typeof CATEGORY_STYLES)[keyof typeof CATEGORY_STYLES];

const LEVEL_LABELS: Record<AchievementLocale, Record<string, string>> = {
  id: {
    international: 'Internasional',
    national: 'Nasional',
    regional: 'Regional',
    provincial: 'Provinsi',
    district: 'Kota / Kabupaten',
    school: 'Sekolah',
  },
  en: {
    international: 'International',
    national: 'National',
    regional: 'Regional',
    provincial: 'Provincial',
    district: 'District',
    school: 'School',
  },
};

export function getCategoryLabel(category: string, locale: AchievementLocale) {
  return CATEGORY_LABELS[locale][category] || titleCase(category);
}

export function getCategoryStyle(category: string): CategoryStyle {
  return CATEGORY_STYLES[category as keyof typeof CATEGORY_STYLES] || CATEGORY_STYLES.other;
}

export function getLevelLabel(level: string, locale: AchievementLocale) {
  const normalized = level.trim().toLowerCase();
  return LEVEL_LABELS[locale][normalized] || titleCase(level);
}

export function getAchievementYear(achievement: ApprovedAchievement) {
  const date = achievement.awardingDate || achievement.createdAt;
  if (!date) return '----';

  const year = date.slice(0, 4);
  return /^\d{4}$/.test(year) ? year : '----';
}

export function formatAchievementDate(value: string | null | undefined, locale: AchievementLocale) {
  if (!value) return null;

  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function titleCase(value: string) {
  return value
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function isSafeHttpUrl(value: string | null | undefined) {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}
