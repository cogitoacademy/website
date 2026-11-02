import { getLocale } from 'next-intl/server';
import FaqSectionV2 from '@/components/landing/faq-v2';
import { FAQJsonLd } from '@/components/seo/json-ld';
import { getPublicFaq } from '@/lib/faq';
import { tryLoadPublicFaq } from '@/lib/faq-api';
import type { FaqLocale } from '@/types/faq';

export default async function FaqSectionV2Section() {
  const locale = (await getLocale()) as FaqLocale;
  const result = await tryLoadPublicFaq(() => getPublicFaq(locale, 'landing'));

  if (result.status === 'failure') {
    console.error('Landing FAQ request failed', result.error);
    return null;
  }

  const { items } = result;

  return (
    <>
      <FAQJsonLd items={items} />
      <FaqSectionV2 items={items} />
    </>
  );
}
