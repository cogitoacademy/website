import { describe, expect, test } from 'bun:test';
import { FAQ_CATEGORY_ORDER, groupFaqsByCategory } from '../src/lib/faq-categories.ts';
import enMessages from '../messages/en.json';
import idMessages from '../messages/id.json';

const EXPECTED_CATEGORY_ORDER = [
  'about',
  'programs',
  'tutors',
  'accounts',
  'marks',
  'payments',
  'progress',
  'offline',
  'tutor-join',
];

function faq(id, category, sortOrder = 0) {
  return {
    id,
    question: `${id}?`,
    answer: [{ type: 'paragraph', text: `${id} answer.` }],
    sortOrder,
    ...(category === undefined ? {} : { category }),
  };
}

describe('FAQ category grouping', () => {
  test('orders non-empty groups by the fixed category order', () => {
    const items = [...EXPECTED_CATEGORY_ORDER]
      .reverse()
      .map((category, index) => faq(`faq-${category}`, category, index));

    const groups = groupFaqsByCategory(items);

    expect(FAQ_CATEGORY_ORDER).toEqual(EXPECTED_CATEGORY_ORDER);
    expect(groups.map((group) => group.category)).toEqual(EXPECTED_CATEGORY_ORDER);
    expect(groups.every((group) => group.items.length === 1)).toBe(true);
  });

  test('groups entries without changing their order inside a category', () => {
    const items = [
      faq('payments-first', 'payments', 4),
      faq('about-first', 'about', 1),
      faq('payments-second', 'payments', 3),
      faq('about-second', 'about', 0),
    ];

    const groups = groupFaqsByCategory(items);

    expect(groups.map((group) => group.category)).toEqual(['about', 'payments']);
    expect(groups[0].items.map((item) => item.id)).toEqual(['about-first', 'about-second']);
    expect(groups[1].items.map((item) => item.id)).toEqual(['payments-first', 'payments-second']);
  });

  test('places missing and unknown categories in a final uncategorized group', () => {
    const items = [
      faq('future-category', 'future-category'),
      faq('about-entry', 'about'),
      faq('legacy-entry'),
    ];

    const groups = groupFaqsByCategory(items);

    expect(groups.map((group) => group.category)).toEqual(['about', null]);
    expect(groups[1].items.map((item) => item.id)).toEqual(['future-category', 'legacy-entry']);
  });

  test('omits the uncategorized group when every entry has a known category', () => {
    const groups = groupFaqsByCategory([faq('tutor-join-entry', 'tutor-join')]);

    expect(groups).toHaveLength(1);
    expect(groups[0].category).toBe('tutor-join');
    expect(groups[0].items.map((item) => item.id)).toEqual(['tutor-join-entry']);
  });

  test('provides localized labels for every category in both locales', () => {
    const messageKeys = [...EXPECTED_CATEGORY_ORDER, 'uncategorized'].sort();

    for (const messages of [enMessages, idMessages]) {
      expect(Object.keys(messages.faq.categories).sort()).toEqual(messageKeys);

      for (const key of messageKeys) {
        expect(messages.faq.categories[key].trim()).not.toBe('');
      }
    }
  });
});
