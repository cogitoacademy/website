'use client';

import { SealQuestionIcon } from '@phosphor-icons/react/dist/ssr';
import { ArrowUpRight } from 'lucide-react';
import { m } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

function useIsMobile(breakpoint = 768) {
  const query = `(max-width: ${breakpoint - 1}px)`;

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return isMobile;
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const ACTIVE_BG = '#E89AB8';
const INACTIVE_BG = '#FFFBF7';

function ActiveCardContent({ question, answer }: Pick<FaqItem, 'question' | 'answer'>) {
  return (
    <m.div
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="absolute inset-0 flex flex-col"
    >
      <h3 className="mb-3 p-4 pb-0 font-bold text-base text-gray-900">{question}</h3>
      <div className="flex-1 overflow-hidden rounded-2xl bg-white p-6 shadow-sm">
        <div className="custom-scrollbar h-full overflow-y-scroll pr-2">
          <div
            className="text-gray-600 text-sm leading-relaxed [&_li]:pl-1 [&_ul]:ml-4 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      </div>
    </m.div>
  );
}

function InactiveCardContent({ question }: Pick<FaqItem, 'question'>) {
  return (
    <m.div
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 flex flex-row items-center justify-between bg-white p-6 md:flex-col md:justify-between"
    >
      <p className="line-clamp-10 font-medium text-gray-600 text-sm leading-snug">{question}</p>
      <div className="ml-6 md:self-end">
        <ArrowUpRight className="h-6 w-6 text-gray-800" />
      </div>
    </m.div>
  );
}

interface FaqCardProps {
  item: FaqItem;
  isActive: boolean;
  isMobile: boolean;
  onClick: () => void;
}

function FaqCard({ item, isActive, isMobile, onClick }: FaqCardProps) {
  const mobileAnimation = {
    height: isActive ? 340 : 'auto',
    minHeight: isActive ? 340 : 100,
    backgroundColor: isActive ? ACTIVE_BG : INACTIVE_BG,
  };

  const desktopAnimation = {
    flex: isActive ? 3 : 1,
    backgroundColor: isActive ? ACTIVE_BG : INACTIVE_BG,
  };

  return (
    <m.div
      animate={isMobile ? mobileAnimation : desktopAnimation}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      onClick={onClick}
      className={cn(
        'relative cursor-pointer overflow-hidden rounded-3xl border border-gray-100 shadow-sm',
        !isActive && 'hover:bg-white',
      )}
    >
      <div className="relative h-full w-full">
        {/* Spacer to reserve layout dimensions */}
        <div
          className="invisible flex flex-row items-center justify-between p-6 md:flex-col md:justify-between"
          aria-hidden="true"
        >
          <p className="line-clamp-10 font-medium leading-snug">{item.question}</p>
          <div className="ml-6 md:self-end">
            <ArrowUpRight className="h-6 w-6" />
          </div>
        </div>

        <m.div
          initial={false}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3, delay: isActive ? 0.2 : 0 }}
          className="absolute inset-0 flex flex-col"
          style={{ pointerEvents: isActive ? 'auto' : 'none' }}
        >
          <ActiveCardContent question={item.question} answer={item.answer} />
        </m.div>

        <m.div
          initial={false}
          animate={{ opacity: isActive ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: isActive ? 'none' : 'auto' }}
        >
          <InactiveCardContent question={item.question} />
        </m.div>
      </div>
    </m.div>
  );
}

interface FaqRowProps {
  items: FaqItem[];
  activeIndex: number;
  isMobile: boolean;
  onSelect: (index: number) => void;
}

function FaqRow({ items, activeIndex, isMobile, onSelect }: FaqRowProps) {
  const handleSelect = (index: number) => {
    if (index !== activeIndex) onSelect(index);
  };

  return (
    <div className="flex gap-4 *:select-none md:h-[300px]">
      {items.map((item, index) => (
        <FaqCard
          key={item.id}
          item={item}
          isActive={activeIndex === index}
          isMobile={isMobile}
          onClick={() => handleSelect(index)}
        />
      ))}
    </div>
  );
}

export default function FaqSectionV2() {
  const t = useTranslations('faq');
  const isMobile = useIsMobile();

  const [activeIndexRow1, setActiveIndexRow1] = useState(0);
  const [activeIndexRow2, setActiveIndexRow2] = useState(2);

  const faqData: FaqItem[] = [
    { id: 1, question: t('items.q1'), answer: t.raw('items.a1') },
    { id: 2, question: t('items.q2'), answer: t.raw('items.a2') },
    { id: 3, question: t('items.q3'), answer: t.raw('items.a3') },
    { id: 4, question: t('items.q4'), answer: t.raw('items.a4') },
    { id: 5, question: t('items.q5'), answer: t.raw('items.a5') },
    { id: 6, question: t('items.q6'), answer: t.raw('items.a6') },
  ];

  const [row1, row2] = [faqData.slice(0, 3), faqData.slice(3, 6)];

  return (
    <>
      <div
        id="faq"
        className="invisible h-0 scroll-mt-6 md:scroll-mt-[6.5rem]"
        aria-hidden="true"
      />
      <section className="bg-background-primary relative z-30">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-y-7.5 px-4 py-20">
          {/* Header */}
          <div className="flex flex-col items-center justify-center space-y-2 *:max-w-[335px] *:text-center *:min-[580px]:max-w-none">
            <Badge variant="headline-cream">
              <SealQuestionIcon className="size-5" />
              <span>{t('v2.badge')}</span>
            </Badge>
            <h3 className="mx-auto text-pretty font-bold text-2xl text-neutral-1000 lg:max-w-none lg:text-3xl">
              {t('v2.title')}
              <span className="text-primary-500">{t('v2.titleHighlight')}</span>
            </h3>
            <p className="mx-auto max-w-3xl font-medium text-neutral-1000 text-xs md:max-w-none md:text-sm xl:text-base">
              {t('v2.subtitle')}
            </p>
          </div>

          {/* FAQ Cards */}
          {isMobile ? (
            <div className="flex flex-col gap-2 *:select-none">
              {faqData.map((item, index) => (
                <FaqCard
                  key={item.id}
                  item={item}
                  isActive={activeIndexRow1 === index}
                  isMobile={isMobile}
                  onClick={() => setActiveIndexRow1(activeIndexRow1 === index ? -1 : index)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <FaqRow
                items={row1}
                activeIndex={activeIndexRow1}
                isMobile={isMobile}
                onSelect={setActiveIndexRow1}
              />
              <FaqRow
                items={row2}
                activeIndex={activeIndexRow2}
                isMobile={isMobile}
                onSelect={setActiveIndexRow2}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
