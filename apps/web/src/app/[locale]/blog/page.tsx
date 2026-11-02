import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ArticleCard } from '@/components/blog/article-card';
import { BlogErrorState } from '@/components/blog/blog-error-state';
import NavbarResolver from '@/components/navbar-resolver';
import { Link } from '@/i18n/routing';
import {
  getBlogArticles,
  getBlogCategories,
  isBlogLocale,
  type BlogCategory,
} from '@/lib/blog-api';
import { buildBlogHomeMetadata } from '@/lib/blog-metadata';
import { blogHomePath } from '@/lib/blog-paths';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

export const revalidate = 60;

function readPage(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = raw ? Number.parseInt(raw, 10) : 1;
  return Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, 1_000) : 1;
}

function pageHref(locale: string, page: number) {
  return `${blogHomePath(locale as 'id' | 'en')}${page > 1 ? `?page=${page}` : ''}`;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isBlogLocale(locale)) return {};
  const page = readPage((await searchParams).page);
  const t = await getTranslations({ locale, namespace: 'blog.home' });
  const metadata = buildBlogHomeMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    page,
  });

  try {
    await getBlogArticles(locale, 1, page);
    return metadata;
  } catch {
    return { ...metadata, robots: { index: false, follow: true } };
  }
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isBlogLocale(locale)) notFound();
  setRequestLocale(locale);
  const page = readPage((await searchParams).page);

  const t = await getTranslations({ locale, namespace: 'blog.home' });
  const retryHref = pageHref(locale, page);

  let articles = null;
  let failed = false;
  let hasNext = false;
  let categories: BlogCategory[] = [];

  try {
    const [result, categoryRows] = await Promise.all([
      getBlogArticles(locale, 12, page),
      getBlogCategories(locale),
    ]);
    articles = result.rows;
    hasNext = result.nextCursor !== null;
    categories = categoryRows;
  } catch (error) {
    if (error instanceof Error) console.error('Blog list request failed', error.message);
    failed = true;
  }

  const hubs = categories.filter((category) => !category.parentId && category.articleCount >= 2);

  return (
    <>
      <NavbarResolver className="bg-background-cream" />
      <div className="bg-background-cream pb-40 text-neutral-1000">
        <div className="relative z-3 mx-auto max-w-7xl px-4 pb-20">
          <section className="pb-8 sm:pb-12 md:pb-16">
            <div className="max-w-2xl space-y-3">
              <h1 className="font-bold text-2xl text-neutral-1000 tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                {t('title')}
              </h1>
              <p className="text-neutral-600 text-sm leading-relaxed sm:text-base">
                {t('description')}
              </p>
            </div>
          </section>

          <div className="space-y-8">
            {hubs.length > 0 ? (
              <nav aria-label={t('categories')} className="flex flex-wrap gap-2">
                {hubs.map((hub) => (
                  <Link
                    key={hub.id}
                    href={`/blog/${locale === 'id' ? 'kategori' : 'category'}/${hub.slug}`}
                    className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 ring-1 ring-neutral-200 transition hover:bg-primary-100 hover:text-primary-700"
                  >
                    {hub.title}
                  </Link>
                ))}
              </nav>
            ) : null}

            {failed ? (
              <BlogErrorState
                title={t('errorTitle')}
                description={t('errorDescription')}
                retryLabel={t('retry')}
                retryHref={retryHref}
              />
            ) : articles && articles.length > 0 ? (
              <>
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
                {page > 1 || hasNext ? (
                  <nav
                    aria-label={t('pagination')}
                    className="flex items-center justify-between gap-3"
                  >
                    {page > 1 ? (
                      <Link
                        href={pageHref(locale, page - 1)}
                        className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 ring-1 ring-neutral-200 transition hover:bg-neutral-200"
                      >
                        {t('previous')}
                      </Link>
                    ) : (
                      <span />
                    )}
                    <span className="text-sm text-neutral-500">{t('page', { page })}</span>
                    {hasNext ? (
                      <Link
                        href={pageHref(locale, page + 1)}
                        className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-600"
                      >
                        {t('next')}
                      </Link>
                    ) : (
                      <span />
                    )}
                  </nav>
                ) : null}
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="rounded-2xl bg-neutral-100 p-6 text-neutral-600 ring-1 ring-neutral-200">
                  {t('empty')}
                </p>
                {page > 1 ? (
                  <Link
                    href={pageHref(locale, page - 1)}
                    className="w-fit rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 ring-1 ring-neutral-200 transition hover:bg-neutral-200"
                  >
                    {t('previous')}
                  </Link>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
