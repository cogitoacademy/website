import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { CategoryPageContent } from '@/components/blog/category-page-content';
import { generateCategoryMetadata } from '@/lib/blog-category-metadata';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== 'en') return {};
  return generateCategoryMetadata('en', slug);
}

export default async function EnglishCategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  if (locale !== 'en') notFound();
  setRequestLocale(locale);

  return <CategoryPageContent locale="en" slug={slug} />;
}
