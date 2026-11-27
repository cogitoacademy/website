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
  tutors: '/videos/records/tutor-booking.mp4',
  achievements: '/videos/records/achievements.mp4',
  knowledge: '/videos/records/knowledge-bank.mp4',
  blog: '/videos/records/blog.mp4',
  calendar: '/videos/records/competition-calendar.mp4',
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
      listLabel: 'Belajar bersama tutor',
      title: 'Bimbingan yang sesuai dengan tujuanmu.',
      description:
        'Kenali pengalaman dan bidang keahlian tutor kami, lalu pilih sesi belajar yang sesuai dengan kebutuhan dan jadwalmu.',
      cta: 'Lihat direktori tutor',
      href: '/tutors',
    },
    en: {
      listLabel: 'Learn with a tutor',
      title: 'Guidance for your next goal.',
      description:
        'Explore our tutors’ experience and areas of expertise, then choose a session that suits your learning needs and schedule.',
      cta: 'Browse the tutor directory',
      href: '/tutors',
    },
  },
  achievements: {
    id: {
      listLabel: 'Catat prestasi',
      title: 'Rayakan setiap pencapaianmu.',
      description:
        'Bagikan prestasi kompetisimu dan jadikan pencapaianmu bagian dari cerita komunitas Cogito. Setiap prestasi ditinjau oleh tim kami sebelum ditampilkan dengan persetujuanmu.',
      cta: 'Lihat arsip prestasi',
      href: '/achievements',
    },
    en: {
      listLabel: 'Record achievements',
      title: 'Celebrate every achievement.',
      description:
        'Share your competition achievements and become part of the Cogito community’s story. Our team reviews each submission before publishing it with your consent.',
      cta: 'View the achievement archive',
      href: '/achievements',
    },
  },
  knowledge: {
    id: {
      listLabel: 'Belajar dari Knowledge Bank',
      title: 'Materi latihan selalu dalam jangkauan.',
      description:
        'Perdalam pemahamanmu dengan position paper, panduan belajar, dan materi pendukung untuk mempersiapkan kompetisi berikutnya.',
      cta: 'Buka Knowledge Bank',
      href: 'https://app.cogitoacademy.id/knowledge-bank',
      external: true,
    },
    en: {
      listLabel: 'Learn from the Knowledge Bank',
      title: 'Practice material, always within reach.',
      description:
        'Build your understanding with position papers, study guides, and resources to help you prepare for your next competition.',
      cta: 'Open the Knowledge Bank',
      href: 'https://app.cogitoacademy.id/knowledge-bank',
      external: true,
    },
  },
  blog: {
    id: {
      listLabel: 'Baca blog Cogito',
      title: 'Wawasan baru untuk langkah berikutnya.',
      description:
        'Jelajahi panduan kompetisi, tips belajar, dan cerita dari komunitas Cogito untuk memperkaya persiapanmu.',
      cta: 'Baca blog Cogito',
      href: '/blog',
    },
    en: {
      listLabel: 'Read the Cogito blog',
      title: 'Fresh perspectives for your next step.',
      description:
        'Explore competition guides, study tips, and stories from the Cogito community to enrich your preparation.',
      cta: 'Read the Cogito blog',
      href: '/blog',
    },
  },
  calendar: {
    id: {
      listLabel: 'Pantau kalender lomba',
      title: 'Jangan lewatkan panggung berikutnya.',
      description:
        'Temukan kompetisi nasional dan internasional, catat tenggat pendaftarannya, dan rencanakan persiapanmu sejak awal.',
      cta: 'Buka kalender lomba',
      href: '/calendar',
    },
    en: {
      listLabel: 'Track the competition calendar',
      title: 'Never miss the next stage.',
      description:
        'Discover national and international competitions, keep track of registration deadlines, and plan your preparation ahead of time.',
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
