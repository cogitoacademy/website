export type RecordsStoryLocale = 'id' | 'en';

export type RecordsStoryStepKey = 'tutors' | 'achievements' | 'knowledge' | 'blog' | 'calendar';

export interface RecordsStoryTutor {
  name: string;
  initials: string;
  subject: string | null;
  achievement: string | null;
  affiliation: string | null;
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

export interface RecordsStoryData {
  tutors: {
    total: number;
    items: RecordsStoryTutor[];
  };
  resources: {
    total: number;
    items: RecordsStoryResource[];
  };
  competitions: {
    total: number;
    items: RecordsStoryCompetition[];
  };
}
