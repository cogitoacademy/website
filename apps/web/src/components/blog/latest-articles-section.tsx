import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/routing';
import { getBlogArticles, type BlogCard, type BlogLocale } from '@/lib/blog-api';
import { ArticleCard } from './article-card';

export async function LatestArticlesSection({ locale }: { locale: BlogLocale }) {
  let rows: BlogCard[] = [];

  try {
    rows = (await getBlogArticles(locale, 3, 1)).rows;
  } catch {
    return null;
  }

  if (rows.length === 0) return null;

  const t = await getTranslations({ locale, namespace: 'blog.home' });

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-neutral-1000 sm:text-4xl">
            {t('latestTitle')}
          </h2>
          <p className="mt-2 text-neutral-600 leading-relaxed">{t('latestDescription')}</p>
        </div>
        <Link
          href="/blog"
          className="text-sm font-medium text-primary-600 underline underline-offset-4"
        >
          {t('viewAll')}
        </Link>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((article) => (
          <ArticleCard key={article.id} article={article} locale={locale} />
        ))}
      </div>
    </section>
  );
}
