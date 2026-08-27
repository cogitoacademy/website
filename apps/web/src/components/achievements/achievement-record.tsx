'use client';

import { ArrowUpRight, Medal } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { AchievementLocale, ApprovedAchievement } from '@/types/achievement';
import {
  getAchievementYear,
  getCategoryLabel,
  getCategoryStyle,
  getLevelLabel,
  isSafeHttpUrl,
} from './achievement-utils';

interface AchievementCardProps {
  achievement: ApprovedAchievement;
  locale: AchievementLocale;
  onOpen: (achievement: ApprovedAchievement) => void;
}

export function AchievementCard({ achievement, locale, onOpen }: AchievementCardProps) {
  const style = getCategoryStyle(achievement.category);
  const documentationUrl = isSafeHttpUrl(achievement.documentationUrl)
    ? achievement.documentationUrl
    : null;
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const imageUrl =
    documentationUrl && documentationUrl !== failedImageUrl ? documentationUrl : null;
  const displayName =
    achievement.displayName || (locale === 'id' ? 'Siswa Cogito' : 'Cogito student');

  return (
    <button
      type="button"
      onClick={() => onOpen(achievement)}
      className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-neutral-100 text-left text-neutral-1000 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      aria-label={`${achievement.eventName}, ${achievement.award}`}
    >
      <div className={cn('relative aspect-[4/3] w-full overflow-hidden', style.wash)}>
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={achievement.eventName}
              className="absolute inset-0 size-full object-cover"
              loading="lazy"
              decoding="async"
              onError={() => setFailedImageUrl(imageUrl)}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/45 via-black/5 to-transparent"
              aria-hidden="true"
            />
          </>
        ) : (
          <Medal className={cn('absolute bottom-4 left-4 size-12', style.ink)} aria-hidden="true" />
        )}

        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <Badge className={cn('rounded-md bg-background-cream py-1', style.ink)}>
            {getCategoryLabel(achievement.category, locale)}
          </Badge>
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background-cream text-neutral-1000 shadow-sm"
            aria-hidden="true"
          >
            <ArrowUpRight className="size-5" />
          </span>
        </div>

        {imageUrl && (
          <Medal
            className="absolute bottom-4 left-4 size-12 text-white drop-shadow-sm"
            aria-hidden="true"
          />
        )}
        <span
          className={cn(
            'absolute right-4 bottom-4 font-semibold text-5xl leading-none tracking-tight',
            imageUrl ? 'text-white drop-shadow-sm' : 'text-neutral-1000',
          )}
        >
          {getAchievementYear(achievement)}
        </span>
      </div>

      <div className="relative z-2 -mt-4 flex min-h-36 flex-1 flex-col rounded-xl bg-neutral-100 p-4 shadow-inset-top">
        <h3 className="line-clamp-2 font-bold text-neutral-1000 text-sm leading-snug sm:text-base">
          {achievement.eventName}
        </h3>
        <p className="mt-1 line-clamp-2 font-semibold text-primary-600 text-sm leading-snug">
          {achievement.award}
        </p>

        <div className="mt-auto flex min-w-0 flex-wrap items-center gap-2 pt-4">
          <Badge variant="tutor" className={cn(style.wash, style.ink)}>
            {getLevelLabel(achievement.level, locale)}
          </Badge>
          <span className="min-w-0 truncate text-muted-foreground text-xs">{displayName}</span>
        </div>
      </div>
    </button>
  );
}
