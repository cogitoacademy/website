import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ArticleCard } from '@/components/blog/article-card';
import { BlogErrorState } from '@/components/blog/blog-error-state';
import NavbarResolver from '@/components/navbar-resolver';
import { getBlogArticles, isBlogLocale } from '@/lib/blog-api';
import { buildBlogHomeMetadata } from '@/lib/blog-metadata';
import { blogHomePath } from '@/lib/blog-paths';

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isBlogLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: 'blog.home' });

  return buildBlogHomeMetadata({
    locale,
    title: t('title'),
    description: t('description'),
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  if (!isBlogLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog.home' });
  const retryHref = blogHomePath(locale);

  let articles = null;
  let failed = false;

  try {
    const result = await getBlogArticles(locale, 12);
    articles = result.rows;
  } catch (error) {
    if (error instanceof Error) console.error('Blog list request failed', error.message);
    failed = true;
  }

  return (
    <>
      <NavbarResolver className="bg-background-cream" />
      <div className="bg-background-cream pb-40 text-neutral-1000">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4">
          <header className="flex max-w-3xl flex-col gap-4">
            <p className="font-semibold text-primary-600 text-sm uppercase tracking-wide">
              {t('eyebrow')}
            </p>
            <h1 className="font-bold text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {t('title')}
            </h1>
            <p className="text-neutral-600 leading-relaxed">{t('description')}</p>
          </header>

          {failed ? (
            <BlogErrorState
              title={t('errorTitle')}
              description={t('errorDescription')}
              retryLabel={t('retry')}
              retryHref={retryHref}
            />
          ) : articles && articles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  locale={locale}
                  priority={index === 0}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl bg-neutral-100 p-6 text-neutral-600 ring-1 ring-neutral-200">
              {t('empty')}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
