import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { BASE_URL, KNOWLEDGE_BANK_URL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === 'id';

  const title = isId ? 'Bank Pengetahuan' : 'Knowledge Bank';
  const description = isId
    ? 'Akses materi eksklusif untuk memperkuat persiapan kompetisimu dalam Bank Pengetahuan.'
    : 'Access exclusive materials in the Knowledge Bank to strengthen your competition preparation.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `${BASE_URL}/og-image-cogito.jpg`,
          width: 1200,
          height: 630,
          alt: isId ? 'Bank Pengetahuan' : 'Knowledge Bank',
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [`${BASE_URL}/og-image-cogito.jpg`],
    },
    alternates: {
      canonical: KNOWLEDGE_BANK_URL,
    },
  };
}

export default async function StudentResourcesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  redirect(KNOWLEDGE_BANK_URL as any);
}
