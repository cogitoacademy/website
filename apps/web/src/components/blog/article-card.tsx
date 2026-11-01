import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/routing';
import type { BlogCard, BlogLocale } from '@/lib/blog-api';
import { formatBlogDate } from '@/lib/blog-format';

export async function ArticleCard({
  article,
  locale,
  priority = false,
  headingLevel = 'h3',
}: {
  article: BlogCard;
  locale: BlogLocale;
  priority?: boolean;
  headingLevel?: 'h2' | 'h3';
}) {
  const t = await getTranslations({ locale, namespace: 'blog.card' });
  const Heading = headingLevel;

  return (
    <article className="h-full">
      <Link
        href={`/blog/${article.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200 transition hover:ring-primary-300 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
      >
        <div className="relative aspect-16/9 w-full overflow-hidden bg-neutral-200">
          {article.hero ? (
            <Image
              src={article.hero.url}
              alt={article.hero.alt ?? article.title}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              aria-hidden
              className="flex h-full items-center justify-center bg-gradient-to-br from-primary-100 to-background-cream text-2xl font-bold text-primary-500"
            >
              Cogito
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
            <span className="rounded-full bg-primary-100 px-3 py-1 font-medium text-primary-700">
              {article.category.title}
            </span>
            {article.subcategory ? <span>{article.subcategory.title}</span> : null}
          </div>

          <Heading className="font-bold text-lg text-neutral-1000 leading-snug">
            {article.title}
          </Heading>

          <p className="line-clamp-3 text-neutral-700 text-sm leading-relaxed">{article.excerpt}</p>

          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-neutral-600 text-xs">
            <time dateTime={article.publishedAt}>
              {formatBlogDate(article.publishedAt, locale)}
            </time>
            <span aria-hidden>&middot;</span>
            <span>{t('readingTime', { minutes: article.readingMinutes })}</span>
            {article.tutorName ? (
              <span className="text-neutral-500">{article.tutorName}</span>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
