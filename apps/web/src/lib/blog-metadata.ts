import type { Metadata } from 'next';

import type { BlogArticle, BlogLocale } from './blog-api';
import { articlePath, blogHomePath, categoryPath } from './blog-paths';
import { BASE_URL } from './constants';

const OG_IMAGE = `${BASE_URL}/og-image-cogito.jpg`;

function openGraphLocale(locale: BlogLocale) {
  return locale === 'id' ? 'id_ID' : 'en_US';
}

export function buildBlogHomeMetadata({
  locale,
  title,
  description,
}: {
  locale: BlogLocale;
  title: string;
  description: string;
}): Metadata {
  const path = blogHomePath(locale);

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}${path}`,
      languages: {
        id: `${BASE_URL}${blogHomePath('id')}`,
        en: `${BASE_URL}${blogHomePath('en')}`,
        'x-default': `${BASE_URL}${blogHomePath('id')}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: `${BASE_URL}${path}`,
      siteName: 'Cogito Academy',
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export function buildArticleMetadata(article: BlogArticle, locale: BlogLocale): Metadata {
  const path = articlePath(locale, article.slug);
  const canonical = `${BASE_URL}${path}`;
  const languages: Record<string, string> = { [locale]: canonical };

  if (article.alternate) {
    const alternateUrl = `${BASE_URL}${articlePath(article.alternate.locale, article.alternate.slug)}`;
    languages[article.alternate.locale] = alternateUrl;

    const indonesianSlug = locale === 'id' ? article.slug : article.alternate.slug;
    languages['x-default'] = `${BASE_URL}${articlePath('id', indonesianSlug)}`;
  }

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: { canonical, languages },
    openGraph: {
      type: 'article',
      locale: openGraphLocale(locale),
      url: canonical,
      siteName: 'Cogito Academy',
      title: article.seoTitle,
      description: article.metaDescription,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seoTitle,
      description: article.metaDescription,
    },
  };
}

export function buildCategoryMetadata({
  locale,
  slug,
  title,
  description,
  siblingSlug,
}: {
  locale: BlogLocale;
  slug: string;
  title: string;
  description: string;
  siblingSlug?: string | null;
}): Metadata {
  const path = categoryPath(locale, slug);
  const canonical = `${BASE_URL}${path}`;
  const languages: Record<string, string> = { [locale]: canonical };

  if (siblingSlug) {
    const siblingLocale: BlogLocale = locale === 'id' ? 'en' : 'id';
    const siblingUrl = `${BASE_URL}${categoryPath(siblingLocale, siblingSlug)}`;
    languages[siblingLocale] = siblingUrl;

    const indonesianSlug = locale === 'id' ? slug : siblingSlug;
    languages['x-default'] = `${BASE_URL}${categoryPath('id', indonesianSlug)}`;
  }

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: canonical,
      siteName: 'Cogito Academy',
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
