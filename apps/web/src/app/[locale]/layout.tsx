import type { Metadata } from 'next';
import { Inter, Lexend_Deca } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import '../../index.css';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Providers from '@/components/providers';
import JsonLdProvider from '@/components/seo/json-ld-provider';
import { routing } from '@/i18n/routing';
import { BASE_URL } from '@/lib/constants';
import NotFound from './not-found';

const lexendDeca = Lexend_Deca({
  variable: '--font-lexend-deca',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === 'id';

  const title = isId
    ? 'Cogito Academy - Talent Incubator & Competition Training'
    : 'Cogito Academy - Talent Incubator & Competition Training';

  const description = isId
    ? 'Cogito Academy adalah talent incubator yang memiliki misi untuk membentuk cendekiawan-juara kelas dunia. transformation potensi siswa menjadi prestasi terukur melalui metode pelatihan yang telah teruji.'
    : 'Cogito Academy is a talent incubator with a mission to shape world-class scholar-champions. We systematically transform student potential into measurable achievements through proven training methods.';

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: [
      'Cogito Academy',
      'bimbel kompetisi',
      'talent incubator',
      'MUN',
      'Model United Nations',
      "World Scholar's Cup",
      'Debate',
      'Olympiad',
      'champion tutors',
      'competition training',
      'Indonesia',
    ],
    authors: [{ name: 'Cogito Academy' }],
    creator: 'Cogito Academy',
    publisher: 'Cogito Academy',
    formatDetection: {
      email: false,
      address: false,
    },
    openGraph: {
      type: 'website',
      locale: isId ? 'id_ID' : 'en_US',
      url: BASE_URL,
      siteName: 'Cogito Academy',
      title,
      description,
      images: [
        {
          url: `${BASE_URL}/og-image-cogito.jpg`,
          width: 1200,
          height: 630,
          alt: 'Cogito Academy',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og-image-cogito.jpg`],
      creator: '@cogitoacademy.id',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        id: `${BASE_URL}/id`,
        en: `${BASE_URL}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return <NotFound />;
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${lexendDeca.variable} ${inter.variable} min-h-screen antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          {locale === 'id' ? 'Lewati ke konten utama' : 'Skip to main content'}
        </a>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <JsonLdProvider />
            <Header />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
