import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FaqSection } from '@/components/landing/faq-section';
import { FAQJsonLd } from '@/components/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import { getPublicFaq } from '@/lib/faq';
import { tryLoadPublicFaq } from '@/lib/faq-api';
import type { FaqLocale } from '@/types/faq';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq.header' });
  const title = `${t('title')}${t('titleHighlight')}`;

  return {
    title,
    description: t('subtitle'),
    alternates: { canonical: `${BASE_URL}/${locale}/faq` },
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'id') notFound();
  setRequestLocale(locale);

  const faqLocale: FaqLocale = locale;
  const result = await tryLoadPublicFaq(() => getPublicFaq(faqLocale, 'full'));

  if (result.status === 'failure') {
    console.error('Full FAQ request failed', result.error);
    return <FaqSection items={[]} hasError />;
  }

  const { items } = result;

  return (
    <>
      <FAQJsonLd items={items} />
      <FaqSection items={items} />
    </>
  );
}
