import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { CategoryPageContent } from '@/components/blog/category-page-content';
import { generateCategoryMetadata } from '@/lib/blog-category-metadata';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== 'id') return {};
  return generateCategoryMetadata('id', slug);
}

export default async function IndonesianCategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  if (locale !== 'id') notFound();
  setRequestLocale(locale);

  return <CategoryPageContent locale="id" slug={slug} />;
}
