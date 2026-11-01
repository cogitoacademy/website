// import "@cogito-acad/env/web";
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

type RemotePattern = { protocol: 'http' | 'https'; hostname: string };

function r2RemotePatterns(): RemotePattern[] {
  const raw = process.env.NEXT_PUBLIC_R2_HOST;
  if (!raw) return [];
  try {
    const url = new URL(raw.includes('://') ? raw : `https://${raw}`);
    return [
      {
        protocol: url.protocol === 'http:' ? 'http' : 'https',
        hostname: url.hostname,
      },
    ];
  } catch {
    console.warn('NEXT_PUBLIC_R2_HOST is not a valid URL; blog images will fail.');
    return [];
  }
}

const localImagePatterns: RemotePattern[] =
  process.env.NODE_ENV === 'production'
    ? []
    : [
        { protocol: 'http', hostname: 'localhost' },
        { protocol: 'http', hostname: '127.0.0.1' },
      ];

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      ...r2RemotePatterns(),
      ...localImagePatterns,
    ],
    qualities: [25, 50, 75, 100],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  async redirects() {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.cogitoacademy.id';
    return [
      {
        source: '/:locale(id|en)/events/:category(townhall-and-101-series|simulation-days)',
        destination: '/:locale/activities',
        permanent: true,
      },
      {
        source: '/:locale(id|en)/student-resources/:path*',
        destination: `${appUrl}/knowledge-bank`,
        permanent: true,
      },
      {
        source: '/student-resources/:path*',
        destination: `${appUrl}/knowledge-bank`,
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
