import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cogitoacademy.id';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;

  const staticPages = ['', '/tutors', '/calendar', '/contact', '/student-resources'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const staticPage of staticPages) {
      const url = `${BASE_URL}/${locale}${staticPage === '' ? '' : staticPage}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: staticPage === '' ? 'weekly' : 'monthly',
        priority: staticPage === '' ? 1 : 0.8,
      });
    }
  }

  return sitemapEntries;
}
