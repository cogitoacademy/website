import { afterEach, describe, expect, mock, test } from 'bun:test';
import {
  BlogApiError,
  BlogNotFoundError,
  getBlogArticle,
  getBlogArticles,
  getBlogSitemap,
} from '../src/lib/blog-api.ts';

process.env.COGITO_APP_API_URL = 'http://localhost:3001';

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

const card = {
  id: 'article-1',
  slug: 'belajar-matematika',
  title: 'Belajar Matematika',
  excerpt: 'Ringkasan',
  hero: null,
  category: { slug: 'belajar', title: 'Belajar' },
  subcategory: null,
  tutorName: null,
  publishedAt: '2026-11-01T00:00:00.000Z',
  updatedAt: '2026-11-02T00:00:00.000Z',
  readingMinutes: 4,
};

describe('Blog API adapter', () => {
  test('posts the wrapped payload and reads the JSON envelope', async () => {
    globalThis.fetch = mock(async (url, options) => {
      expect(url).toBe('http://localhost:3001/rpc/public-content/blog/list');
      expect(options.method).toBe('POST');
      expect(JSON.parse(options.body)).toEqual({ json: { locale: 'id', limit: 12 } });
      return Response.json({ json: { rows: [card], nextCursor: null } });
    });

    const result = await getBlogArticles('id');
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].slug).toBe('belajar-matematika');
  });

  test('rejects a malformed payload instead of returning an empty success', async () => {
    globalThis.fetch = mock(async () => Response.json({ json: { rows: 'broken' } }));

    await expect(getBlogArticles('id')).rejects.toThrow('unexpected payload');
  });

  test('maps a missing article to BlogNotFoundError', async () => {
    globalThis.fetch = mock(async () => Response.json({}, { status: 404 }));

    await expect(getBlogArticle('id', 'missing')).rejects.toBeInstanceOf(BlogNotFoundError);
  });

  test('surfaces other failures as BlogApiError with the status', async () => {
    globalThis.fetch = mock(async () => new Response('boom', { status: 500 }));

    try {
      await getBlogSitemap();
      throw new Error('expected failure');
    } catch (error) {
      expect(error).toBeInstanceOf(BlogApiError);
      expect(error.status).toBe(500);
    }
  });
});
