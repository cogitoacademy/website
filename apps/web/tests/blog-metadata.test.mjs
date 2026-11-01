import { describe, expect, test } from 'bun:test';
import { BASE_URL } from '../src/lib/constants.ts';
import { buildArticleMetadata, buildCategoryMetadata } from '../src/lib/blog-metadata.ts';
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
  test('paired article emits self, sibling, and Indonesian x-default', () => {
    const meta = buildArticleMetadata(
      {
        ...article,
        alternate: { locale: 'en', slug: 'learning-mathematics' },
      },
      'id',
    );

    expect(meta.alternates.canonical).toBe(`${BASE_URL}/id/blog/belajar-matematika`);
    expect(meta.alternates.languages).toEqual({
      id: `${BASE_URL}/id/blog/belajar-matematika`,
      en: `${BASE_URL}/en/blog/learning-mathematics`,
      'x-default': `${BASE_URL}/id/blog/belajar-matematika`,
    });
    expect(meta.openGraph.type).toBe('article');
  });

  test('English article uses the Indonesian sibling as x-default', () => {
    const meta = buildArticleMetadata(
      {
        ...article,
        alternate: { locale: 'id', slug: 'belajar-matematika' },
      },
      'en',
    );

    expect(meta.alternates.languages['x-default']).toBe(`${BASE_URL}/id/blog/belajar-matematika`);
  });

  test('single-language article emits only the self alternate', () => {
    const meta = buildArticleMetadata(article, 'id');

    expect(meta.alternates.languages).toEqual({
      id: `${BASE_URL}/id/blog/belajar-matematika`,
    });
  });

  test('category uses the sibling slug for its alternate', () => {
    const meta = buildCategoryMetadata({
      locale: 'en',
      slug: 'learning',
      title: 'Learning',
      description: 'Learning articles',
      siblingSlug: 'belajar',
    });

    expect(meta.alternates.canonical).toBe(`${BASE_URL}/en/blog/category/learning`);
    expect(meta.alternates.languages).toEqual({
      en: `${BASE_URL}/en/blog/category/learning`,
      id: `${BASE_URL}/id/blog/kategori/belajar`,
      'x-default': `${BASE_URL}/id/blog/kategori/belajar`,
    });
  });
});

describe('Blog sitemap', () => {
  test('paired entries emit self, sibling, and x-default links', () => {
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
    expect(xml).toContain('hreflang="en"');
    expect(xml).toContain('hreflang="x-default"');
    expect(xml).toContain('2026-11-02T00:00:00.000Z');
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
