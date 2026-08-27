'use client';

import { ArrowRight } from 'lucide-react';
import { m } from 'motion/react';
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
  const [selectedAchievement, setSelectedAchievement] = useState<ApprovedAchievement | null>(null);

  return (
    <div className="w-full">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {achievements.slice(0, 4).map((achievement, index) => (
          <m.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
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
