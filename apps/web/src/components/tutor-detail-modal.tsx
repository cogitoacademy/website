'use client';

import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import type { Tutor, TutorSubject } from '@/types/tutor';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTitle } from './ui/sheet';

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
        className="flex w-full max-h-[90dvh] flex-col gap-0 overflow-y-auto rounded-t-2xl border-none bg-background p-0 text-base sm:data-[side=bottom]:inset-x-auto sm:data-[side=bottom]:inset-y-0 sm:data-[side=bottom]:right-0 sm:data-[side=bottom]:h-dvh sm:max-h-dvh sm:w-full sm:max-w-lg sm:rounded-none sm:data-[side=bottom]:data-open:slide-in-from-bottom-0 sm:data-[side=bottom]:data-closed:slide-out-to-bottom-0 sm:data-[side=bottom]:data-open:slide-in-from-right-10 sm:data-[side=bottom]:data-closed:slide-out-to-right-10"
        showCloseButton={false}
      >
        <div className="flex shrink-0 justify-end px-4 pt-4">
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <XIcon className="h-4 w-4" />
            <span className="sr-only">{locale === 'id' ? 'Tutup' : 'Close'}</span>
          </Button>
        </div>
        <div className="bg-background">
          <div className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
                {tutor.profileImageUrl ? (
                  <Image
                    src={tutor.profileImageUrl}
                    alt={tutor.name}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <span aria-hidden="true" className="font-semibold text-2xl text-muted-foreground">
                    {tutor.name.slice(0, 1).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <SheetTitle className="break-words font-semibold text-xl text-foreground sm:text-2xl">
                  {tutor.name}
                </SheetTitle>
                {tutor.affiliation && (
                  <p className="mt-1 font-medium text-sm text-neutral-1000">{tutor.affiliation}</p>
                )}
                {modalityLabel && (
                  <Badge variant="secondary" className="mt-2">
                    {modalityLabel}
                  </Badge>
                )}
              </div>
            </div>
            {tutor.subjects.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">{badges}</div>
            )}
            {tutor.shortBio && (
              <p className="mt-3 text-sm text-muted-foreground">{tutor.shortBio}</p>
            )}

            <div className="grid grid-cols-1 gap-3 pt-5 pb-[env(safe-area-inset-bottom)]">
              {tutor.education.length > 0 && (
                <section className="space-y-3 rounded-xl bg-neutral-200 p-4">
                  <h3 className="pb-0.5 font-semibold text-base text-foreground">
                    {t('education')}
                  </h3>
                  <ul className="list-outside list-disc space-y-4 pl-5 text-sm leading-relaxed marker:text-muted-foreground">
                    {tutor.education.map((education) => (
                      <li key={education.university + education.degree}>
                        <p className="font-semibold leading-snug">{education.university}</p>
                        {education.degree && (
                          <p className="mt-0.5 text-muted-foreground">{education.degree}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {tutor.achievements.length > 0 && (
                <section className="space-y-3 rounded-xl bg-neutral-200 p-4">
                  <h3 className="pb-0.5 font-semibold text-base text-foreground">
                    {t('achievements')}
                  </h3>
                  <ul className="list-outside list-disc space-y-4 pl-5 text-sm leading-relaxed marker:text-muted-foreground">
                    {tutor.achievements.map((achievement, index) => (
                      <li key={achievement.competitionName + achievement.year + index}>
                        <p className="font-semibold leading-snug">
                          {achievement.competitionName} {achievement.year}
                        </p>
                        {achievement.awards.length > 0 && (
                          <p className="mt-0.5 text-muted-foreground">
                            {achievement.awards.join(', ')}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {tutor.experiences.length > 0 && (
                <section className="space-y-3 rounded-xl bg-neutral-200 p-4">
                  <h3 className="pb-0.5 font-semibold text-base text-foreground">
                    {t('experiences')}
                  </h3>
                  <ul className="list-outside list-disc space-y-4 pl-5 text-sm leading-relaxed marker:text-muted-foreground">
                    {tutor.experiences.map((experience) => (
                      <li key={experience.role + experience.organization + experience.startYear}>
                        <p className="font-semibold leading-snug">
                          {experience.role} · {experience.organization}
                        </p>
                        <p className="mt-0.5 text-muted-foreground">
                          {experience.startYear} - {experience.endYear ?? t('present')}
                        </p>
                        {experience.description && (
                          <p className="mt-1 whitespace-pre-line text-muted-foreground">
                            {experience.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
