import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, test } from 'bun:test';
import FaqSectionV2 from '../src/components/landing/faq-v2.tsx';

const messages = {
  faq: {
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

describe('landing FAQ failure state', () => {
  test('renders the FAQ error and full-page link without replacing the landing section', () => {
    const markup = renderToStaticMarkup(
      createElement(
        NextIntlClientProvider,
        { locale: 'en', messages, timeZone: 'UTC' },
        createElement(FaqSectionV2, { items: [], hasError: true }),
      ),
    );

    expect(markup).toContain('<section');
    expect(markup).toContain('role="alert"');
    expect(markup).toContain('FAQ temporarily unavailable.');
    expect(markup).toContain('View all FAQs');
  });
});
