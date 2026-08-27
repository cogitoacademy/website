export type AchievementLocale = 'id' | 'en';

export interface ApprovedAchievement {
  id: string;
  eventName: string;
  category: string;
  award: string;
  level: string;
  issuer?: string | null;
  awardingDate?: string | null;
  location?: string | null;
  description?: string | null;
  subjects?: string[] | null;
  documentationUrl?: string | null;
  createdAt?: string | null;
  displayName?: string | null;
}
