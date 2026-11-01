'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type Embed = {
  provider: 'instagram' | 'tiktok';
  url: string;
};

type Frame = {
  src: string;
  aspect: string;
  title: string;
};

function resolveFrame(embed: Embed): Frame | null {
  let parsed: URL;
  try {
    parsed = new URL(embed.url);
  } catch {
    return null;
  }

  if (embed.provider === 'instagram') {
    const match = parsed.pathname.match(/^\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
    if (!match) return null;
    const [, kind, shortcode] = match;
    return {
      src: `https://www.instagram.com/${kind}/${shortcode}/embed/`,
      aspect: kind === 'p' ? 'aspect-4/5' : 'aspect-9/16',
      title: 'Instagram embed',
    };
  }

  const match = parsed.pathname.match(/^\/@[^/]+\/video\/(\d+)/);
  if (!match) return null;
  return {
    src: `https://www.tiktok.com/embed/v2/${match[1]}`,
    aspect: 'aspect-9/16',
    title: 'TikTok embed',
  };
}

export function SocialEmbed({
  provider,
  url,
  posterUrl,
  posterAlt,
}: Embed & { posterUrl?: string | null; posterAlt?: string | null }) {
  const t = useTranslations('blog.embed');
  const [active, setActive] = useState(false);
  const frame = resolveFrame({ provider, url });
  const providerLabel = provider === 'instagram' ? 'Instagram' : 'TikTok';

  if (!frame) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex font-medium text-primary-600 text-sm underline underline-offset-4"
      >
        {t('watchOn', { provider: providerLabel })}
      </a>
    );
  }

  return (
    <figure className="my-8 flex flex-col items-center gap-3">
      <div
        className={`relative w-full max-w-[420px] overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-neutral-200 ${frame.aspect}`}
      >
        {active ? (
          <iframe
            src={frame.src}
            title={frame.title}
            loading="lazy"
            allow="encrypted-media; picture-in-picture; clipboard-write"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`${t('play')} — ${providerLabel}`}
            className="group absolute inset-0 flex size-full items-center justify-center"
          >
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={posterAlt ?? `${providerLabel} preview`}
                fill
                sizes="(min-width: 640px) 420px, 92vw"
                className="object-cover opacity-90 transition group-hover:opacity-100"
              />
            ) : (
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-secondary-700 to-neutral-900"
              />
            )}
            <span className="relative flex size-16 items-center justify-center rounded-full bg-white/90 text-neutral-1000 shadow-lg transition group-hover:scale-105">
              <Play aria-hidden className="ml-1 size-6 fill-current" />
            </span>
            <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 font-medium text-white text-xs">
              {providerLabel}
            </span>
          </button>
        )}
      </div>

      <figcaption className="flex max-w-[420px] flex-col items-center gap-1 text-center text-neutral-600 text-xs">
        <span>{t('privacy', { provider: providerLabel })}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary-600 underline underline-offset-4"
        >
          {t('watchOn', { provider: providerLabel })}
        </a>
      </figcaption>
    </figure>
  );
}
