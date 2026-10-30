'use client';

import { MapPinIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { getCoreCategoryBadgeColor } from '@/lib/colors/brandColors';
import type { Tutor } from '@/types/tutor';
import { Badge } from './ui/badge';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from './ui/sheet';

interface TutorDetailModalProps {
  tutor: Tutor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Helper: ambil value berdasarkan locale
 * fallback ke item pertama kalau locale ga ketemu
 */
const getLocalizedValue = (arr?: { _key: string; value: string }[], locale?: string) =>
  arr?.find((item) => item._key === locale)?.value || arr?.[0]?.value || '';

export default function TutorDetailModal({ tutor, open, onOpenChange }: TutorDetailModalProps) {
  const locale = useLocale();
  const t = useTranslations('tutors');

  // Normalized data
  const affiliation = getLocalizedValue(tutor.affiliation, locale);
  const achievements = tutor.achievements?.map((a) => getLocalizedValue(a.text, locale)) || [];
  const experiences = tutor.experiences?.map((e) => getLocalizedValue(e.text, locale)) || [];

  const badges = tutor.competitionFields?.map((field) => (
    <Badge
      key={field._id}
      variant={'tutor'}
      className={`${getCoreCategoryBadgeColor(field.coreCategory)}`}
    >
      {field.name || (locale === 'id' ? 'Bidang Tidak Diketahui' : 'Unknown Field')}
    </Badge>
  ));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex w-full max-h-[90dvh] flex-col gap-0 overflow-y-auto rounded-t-2xl border-none bg-background p-0 text-base sm:data-[side=bottom]:inset-x-auto sm:data-[side=bottom]:inset-y-0 sm:data-[side=bottom]:right-0 sm:data-[side=bottom]:h-dvh sm:max-h-dvh sm:w-full sm:max-w-xl sm:rounded-none sm:data-[side=bottom]:data-open:slide-in-from-bottom-0 sm:data-[side=bottom]:data-closed:slide-out-to-bottom-0 sm:data-[side=bottom]:data-open:slide-in-from-right-10 sm:data-[side=bottom]:data-closed:slide-out-to-right-10"
        showCloseButton={false}
      >
        {/* Left/Top: Image Section */}
        <div className="relative h-[240px] shrink-0 overflow-hidden bg-[#A855F7] sm:h-[280px]">
          {/* Main Image */}
          {tutor.profilePicture?.asset?.url && (
            <Image
              src={tutor.profilePicture.asset.url}
              alt={tutor.profilePicture.asset.altText || tutor.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 576px"
            />
          )}

          {/* Gradient Overlay for Text Readability (Mobile) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent sm:hidden" />

          {/* Mobile Badges Overlay */}
          <div className="absolute right-4 bottom-4 left-4 z-10 flex flex-wrap gap-2 sm:hidden">
            {badges}
          </div>

          {/* Custom Close Button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 z-20 h-8 w-8 rounded-md bg-white/90 text-black shadow-sm hover:bg-white"
            onClick={() => onOpenChange(false)}
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">{locale === 'id' ? 'Tutup' : 'Close'}</span>
          </Button>
        </div>

        {/* Right/Bottom: Content Section */}
        <div className="bg-background">
          <div className="p-6">
            {/* Header Info */}
            <div className="space-y-3">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <SheetTitle className="font-bold text-2xl text-foreground leading-none tracking-tight sm:text-3xl">
                  {tutor.name}
                </SheetTitle>

                {/* Desktop Badges */}
                <div className="hidden max-w-[50%] flex-wrap justify-end gap-2 sm:flex">
                  {badges}
                </div>
              </div>

              {affiliation && (
                <p className="leading -none font-medium text-base text-neutral-1000">
                  {affiliation}
                </p>
              )}

              {/* Locations / Status */}
              <div className="flex flex-wrap gap-3">
                {tutor.locations && tutor.locations.length > 0 && (
                  <div className="inline-flex items-center gap-2 rounded-md bg-background-primary px-3 py-1.5 font-medium text-neutral-1000 text-sm">
                    <MapPinIcon className="h-4 w-4" />
                    <span className="capitalize">
                      {tutor.locations.map((loc) => loc.replace(/_/g, ' ')).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Content Columns */}
            <div className="grid grid-cols-1 gap-4 pt-4 pb-[env(safe-area-inset-bottom)]">
              <div className="h-full space-y-1 rounded-xl bg-background-primary px-3 py-2">
                <h3 className="pb-0.5 font-semibold text-base text-foreground">
                  {t('achievements')}
                </h3>
                {achievements.length == 0 && (
                  <p className="text-muted-foreground/90 text-sm leading-relaxed">
                    {locale === 'id'
                      ? 'isinya sedang diracik, ditunggu ya!'
                      : 'Content is being prepared, stay tuned!'}
                  </p>
                )}
                {achievements.length > 0 && (
                  <ul className="list-outside list-disc space-y-2 px-4 text-muted-foreground/90 text-sm leading-relaxed">
                    {achievements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="h-full space-y-1 rounded-xl bg-background-primary px-3 py-2">
                <h3 className="pb-0.5 font-semibold text-base text-foreground">
                  {t('experiences')}
                </h3>
                {experiences.length == 0 && (
                  <p className="text-muted-foreground/90 text-sm leading-relaxed">
                    {locale === 'id'
                      ? 'isinya sedang diracik, ditunggu ya!'
                      : 'Content is being prepared, stay tuned!'}
                  </p>
                )}
                {experiences.length > 0 && (
                  <ul className="list-outside list-disc space-y-2 px-4 text-muted-foreground/90 text-sm leading-relaxed">
                    {experiences.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
