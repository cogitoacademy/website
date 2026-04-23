import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { checkAccess } from '@/actions/auth';
import NavbarResolver from '@/components/navbar-resolver';
import { PasswordGate } from '@/components/student-resources/password-gate';
import { ResourceList } from '@/components/student-resources/resource-list';
import { BASE_URL } from '@/lib/constants';
import { STUDENT_RESOURCES_QUERY } from '@/queries/studentResources';
import { client } from '@/sanity/client';

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
      canonical: `${BASE_URL}/${locale}/student-resources`,
    },
  };
}

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function StudentResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('studentResources');
  const hasAccess = await checkAccess();

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background-cream">
        <PasswordGate />
      </div>
    );
  }

  let resources;
  try {
    resources = await client.fetch(STUDENT_RESOURCES_QUERY);
  } catch {
    resources = [];
  }

  return (
    <div className="bg-background-cream">
      <NavbarResolver />
      <div className="relative z-3 mx-auto min-h-screen max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="font-semibold text-2xl text-neutral-1000 sm:max-w-[500px] sm:text-3xl md:max-w-2xl md:text-4xl lg:max-w-3xl lg:text-5xl min-[450px]:max-w-[420px]">
            {t('title')}
          </h1>
          <p className="mt-2">{t('subtitle')}</p>
        </div>

        <ResourceList resources={resources} />
      </div>
    </div>
  );
}
