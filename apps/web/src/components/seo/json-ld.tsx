"use client";

/* eslint-disable react-dom/no-dangerously-set-inner-html -- JSON-LD requires stringified JSON for SEO */
import Script from "next/script";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cogitoacademy.id";

interface OrganizationJsonLdProps {
  locale?: string;
}

export function OrganizationJsonLd({ locale = "id" }: OrganizationJsonLdProps) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Cogito Academy",
    description:
      locale === "id"
        ? "Talent incubator yang memiliki misi untuk membentuk cendekiawan-juara kelas dunia"
        : "A talent incubator with a mission to shape world-class scholar-champions",
    url: BASE_URL,
    logo: `${BASE_URL}/cogito-academy-logo.webp`,
    image: `${BASE_URL}/cogito-academy-logo.webp`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressLocality: "Indonesia",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-8810-1199-0195",
      contactType: "customer service",
      email: "cogitoacademy.id@gmail.com",
    },
    sameAs: ["https://www.instagram.com/cogitoacademy.id/", "https://wa.me/62881011990195"],
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    availableLanguage: ["Indonesian", "English"],
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

export function CourseJsonLd({ locale = "id" }: CourseJsonLdProps) {
  const courses = [
    {
      "@type": "Course",
      name: locale === "id" ? "Kelas Reguler" : "Regular Classes",
      description:
        locale === "id"
          ? "Kursus terstruktur dengan kurikulum holistik untuk MUN, WSC, dan Debat"
          : "Structured courses with holistic curriculum for MUN, WSC, and Debate",
      provider: {
        "@type": "Organization",
        name: "Cogito Academy",
      },
    },
    {
      "@type": "Course",
      name: locale === "id" ? "Kelas Intensif" : "Intensive Classes",
      description:
        locale === "id"
          ? "Program persiapan on-demand untuk kompetisi tertentu"
          : "On-demand preparation programs for specific competitions",
      provider: {
        "@type": "Organization",
        name: "Cogito Academy",
      },
    },
    {
      "@type": "Course",
      name: locale === "id" ? "Kelas Ekstrakurikuler" : "Extracurricular Classes",
      description:
        locale === "id"
          ? "Program pelatihan rutin berdasarkan kebutuhan sekolah"
          : "Regular training programs based on school needs",
      provider: {
        "@type": "Organization",
        name: "Cogito Academy",
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

interface FAQJsonLdProps {
  locale?: string;
}

export function FAQJsonLd({ locale = "id" }: FAQJsonLdProps) {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: locale === "id" ? "Apa itu Cogito Academy?" : "What is Cogito Academy?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            locale === "id"
              ? "Cogito Academy adalah talent incubator yang memiliki misi untuk membentuk cendekiawan-juara kelas dunia."
              : "Cogito Academy is a talent incubator with a mission to shape world-class scholar-champions.",
        },
      },
      {
        "@type": "Question",
        name:
          locale === "id"
            ? "Apa yang membedakan Cogito Academy?"
            : "What sets Cogito Academy apart?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            locale === "id"
              ? "Tutor kami adalah para juara kompetisi dan praktisi berpengalaman, kurikulum kami battle-tested, dan kami memberikan pendekatan personal."
              : "Our tutors are competition champions and experienced practitioners, our curriculum is battle-tested, and we provide a personal approach.",
        },
      },
      {
        "@type": "Question",
        name: locale === "id" ? "Program apa saja yang ditawarkan?" : "What programs are offered?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            locale === "id"
              ? "Kelas Reguler, Kelas Intensif, dan Kelas Ekstrakurikuler."
              : "Regular Classes, Intensive Classes, and Extracurricular Classes.",
        },
      },
    ],
  };

  return (
    <Script
      id="faq-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
    />
  );
}
