'use client';

import { useEffect, useRef, useState } from 'react';
import type {
  RecordsStoryData,
  RecordsStoryLocale,
  RecordsStoryStepKey,
} from '@/types/records-story';
import { RecordsStage } from './records-stage';
import styles from './records-story.module.css';

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
  listLabel: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  external?: boolean;
}

const STORY_COPY: Record<RecordsStoryStepKey, { id: StoryStepCopy; en: StoryStepCopy }> = {
  tutors: {
    id: {
      listLabel: 'Booking tutor & kelas',
      title: 'Temukan tutor, pilih sesi, langsung booking.',
      description:
        'Lihat profil juara, bidang kompetisi, dan jadwal yang tersedia. Pilih sesi yang cocok tanpa perlu chat bolak-balik.',
      cta: 'Lihat direktori tutor',
      href: '/tutors',
    },
    en: {
      listLabel: 'Book tutors & classes',
      title: 'Find a tutor, pick a session, book it.',
      description:
        'See champion profiles, competition fields, and available times. Choose the session that fits without back-and-forth messages.',
      cta: 'Browse the tutor directory',
      href: '/tutors',
    },
  },
  achievements: {
    id: {
      listLabel: 'Catat prestasi',
      title: 'Setiap medali tercatat dan terverifikasi.',
      description:
        'Unggah sertifikat dan biarkan tim Cogito memverifikasi. Prestasi yang disetujui tampil di arsip publik dengan persetujuanmu.',
      cta: 'Lihat arsip prestasi',
      href: '/achievements',
    },
    en: {
      listLabel: 'Record achievements',
      title: 'Every medal is recorded and verified.',
      description:
        'Upload your certificate and let the Cogito team review it. Approved achievements join the public archive with your consent.',
      cta: 'View the achievement archive',
      href: '/achievements',
    },
  },
  knowledge: {
    id: {
      listLabel: 'Belajar dari Knowledge Bank',
      title: 'Materi latihan selalu dalam jangkauan.',
      description:
        'Position papers, panduan belajar, dan materi sesi tersusun per topik. Buka kembali kapan pun sebelum kompetisi.',
      cta: 'Buka Knowledge Bank',
      href: 'https://app.cogitoacademy.id/knowledge-bank',
      external: true,
    },
    en: {
      listLabel: 'Learn from the Knowledge Bank',
      title: 'Practice material, always within reach.',
      description:
        'Position papers, study guides, and session material are sorted by topic. Reopen them any time before a competition.',
      cta: 'Open the Knowledge Bank',
      href: 'https://app.cogitoacademy.id/knowledge-bank',
      external: true,
    },
  },
  blog: {
    id: {
      listLabel: 'Baca blog Cogito',
      title: 'Strategi dan cerita, sebelum kamu bertanding.',
      description:
        'Artikel dari tutor dan siswa Cogito: panduan kompetisi, catatan latihan, dan strategi yang bisa langsung kamu pakai.',
      cta: 'Baca blog Cogito',
      href: '/blog',
    },
    en: {
      listLabel: 'Read the Cogito blog',
      title: 'Strategy and stories before you compete.',
      description:
        'Articles from Cogito tutors and students: competition guides, practice notes, and strategies you can use right away.',
      cta: 'Read the Cogito blog',
      href: '/blog',
    },
  },
  calendar: {
    id: {
      listLabel: 'Pantau kalender lomba',
      title: 'Jangan lewatkan panggung berikutnya.',
      description:
        'Pantau kompetisi nasional dan internasional, tenggat pendaftaran, dan skala lomba dalam satu kalender terkurasi.',
      cta: 'Buka kalender lomba',
      href: '/calendar',
    },
    en: {
      listLabel: 'Track the competition calendar',
      title: 'Never miss the next stage.',
      description:
        'Track national and international competitions, registration deadlines, and event scale in one curated calendar.',
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

const STEP_COUNT = STEP_ORDER.length;
const DESKTOP_QUERY = '(min-width: 1024px) and (min-height: 640px)';
const SCROLL_STEP_PX = 380;
const STICKY_TOP_PX = 104;
const MOBILE_AUTO_MS = 5200;

interface RecordsStoryProps {
  data: RecordsStoryData;
  locale: RecordsStoryLocale;
  knowledgeBankUrl: string;
}

export function RecordsStory({ data, locale, knowledgeBankUrl }: RecordsStoryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const userTookOverRef = useRef(false);

  const steps = STEP_ORDER.map((key) => {
    const copy = STORY_COPY[key][locale];

    return {
      key,
      ...copy,
      href: key === 'knowledge' ? knowledgeBankUrl : copy.href,
    };
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const desktop = window.matchMedia(DESKTOP_QUERY);
    let frame = 0;

    const updateFromScroll = () => {
      if (!desktop.matches) return;

      const sticky = stickyRef.current;
      const stickyTop = sticky
        ? Number.parseFloat(window.getComputedStyle(sticky).top) || STICKY_TOP_PX
        : STICKY_TOP_PX;
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const rawIndex = Math.floor((window.scrollY - trackTop + stickyTop) / SCROLL_STEP_PX) + 1;
      const nextIndex = Math.min(STEP_COUNT, Math.max(1, rawIndex)) - 1;

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateFromScroll();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    desktop.addEventListener('change', updateFromScroll);
    updateFromScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      desktop.removeEventListener('change', updateFromScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === 'undefined') return;

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: number | null = null;

    const stopAuto = () => {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const startAuto = () => {
      if (desktop.matches || reduceMotion.matches || userTookOverRef.current || timer !== null) {
        return;
      }

      timer = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % STEP_COUNT);
      }, MOBILE_AUTO_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startAuto();
        else stopAuto();
      },
      { threshold: 0.5 },
    );

    observer.observe(stage);

    const handleModeChange = () => {
      stopAuto();
      startAuto();
    };

    desktop.addEventListener('change', handleModeChange);
    reduceMotion.addEventListener('change', handleModeChange);

    return () => {
      stopAuto();
      observer.disconnect();
      desktop.removeEventListener('change', handleModeChange);
      reduceMotion.removeEventListener('change', handleModeChange);
    };
  }, []);

  const goToStep = (index: number) => {
    setActiveIndex(index);

    const desktop = window.matchMedia(DESKTOP_QUERY).matches;
    if (!desktop) {
      userTookOverRef.current = true;
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    const sticky = stickyRef.current;
    const stickyTop = sticky
      ? Number.parseFloat(window.getComputedStyle(sticky).top) || STICKY_TOP_PX
      : STICKY_TOP_PX;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: trackTop - stickyTop + index * SCROLL_STEP_PX + 2,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div ref={trackRef} className={styles.track}>
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.layout}>
          <ol
            className={styles.list}
            aria-label={locale === 'id' ? 'Langkah Cogito App' : 'Cogito App steps'}
          >
            {steps.map((step, index) => {
              const isActive = index === activeIndex;

              return (
                <li key={step.key}>
                  <button
                    type="button"
                    onClick={() => goToStep(index)}
                    aria-current={isActive ? 'step' : undefined}
                    aria-controls={`records-screen-${step.key}`}
                    className={`${styles.stepButton} ${isActive ? styles.stepButtonActive : ''}`}
                  >
                    <span className={styles.stepNumber}>{index + 1}</span>
                    <span className={styles.stepLabel}>{step.listLabel}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div ref={stageRef} className={styles.stageColumn}>
            <div className={styles.frame}>
              {steps.map((step, index) => (
                <RecordsStage
                  key={step.key}
                  screenId={`records-screen-${step.key}`}
                  stepKey={step.key}
                  label={step.listLabel}
                  title={step.title}
                  description={step.description}
                  cta={step.cta}
                  href={step.href}
                  external={step.external}
                  data={data}
                  locale={locale}
                  active={index === activeIndex}
                  videoSrc={STORY_VIDEOS[step.key]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
