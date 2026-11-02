import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { cache } from 'react';

import { ArticleBody } from '@/components/blog/article-body';
import { ArticleCta } from '@/components/blog/article-cta';
import { ArticleJsonLd } from '@/components/blog/article-json-ld';
import { BlogErrorState } from '@/components/blog/blog-error-state';
import { BlogFaq } from '@/components/blog/blog-faq';
import { ArticleCard } from '@/components/blog/article-card';
import { StickyConsultation } from '@/components/blog/sticky-consultation';
import { TableOfContents } from '@/components/blog/table-of-contents';
import NavbarResolver from '@/components/navbar-resolver';
import { Link } from '@/i18n/routing';
import { BlogNotFoundError, getBlogArticle, isBlogLocale, type BlogLocale } from '@/lib/blog-api';
import { formatBlogDate } from '@/lib/blog-format';
import { blogHeadingId } from '@/lib/blog-heading-id';
import { buildArticleMetadata } from '@/lib/blog-metadata';
import { articlePath } from '@/lib/blog-paths';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 60;
export const dynamicParams = true;

const loadArticle = cache((locale: BlogLocale, slug: string) => getBlogArticle(locale, slug));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isBlogLocale(locale)) return {};

  try {
    const article = await loadArticle(locale, slug);
    return buildArticleMetadata(article, locale);
  } catch (error) {
    if (error instanceof BlogNotFoundError) notFound();
    console.error('Blog article metadata request failed', error);
    return { title: 'Blog', robots: { index: false, follow: true } };
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isBlogLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog.article' });
  const retryHref = articlePath(locale, slug);

  let article = null;
  try {
    article = await loadArticle(locale, slug);
  } catch (error) {
    if (error instanceof BlogNotFoundError) notFound();
    console.error('Blog article request failed', error);
  }

  if (!article) {
    return (
      <>
        <NavbarResolver className="bg-background-cream" />
        <div className="bg-background-cream pb-40 text-neutral-1000">
          <div className="mx-auto max-w-3xl px-4">
            <BlogErrorState
              title={t('errorTitle')}
              description={t('errorDescription')}
              retryLabel={t('retry')}
              retryHref={retryHref}
            />
          </div>
        </div>
      </>
    );
  }

  const headings = article.body.flatMap((block, index) =>
    block.type === 'heading' && block.level === 2
      ? [{ id: blogHeadingId(index, block.text), text: block.text }]
      : [],
  );

  return (
    <>
      <ArticleJsonLd article={article} locale={locale} />
      <NavbarResolver className="bg-background-cream" />
      <div className="bg-background-cream pb-40 text-neutral-1000">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
            <article className="max-w-3xl min-w-0">
              <nav aria-label={t('breadcrumbBlog')} className="mb-6 text-sm">
                <ol className="flex flex-wrap items-center gap-2 text-neutral-500">
                  <li>
                    <Link href="/blog" className="transition hover:text-primary-600">
                      {t('breadcrumbBlog')}
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link
                      href={`/blog/${locale === 'id' ? 'kategori' : 'category'}/${article.category.slug}`}
                      className="transition hover:text-primary-600"
                    >
                      {article.category.title}
                    </Link>
                  </li>
                </ol>
              </nav>

              <header className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-primary-100 px-3 py-1 font-medium text-primary-700">
                    {article.category.title}
                  </span>
                  {article.subcategory ? (
                    <span className="rounded-full bg-neutral-200 px-3 py-1 text-neutral-700">
                      {article.subcategory.title}
                    </span>
                  ) : null}
                </div>

                <h1 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
                  {article.title}
                </h1>
                <p className="text-lg leading-relaxed text-neutral-600">{article.lead}</p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600">
                  <span>
                    {locale === 'id'
                      ? 'Ditulis oleh Tim Cogito Academy'
                      : 'Written by the Cogito Academy team'}
                    {article.tutorName
                      ? `${locale === 'id' ? ' bersama ' : ' with '}${article.tutorName}`
                      : ''}
                  </span>
                  {article.reviewerName ? (
                    <span>
                      {locale === 'id' ? 'Ditinjau oleh' : 'Reviewed by'} {article.reviewerName}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500">
                  <span>
                    {t('published')} {formatBlogDate(article.publishedAt, locale)}
                  </span>
                  {article.updatedAt !== article.publishedAt ? (
                    <span>
                      {t('updated')} {formatBlogDate(article.updatedAt, locale)}
                    </span>
                  ) : null}
                  <span>{t('readingTime', { minutes: article.readingMinutes })}</span>
                  {article.alternate ? (
                    <a
                      href={articlePath(article.alternate.locale, article.alternate.slug)}
                      hrefLang={article.alternate.locale}
                      className="font-medium text-primary-600 underline underline-offset-4"
                    >
                      {t('languageSwitch')}
                    </a>
                  ) : null}
                </div>
              </header>

              {article.hero ? (
                <figure className="mt-8 flex flex-col gap-2">
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-200">
                    <Image
                      src={article.hero.url}
                      alt={article.hero.alt ?? article.title}
                      fill
                      priority
                      sizes="(min-width: 1024px) 760px, 92vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              ) : null}

              <div className="mt-8 lg:hidden">
                <TableOfContents headings={headings} locale={locale} />
              </div>

              {article.keyFacts.length > 0 ? (
                <section className="mt-10 rounded-2xl bg-secondary-100 p-5 ring-1 ring-secondary-200">
                  <h2 className="font-semibold text-neutral-1000">{t('keyFacts')}</h2>
                  <table className="mt-3 w-full border-collapse text-left leading-relaxed text-neutral-700">
                    <tbody>
                      {article.keyFacts.map((fact, index) => {
                        const separator = fact.text.indexOf(':');
                        const label = separator > 0 ? fact.text.slice(0, separator).trim() : '';
                        const value = separator > 0 ? fact.text.slice(separator + 1).trim() : fact.text;
                        return (
                          <tr key={index} className="border-t border-secondary-200 first:border-t-0">
                            {label ? (
                              <th scope="row" className="w-2/5 py-2 pr-4 align-top font-medium text-neutral-800">
                                {label}
                              </th>
                            ) : null}
                            <td className={label ? 'py-2 align-top' : 'py-2 align-top'} colSpan={label ? 1 : 2}>
                              {value}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </section>
              ) : null}

              <div className="mt-10">
                <ArticleBody body={article.body} media={article.media} />
              </div>

              {article.gallery.length > 0 ? (
                <section className="mt-12 flex flex-col gap-4">
                  <h2 className="text-2xl font-bold text-neutral-1000">{t('gallery')}</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {article.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-4/3 overflow-hidden rounded-2xl bg-neutral-200"
                      >
                        <Image
                          src={image.url}
                          alt={image.alt ?? article.title}
                          fill
                          sizes="(min-width: 640px) 360px, 92vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              <BlogFaq items={article.faq} locale={locale} />

              <ArticleCta locale={locale} tutorName={article.tutorName} />

              {article.related.length > 0 ? (
                <section className="mt-12 flex flex-col gap-4">
                  <h2 className="text-2xl font-bold text-neutral-1000">{t('related')}</h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {article.related.map((related) => (
                      <ArticleCard key={related.id} article={related} locale={locale} />
                    ))}
                  </div>
                </section>
              ) : null}

              <div className="mt-12">
                <Link
                  href="/blog"
                  className="text-sm font-medium text-primary-600 underline underline-offset-4"
                >
                  {t('backToBlog')}
                </Link>
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents headings={headings} locale={locale} />
              </div>
            </aside>
          </div>
        </div>
      </div>
      <StickyConsultation />
    </>
  );
}
