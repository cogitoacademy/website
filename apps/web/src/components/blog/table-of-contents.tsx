import { getTranslations } from 'next-intl/server';

import type { BlogLocale } from '@/lib/blog-api';

type Heading = { id: string; text: string };

function HeadingList({ headings }: { headings: Heading[] }) {
  return (
    <ol className="flex flex-col gap-2 text-sm">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className="block text-neutral-600 leading-snug transition hover:text-primary-600"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

export async function TableOfContents({
  headings,
  locale,
}: {
  headings: Heading[];
  locale: BlogLocale;
}) {
  if (headings.length === 0) return null;
  const t = await getTranslations({ locale, namespace: 'blog.article' });

  return (
    <nav aria-label={t('tableOfContents')} className="flex flex-col gap-3">
      <p className="font-semibold text-neutral-1000 text-sm">{t('tableOfContents')}</p>

      <details className="rounded-xl bg-neutral-100 p-4 ring-1 ring-neutral-200 lg:hidden">
        <summary className="cursor-pointer font-medium text-neutral-800 text-sm">
          {t('tableOfContents')}
        </summary>
        <div className="mt-3">
          <HeadingList headings={headings} />
        </div>
      </details>

      <div className="hidden lg:block">
        <HeadingList headings={headings} />
      </div>
    </nav>
  );
}
