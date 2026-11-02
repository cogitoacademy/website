import { getTranslations } from 'next-intl/server';

import type { BlogLocale } from '@/lib/blog-api';

export async function BlogFaq({
  items,
  locale,
}: {
  items: { question: string; answer: string }[];
  locale: BlogLocale;
}) {
  if (items.length === 0) return null;
  const t = await getTranslations({ locale, namespace: 'blog.article' });

  return (
    <section aria-labelledby="article-faq-heading" className="mt-12 flex flex-col gap-4">
      <h2 id="article-faq-heading" className="font-bold text-2xl text-neutral-1000">
        {t('faq')}
      </h2>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <details
            key={index}
            className="group rounded-xl bg-neutral-100 p-5 ring-1 ring-neutral-200"
          >
            <summary className="cursor-pointer font-semibold text-neutral-1000 leading-snug">
              {item.question}
            </summary>
            <p className="mt-3 text-neutral-700 leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
