'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { FaqAnswer, FaqQuestion } from '@/components/faq-answer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FaqAvailability } from '@/components/faq-availability';
import type { PublicFaq } from '@/types/faq';

export function FaqSection({
  items,
  hasError = false,
}: {
  items: PublicFaq[];
  hasError?: boolean;
}) {
  const t = useTranslations('faq');

  return (
    <main className="min-h-screen bg-background-primary pt-24">
      <Container className="relative z-3 max-w-7xl gap-y-15 py-12 md:py-16">
        <div className="max-w-3xl space-y-2">
          <h1 className="text-pretty font-semibold text-2xl text-neutral-1000 sm:max-w-3xl md:max-w-2xl md:text-4xl lg:max-w-4xl lg:text-5xl">
            {t('v2.title')}
            <span className="font-extrabold text-primary-500">{t('v2.titleHighlight')}</span>
          </h1>
          <p className="max-w-3xl font-medium text-neutral-600 text-sm md:text-base lg:text-left">
            {t('v2.subtitle')}
          </p>
        </div>

        {hasError ? (
          <FaqAvailability
            status="error"
            title={t('error.title')}
            description={t('error.description')}
            retryLabel={t('error.tryAgain')}
            className="max-w-xl text-left text-neutral-700 text-sm"
          />
        ) : items.length === 0 ? (
          <FaqAvailability
            status="empty"
            emptyMessage={t('empty')}
            className="rounded-2xl border border-dashed border-neutral-700 bg-transparent p-6 text-left font-medium text-neutral-700 text-sm"
          />
        ) : (
          <Accordion className="w-full">
            {items.map((item) => (
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
        )}
      </Container>
    </main>
  );
}
