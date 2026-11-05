import 'server-only';

import { getCategoryLabel, getLevelLabel } from '@/components/achievements/achievement-utils';
import { getBlogArticles } from '@/lib/blog-api';
import { sanityToCalendarCompetition } from '@/lib/transforms/competitionTransform';
import { COMPETITIONS_QUERY } from '@/queries/competitions';
import { STUDENT_RESOURCES_QUERY } from '@/queries/studentResources';
import { client } from '@/sanity/client';
import type { AchievementLocale } from '@/types/achievement';
import type {
  RecordsStoryAchievement,
  RecordsStoryArticle,
  RecordsStoryCompetition,
  RecordsStoryData,
  RecordsStoryLocale,
  RecordsStoryResource,
  RecordsStoryTutor,
} from '@/types/records-story';
import type { SanityCompetition } from '@/types/sanity/competition';
import type { Tutor } from '@/types/tutor';
import { getApprovedAchievements } from './achievements';
import { getTutors } from './tutors';

interface SanityStudentResource {
  _id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  fileUrl?: string | null;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function tutorSubject(tutor: Tutor, locale: RecordsStoryLocale) {
  const subject = tutor.subjects[0];
  if (!subject) return null;
  return locale === 'id' ? subject.nameId || subject.name : subject.name;
}

function tutorAchievement(tutor: Tutor) {
  const achievement = tutor.achievements[0];
  if (!achievement) return null;
  return [achievement.awards[0], achievement.competitionName].filter(Boolean).join(' · ');
}

function toStoryTutor(tutor: Tutor, locale: RecordsStoryLocale): RecordsStoryTutor {
  return {
    name: tutor.name,
    initials: getInitials(tutor.name),
    subject: tutorSubject(tutor, locale),
    achievement: tutorAchievement(tutor),
    affiliation: tutor.affiliation,
  };
}

function toStoryAchievement(
  achievement: {
    eventName: string;
    award: string;
    level: string;
    category: string;
    displayName?: string | null;
    awardingDate?: string | null;
    createdAt?: string | null;
  },
  locale: RecordsStoryLocale,
): RecordsStoryAchievement {
  const achievementLocale: AchievementLocale = locale;
  const date = achievement.awardingDate || achievement.createdAt;

  return {
    eventName: achievement.eventName,
    award: achievement.award,
    level: getLevelLabel(achievement.level, achievementLocale),
    student: achievement.displayName || 'Cogito student',
    year: date?.slice(0, 4) || '----',
    category: getCategoryLabel(achievement.category, achievementLocale),
  };
}

function toStoryResource(resource: SanityStudentResource): RecordsStoryResource {
  return {
    title: resource.title,
    description: resource.description || null,
    category: resource.category || 'other',
  };
}

function toStoryArticle(article: {
  id: string;
  title: string;
  excerpt: string;
  category: { title: string };
  readingMinutes: number;
  publishedAt: string;
}): RecordsStoryArticle {
  return {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category.title,
    readingMinutes: article.readingMinutes,
    publishedAt: article.publishedAt,
  };
}

function toStoryCompetition(competition: {
  title: string;
  start: Date;
  scale?: string;
  organizer?: string;
}): RecordsStoryCompetition {
  return {
    title: competition.title,
    start: competition.start.toISOString(),
    scale: competition.scale || null,
    organizer: competition.organizer || null,
  };
}

export async function getRecordsStoryData(locale: RecordsStoryLocale): Promise<RecordsStoryData> {
  const [tutorsResult, achievementsResult, resourcesResult, articlesResult, competitionsResult] =
    await Promise.allSettled([
      getTutors(),
      getApprovedAchievements(),
      client.fetch<SanityStudentResource[]>(
        STUDENT_RESOURCES_QUERY,
        {},
        { next: { revalidate: 1800 } },
      ),
      getBlogArticles(locale, 3, 1),
      client.fetch<SanityCompetition[]>(COMPETITIONS_QUERY, {}, { next: { revalidate: 1800 } }),
    ]);

  const tutors = tutorsResult.status === 'fulfilled' ? tutorsResult.value : [];
  const achievements = achievementsResult.status === 'fulfilled' ? achievementsResult.value : [];
  const resources = resourcesResult.status === 'fulfilled' ? resourcesResult.value : [];
  const articles = articlesResult.status === 'fulfilled' ? articlesResult.value.rows : [];
  const competitionDocuments =
    competitionsResult.status === 'fulfilled' ? competitionsResult.value : [];

  const competitions = competitionDocuments
    .map((competition) => sanityToCalendarCompetition(competition, locale))
    .filter((competition) => competition !== null);
  const upcomingCompetitions = competitions
    .filter((competition) => competition.start.getTime() >= Date.now())
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  return {
    tutors: {
      total: tutors.length,
      items: tutors.slice(0, 1).map((tutor) => toStoryTutor(tutor, locale)),
    },
    achievements: {
      total: achievements.length,
      items: achievements.slice(0, 1).map((achievement) => toStoryAchievement(achievement, locale)),
    },
    resources: {
      total: resources.length,
      items: resources.slice(0, 3).map(toStoryResource),
    },
    articles: {
      total: articles.length,
      items: articles.slice(0, 3).map(toStoryArticle),
    },
    competitions: {
      total: competitions.length,
      items: upcomingCompetitions.slice(0, 3).map(toStoryCompetition),
    },
  };
}
