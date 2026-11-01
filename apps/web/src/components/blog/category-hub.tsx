import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/routing';
import type { BlogCard, BlogCategory, BlogLocale } from '@/lib/blog-api';
import { ArticleCard } from './article-card';

export async function CategoryHub({
  category,
  articles,
  locale,
}: {
  category: BlogCategory;
  articles: BlogCard[];
  locale: BlogLocale;
}) {
  const t = await getTranslations({ locale, namespace: 'blog.category' });

  return (
    <div className="flex flex-col gap-10">
      <header className="flex max-w-3xl flex-col gap-4">
        <Link
          href="/blog"
          className="font-medium text-primary-600 text-sm underline underline-offset-4"
        >
          {t('backToBlog')}
        </Link>
        <h1 className="font-bold text-3xl text-neutral-1000 leading-tight sm:text-4xl lg:text-5xl">
          {category.title}
        </h1>
        {category.intro ? (
          <p className="text-neutral-600 leading-relaxed">{category.intro}</p>
        ) : null}
        <p className="text-neutral-500 text-sm">{t('articleCount', { count: articles.length })}</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} locale={locale} />
        ))}
      </div>
    </div>
  );
}
