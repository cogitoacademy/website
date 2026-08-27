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
  const title = isId ? 'Kebijakan Privasi' : 'Privacy Policy';
  const description = isId
    ? 'Kebijakan Privasi Cogito Digital dan Cogito Academy.'
    : 'Privacy Policy for Cogito Digital and Cogito Academy.';

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/privacy-policy`,
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalDocument locale={locale === 'id' ? 'id' : 'en'} type="privacy" />;
}
