import { getBlogArticles, isBlogLocale } from '@/lib/blog-api';
import { articlePath, blogHomePath } from '@/lib/blog-paths';
import { BASE_URL } from '@/lib/constants';

export const revalidate = 300;

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isBlogLocale(locale)) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const { rows } = await getBlogArticles(locale, 20, 1);
    const title =
      locale === 'id'
        ? 'Blog Cogito: Cerita Juara & Panduan Lomba'
        : 'Cogito Blog: Champion Stories & Competition Guides';
    const description =
      locale === 'id'
        ? 'Kisah tutor dan siswa Cogito, panduan kompetisi, dan info untuk orang tua.'
        : 'Stories from Cogito tutors and students, competition guides, and advice for parents.';

    const items = rows
      .map((article) => {
        const url = `${BASE_URL}${articlePath(locale, article.slug)}`;
        return `<item><title>${escapeXml(article.title)}</title><link>${escapeXml(url)}</link><guid>${escapeXml(url)}</guid><description>${escapeXml(article.excerpt)}</description><pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate></item>`;
      })
      .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(title)}</title><link>${escapeXml(`${BASE_URL}${blogHomePath(locale)}`)}</link><description>${escapeXml(description)}</description><language>${locale}</language>${items}</channel></rss>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Blog RSS request failed', error);
    return new Response('Blog feed temporarily unavailable', {
      status: 503,
      headers: { 'Retry-After': '300' },
    });
  }
}
