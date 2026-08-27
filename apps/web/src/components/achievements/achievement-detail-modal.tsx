'use client';

import { ArrowRight, CalendarDays, MapPin, Medal, UserRound, XIcon } from 'lucide-react';
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalTitle,
} from '@/components/ui/responsive-modal';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { AchievementLocale, ApprovedAchievement } from '@/types/achievement';
import {
  formatAchievementDate,
  getAchievementYear,
  getCategoryLabel,
  getCategoryStyle,
  getLevelLabel,
  isSafeHttpUrl,
} from './achievement-utils';

interface AchievementDetailModalProps {
  achievement: ApprovedAchievement | null;
  locale: AchievementLocale;
  onClose: () => void;
}

export function AchievementDetailModal({
  achievement,
  locale,
  onClose,
}: AchievementDetailModalProps) {
  if (!achievement) return null;

  const style = getCategoryStyle(achievement.category);
  const displayName =
    achievement.displayName || (locale === 'id' ? 'Siswa Cogito' : 'Cogito student');
  const formattedDate = formatAchievementDate(achievement.awardingDate, locale);
  const publicDocumentation = isSafeHttpUrl(achievement.documentationUrl)
    ? achievement.documentationUrl
    : null;

  return (
    <ResponsiveModal open={Boolean(achievement)} onOpenChange={(open) => !open && onClose()}>
      <ResponsiveModalContent
        side="bottom"
        className="flex w-full max-w-full flex-col gap-0 overflow-hidden rounded-t-2xl border-none bg-background p-0 sm:max-h-[85vh] sm:w-[calc(100%-2rem)] sm:max-w-5xl sm:flex-row sm:rounded-lg"
        style={{ maxHeight: '85dvh' }}
        showCloseButton={false}
      >
        <div
          className={cn(
            'relative h-[260px] shrink-0 overflow-hidden sm:h-auto sm:w-2/5',
            style.wash,
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <Medal className={cn('size-32 opacity-30', style.ink)} strokeWidth={1.25} />
          </div>

          <div className="relative z-1 flex h-full flex-col justify-between p-6">
            <div className="flex items-start justify-between gap-4">
              <Badge className={cn('rounded-md bg-background-cream py-1', style.ink)}>
                {getCategoryLabel(achievement.category, locale)}
              </Badge>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-md bg-white/90 text-black shadow-sm hover:bg-white"
                onClick={onClose}
              >
                <XIcon className="size-4" />
                <span className="sr-only">{locale === 'id' ? 'Tutup' : 'Close'}</span>
              </Button>
            </div>

            <div>
              <p className="font-semibold text-7xl text-neutral-1000 leading-none tracking-tight">
                {getAchievementYear(achievement)}
              </p>
              <p className="mt-3 font-medium text-neutral-700 text-sm">
                {getLevelLabel(achievement.level, locale)}
              </p>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-background">
          <div className="p-6">
            <div className="space-y-3">
              <ResponsiveModalTitle className="font-bold text-2xl text-foreground leading-tight tracking-tight sm:text-3xl">
                {achievement.eventName}
              </ResponsiveModalTitle>
              <ResponsiveModalDescription className="font-semibold text-primary-600 text-base">
                {achievement.award}
              </ResponsiveModalDescription>

              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="tutor" className={cn(style.wash, style.ink)}>
                  {getLevelLabel(achievement.level, locale)}
                </Badge>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-background-primary px-3 py-1.5 font-medium text-neutral-1000 text-sm">
                  <UserRound className="size-4" aria-hidden="true" />
                  {displayName}
                </span>
              </div>
            </div>

            {(achievement.issuer || formattedDate || achievement.location) && (
              <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2">
                {achievement.issuer && (
                  <DetailItem label={locale === 'id' ? 'Penyelenggara' : 'Issued by'}>
                    {achievement.issuer}
                  </DetailItem>
                )}
                {formattedDate && (
                  <DetailItem icon={<CalendarDays />} label={locale === 'id' ? 'Tanggal' : 'Date'}>
                    {formattedDate}
                  </DetailItem>
                )}
                {achievement.location && (
                  <DetailItem icon={<MapPin />} label={locale === 'id' ? 'Lokasi' : 'Location'}>
                    {achievement.location}
                  </DetailItem>
                )}
              </div>
            )}

            {achievement.description && (
              <p className="pt-6 text-neutral-600 text-sm leading-relaxed">
                {achievement.description}
              </p>
            )}

            {achievement.subjects && achievement.subjects.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-6">
                {achievement.subjects.map((subject) => (
                  <Badge key={subject} variant="tutor" className="bg-background-primary">
                    {subject}
                  </Badge>
                ))}
              </div>
            )}

            {publicDocumentation && (
              <div className="pt-6">
                <Button
                  render={
                    <a href={publicDocumentation} target="_blank" rel="noopener noreferrer" />
                  }
                  nativeButton={false}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {locale === 'id' ? 'Lihat dokumentasi publik' : 'View public documentation'}
                  <ArrowRight className="size-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

function DetailItem({
  icon,
  label,
  children,
}: {
  icon?: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="h-full space-y-1 rounded-xl bg-background-primary px-3 py-2">
      <div className="flex items-center gap-2 font-semibold text-base text-foreground">
        {icon && <span className="text-muted-foreground [&_svg]:size-4">{icon}</span>}
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.08em]">
          {label}
        </span>
      </div>
      <p className="break-words text-muted-foreground text-sm leading-relaxed">{children}</p>
    </div>
  );
}
