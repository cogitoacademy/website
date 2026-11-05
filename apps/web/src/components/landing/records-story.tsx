'use client';

import {
  ArrowRight,
  CalendarDays,
  Library,
  Medal,
  Newspaper,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import type {
  RecordsStoryData,
  RecordsStoryLocale,
  RecordsStoryStepKey,
} from '@/types/records-story';
import { RecordsStage } from './records-stage';

// Drop recordings in apps/web/public/videos/records, then add their paths here.
// The data preview is used until a video path is set.
const STORY_VIDEOS: Partial<Record<RecordsStoryStepKey, string>> = {
  // tutors: '/videos/records/tutor-booking.mp4',
  // achievements: '/videos/records/achievements.mp4',
  // knowledge: '/videos/records/knowledge-bank.mp4',
  // blog: '/videos/records/blog.mp4',
  // calendar: '/videos/records/competition-calendar.mp4',
};

interface StoryStepCopy {
  label: string;
  title: string;
  description: string;
  bullets: string;
  cta: string;
  href: string;
  external?: boolean;
}

const STORY_COPY: Record<RecordsStoryStepKey, { id: StoryStepCopy; en: StoryStepCopy }> = {
  tutors: {
    id: {
      label: 'Tutor & Booking',
      title: 'Temukan tutor, pilih sesi, langsung booking.',
      description:
        'Lihat profil juara, bidang kompetisi, dan jadwal yang tersedia. Pilih sesi yang cocok tanpa perlu chat bolak-balik.',
      bullets: 'Profil tutor · Jadwal sesi · Booking',
      cta: 'Lihat direktori tutor',
      href: '/tutors',
    },
    en: {
      label: 'Tutors & Booking',
      title: 'Find a tutor, pick a session, book it.',
      description:
        'See champion profiles, competition fields, and available times. Choose the session that fits without back-and-forth messages.',
      bullets: 'Tutor profiles · Session times · Booking',
      cta: 'Browse the tutor directory',
      href: '/tutors',
    },
  },
  achievements: {
    id: {
      label: 'Rekam Prestasi',
      title: 'Setiap medali tercatat dan terverifikasi.',
      description:
        'Unggah sertifikat dan biarkan tim Cogito memverifikasi. Prestasi yang disetujui tampil di arsip publik dengan persetujuanmu.',
      bullets: 'Unggah bukti · Verifikasi tim · Arsip publik',
      cta: 'Lihat arsip prestasi',
      href: '/achievements',
    },
    en: {
      label: 'Achievement Records',
      title: 'Every medal is recorded and verified.',
      description:
        'Upload your certificate and let the Cogito team review it. Approved achievements join the public archive with your consent.',
      bullets: 'Upload proof · Team review · Public archive',
      cta: 'View the achievement archive',
      href: '/achievements',
    },
  },
  knowledge: {
    id: {
      label: 'Knowledge Bank',
      title: 'Materi latihan selalu dalam jangkauan.',
      description:
        'Position papers, panduan belajar, dan materi sesi tersusun per topik. Buka kembali kapan pun sebelum kompetisi.',
      bullets: 'Position papers · Study guides · Materi sesi',
      cta: 'Buka Knowledge Bank',
      href: 'https://app.cogitoacademy.id/knowledge-bank',
      external: true,
    },
    en: {
      label: 'Knowledge Bank',
      title: 'Practice material, always within reach.',
      description:
        'Position papers, study guides, and session material are sorted by topic. Reopen them any time before a competition.',
      bullets: 'Position papers · Study guides · Session material',
      cta: 'Open the Knowledge Bank',
      href: 'https://app.cogitoacademy.id/knowledge-bank',
      external: true,
    },
  },
  blog: {
    id: {
      label: 'Blog Cogito',
      title: 'Strategi dan cerita, sebelum kamu bertanding.',
      description:
        'Artikel dari tutor dan siswa Cogito: panduan kompetisi, catatan latihan, dan strategi yang bisa langsung kamu pakai.',
      bullets: 'Panduan kompetisi · Catatan tutor · Cerita juara',
      cta: 'Baca blog Cogito',
      href: '/blog',
    },
    en: {
      label: 'Cogito Blog',
      title: 'Strategy and stories before you compete.',
      description:
        'Articles from Cogito tutors and students: competition guides, practice notes, and strategies you can use right away.',
      bullets: 'Competition guides · Tutor notes · Champion stories',
      cta: 'Read the Cogito blog',
      href: '/blog',
    },
  },
  calendar: {
    id: {
      label: 'Kalender Lomba',
      title: 'Jangan lewatkan panggung berikutnya.',
      description:
        'Pantau kompetisi nasional dan internasional, tenggat pendaftaran, dan skala lomba dalam satu kalender terkurasi.',
      bullets: 'Kalender terkurasi · Tenggat · Filter jenjang',
      cta: 'Buka kalender lomba',
      href: '/calendar',
    },
    en: {
      label: 'Competition Calendar',
      title: 'Never miss the next stage.',
      description:
        'Track national and international competitions, registration deadlines, and event scale in one curated calendar.',
      bullets: 'Curated calendar · Deadlines · Level filters',
      cta: 'Open the competition calendar',
      href: '/calendar',
    },
  },
};
const STEP_ORDER: RecordsStoryStepKey[] = [
  'tutors',
  'achievements',
  'knowledge',
  'blog',
  'calendar',
];

const STEP_ICONS: Record<RecordsStoryStepKey, LucideIcon> = {
  tutors: Users,
  achievements: Medal,
  knowledge: Library,
  blog: Newspaper,
  calendar: CalendarDays,
};

const STEP_TONES: Record<RecordsStoryStepKey, string> = {
  tutors: 'bg-tertiary-blue-100 text-tertiary-blue-1000',
  achievements: 'bg-tertiary-yellow-100 text-tertiary-yellow-1000',
  knowledge: 'bg-secondary-100 text-secondary-1000',
  blog: 'bg-tertiary-pink-100 text-tertiary-pink-1000',
  calendar: 'bg-tertiary-green-100 text-tertiary-green-1000',
};

const LABEL_TONES: Record<RecordsStoryStepKey, string> = {
  tutors: 'text-tertiary-blue-1000',
  achievements: 'text-tertiary-yellow-1000',
  knowledge: 'text-secondary-1000',
  blog: 'text-tertiary-pink-1000',
  calendar: 'text-tertiary-green-1000',
};

interface RecordsStoryProps {
  data: RecordsStoryData;
  locale: RecordsStoryLocale;
  knowledgeBankUrl: string;
}

export function RecordsStory({ data, locale, knowledgeBankUrl }: RecordsStoryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const steps = stepRefs.current.filter((step): step is HTMLElement => step !== null);
    if (steps.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        const nextIndex = Math.max(
          ...visible.map((entry) => Number((entry.target as HTMLElement).dataset.storyIndex)),
        );
        setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    );

    for (const step of steps) {
      observer.observe(step);
    }

    return () => observer.disconnect();
  }, []);

  const steps = STEP_ORDER.map((key) => {
    const copy = STORY_COPY[key][locale];

    return {
      key,
      ...copy,
      href: key === 'knowledge' ? knowledgeBankUrl : copy.href,
    };
  });
  const activeStep = steps[activeIndex] ?? steps[0];

  return (
    <div className="mt-10 grid grid-cols-1 items-start gap-0 lg:mt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
      <div>
        {steps.map((step, index) => {
          const Icon = STEP_ICONS[step.key];
          const isActive = index === activeIndex;
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;

          return (
            <article
              key={step.key}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              data-story-index={index}
              className={cn(
                'flex flex-col justify-center gap-3 py-10 transition-opacity duration-300 lg:min-h-[62vh] lg:py-0',
                isFirst && 'lg:min-h-[54vh] lg:justify-start lg:pt-[6vh]',
                isLast && 'lg:min-h-[70vh]',
                !isActive && 'lg:opacity-30',
                'lg:focus-within:opacity-100',
                'motion-reduce:transition-none',
              )}
            >
              <div
                className={cn(
                  'inline-flex items-center gap-2.5 font-semibold text-xs',
                  LABEL_TONES[step.key],
                )}
              >
                <span
                  className={cn('grid size-8 place-items-center rounded-lg', STEP_TONES[step.key])}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                {step.label}
              </div>

              <h3 className="max-w-[460px] font-bold text-2xl text-neutral-1000 leading-[1.12] tracking-[-0.03em] sm:text-3xl lg:text-[2.15rem]">
                {step.title}
              </h3>
              <p className="max-w-[440px] text-neutral-600 text-sm leading-relaxed lg:text-base">
                {step.description}
              </p>
              <p className="font-medium text-[11px] text-neutral-500 tracking-wide sm:text-xs">
                {step.bullets}
              </p>

              <StoryLink step={step} />

              <div className="mt-2 lg:hidden">
                <RecordsStage
                  stepKey={step.key}
                  label={step.label}
                  data={data}
                  locale={locale}
                  active={isActive}
                  videoSrc={STORY_VIDEOS[step.key]}
                />
              </div>
            </article>
          );
        })}
      </div>

      <aside className="sticky top-[max(1.5rem,calc(50vh-21rem))] hidden self-start lg:block">
        <div
          key={activeStep.key}
          className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300 motion-reduce:animate-none"
        >
          <RecordsStage
            stepKey={activeStep.key}
            label={activeStep.label}
            data={data}
            locale={locale}
            active
            videoSrc={STORY_VIDEOS[activeStep.key]}
          />
        </div>

        <div
          className="mt-4 flex items-center justify-center gap-1.5"
          role="group"
          aria-label={activeStep.label}
        >
          {steps.map((step, index) => (
            <button
              key={step.key}
              type="button"
              onClick={() => {
                const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                stepRefs.current[index]?.scrollIntoView({
                  behavior: reduceMotion ? 'auto' : 'smooth',
                  block: 'center',
                });
              }}
              className={cn(
                'grid h-5 place-items-center rounded-full transition-[width] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                index === activeIndex ? 'w-4' : 'w-1.5',
              )}
              aria-label={step.label}
              aria-current={index === activeIndex ? 'step' : undefined}
            >
              <span
                className={cn(
                  'h-1.5 w-full rounded-full transition-colors duration-200',
                  index === activeIndex ? 'bg-neutral-700' : 'bg-neutral-300 hover:bg-neutral-400',
                )}
              />
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

function StoryLink({ step }: { step: StoryStepCopy }) {
  const className =
    'group mt-1 inline-flex w-fit items-center gap-1.5 font-semibold text-neutral-900 text-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';

  if (step.external) {
    return (
      <a href={step.href} className={className} target="_blank" rel="noreferrer">
        {step.cta}
        <ArrowRight
          className="size-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </a>
    );
  }

  return (
    <Link href={step.href as '/tutors' | '/achievements' | '/calendar'} className={className}>
      {step.cta}
      <ArrowRight
        className="size-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </Link>
  );
}
