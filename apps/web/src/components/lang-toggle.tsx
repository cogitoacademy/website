'use client';

import { GlobeIcon } from '@phosphor-icons/react/dist/ssr';
import { useLocale } from 'next-intl';
import { type ButtonProps, buttonVariants } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
  variant?: ButtonProps['variant'];
}

export default function LanguageToggle({ className, variant = 'default' }: LanguageToggleProps) {
  const locale = useLocale();
  const pathname = usePathname();

  const targetLocale = locale === 'en' ? 'id' : 'en';

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      scroll={false}
      className={cn(buttonVariants({ size: 'lg', variant }), 'transition-colors', className)}
    >
      <GlobeIcon className="size-5" />
      {targetLocale.toUpperCase()}
    </Link>
  );
}
