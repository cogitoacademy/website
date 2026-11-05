export type RecordsStoryLocale = 'id' | 'en';

export type RecordsStoryStepKey = 'tutors' | 'achievements' | 'knowledge' | 'blog' | 'calendar';

export interface RecordsStoryTutor {
  name: string;
  initials: string;
  subject: string | null;
  achievement: string | null;
  affiliation: string | null;
}

export interface RecordsStoryAchievement {
  eventName: string;
  award: string;
  level: string;
  student: string;
  year: string;
  category: string;
}

export interface RecordsStoryResource {
  title: string;
  description: string | null;
  category: string;
}

export interface RecordsStoryCompetition {
  title: string;
  start: string;
  scale: string | null;
  organizer: string | null;
}

export interface RecordsStoryArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  publishedAt: string;
}

export interface RecordsStoryData {
  tutors: {
    total: number;
    items: RecordsStoryTutor[];
  };
  achievements: {
    total: number;
    items: RecordsStoryAchievement[];
  };
  resources: {
    total: number;
    items: RecordsStoryResource[];
  };
  articles: {
    total: number;
    items: RecordsStoryArticle[];
  };
  competitions: {
    total: number;
    items: RecordsStoryCompetition[];
  };
}
