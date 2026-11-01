'use client';

import { LogoMarquee } from '@/components/interior/logo-marquee';

interface Logo {
  id: string;
  name: string;
  url: string;
}

export function LogoCloud({ logos }: { logos: Logo[] }) {
  return (
    <div className="w-full max-w-3xl px-4 pb-6">
      <LogoMarquee
        items={logos.map((logo) => ({
          id: logo.id,
          label: logo.name,
          mark: (
            <img
              src={logo.url || '/placeholder.svg'}
              alt=""
              className="h-8 w-auto max-w-40 object-contain sm:h-10 md:h-12"
            />
          ),
        }))}
        speed={22}
        gap={12}
        className="[--logo-marquee-gap:4px] sm:[--logo-marquee-gap:12px] border-0 bg-transparent shadow-none dark:bg-transparent dark:shadow-none [&_ul>li>span]:h-16 sm:[&_ul>li>span]:h-20 md:[&_ul>li>span]:h-24"
      />
    </div>
  );
}
