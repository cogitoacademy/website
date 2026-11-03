import { ChatsCircleIcon } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import type { BlogLocale } from '@/lib/blog-api';
import { WHATSAPP_URL } from './sticky-consultation';

export async function ArticleCta({
  locale,
  tutorName,
}: {
  locale: BlogLocale;
  tutorName: string | null;
}) {
  const t = await getTranslations({ locale, namespace: 'blog.article' });

  return (
    <section className="relative mt-12 overflow-hidden rounded-2xl bg-neutral-100 p-6 ring-1 ring-neutral-200">
      <div className="relative z-10 max-w-[420px]">
        <h2 className="font-bold text-xl text-gray-900 leading-tight sm:text-2xl">
          {t('ctaTitle')}
        </h2>
        <p className="mt-2 text-gray-700 text-xs sm:text-sm">
          {tutorName
            ? `${t('ctaDescription')} ${locale === 'id' ? `Bersama ${tutorName}.` : `With ${tutorName}.`}`
            : t('ctaDescription')}
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex"
        >
          <Button size="md">
            <span>{t('ctaButton')}</span>
            <ChatsCircleIcon weight="duotone" color="#ffffff" className="size-4" />
          </Button>
        </a>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute right-0 bottom-0 size-48 translate-x-1/4 translate-y-1/4 rounded-full bg-secondary-300 md:size-60" />
        <div className="absolute top-6 right-16 size-8 rounded-full bg-secondary-200 md:right-28" />
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 hidden h-full md:block">
        <Image
          src="/person-with-laptop.webp"
          alt=""
          width={925}
          height={443}
          quality={100}
          className="relative z-10 h-full w-auto rounded-br-3xl object-contain object-bottom"
        />
      </div>
    </section>
  );
}
