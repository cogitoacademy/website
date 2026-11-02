import { articlePath } from './blog-paths';
import { BASE_URL } from './constants';

export type BlogSitemapEntry = {
  articleId: string;
  locale: 'id' | 'en';
  slug: string;
  updatedAt: string;
  alternate: { locale: 'id' | 'en'; slug: string } | null;
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function alternateLinks(entry: BlogSitemapEntry) {
  const links = [
    `<xhtml:link rel="alternate" hreflang="${entry.locale}" href="${escapeXml(`${BASE_URL}${articlePath(entry.locale, entry.slug)}`)}"/>`,
  ];

  if (entry.alternate) {
    links.push(
      `<xhtml:link rel="alternate" hreflang="${entry.alternate.locale}" href="${escapeXml(`${BASE_URL}${articlePath(entry.alternate.locale, entry.alternate.slug)}`)}"/>`,
    );
    const indonesian =
      entry.locale === 'id' ? { locale: 'id' as const, slug: entry.slug } : entry.alternate;
    links.push(
      `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${BASE_URL}${articlePath(indonesian.locale, indonesian.slug)}`)}"/>`,
    );
  }

  return links.join('');
}

export function buildBlogSitemapXml(entries: BlogSitemapEntry[]) {
  const urls = entries.map((entry) => {
    const loc = `${BASE_URL}${articlePath(entry.locale, entry.slug)}`;
    const lastmod = new Date(entry.updatedAt).toISOString();
    return `<url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod>${alternateLinks(entry)}</url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`;
}
