'use client';

import { AlertCircle, ChevronDown, Medal, Search } from 'lucide-react';
import { m } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useMemo, useState, type ReactNode } from 'react';
import { AchievementDetailModal } from '@/components/achievements/achievement-detail-modal';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { AchievementLocale, ApprovedAchievement } from '@/types/achievement';
import { getCategoryLabel, getLevelLabel } from './achievement-utils';
import { AchievementCard } from './achievement-record';

const ALL_VALUE = 'all';

interface AchievementArchiveProps {
  achievements: ApprovedAchievement[];
  locale: AchievementLocale;
  hasError?: boolean;
}

export default function AchievementArchive({
  achievements,
  locale,
  hasError = false,
}: AchievementArchiveProps) {
  const t = useTranslations('achievements');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(ALL_VALUE);
  const [level, setLevel] = useState(ALL_VALUE);
  const [year, setYear] = useState(ALL_VALUE);
  const [selectedAchievement, setSelectedAchievement] = useState<ApprovedAchievement | null>(null);

  const categoryOptions = useMemo(() => {
    const values = [...new Set(achievements.map((item) => item.category))].sort();
    return values.map((value) => ({ value, label: getCategoryLabel(value, locale) }));
  }, [achievements, locale]);

  const levelOptions = useMemo(() => {
    const values = [...new Set(achievements.map((item) => item.level))].sort();
    return values.map((value) => ({ value, label: getLevelLabel(value, locale) }));
  }, [achievements, locale]);

  const yearOptions = useMemo(() => {
    const values = [
      ...new Set(
        achievements
          .map((item) => item.awardingDate?.slice(0, 4))
          .filter((value): value is string => Boolean(value)),
      ),
    ].sort((a, b) => b.localeCompare(a));
    return values.map((value) => ({ value, label: value }));
  }, [achievements]);

  const filteredAchievements = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return achievements.filter((item) => {
      const matchesQuery =
        query.length === 0 ||
        [item.eventName, item.award, item.displayName, item.issuer, item.location]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(query));
      const matchesCategory = category === ALL_VALUE || item.category === category;
      const matchesLevel = level === ALL_VALUE || item.level === level;
      const matchesYear = year === ALL_VALUE || item.awardingDate?.startsWith(year);

      return matchesQuery && matchesCategory && matchesLevel && matchesYear;
    });
  }, [achievements, category, level, searchQuery, year]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    category !== ALL_VALUE ||
    level !== ALL_VALUE ||
    year !== ALL_VALUE;

  const resetFilters = () => {
    setSearchQuery('');
    setCategory(ALL_VALUE);
    setLevel(ALL_VALUE);
    setYear(ALL_VALUE);
  };

  return (
    <main className="min-h-screen bg-background-primary">
      <div className="relative z-3 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <section className="pb-8 sm:pb-12 md:pb-16">
          <div className="max-w-2xl space-y-3">
            <h1 className="font-bold text-2xl text-neutral-1000 tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {t('title')} <span className="text-primary-500">{t('titleHighlight')}</span>
            </h1>
            <p className="text-neutral-600 text-sm leading-relaxed sm:text-base">
              {t('description')}
            </p>
          </div>
        </section>

        <section aria-labelledby="achievement-archive-title">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="relative w-full md:w-72">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  aria-hidden="true"
                />
                <Input
                  type="search"
                  name="achievement-search"
                  autoComplete="off"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t('searchPlaceholder')}
                  aria-label={t('searchPlaceholder')}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-3 md:w-auto">
              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={resetFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t('resetFilters')}
                </Button>
              )}
              <FilterMenu
                label={t('filters.category')}
                value={category}
                options={categoryOptions}
                allLabel={t('filters.allCategories')}
                onChange={setCategory}
              />
              <FilterMenu
                label={t('filters.level')}
                value={level}
                options={levelOptions}
                allLabel={t('filters.allLevels')}
                onChange={setLevel}
              />
              <FilterMenu
                label={t('filters.year')}
                value={year}
                options={yearOptions}
                allLabel={t('filters.allYears')}
                onChange={setYear}
              />
            </div>
          </div>

          {hasError ? (
            <ArchiveState
              icon={<AlertCircle />}
              title={t('errorTitle')}
              description={t('errorDescription')}
              actionLabel={t('tryAgain')}
              onAction={() => window.location.reload()}
            />
          ) : achievements.length === 0 ? (
            <ArchiveState
              icon={<Medal />}
              title={t('emptyTitle')}
              description={t('emptyDescription')}
            />
          ) : filteredAchievements.length === 0 ? (
            <ArchiveState
              icon={<Search />}
              title={t('noMatchesTitle')}
              description={t('noMatchesDescription')}
              actionLabel={t('resetFilters')}
              onAction={resetFilters}
            />
          ) : (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 gap-5 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {filteredAchievements.map((achievement, index) => (
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
          )}
        </section>
      </div>

      <AchievementDetailModal
        achievement={selectedAchievement}
        locale={locale}
        onClose={() => setSelectedAchievement(null)}
      />
    </main>
  );
}

function FilterMenu({
  label,
  value,
  options,
  allLabel,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  allLabel: string;
  onChange: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <span>
          {value === ALL_VALUE ? label : options.find((option) => option.value === value)?.label}
        </span>
        <ChevronDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          <DropdownMenuRadioItem value={ALL_VALUE}>{allLabel}</DropdownMenuRadioItem>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ArchiveState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <Empty className="min-h-72 rounded-2xl bg-background-cream py-20">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-background-primary text-primary-500">
          {icon}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription className="max-w-md text-pretty">{description}</EmptyDescription>
      </EmptyHeader>
      {actionLabel && onAction && (
        <EmptyContent>
          <Button type="button" variant="subtle" onClick={onAction}>
            {actionLabel}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
