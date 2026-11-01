'use client';

import { ArrowRight } from 'lucide-react';
import { m, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import type { AchievementLocale, ApprovedAchievement } from '@/types/achievement';
import { AchievementDetailModal } from './achievement-detail-modal';
import { AchievementCard } from './achievement-record';

export function AchievementPreview({
  achievements,
  locale,
}: {
  achievements: ApprovedAchievement[];
  locale: AchievementLocale;
}) {
  const t = useTranslations('achievements');
  const reducedMotion = useReducedMotion();
  const [selectedAchievement, setSelectedAchievement] = useState<ApprovedAchievement | null>(null);

  return (
    <div className="w-full">
      <m.div
        initial={false}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {achievements.slice(0, 4).map((achievement, index) => (
          <m.div
            key={achievement.id}
            initial={false}
            whileInView={reducedMotion ? undefined : { y: [20, 0], opacity: [0, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: index * 0.12 }}
          >
            <AchievementCard
              achievement={achievement}
              locale={locale}
              onOpen={setSelectedAchievement}
            />
          </m.div>
        ))}
      </m.div>

      <div className="mt-8 flex justify-center">
        <Link href="/achievements">
          <Button size="lg">
            <span>{t('viewArchive')}</span>
            <ArrowRight className="size-5" />
          </Button>
        </Link>
      </div>

      <AchievementDetailModal
        achievement={selectedAchievement}
        locale={locale}
        onClose={() => setSelectedAchievement(null)}
      />
    </div>
  );
}
