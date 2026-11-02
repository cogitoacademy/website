import type { BlogArticle, BlogLocale } from '@/lib/blog-api';
import { articlePath, blogHomePath, categoryPath } from '@/lib/blog-paths';
import { BASE_URL } from '@/lib/constants';

const PUBLISHER = {
  '@type': 'Organization',
  name: 'Cogito Academy',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/cogito-academy-logo.png`,
    width: 706,
    height: 258,
  },
};

export function ArticleJsonLd({ article, locale }: { article: BlogArticle; locale: BlogLocale }) {
  const url = `${BASE_URL}${articlePath(locale, article.slug)}`;

  const posting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.metaDescription,
    image: article.hero
      ? [
          {
            '@type': 'ImageObject',
            url: article.hero.url,
            ...(article.hero.width ? { width: article.hero.width } : {}),
            ...(article.hero.height ? { height: article.hero.height } : {}),
          },
        ]
      : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: locale === 'id' ? 'id-ID' : 'en',
    author: PUBLISHER,
    publisher: PUBLISHER,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Blog',
        item: `${BASE_URL}${blogHomePath(locale)}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: article.category.title,
        item: `${BASE_URL}${categoryPath(locale, article.category.slug)}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD needs a stringified object; escape `<` so content cannot close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(posting).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
