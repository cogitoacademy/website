import { ChatCircleDots } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { Card } from '../ui/card';

interface ActionCardProps extends ComponentProps<typeof Card> {
  title: string;
  highlight?: string;
  description: string;
  action: {
    label: string;
    href: string;
  };
  image: {
    src: string;
    alt: string;
    className?: string;
  };
  theme?: 'pink' | 'blue';
}

export function ActionCard({
  title,
  highlight,
  description,
  action,
  image,
  theme = 'pink',
  className,
  ...props
}: ActionCardProps) {
  const themeColors = {
    pink: 'bg-tertiary-pink-200',
    blue: 'bg-tertiary-blue-200',
  };

  const circleColor = themeColors[theme];

  // Split title to highlight specific part if needed
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-2xl border-none bg-neutral-100 p-0 shadow-sm min-[405px]:min-h-[250px]',
        className,
      )}
      {...props}
    >
      <div className="flex h-full flex-col lg:flex-row">
        {/* Content Section */}
        <div className="relative z-10 justify-start p-5 sm:p-6 lg:p-8 h-full">
          <h3 className="mb-2 font-bold text-primary-500 text-xl sm:text-2xl">
            {highlight ? (
              <>
                {titleParts[0]}
                <span className="text-primary-500">{highlight}</span>
                {titleParts[1]}
              </>
            ) : (
              title
            )}
          </h3>
          <p className="mb-4 max-w-50 text-neutral-1000 text-xs sm:mb-6 sm:text-sm">
            {description}
          </p>
          <div className="mt-auto mb-0">
            {action.href.startsWith('http') ? (
              <a
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: 'md' }), 'gap-2 text-sm sm:text-base')}
              >
                <ChatCircleDots className="size-4 sm:size-5" />
                {action.label}
              </a>
            ) : (
              <Link
                href={action.href as import('next').Route}
                className={cn(buttonVariants({ size: 'md' }), 'gap-2 text-sm sm:text-base')}
              >
                <ChatCircleDots className="size-4 sm:size-5" />
                {action.label}
              </Link>
            )}
          </div>
        </div>

        {/* Image Section */}
        <div className="absolute right-0 bottom-0 min-h-[200px] w-full overflow-hidden h-full sm:min-h-[250px] lg:min-h-[300px] z-5">
          {/* Background Circle Decoration */}
          <div
            className={cn(
              'absolute -right-10 -bottom-10 z-0 size-48 rounded-full opacity-80 sm:size-64 lg:-right-20 lg:-bottom-20 lg:size-80',
              circleColor,
            )}
          />

          {/* Main Image */}
          <div className=" right-0 bottom-0 z-10 h-full w-full min-[405px]:block absolute hidden">
            <Image
              src={image.src}
              alt={image.alt}
              width={1000}
              quality={100}
              height={399}
              className={cn(
                'absolute right-0 bottom-0 w-auto object-contain object-right-bottom',
                image.className,
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
