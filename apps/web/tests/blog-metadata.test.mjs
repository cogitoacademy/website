import { describe, expect, test } from 'bun:test';
import { BASE_URL } from '../src/lib/constants.ts';
import {
  buildArticleMetadata,
  buildBlogHomeMetadata,
  buildCategoryMetadata,
} from '../src/lib/blog-metadata.ts';
import { buildBlogSitemapXml } from '../src/lib/blog-sitemap.ts';

const article = {
  seoTitle: 'Belajar Matematika',
  metaDescription: 'Panduan belajar matematika.',
  slug: 'belajar-matematika',
  publishedAt: '2026-11-01T00:00:00.000Z',
  updatedAt: '2026-11-02T00:00:00.000Z',
  alternate: null,
};

describe('Blog metadata', () => {
  test('blog home uses a short absolute title and English x-default', () => {
    const meta = buildBlogHomeMetadata({
      locale: 'id',
      title: 'Blog Cogito',
      description: 'Cerita dan panduan.',
    });

    expect(meta.title).toEqual({ absolute: 'Blog Cogito | Cogito Academy' });
    expect(meta.alternates.languages).toEqual({
      id: `${BASE_URL}/id/blog`,
      en: `${BASE_URL}/en/blog`,
      'x-default': `${BASE_URL}/en/blog`,
    });
    expect(meta.alternates.canonical).toBe(`${BASE_URL}/id/blog`);
  });

  test('blog home pagination keeps the short title', () => {
    const meta = buildBlogHomeMetadata({
      locale: 'en',
      title: 'Cogito Blog',
      description: 'Stories.',
      page: 2,
    });

    expect(meta.title).toEqual({ absolute: 'Cogito Blog — Page 2 | Cogito Academy' });
    expect(meta.alternates.languages['x-default']).toBe(`${BASE_URL}/en/blog?page=2`);
  });

  test('paired article emits self, sibling, and English x-default', () => {
    const meta = buildArticleMetadata(
      {
        ...article,
        alternate: { locale: 'en', slug: 'learning-mathematics' },
      },
      'id',
    );

    expect(meta.title).toEqual({ absolute: 'Belajar Matematika | Cogito Academy' });
    expect(meta.alternates.canonical).toBe(`${BASE_URL}/id/blog/belajar-matematika`);
    expect(meta.alternates.languages).toEqual({
      id: `${BASE_URL}/id/blog/belajar-matematika`,
      en: `${BASE_URL}/en/blog/learning-mathematics`,
      'x-default': `${BASE_URL}/en/blog/learning-mathematics`,
    });
    expect(meta.openGraph.type).toBe('article');
  });

  test('English article uses its own URL as x-default', () => {
    const meta = buildArticleMetadata(
      {
        ...article,
        slug: 'learning-mathematics',
        alternate: { locale: 'id', slug: 'belajar-matematika' },
      },
      'en',
    );

    expect(meta.alternates.languages['x-default']).toBe(`${BASE_URL}/en/blog/learning-mathematics`);
  });

  test('single-language article emits only the self alternate', () => {
    const meta = buildArticleMetadata(article, 'id');

    expect(meta.alternates.languages).toEqual({
      id: `${BASE_URL}/id/blog/belajar-matematika`,
    });
  });

  test('category uses the sibling slug and English x-default', () => {
    const meta = buildCategoryMetadata({
      locale: 'en',
      slug: 'learning',
      title: 'Learning',
      description: 'Learning articles',
      siblingSlug: 'belajar',
    });

    expect(meta.title).toEqual({ absolute: 'Learning | Cogito Academy' });
    expect(meta.alternates.canonical).toBe(`${BASE_URL}/en/blog/category/learning`);
    expect(meta.alternates.languages).toEqual({
      en: `${BASE_URL}/en/blog/category/learning`,
      id: `${BASE_URL}/id/blog/kategori/belajar`,
      'x-default': `${BASE_URL}/en/blog/category/learning`,
    });
  });

  test('Indonesian category with a sibling points x-default at English', () => {
    const meta = buildCategoryMetadata({
      locale: 'id',
      slug: 'belajar',
      title: 'Belajar',
      description: 'Artikel belajar',
      siblingSlug: 'learning',
    });

    expect(meta.alternates.languages['x-default']).toBe(`${BASE_URL}/en/blog/category/learning`);
  });
});

describe('Blog sitemap', () => {
  test('paired entries emit self, sibling, and English x-default links', () => {
    const xml = buildBlogSitemapXml([
      {
        articleId: 'article-1',
        locale: 'id',
        slug: 'belajar-matematika',
        updatedAt: '2026-11-02T00:00:00.000Z',
        alternate: { locale: 'en', slug: 'learning-mathematics' },
      },
    ]);

    expect(xml).toContain(`<loc>${BASE_URL}/id/blog/belajar-matematika</loc>`);
    expect(xml).toContain(`hreflang="id" href="${BASE_URL}/id/blog/belajar-matematika"`);
    expect(xml).toContain(`hreflang="en" href="${BASE_URL}/en/blog/learning-mathematics"`);
    expect(xml).toContain(`hreflang="x-default" href="${BASE_URL}/en/blog/learning-mathematics"`);
    expect(xml).toContain('2026-11-02T00:00:00.000Z');
  });

  test('paired English entries point x-default at the English URL', () => {
    const xml = buildBlogSitemapXml([
      {
        articleId: 'article-1',
        locale: 'en',
        slug: 'learning-mathematics',
        updatedAt: '2026-11-02T00:00:00.000Z',
        alternate: { locale: 'id', slug: 'belajar-matematika' },
      },
    ]);

    expect(xml).toContain(`hreflang="x-default" href="${BASE_URL}/en/blog/learning-mathematics"`);
  });

  test('unpaired entries emit no alternate links', () => {
    const xml = buildBlogSitemapXml([
      {
        articleId: 'article-2',
        locale: 'en',
        slug: 'single-language',
        updatedAt: '2026-11-02T00:00:00.000Z',
        alternate: null,
      },
    ]);

    expect(xml).not.toContain('hreflang="id"');
    expect(xml).not.toContain('x-default');
  });
});
