'use client';

import { ArrowRightIcon, AwardIcon, BadgeCheckIcon, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalTitle,
} from '@/components/ui/responsive-modal';
import { APP_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import { LearningScene } from './learning-scene';

interface ModalContent {
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  badge: string;
  href: string;
}

function getModalContent(
  tutorType: string | undefined,
  t: (key: string) => string,
  locale: string,
): ModalContent {
  const kind =
    tutorType === 'onDemand' ? 'regular' : tutorType === 'cohort' ? 'intensive' : 'extracurricular';
  const prefix = `hero.modal.${kind}`;
  return {
    title: t(`${prefix}.title`),
    description: t(`${prefix}.description`),
    features: [0, 1, 2].map((index) => t(`${prefix}.features.${index}`)),
    ctaText: t(`${prefix}.cta`),
    badge: t(`${prefix}.badge`),
    href:
      tutorType === 'onDemand'
        ? `${APP_URL}/tutors`
        : tutorType === 'cohort'
          ? `/${locale}/activities`
          : 'https://wa.me/62881011990195',
  };
}

function ModalImageHeader({ content }: { content: ModalContent }) {
  return (
    <div className="relative h-[200px] shrink-0 overflow-hidden bg-[#A855F7] md:h-50">
      <Image
        src="/modal-banner.webp"
        alt="Class in Cogito Academy"
        fill
        className="object-cover object-top"
        sizes="(max-width: 640px) 100vw, 40vw"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-black opacity-70" />
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-4">
        <div className="flex-1">
          <ResponsiveModalTitle className="font-bold text-2xl text-white leading-none tracking-tight">
            {content.title}
          </ResponsiveModalTitle>
          <p className="mt-1 line-clamp-2 max-w-lg text-sm text-white/90 sm:line-clamp-none">
            {content.description ?? 'Deskripsi tidak tersedia'}
          </p>
        </div>
        <Badge variant="headline-primary" className="lg:text-xs">
          {content.badge}
        </Badge>
      </div>
    </div>
  );
}

function ClassModalContent({ content }: { content: ModalContent }) {
  return (
    <div>
      <ul className="space-y-3">
        {content.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-neutral-1000">
            <BadgeCheckIcon className="mt-0.5 size-4 shrink-0 text-primary-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        render={<Link href={{ pathname: content.href }} />}
        nativeButton={false}
        className="mt-6 w-full"
        size="md"
      >
        {content.ctaText}
      </Button>
    </div>
  );
}

export function ClassCard({
  className,
  innerClassName,
  title = 'Judul tidak tersedia',
  description = 'Deskripsi tidak tersedia',
  tags,
  isActiveTrigger,
  tutorType,
}: {
  className?: string;
  innerClassName?: string;
  title: string;
  description: string;
  tags: string[];
  isActiveTrigger?: boolean;
  tutorType?: string;
}) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations();
  const modalContent = getModalContent(tutorType, t, locale);

  const handleClick = () => {
    if (tutorType) {
      setOpen(true);
    }
  };

  return (
    <>
      <div
        className={`overflow-hidden rounded-2xl ${className} relative md:min-h-100 ${
          tutorType ? 'cursor-pointer' : ''
        }`}
        onClick={handleClick}
      >
        <AnimatePresence initial={false}>
          {isActiveTrigger && (
            <motion.div
              key="trigger"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="my-3 flex w-full items-center justify-between px-5 sm:px-6">
                <p className="text-sm lg:text-base">{t('common.readMore')}</p>
                <ArrowRightIcon className="size-4 lg:size-5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ marginTop: isActiveTrigger ? 0 : 12 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            'flex min-h-full flex-col gap-3 rounded-2xl p-5 sm:p-6',
            innerClassName ?? '',
          )}
        >
          <h2 className="font-bold text-neutral-1000 text-xl sm:text-2xl">{title}</h2>
          <p className="line-clamp-2 text-neutral-1000 text-sm lg:line-clamp-none">{description}</p>
          <LearningScene className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={tag}
                data-scene="reveal"
                style={{ animationDelay: `${index * 180}ms` }}
                className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100/80 px-3 py-1.5 font-medium text-neutral-1000 text-xs"
              >
                {index === 0 && <Users className="size-4" />}
                {index === 1 && <AwardIcon className="size-4" />}
                {tag}
              </span>
            ))}
          </LearningScene>
        </motion.div>
      </div>

      <ResponsiveModal open={open} onOpenChange={setOpen}>
        <ResponsiveModalContent
          side={'bottom'}
          style={{ maxHeight: '75dvh' }}
          className={cn(
            'flex flex-col overflow-hidden rounded-t-2xl border-none p-0 sm:max-w-[600px] sm:rounded-lg',
            'lg:max-w-2xl',
          )}
        >
          <ModalImageHeader content={modalContent} />
          <div className="min-h-0 flex-1 overflow-y-auto p-4 pt-0">
            <ClassModalContent content={modalContent} />
          </div>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
