export interface Tutor {
  _id: string;
  name: string;
  profilePicture: {
    asset: {
      _id: string;
      url: string;
      altText?: string;
    };
  };
  affiliation: Array<{ _key: string; value: string }>;
  competitionFields: CompetitionCategory[];
  locations: string[];
  achievements: Array<{ text: Array<{ _key: string; value: string }> }>;
  experiences: Array<{ text: Array<{ _key: string; value: string }> }>;
}

export interface CompetitionCategory {
  _id: string;
  name: string;
  coreCategory: string;
}

export type Location = "online" | "offline_surabaya" | "offline_semarang" | "offline_jakarta";
