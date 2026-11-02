import type { FaqCategory, PublicFaq } from '@/types/faq';

export const FAQ_CATEGORY_ORDER = [
  'about',
  'programs',
  'tutors',
  'accounts',
  'marks',
  'payments',
  'progress',
  'offline',
  'tutor-join',
] as const satisfies readonly FaqCategory[];

const FAQ_CATEGORY_SET = new Set<string>(FAQ_CATEGORY_ORDER);

export function isFaqCategory(value: unknown): value is FaqCategory {
  return typeof value === 'string' && FAQ_CATEGORY_SET.has(value);
}

export type FaqCategoryGroup = {
  category: FaqCategory | null;
  items: PublicFaq[];
};

export function groupFaqsByCategory(items: PublicFaq[]): FaqCategoryGroup[] {
  const groups = new Map<FaqCategory | null, PublicFaq[]>();

  for (const item of items) {
    const category = isFaqCategory(item.category) ? item.category : null;
    const group = groups.get(category);

    if (group) {
      group.push(item);
    } else {
      groups.set(category, [item]);
    }
  }

  const categorized = FAQ_CATEGORY_ORDER.flatMap((category) => {
    const group = groups.get(category);
    return group ? [{ category, items: group }] : [];
  });
  const uncategorized = groups.get(null);

  return uncategorized ? [...categorized, { category: null, items: uncategorized }] : categorized;
}
