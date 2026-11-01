'use client';

import { useParams } from 'next/navigation';
import { CourseJsonLd, OrganizationJsonLd } from './json-ld';

export default function JsonLdProvider() {
  const params = useParams();
  const locale = (params?.locale as string) || 'id';

  return (
    <>
      <OrganizationJsonLd locale={locale} />
      <CourseJsonLd locale={locale} />
    </>
  );
}
