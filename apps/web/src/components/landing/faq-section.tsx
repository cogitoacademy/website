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
import { SealQuestionIcon } from '@phosphor-icons/react/dist/ssr';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';
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
