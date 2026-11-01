import { getBlogSitemap } from '@/lib/blog-api';
import { buildBlogSitemapXml } from '@/lib/blog-sitemap';

export const revalidate = 300;

export async function GET() {
  try {
    const entries = await getBlogSitemap();
    const xml = buildBlogSitemapXml(entries);

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Blog sitemap request failed', error);
    return new Response('Blog sitemap temporarily unavailable', {
      status: 503,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Retry-After': '300',
      },
    });
  }
}
