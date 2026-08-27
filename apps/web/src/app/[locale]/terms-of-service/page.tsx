import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { LegalDocument } from '@/components/legal/legal-document';
import { BASE_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === 'id';
  const title = isId ? 'Ketentuan Layanan' : 'Terms of Service';
  const description = isId
    ? 'Ketentuan Layanan Cogito Digital dan Cogito Academy.'
    : 'Terms of Service for Cogito Digital and Cogito Academy.';

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/terms-of-service`,
    },
  };
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalDocument locale={locale === 'id' ? 'id' : 'en'} type="terms" />;
}
