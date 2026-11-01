import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, test } from 'bun:test';
import ActivitiesContent from '../src/components/activities/activities-content.tsx';
import OtherActivities from '../src/components/activities/other-activities.tsx';

const classItem = {
  id: 'mun-class',
  kind: 'cohort',
  state: 'published',
  titleEn: 'MUN Cohort',
  descriptionEn: 'Practice diplomacy.',
  coverKey: null,
  cohortFullRateMarks: 20,
  masterclassRateMarks: null,
  competition: { name: 'Model United Nations' },
  sessions: [
    {
      id: 'session-1',
      sequenceNumber: 1,
      startAt: '2026-11-01T10:00:00.000Z',
      titleEn: 'Session 1',
      curriculumEn: null,
      mode: 'online',
      tutor: { name: 'Tutor' },
    },
  ],
};

const activity = {
  id: 'townhall',
  title: 'Townhall & 101 Series',
  description: 'Connect with the community.',
  imageUrl: 'https://example.com/townhall.webp',
  location: 'Online',
  startAt: '2026-11-01T10:00:00.000Z',
  status: 'upcoming',
  body: { type: 'doc', blocks: [{ type: 'paragraph', content: [{ text: 'Welcome.' }] }] },
};

describe('Activities page UI', () => {
  test('shows styled empty states consistent with the Achievements archive', () => {
    const markup = renderToStaticMarkup(
      createElement(ActivitiesContent, {
        classes: [],
        events: [],
        classesFailed: false,
        eventsFailed: false,
        locale: 'en',
      }),
    );

    expect(markup).toContain('No classes yet');
    expect(markup).toContain('No activities yet');
    expect(markup.match(/min-h-72 rounded-2xl bg-background-cream py-20/g)).toHaveLength(2);
    expect(markup).toContain('bg-background-primary text-primary-500');
  });

  test('uses a filter menu and opens class confirmation instead of linking directly', () => {
    const markup = renderToStaticMarkup(
      createElement(ActivitiesContent, {
        classes: [classItem],
        events: [],
        classesFailed: false,
        eventsFailed: false,
        locale: 'en',
      }),
    );

    expect(markup).toContain('Class type');
    expect(markup).toContain('MUN Cohort');
    expect(markup).toContain('View class');
    expect(markup).not.toContain('href="https://app.cogito');
    expect(markup).not.toContain('Continue to the Cogito app?');
  });

  test('renders Others activities as accessible cards that trigger detail', () => {
    const markup = renderToStaticMarkup(
      createElement(OtherActivities, { articles: [activity], failed: false, locale: 'en' }),
    );

    expect(markup).toContain('<button type="button"');

    expect(markup).toContain('Townhall &amp; 101 Series');
    expect(markup).toContain('Connect with the community.');
  });
});

test('class title uses the same content on both language routes', () => {
  for (const locale of ['en', 'id']) {
    const markup = renderToStaticMarkup(
      createElement(ActivitiesContent, {
        classes: [{ ...classItem, titleId: 'Unused translated title' }],
        events: [],
        classesFailed: false,
        eventsFailed: false,
        locale,
      }),
    );
    expect(markup).toContain('MUN Cohort');
    expect(markup).not.toContain('Unused translated title');
  }
});
