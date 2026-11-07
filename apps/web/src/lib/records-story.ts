import 'server-only';

import { sanityToCalendarCompetition } from '@/lib/transforms/competitionTransform';
import { COMPETITIONS_QUERY } from '@/queries/competitions';
import { STUDENT_RESOURCES_QUERY } from '@/queries/studentResources';
import { client } from '@/sanity/client';
import type {
  RecordsStoryCompetition,
  RecordsStoryData,
  RecordsStoryLocale,
  RecordsStoryResource,
  RecordsStoryTutor,
} from '@/types/records-story';
import type { SanityCompetition } from '@/types/sanity/competition';
import type { Tutor } from '@/types/tutor';
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

function toStoryResource(resource: SanityStudentResource): RecordsStoryResource {
  return {
    title: resource.title,
    description: resource.description || null,
    category: resource.category || 'other',
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
  const [tutorsResult, resourcesResult, competitionsResult] = await Promise.allSettled([
    getTutors(),
    client.fetch<SanityStudentResource[]>(
      STUDENT_RESOURCES_QUERY,
      {},
      { next: { revalidate: 1800 } },
    ),
    client.fetch<SanityCompetition[]>(COMPETITIONS_QUERY, {}, { next: { revalidate: 1800 } }),
  ]);

  const tutors = tutorsResult.status === 'fulfilled' ? tutorsResult.value : [];
  const resources = resourcesResult.status === 'fulfilled' ? resourcesResult.value : [];
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
    resources: {
      total: resources.length,
      items: resources.slice(0, 3).map(toStoryResource),
    },
    competitions: {
      total: competitions.length,
      items: upcomingCompetitions.slice(0, 3).map(toStoryCompetition),
    },
  };
}
