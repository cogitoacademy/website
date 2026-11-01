'use client';

import { ChevronDown, Search } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { getLocalizedCategoryName } from '@/lib/tutor-directory';
import type { TutorCategory } from '@/types/tutor';

interface TutorFiltersProps {
  categories: TutorCategory[];
  selectedModalities: string[];
  selectedCategories: string[];
  searchQuery: string;
  onModalityChange: (value: string) => void;
  onCategoryChange: (id: string) => void;
  onSearchChange: (value: string) => void;
  onClearAll: () => void;
}

export default function TutorFilters({
  categories,
  selectedModalities,
  selectedCategories,
  searchQuery,
  onModalityChange,
  onCategoryChange,
  onSearchChange,
  onClearAll,
}: TutorFiltersProps) {
  const locale = useLocale();
  const t = useTranslations('tutors');
  const hasFilters =
    selectedModalities.length > 0 || selectedCategories.length > 0 || searchQuery.trim() !== '';
  const modalities = [
    { value: 'online', label: t('online') },
    { value: 'offline', label: t('offline') },
  ];

  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="w-full md:w-72">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 " />
          <Input
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            type="search"
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {hasFilters && (
          <Button
            variant="ghost"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground md:inline-flex hidden"
          >
            {t('clearFilters')}
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            <span>{t('teachingFormat')}</span>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{t('selectModality')}</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {modalities.map((modality) => (
              <DropdownMenuCheckboxItem
                key={modality.value}
                checked={selectedModalities.includes(modality.value)}
                onCheckedChange={() => onModalityChange(modality.value)}
              >
                {modality.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            <span>{t('competitionField')}</span>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{t('selectCategory')}</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => onCategoryChange(category.id)}
              >
                {getLocalizedCategoryName(category, locale)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {hasFilters && (
          <Button
            variant="ghost"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground md:hidden"
          >
            {t('clearFilters')}
          </Button>
        )}
      </div>
    </div>
  );
}
