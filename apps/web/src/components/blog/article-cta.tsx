import { getTranslations } from 'next-intl/server';

import type { BlogLocale } from '@/lib/blog-api';
import { WHATSAPP_URL } from './sticky-consultation';

export async function ArticleCta({
  locale,
  tutorName,
}: {
  locale: BlogLocale;
  tutorName: string | null;
}) {
  const t = await getTranslations({ locale, namespace: 'blog.article' });

  return (
    <section className="mt-12 rounded-2xl bg-secondary-100 p-6 ring-1 ring-secondary-200">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
        {t('ctaEyebrow')}
      </p>
      <h2 className="mt-2 text-2xl font-bold text-neutral-1000">{t('ctaTitle')}</h2>
      <p className="mt-2 max-w-2xl text-neutral-700 leading-relaxed">
        {tutorName
          ? `${t('ctaDescription')} ${locale === 'id' ? `Bersama ${tutorName}.` : `With ${tutorName}.`}`
          : t('ctaDescription')}
      </p>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex rounded-lg bg-primary-500 px-5 py-3 font-medium text-sm text-white transition hover:bg-primary-600"
      >
        {t('ctaButton')}
      </a>
    </section>
  );
}
