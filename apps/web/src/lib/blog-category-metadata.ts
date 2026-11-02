import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { BlogLocale } from './blog-api';
import { getBlogCategories } from './blog-api';
import { buildCategoryMetadata } from './blog-metadata';

export async function generateCategoryMetadata(
  locale: BlogLocale,
  slug: string,
): Promise<Metadata> {
  const otherLocale: BlogLocale = locale === 'id' ? 'en' : 'id';
  const [categories, siblingCategories, t] = await Promise.all([
    getBlogCategories(locale),
    getBlogCategories(otherLocale),
    getTranslations({ locale, namespace: 'blog.category' }),
  ]);

  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const sibling = siblingCategories.find((item) => item.id === category.id);

  return buildCategoryMetadata({
    locale,
    slug,
    title: category.title,
    description: category.intro ?? t('metaDescription'),
    siblingSlug: sibling?.slug ?? null,
  });
}
