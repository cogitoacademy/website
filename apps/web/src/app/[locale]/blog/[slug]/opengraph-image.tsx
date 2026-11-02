import { ImageResponse } from 'next/og';

import { getBlogArticle, isBlogLocale } from '@/lib/blog-api';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Cogito Academy blog article';
export const revalidate = 60;

function Card({
  title,
  category,
  heroUrl,
}: {
  title: string;
  category?: string;
  heroUrl?: string | null;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#fdf9f6',
        color: '#333333',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          width: 760,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 56px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 14, height: 14, background: '#ff6801', borderRadius: 999 }} />
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 1 }}>COGITO ACADEMY</div>
          </div>
          {category ? (
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                background: '#ffe1cc',
                color: '#df5a00',
                borderRadius: 999,
                padding: '8px 20px',
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {category}
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 80 ? 46 : 56,
              fontWeight: 800,
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#777777' }}>cogitoacademy.id/blog</div>
      </div>

      <div
        style={{
          width: 440,
          height: '100%',
          display: 'flex',
          background: '#ffe1cc',
        }}
      >
        {heroUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- Satori renders a raw image, not a DOM img.
          <img
            src={heroUrl}
            alt=""
            width={440}
            height={630}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #eddbf4 0%, #ffe1cc 100%)',
              fontSize: 40,
              fontWeight: 800,
              color: '#df5a00',
            }}
          >
            Blog
          </div>
        )}
      </div>
    </div>
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isBlogLocale(locale)) {
    return new ImageResponse(<Card title="Cogito Academy Blog" />, size);
  }

  try {
    const article = await getBlogArticle(locale, slug);
    return new ImageResponse(
      <Card
        title={article.title}
        category={article.category.title}
        heroUrl={article.hero?.url ?? null}
      />,
      size,
    );
  } catch {
    return new ImageResponse(<Card title="Cogito Academy Blog" />, size);
  }
}
