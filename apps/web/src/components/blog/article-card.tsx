import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/routing';
import type { BlogCard, BlogLocale } from '@/lib/blog-api';
import { formatBlogDate } from '@/lib/blog-format';

export async function ArticleCard({
  article,
  locale,
  priority = false,
  headingLevel = 'h2',
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
        className="group flex h-full flex-col-reverse overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200 transition hover:ring-primary-300 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 sm:flex-row-reverse"
      >
        <div className="relative mx-4 mb-4 aspect-[16/9] w-auto shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:mx-0 sm:my-4 sm:mr-4 sm:aspect-auto sm:min-h-36 sm:w-[30%] sm:min-w-16">
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

        <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
          <div className="flex flex-wrap items-center gap-x-2 text-xs text-neutral-600">
            <time dateTime={article.publishedAt}>
              {formatBlogDate(article.publishedAt, locale)}
            </time>
            <span aria-hidden>&middot;</span>
            <span>{t('readingTime', { minutes: article.readingMinutes })}</span>
          </div>

          <Heading className="font-bold text-lg text-neutral-1000 leading-snug">
            {article.title}
          </Heading>

          <p className="line-clamp-3 text-neutral-700 text-sm leading-relaxed">{article.excerpt}</p>

          <div className="mt-auto flex flex-wrap items-center gap-2 text-xs">
            <span className="font-medium text-primary-700">
              {article.category.title}
            </span>
            {article.subcategory ? (
              <span className="text-neutral-600">{article.subcategory.title}</span>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
