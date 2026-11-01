'use client';

/* eslint-disable react-dom/no-dangerously-set-inner-html -- JSON-LD requires stringified JSON for SEO */
import Script from 'next/script';

import { BASE_URL } from '@/lib/constants';
import type { PublicFaq } from '@/types/faq';

interface OrganizationJsonLdProps {
  locale?: string;
}

export function OrganizationJsonLd({ locale = 'id' }: OrganizationJsonLdProps) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cogito Academy',
    description:
      locale === 'id'
        ? 'Talent incubator yang memiliki misi untuk membentuk cendekiawan-juara kelas dunia'
        : 'A talent incubator with a mission to shape world-class scholar-champions',
    url: BASE_URL,
    logo: `${BASE_URL}/cogito-academy-logo.webp`,
    image: `${BASE_URL}/cogito-academy-logo.webp`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
      addressLocality: 'Indonesia',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-8810-1199-0195',
      contactType: 'customer service',
      email: 'cogitoacademy.id@gmail.com',
    },
    sameAs: ['https://www.instagram.com/cogitoacademy.id/', 'https://wa.me/62881011990195'],
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    availableLanguage: ['Indonesian', 'English'],
  };

  return (
    <Script
      id="organization-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  );
}

interface CourseJsonLdProps {
  locale?: string;
}

export function CourseJsonLd({ locale = 'id' }: CourseJsonLdProps) {
  const courses = [
    {
      '@type': 'Course',
      name: locale === 'id' ? 'Kelas Reguler' : 'Regular Classes',
      description:
        locale === 'id'
          ? 'Kursus terstruktur dengan kurikulum holistik untuk MUN, WSC, dan Debat'
          : 'Structured courses with holistic curriculum for MUN, WSC, and Debate',
      provider: {
        '@type': 'Organization',
        name: 'Cogito Academy',
      },
    },
    {
      '@type': 'Course',
      name: locale === 'id' ? 'Kelas Intensif' : 'Intensive Classes',
      description:
        locale === 'id'
          ? 'Program persiapan on-demand untuk kompetisi tertentu'
          : 'On-demand preparation programs for specific competitions',
      provider: {
        '@type': 'Organization',
        name: 'Cogito Academy',
      },
    },
    {
      '@type': 'Course',
      name: locale === 'id' ? 'Kelas Ekstrakurikuler' : 'Extracurricular Classes',
      description:
        locale === 'id'
          ? 'Program pelatihan rutin berdasarkan kebutuhan sekolah'
          : 'Regular training programs based on school needs',
      provider: {
        '@type': 'Organization',
        name: 'Cogito Academy',
      },
    },
  ];

  return (
    <Script
      id="course-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(courses) }}
    />
  );
}

export function FAQJsonLd({ items }: { items: PublicFaq[] }) {
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
          .map((block) => (block.type === 'paragraph' ? block.text : block.items.join(' ')))
          .join('\n\n'),
      },
    })),
  };

  return (
    <Script
      id="faq-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, '\\u003c') }}
    />
  );
}
