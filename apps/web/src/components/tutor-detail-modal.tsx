'use client';

import { Laptop, MapPinIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import type { Tutor, TutorSubject } from '@/types/tutor';
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

function subjectName(subject: TutorSubject, locale: string) {
  return locale === 'id' ? subject.nameId || subject.name : subject.name;
}

export default function TutorDetailModal({ tutor, open, onOpenChange }: TutorDetailModalProps) {
  const locale = useLocale();
  const t = useTranslations('tutors');
  const modalityLabel =
    tutor.modality === 'both'
      ? t('onlineAndOffline')
      : tutor.modality === 'online'
        ? t('online')
        : tutor.modality === 'offline'
          ? t('offline')
          : null;

  const badges = tutor.subjects.map((subject) => (
    <Badge
      key={subject.id}
      variant="tutor"
      className="bg-background-cream text-neutral-1000"
      style={{
        color: subject.parent.lightTextColor ?? undefined,
        backgroundColor: subject.parent.lightBackgroundColor ?? undefined,
      }}
    >
      {subjectName(subject, locale)}
    </Badge>
  ));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex w-full max-h-[90dvh] flex-col gap-0 overflow-y-auto rounded-t-2xl border-none bg-background p-0 text-base sm:data-[side=bottom]:inset-x-auto sm:data-[side=bottom]:inset-y-0 sm:data-[side=bottom]:right-0 sm:data-[side=bottom]:h-dvh sm:max-h-dvh sm:w-full sm:max-w-xl sm:rounded-none sm:data-[side=bottom]:data-open:slide-in-from-bottom-0 sm:data-[side=bottom]:data-closed:slide-out-to-bottom-0 sm:data-[side=bottom]:data-open:slide-in-from-right-10 sm:data-[side=bottom]:data-closed:slide-out-to-right-10"
        showCloseButton={false}
      >
        <div className="relative flex h-[240px] shrink-0 items-center justify-center overflow-hidden bg-muted sm:h-[280px]">
          {tutor.profileImageUrl ? (
            <Image
              src={tutor.profileImageUrl}
              alt={tutor.name}
              fill
              unoptimized
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 576px"
            />
          ) : (
            <span aria-hidden="true" className="font-semibold text-6xl text-muted-foreground">
              {tutor.name.slice(0, 1).toUpperCase()}
            </span>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent sm:hidden" />

          <div className="absolute right-4 bottom-4 left-4 z-10 flex flex-wrap gap-2 sm:hidden">
            {badges}
          </div>

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

        <div className="bg-background">
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <SheetTitle className="font-bold text-2xl text-foreground leading-none tracking-tight sm:text-3xl">
                  {tutor.name}
                </SheetTitle>

                <div className="hidden max-w-[50%] flex-wrap justify-end gap-2 sm:flex">
                  {badges}
                </div>
              </div>

              {tutor.affiliation && (
                <p className="font-medium text-base text-neutral-1000">{tutor.affiliation}</p>
              )}
              {tutor.shortBio && <p className="text-muted-foreground">{tutor.shortBio}</p>}

              {modalityLabel && (
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-md bg-background-primary px-3 py-1.5 font-medium text-neutral-1000 text-sm">
                    {tutor.modality !== 'offline' && (
                      <Laptop aria-hidden="true" className="h-4 w-4" />
                    )}
                    {tutor.modality !== 'online' && (
                      <MapPinIcon aria-hidden="true" className="h-4 w-4" />
                    )}
                    <span>{modalityLabel}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4 pb-[env(safe-area-inset-bottom)]">
              <section className="h-full space-y-1 rounded-xl bg-background-primary px-3 py-2">
                <h3 className="pb-0.5 font-semibold text-base text-foreground">{t('education')}</h3>
                {tutor.education.length === 0 ? (
                  <p className="text-muted-foreground/90 text-sm leading-relaxed">
                    {t('noProfileContent')}
                  </p>
                ) : (
                  <ul className="list-outside list-disc space-y-2 px-4 text-muted-foreground/90 text-sm leading-relaxed">
                    {tutor.education.map((education) => (
                      <li key={education.university + education.degree}>
                        {education.degree
                          ? education.degree + ' · ' + education.university
                          : education.university}
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="h-full space-y-1 rounded-xl bg-background-primary px-3 py-2">
                <h3 className="pb-0.5 font-semibold text-base text-foreground">
                  {t('achievements')}
                </h3>
                {tutor.achievements.length === 0 ? (
                  <p className="text-muted-foreground/90 text-sm leading-relaxed">
                    {t('noProfileContent')}
                  </p>
                ) : (
                  <ul className="list-outside list-disc space-y-2 px-4 text-muted-foreground/90 text-sm leading-relaxed">
                    {tutor.achievements.map((achievement, index) => (
                      <li key={achievement.competitionName + achievement.year + index}>
                        <span className="font-medium text-neutral-1000">
                          {achievement.competitionName} ({achievement.year})
                        </span>
                        {achievement.awards.length > 0 && (
                          <span>: {achievement.awards.join(', ')}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="h-full space-y-1 rounded-xl bg-background-primary px-3 py-2">
                <h3 className="pb-0.5 font-semibold text-base text-foreground">
                  {t('experiences')}
                </h3>
                {tutor.experiences.length === 0 ? (
                  <p className="text-muted-foreground/90 text-sm leading-relaxed">
                    {t('noProfileContent')}
                  </p>
                ) : (
                  <ul className="list-outside list-disc space-y-3 px-4 text-muted-foreground/90 text-sm leading-relaxed">
                    {tutor.experiences.map((experience) => (
                      <li key={experience.role + experience.organization + experience.startYear}>
                        <p className="font-medium text-neutral-1000">
                          {experience.role} · {experience.organization}
                        </p>
                        <p>
                          {experience.startYear}–{experience.endYear ?? t('present')}
                        </p>
                        {experience.description && <p>{experience.description}</p>}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
