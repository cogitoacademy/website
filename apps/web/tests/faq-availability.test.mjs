import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, test } from 'bun:test';
import { FaqAvailability } from '../src/components/faq-availability.tsx';

describe('FAQ availability states', () => {
  test('marks a valid empty list as a status, not an alert', () => {
    const markup = renderToStaticMarkup(
      createElement(FaqAvailability, { status: 'empty', emptyMessage: 'No questions yet.' }),
    );

    expect(markup).toContain('role="status"');
    expect(markup).not.toContain('role="alert"');
    expect(markup).toContain('No questions yet.');
  });

  test('marks a request failure as an alert with a keyboard-accessible retry link', () => {
    const markup = renderToStaticMarkup(
      createElement(FaqAvailability, {
        status: 'error',
        title: 'FAQ temporarily unavailable.',
        description: 'Try again shortly.',
        retryLabel: 'Try again',
      }),
    );

    expect(markup).toContain('role="alert"');
    expect(markup).not.toContain('role="status"');
    expect(markup).toContain('<a href=""');
    expect(markup).toContain('Try again');
  });
});
