import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { BASE_URL } from '@/lib/constants';

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
