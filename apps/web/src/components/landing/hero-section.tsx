'use client';

import { ChatsCircleIcon } from '@phosphor-icons/react/dist/ssr';
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '../ui/container';
import { WordRotateHighlighter } from '../ui/word-rotate-highlighter';
import { ClassCard } from './hero-class-card';
import { LogoCloud } from './logo-cloud';
import Link from 'next/link';

const sampleLogos = [
  {
    id: '1',
    name: 'Sekolah Victory Plus Bekasi',
    url: '/logos/sekolah_victory_plus_bekasi.webp',
  },
  {
    id: '2',
    name: 'SMA Al Hikmah Surabaya',
    url: '/logos/sma_al_hikmah_surabaya.webp',
  },
  {
    id: '3',
    name: 'SMAN 16 Surabaya',
    url: '/logos/sman_16_surabaya.webp',
  },
  {
    id: '4',
    name: 'Sekolah Victory Plus Bekasi',
    url: '/logos/sekolah_victory_plus_bekasi.webp',
  },
  {
    id: '5',
    name: 'SMA Al Hikmah Surabaya',
    url: '/logos/sma_al_hikmah_surabaya.webp',
  },
  {
    id: '6',
    name: 'SMAN 16 Surabaya',
    url: '/logos/sman_16_surabaya.webp',
  },
];

export function HeroSection() {
  const locale = useLocale();
  const isId = locale === 'id';
  const t = useTranslations();

  const rotatingWordsId = ['Berwawasan Global', 'Tangguh', 'Berprestasi'];
  const rotatingWordsEn = ['Globally Minded', 'Resilient', 'High-Achieving'];

  const cards = [
    {
      title: t('hero.classCards.regular.title'),
      description: t('hero.classCards.regular.description'),
      tags: [t('hero.classCards.regular.tags.0'), t('hero.classCards.regular.tags.1')],
    },
    {
      title: t('hero.classCards.intensive.title'),
      description: t('hero.classCards.intensive.description'),
      tags: [t('hero.classCards.intensive.tags.0'), t('hero.classCards.intensive.tags.1')],
    },
    {
      title: t('hero.classCards.extracurricular.title'),
      description: t('hero.classCards.extracurricular.description'),
      tags: [
        t('hero.classCards.extracurricular.tags.0'),
        t('hero.classCards.extracurricular.tags.1'),
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative">
      <div
        id="hero"
        className="invisible h-0 scroll-mt-8 md:scroll-mt-[6.5rem]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bottom-50 z-0 w-full bg-neutral-100 [clip-path:polygon(0_0,100%_0,100%_70%,50%_100%,0%_70%)] sm:bottom-120 md:bottom-90" />

      <Container className="relative z-1 max-w-7xl flex-col items-center pt-28 pb-0 sm:pt-36 md:pt-42 lg:pt-50">
        <section className="relative z-99 flex flex-col items-center justify-center">
          {/* Badge / Tagline */}
          <div className="mb-2 rounded-[12px] bg-background-primary px-2.5 py-2 text-center text-2xs leading-snug sm:text-sm">
            {isId ? (
              <>
                Didukung oleh para tutor dengan{' '}
                <span className="font-bold text-secondary-600">100+ prestasi</span> di{' '}
                <span className="font-bold text-secondary-600">7 bidang lomba</span>
              </>
            ) : (
              <>
                Supported by tutors with{' '}
                <span className="font-bold text-secondary-600">100+ awards</span> across{' '}
                <span className="font-bold text-secondary-600">7 competition areas</span>
              </>
            )}
          </div>

          {/* Headline */}

          <div className="inline max-w-100 text-center font-bold text-2xl text-neutral-1000 transition-normal sm:max-w-lg sm:text-3xl md:max-w-xl md:text-4xl lg:max-w-3xl lg:text-5xl lg:leading-snug">
            {isId ? (
              <>
                Mulai Perjalananmu Menjadi Pelajar
                <span className="w-1 sm:w-2"> </span>
                <WordRotateHighlighter
                  words={rotatingWordsId}
                  className="italic"
                  action="highlight"
                  color="#f8eaa4"
                  highlightDelay={500}
                />{' '}
              </>
            ) : (
              <>
                Start Your Journey to Become a<span className="w-1 sm:w-2"> </span>
                <WordRotateHighlighter
                  words={rotatingWordsEn}
                  className="italic"
                  action="highlight"
                  color="#f8eaa4"
                  highlightDelay={500}
                />{' '}
                Student
              </>
            )}
          </div>

          {/* Subtitle */}
          <p className="mt-2 max-w-xs text-center text-neutral-1000 text-xs sm:mt-4 sm:max-w-md sm:text-sm">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="my-2 flex w-full flex-col items-center gap-2 sm:my-6 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href="https://wa.me/62881011990195"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[218px] sm:w-auto sm:max-w-none"
            >
              <Button size="md" className="w-full">
                <span>{t('hero.ctaPrimary')}</span>
                <ChatsCircleIcon weight="duotone" color="#ffffff" className="size-5" />
              </Button>
            </Link>

            <Link href="#skills" className="w-full max-w-[221px] sm:w-auto sm:max-w-none">
              <Button size="md" variant="gray" className="w-full">
                <span>{t('hero.ctaSecondary')}</span>
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Trust Section */}
        <section className="flex flex-col items-center">
          <p className="text-neutral-700 text-xs sm:text-sm">{t('hero.trustedBy')}</p>
          <LogoCloud logos={sampleLogos} interval={3000} displayCount={3} />
        </section>

        {/* Class Cards */}
        <section className="-mb-100 grid w-full grid-cols-1 gap-5 md:mt-0 md:mb-0 md:grid-cols-3 md:gap-4">
          {/* Kuning */}
          <ClassCard
            className="order-1 min-h-120 bg-tertiary-blue-300 md:order-2 md:translate-y-10"
            innerClassName="bg-tertiary-blue-100"
            title={cards[1].title}
            description={cards[1].description}
            tags={cards[1].tags}
            isActiveTrigger={activeIndex === 1}
            tutorType="Tutor Kelas Intensif"
          />
          <ClassCard
            className="order-2 min-h-90 -translate-y-70 bg-tertiary-yellow-400 md:order-1 md:translate-y-0"
            innerClassName="bg-tertiary-yellow-100"
            title={cards[0].title}
            description={cards[0].description}
            tags={cards[0].tags}
            isActiveTrigger={activeIndex === 0}
            tutorType="Tutor Kelas Reguler"
          />
          <ClassCard
            className="order-3 min-h-84 -translate-y-100 bg-tertiary-pink-300 md:order-3 md:translate-y-0"
            innerClassName="bg-tertiary-pink-100"
            title={cards[2].title}
            description={cards[2].description}
            tags={cards[2].tags}
            isActiveTrigger={activeIndex === 2}
            tutorType="Tutor Kelas Ekstrakurikuler"
          />
        </section>
      </Container>
    </section>
  );
}
