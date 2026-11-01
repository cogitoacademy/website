export interface TutorCategory {
  id: string;
  slug: string;
  name: string;
  nameId: string | null;
  lightTextColor: string | null;
  lightBackgroundColor: string | null;
  darkTextColor: string | null;
  darkBackgroundColor: string | null;
}

export interface TutorSubject {
  id: string;
  slug: string;
  name: string;
  nameId: string | null;
  parent: TutorCategory;
}

export interface Tutor {
  id: string;
  name: string;
  profileImageUrl: string | null;
  shortBio: string | null;
  affiliation: string | null;
  education: Array<{ university: string; degree: string }>;
  achievements: Array<{ competitionName: string; year: number; awards: string[] }>;
  experiences: Array<{
    role: string;
    organization: string;
    startYear: number;
    endYear: number | null;
    description: string;
  }>;
  subjects: TutorSubject[];
  modality: 'online' | 'offline' | 'both' | null;
}
