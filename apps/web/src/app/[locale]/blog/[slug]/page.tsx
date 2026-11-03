import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';
import { cache } from 'react';

import { ArticleBody } from '@/components/blog/article-body';
import { ArticleCard } from '@/components/blog/article-card';
import { ArticleCta } from '@/components/blog/article-cta';
import { ArticleJsonLd } from '@/components/blog/article-json-ld';
import { BlogErrorState } from '@/components/blog/blog-error-state';
import { BlogFaq } from '@/components/blog/blog-faq';
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
        <NavbarResolver className="bg-neutral-100" />
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
    block.type === 'heading'
      ? [{ id: blogHeadingId(index, block.text), text: block.text, level: block.level }]
      : [],
  );

  return (
    <>
      <ArticleJsonLd article={article} locale={locale} />
      <NavbarResolver className="bg-neutral-100" />
      <div className="bg-neutral-100 pb-40 text-neutral-1000">
        <div className="mx-auto max-w-3xl px-4">
          <article className="min-w-0">
              <Link
                href="/blog"
                className="mb-6 inline-flex items-center gap-1.5 font-medium text-primary-600 text-sm underline underline-offset-4 transition hover:text-primary-700"
              >
                <ArrowLeft aria-hidden className="size-4" />
                {t('backToBlog')}
              </Link>

              <header className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-neutral-500">
                  <span>{formatBlogDate(article.publishedAt, locale)}</span>
                  <span aria-hidden>·</span>
                  <span>
                    {locale === 'id' ? 'Tim Cogito Academy' : 'Cogito Academy team'}
                    {article.tutorName ? `${locale === 'id' ? ' dan ' : ' and '}${article.tutorName}` : ''}
                  </span>
                </div>

                <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {article.title}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-neutral-600">{article.lead}</p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-neutral-500">
                  {article.updatedAt !== article.publishedAt ? (
                    <span>{t('updated')} {formatBlogDate(article.updatedAt, locale)}</span>
                  ) : null}
                  {article.reviewerName ? (
                    <span>{locale === 'id' ? 'Ditinjau oleh' : 'Reviewed by'} {article.reviewerName}</span>
                  ) : null}
                </div>
              </header>

              {article.keyFacts.length > 0 ? (
                <section className="mt-8 rounded-r-lg border-l-2 border-primary-500 bg-neutral-100 p-5 ring-1 ring-neutral-200">
                  <h2 className="font-semibold text-neutral-1000">{t('keyFacts')}</h2>
                  <table className="mt-3 w-full border-collapse text-left leading-relaxed text-neutral-700">
                    <tbody>
                      {article.keyFacts.map((fact, index) => {
                        const separator = fact.text.indexOf(':');
                        const label = separator > 0 ? fact.text.slice(0, separator).trim() : '';
                        const value = separator > 0 ? fact.text.slice(separator + 1).trim() : fact.text;
                        return (
                          <tr key={index} className="border-t border-secondary-200 first:border-t-0 first:[&>th]:pt-0 first:[&>td]:pt-0 last:[&>th]:pb-0 last:[&>td]:pb-0">
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

              {article.hero ? (
                <figure className="mt-6 flex flex-col gap-2">
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200">
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

              {headings.length > 0 ? (
                <div className="mt-6">
                  <TableOfContents headings={headings} locale={locale} />
                </div>
              ) : null}

              <div className="mt-8">
                <ArticleBody body={article.body} media={article.media} />
              </div>

              <hr className="mt-10 border-neutral-200" />

              {article.gallery.length > 0 ? (
                <section className="mt-12 flex flex-col gap-4">
                  <h2 className="text-2xl font-bold text-neutral-1000">{t('gallery')}</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {article.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-4/3 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200"
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
          </article>
        </div>
      </div>
      <StickyConsultation />
    </>
  );
}
