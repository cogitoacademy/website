'use client';

import { GlobeIcon } from '@phosphor-icons/react/dist/ssr';
import { useLocale } from 'next-intl';
import { type ButtonProps, buttonVariants } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useLocaleAlternate } from './locale-alternate';

interface LanguageToggleProps {
  className?: string;
  variant?: ButtonProps['variant'];
}

export default function LanguageToggle({ className, variant = 'default' }: LanguageToggleProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const alternate = useLocaleAlternate();

  const targetLocale = locale === 'en' ? 'id' : 'en';
  const fallback = pathname.startsWith('/blog/') ? '/blog' : pathname;
  const href = alternate?.locale === targetLocale ? alternate.path : fallback;

  return (
    <Link
      href={href}
      locale={targetLocale}
      scroll={false}
      className={cn(
        buttonVariants({ size: 'lg', variant }),
        'transition-colors cursor-default',
        className,
      )}
    >
      <GlobeIcon className="size-5" />
      {targetLocale.toUpperCase()}
    </Link>
  );
}
