import { Medal } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { AchievementPreview } from '@/components/achievements/achievement-preview';
import { Badge } from '@/components/ui/badge';
import { getApprovedAchievements } from '@/lib/achievements';
import type { AchievementLocale } from '@/types/achievement';

export async function AchievementsSection() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations('achievements')]);

  let achievements;
  try {
    achievements = await getApprovedAchievements();
  } catch (error) {
    console.error('Failed to fetch approved achievements for homepage:', error);
    return null;
  }

  if (achievements.length === 0) return null;

  return (
    <section className="bg-background-primary py-16">
      <div
        id="achievements"
        className="invisible h-0 scroll-mt-24 md:scroll-mt-[6.5rem]"
        aria-hidden="true"
      />
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-8">
          <div className="space-y-2 text-center *:max-w-[335px] *:text-pretty">
            <Badge variant="headline-cream">
              <Medal className="size-5" />
              <span>{t('home.eyebrow')}</span>
            </Badge>
            <h2 className="mx-auto text-pretty font-bold text-2xl text-neutral-1000 lg:max-w-none lg:text-3xl">
              {t('home.title')} <span className="text-primary-500">{t('home.titleHighlight')}</span>
            </h2>
            <p className="mx-auto max-w-3xl font-medium text-neutral-1000 text-xs md:max-w-none md:text-sm xl:text-base">
              {t('home.description')}
            </p>
          </div>

          <AchievementPreview
            achievements={achievements.slice(0, 4)}
            locale={(locale === 'en' ? 'en' : 'id') as AchievementLocale}
          />
        </div>
      </div>
    </section>
  );
}
