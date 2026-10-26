import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, test } from 'bun:test';
import { FaqAnswer } from '../src/components/faq-answer.tsx';
import { FaqSection } from '../src/components/landing/faq-section.tsx';
import FaqSectionV2 from '../src/components/landing/faq-v2.tsx';

const messages = {
  faq: {
    header: {
      title: 'Frequently asked',
      titleHighlight: ' questions',
      subtitle: 'Answers for families.',
    },
    v2: {
      badge: 'FAQ',
      title: 'Start here',
      titleHighlight: '.',
      subtitle: 'Answers for families.',
    },
    empty: 'No questions yet.',
    viewAll: 'View all FAQs',
    error: {
      title: 'FAQ temporarily unavailable.',
      description: 'Try again shortly.',
      tryAgain: 'Try again',
    },
  },
};

const item = {
  id: 'faq-long',
  question: 'How does the detailed learning cycle work?',
  sortOrder: 0,
  answer: [
    { type: 'paragraph', text: 'A detailed answer with enough text to grow naturally.' },
    { type: 'list', style: 'ordered', items: ['Prepare.', 'Practice.', 'Review.'] },
  ],
  questionRich: {
    type: 'doc',
    blocks: [
      {
        type: 'paragraph',
        content: [
          { text: 'How ', bold: true },
          {
            text: 'does the learning cycle work?',
            italic: true,
            href: 'https://example.com/question',
          },
        ],
      },
    ],
  },
  answerRich: {
    type: 'doc',
    blocks: [
      {
        type: 'paragraph',
        content: [{ text: 'Read ' }, { text: 'the guide', href: 'https://example.com/guide' }],
      },
      {
        type: 'list',
        style: 'ordered',
        items: [[{ text: 'Prepare.' }], [{ text: 'Practice.' }]],
      },
    ],
  },
};

function renderWithMessages(element) {
  return renderToStaticMarkup(
    createElement(NextIntlClientProvider, { locale: 'en', messages, timeZone: 'UTC' }, element),
  );
}

describe('FAQ accordion', () => {
  test.each([
    ['landing section', FaqSectionV2],
    ['full FAQ page', FaqSection],
  ])('uses an accessible accordion on the %s', (_surface, Component) => {
    const markup = renderWithMessages(createElement(Component, { items: [item] }));

    expect(markup).toContain('type="button"');
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain('role="region"');
    expect(markup).toContain('data-slot="accordion-trigger"');
    expect(markup).toContain('<strong>How </strong>');
    expect(markup).not.toContain('href="https://example.com/question"');
  });

  test('renders rich answer links and ordered lists', () => {
    const markup = renderToStaticMarkup(
      createElement(FaqAnswer, { blocks: item.answer, rich: item.answerRich }),
    );

    expect(markup).toContain('href="https://example.com/guide"');
    expect(markup).toContain('<ol');
    expect(markup).toContain('<li>Prepare.</li>');
  });
});
