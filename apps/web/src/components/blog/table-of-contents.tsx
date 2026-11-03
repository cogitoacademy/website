import { getTranslations } from 'next-intl/server';

import type { BlogLocale } from '@/lib/blog-api';
import { TableOfContentsList, type TocHeading } from './table-of-contents-list';

export async function TableOfContents({
  headings,
  locale,
}: {
  headings: TocHeading[];
  locale: BlogLocale;
}) {
  if (headings.length === 0) return null;
  const t = await getTranslations({ locale, namespace: 'blog.article' });

  return (
    <nav
      aria-label={t('tableOfContents')}
      className="group rounded-xl border border-neutral-200 bg-white p-5 lg:fixed lg:top-1/2 lg:right-4 lg:z-40 lg:-translate-y-1/2 lg:border-0 lg:bg-transparent lg:p-0"
    >
      <p className="font-semibold text-neutral-1000 text-sm lg:sr-only">{t('tableOfContents')}</p>
      <TableOfContentsList headings={headings} />
    </nav>
  );
}
