'use client';

import { SealQuestionIcon } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { FaqAnswer, FaqQuestion } from '@/components/faq-answer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import type { PublicFaq } from '@/types/faq';

export default function FaqSectionV2({
  items,
  hasError = false,
}: {
  items: PublicFaq[];
  hasError?: boolean;
}) {
  const t = useTranslations('faq');

  return (
    <>
      <div
        id="faq"
        className="invisible h-0 scroll-mt-6 md:scroll-mt-[6.5rem]"
        aria-hidden="true"
      />
      <section className="bg-background-primary relative z-30">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
          <div className="flex flex-col items-center space-y-2 text-center lg:items-start lg:text-left">
            <Badge variant="headline-cream">
              <SealQuestionIcon className="size-5" />
              <span>{t('v2.badge')}</span>
            </Badge>
            <h3 className="mx-auto max-w-[335px] text-pretty font-bold text-2xl text-neutral-1000 md:max-w-none lg:mx-0 lg:text-3xl">
              {t('v2.title')}
              <span className="text-primary-500">{t('v2.titleHighlight')}</span>
            </h3>
            {/*<p className="mx-auto max-w-[335px] font-medium text-neutral-1000 text-xs md:max-w-none md:text-sm xl:text-base lg:mx-0">
              {t('v2.subtitle')}
            </p>*/}
          </div>

          <div className="w-full flex flex-col">
            {hasError ? (
              <div className="relative">
                <SealQuestionIcon
                  aria-hidden="true"
                  className="absolute left-1/2 top-8 size-10 -translate-x-1/2 text-primary-500"
                />
                <div
                  role="status"
                  className="w-full rounded-2xl border border-neutral-200 bg-white/60 px-6 pb-10 pt-24 text-center text-sm leading-relaxed text-neutral-600 md:pb-12"
                >
                  <h4 className="font-semibold text-base">{t('error.title')}</h4>
                  <p className="mt-2">{t('error.description')}</p>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div
                role="status"
                className="flex w-full flex-col items-center gap-4 rounded-2xl border border-neutral-200 bg-white/60 px-6 py-10 text-center md:py-12"
              >
                <SealQuestionIcon aria-hidden="true" className="size-10 text-primary-500" />
                <p className="max-w-sm text-sm leading-relaxed text-neutral-600">{t('empty')}</p>
              </div>
            ) : (
              <Accordion className="w-full">
                {items.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="font-semibold">
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
            <Link
              href="/faq"
              className="text-primary-600 underline underline-offset-4 hover:text-primary-700 text-sm self-center lg:self-start mt-4"
            >
              {t('viewAll')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
