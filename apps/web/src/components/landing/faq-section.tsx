'use client';

import { MagnifyingGlassIcon, SealQuestionIcon, XIcon } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { FaqAnswer, FaqQuestion } from '@/components/faq-answer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Container } from '@/components/ui/container';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { groupFaqsByCategory } from '@/lib/faq-categories';
import type { FaqCategory, PublicFaq } from '@/types/faq';

function normalize(value: string) {
  return value.normalize('NFKC').toLocaleLowerCase();
}

function getFaqSearchText(item: PublicFaq) {
  return normalize(item.question);
}

function getGroupKey(category: FaqCategory | null) {
  return category ?? 'uncategorized';
}

export function FaqSection({
  items,
  hasError = false,
}: {
  items: PublicFaq[];
  hasError?: boolean;
}) {
  const t = useTranslations('faq');
  const [query, setQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState('all');

  const groupedItems = useMemo(() => groupFaqsByCategory(items), [items]);
  const normalizedQuery = normalize(query.trim());

  const filteredGroups = useMemo(
    () =>
      groupedItems
        .filter((group) => activeGroup === 'all' || getGroupKey(group.category) === activeGroup)
        .map((group) => ({
          ...group,
          items: normalizedQuery
            ? group.items.filter((item) => getFaqSearchText(item).includes(normalizedQuery))
            : group.items,
        }))
        .filter((group) => group.items.length > 0),
    [activeGroup, groupedItems, normalizedQuery],
  );

  const resetFilters = () => {
    setQuery('');
    setActiveGroup('all');
  };

  return (
    <main className="min-h-screen bg-background pt-24">
      <Container className="relative z-3 max-w-7xl gap-y-15 pt-12 pb-24 md:pt-16 md:pb-32">
        <div className="max-w-3xl space-y-2">
          <h1 className="text-pretty font-semibold text-2xl text-neutral-1000 sm:max-w-3xl md:max-w-2xl md:text-4xl lg:max-w-4xl lg:text-5xl">
            {t('v2.title')}
            <span className="font-extrabold text-primary-500">{t('v2.titleHighlight')}</span>
          </h1>
          <p className="max-w-3xl font-medium text-neutral-600 text-sm md:text-base lg:text-left">
            {t('v2.subtitle')}
          </p>
        </div>

        {hasError || items.length === 0 ? (
          <Empty role="status" className="h-full">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SealQuestionIcon aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>{t('error.title')}</EmptyTitle>
              <EmptyDescription className="text-pretty">{t('error.description')}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="faq-search" className="sr-only">
                {t('search.label')}
              </label>
              <div className="relative w-full">
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500"
                />
                <Input
                  id="faq-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t('search.placeholder')}
                  className="h-9 rounded-md border-neutral-300 bg-white pr-9 pl-9 text-sm"
                />
                {query.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label={t('search.clear')}
                    className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  >
                    <XIcon aria-hidden="true" className="size-4" />
                  </button>
                ) : null}
              </div>

              <div
                role="group"
                aria-label={t('search.filterLabel')}
                className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:py-0"
              >
                <button
                  type="button"
                  onClick={() => setActiveGroup('all')}
                  aria-pressed={activeGroup === 'all'}
                  className={cn(
                    'shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    activeGroup === 'all'
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500',
                  )}
                >
                  {t('search.all')}
                </button>
                {groupedItems.map((group) => {
                  const key = getGroupKey(group.category);

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveGroup(key)}
                      aria-pressed={activeGroup === key}
                      className={cn(
                        'shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                        activeGroup === key
                          ? 'border-primary-500 bg-primary-500 text-white'
                          : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500',
                      )}
                    >
                      {group.label ?? (t.has(`categories.${key}`) ? t(`categories.${key}`) : key)}
                    </button>
                  );
                })}
              </div>
            </div>

            {filteredGroups.length === 0 ? (
              <Empty role="status" className="rounded-2xl border border-neutral-200 bg-white/60">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <MagnifyingGlassIcon aria-hidden="true" />
                  </EmptyMedia>
                  <EmptyTitle>{t('search.emptyTitle')}</EmptyTitle>
                  <EmptyDescription className="text-pretty">
                    {t('search.emptyDescription')}
                  </EmptyDescription>
                </EmptyHeader>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-medium text-primary-600 underline underline-offset-4 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {t('search.reset')}
                </button>
              </Empty>
            ) : (
              <div className="space-y-10 mt-10">
                {filteredGroups.map((group) => {
                  const categoryKey = getGroupKey(group.category);
                  const headingId = `faq-category-${categoryKey}`;

                  return (
                    <section key={categoryKey} aria-labelledby={headingId} className="space-y-3">
                      <h2
                        id={headingId}
                        className="font-semibold text-lg text-neutral-1000 md:text-xl"
                      >
                        {group.label ?? (t.has(`categories.${categoryKey}`) ? t(`categories.${categoryKey}`) : categoryKey)}
                      </h2>
                      <Accordion className="w-full">
                        {group.items.map((item) => (
                          <AccordionItem key={item.id} value={item.id}>
                            <AccordionTrigger>
                              <span>
                                <FaqQuestion question={item.question} rich={item.questionRich} />
                              </span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <FaqAnswer blocks={item.answer} rich={item.answerRich} />
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </section>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </Container>
    </main>
  );
}
