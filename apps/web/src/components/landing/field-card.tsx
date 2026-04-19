import { cn } from '@/lib/utils';
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  // ResponsiveModalDescription,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from '../ui/responsive-modal';
import type { Skill } from './skills-section';
import { buttonVariants } from '../ui/button';
import { ArrowRightIcon, XIcon } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { Badge } from '../ui/badge';

const colorBgMap: Record<string, string> = {
  'tertiary-blue-500': 'bg-tertiary-blue-500',
  'tertiary-red-600': 'bg-tertiary-red-600',
  'tertiary-yellow-600': 'bg-tertiary-yellow-600',
  'primary-500': 'bg-primary-500',
  'secondary-500': 'bg-secondary-500',
  'tertiary-green-600': 'bg-tertiary-green-600',
  'tertiary-pink-300': 'bg-tertiary-pink-300',
};

const _colorOverlayMap: Record<string, string> = {
  'tertiary-blue-500': 'from-tertiary-blue-500/90',
  'tertiary-red-600': 'from-tertiary-red-600/90',
  'tertiary-yellow-600': 'from-tertiary-yellow-600/90',
  'primary-500': 'from-primary-500/90',
  'secondary-500': 'from-secondary-500/90',
  'tertiary-green-600': 'from-tertiary-green-600/90',
  'tertiary-pink-300': 'from-tertiary-pink-300/90',
};

const colorTextMap: Record<string, string> = {
  'tertiary-blue-500': 'text-tertiary-blue-300',
  'tertiary-red-600': 'text-tertiary-red-500',
  'tertiary-yellow-600': 'text-tertiary-yellow-300',
  'primary-500': 'text-primary-300',
  'secondary-500': 'text-secondary-300',
  'tertiary-green-600': 'text-tertiary-green-300',
  'tertiary-pink-300': 'text-tertiary-pink-100',
};

export default function FieldCard({ skill, isId }: { skill: Skill; isId: boolean }) {
  const { color } = skill;
  const title = isId ? skill.titleId : skill.titleEn;
  const description = isId ? skill.descriptionId : skill.descriptionEn;
  // const longDescription = isId
  //   ? skill.longDescriptionId
  //   : skill.longDescriptionEn;

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger>
        <div
          className={cn(
            'h-fit w-full cursor-pointer rounded-xl pt-4 sm:w-88 sm:flex-none',
            colorBgMap[color],
          )}
        >
          <div className="flex items-center justify-between rounded-xl bg-neutral-100 p-5 shadow-inset-top">
            <div className="w-full text-start">
              <h4 className="font-semibold text-lg leading-tight">{title}</h4>
              <p className="text-xs">{description}</p>
            </div>

            <div className={cn(buttonVariants({ variant: 'gray', size: 'icon-lg' }))}>
              <ArrowRightIcon weight="bold" className="text-neutral-1000" />
            </div>
          </div>
        </div>
      </ResponsiveModalTrigger>

      <ResponsiveModalContent
        side="bottom"
        showCloseButton={false}
        className={cn(
          'w-full gap-0 overflow-hidden rounded-t-2xl border-none p-0 sm:max-w-lg lg:max-w-5xl sm:rounded-t-2xl pt-4',
          `bg-${color}`,
        )}
      >
        <div className="rounded-t-2xl overflow-hidden">
          {/* ── Header: image + color overlay ── */}
          <div className="relative h-40 md:h-36 w-full overflow-hidden">
            <Image src="/modal-banner.webp" alt={title} fill className="object-cover grayscale" />

            {/* gradient overlay */}
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-t to-transparent',
                'bg-neutral-1000/70',
              )}
            />

            {/* Close button — top left */}
            <ResponsiveModalClose className="">
              <div
                className={cn(
                  'absolute top-4 right-4 z-20 h-8 w-8 rounded-md sm:right-auto sm:left-4',
                  buttonVariants({ variant: 'secondary', size: 'icon' }),
                )}
              >
                <XIcon className="h-4 w-4" weight="bold" />
                <span className="sr-only">{isId ? 'Tutup' : 'Close'}</span>
              </div>
            </ResponsiveModalClose>

            <div className="absolute right-0 bottom-0 left-0 p-4 pb-3 flex items-center justify-between flex-wrap gap-2">
              {/* Title + subtitle — bottom left */}
              <div className="">
                <ResponsiveModalTitle
                  className={cn(
                    'font-bold text-xl leading-tight',
                    colorTextMap[color] ?? 'text-white',
                  )}
                >
                  {title}
                </ResponsiveModalTitle>
                {/*<ResponsiveModalDescription
                  className={cn(
                    "text-sm",
                    colorTextMap[color] ?? "text-white/90",
                  )}
                >
                  {description}
                </ResponsiveModalDescription>*/}
              </div>

              {/* Level badges — bottom right */}
              <div className="flex flex-wrap justify-end gap-2">
                {skill.levels.map((level) => (
                  <Badge key={level} variant="headline-primary">
                    {level}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="bg-background p-5">
            <p className="text-neutral-700 text-sm leading-relaxed">{description}</p>

            <div className="mt-5">
              <p className="font-semibold text-neutral-900 text-sm">
                {isId ? 'Fokus Pembelajaran Utama' : 'Main Learning Focus'}
              </p>
              <ul className="mt-3 flex flex-col gap-2 md:gap-4 xl:gap-6 lg:grid lg:grid-cols-3">
                {skill.focuses.map((focus) => {
                  const FocusIcon = focus.icon;
                  return (
                    <li
                      key={focus.labelEn}
                      className="flex items-center gap-3 rounded-lg p-4 bg-background-cream ring-1 ring-border"
                    >
                      <FocusIcon
                        className="size-7 shrink-0 text-neutral-10000 p-1 rounded-sm bg-secondary-100"
                        // weight="bold"
                      />
                      <span className="text-sm">{isId ? focus.labelId : focus.labelEn}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
