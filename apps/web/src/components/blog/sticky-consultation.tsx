'use client';

import { MessageCircle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const WHATSAPP_URL = 'https://wa.me/62881011990195';

export function StickyConsultation() {
  const t = useTranslations('blog.consultation');
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setVisible(false);
        return;
      }
      const progress = window.scrollY / scrollable;
      const nearEnd =
        window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 520;
      setVisible(progress > 0.5 && !nearEnd);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <aside className="fixed right-4 bottom-4 z-30 w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-neutral-100 p-5 shadow-xl ring-1 ring-neutral-200">
      <button
        type="button"
        aria-label={t('dismiss')}
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 rounded-full p-1 text-neutral-500 transition hover:bg-neutral-200 hover:text-neutral-800"
      >
        <X aria-hidden className="size-4" />
      </button>

      <p className="font-semibold text-primary-600 text-xs uppercase tracking-wide">
        {t('eyebrow')}
      </p>
      <p className="mt-2 font-bold text-lg text-neutral-1000 leading-snug">{t('title')}</p>
      <p className="mt-1 text-neutral-600 text-sm leading-relaxed">{t('description')}</p>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 font-medium text-sm text-white transition hover:bg-primary-600"
      >
        <MessageCircle aria-hidden className="size-4" />
        {t('cta')}
      </a>
    </aside>
  );
}
