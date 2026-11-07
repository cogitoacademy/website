'use client';

import {
  ArrowRight,
  CalendarDays,
  Check,
  FileText,
  GraduationCap,
  Medal,
  Newspaper,
  Search,
  Trophy,
  Users,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import type {
  RecordsStoryData,
  RecordsStoryLocale,
  RecordsStoryStepKey,
} from '@/types/records-story';
import styles from './records-story.module.css';

const APP_PATHS: Record<RecordsStoryStepKey, string> = {
  tutors: 'app.cogitoacademy.id/tutors',
  achievements: 'app.cogitoacademy.id/achievements',
  knowledge: 'app.cogitoacademy.id/knowledge-bank',
  blog: 'app.cogitoacademy.id/blog',
  calendar: 'app.cogitoacademy.id/calendar',
};

const STAGE_COPY = {
  id: {
    app: 'Cogito App',
    book: 'Booking sesi',
    chooseSession: 'Pilih sesi',
    directory: 'Direktori tutor',
    tutorTitle: 'Tutor pilihanmu',
    tutorCount: 'tutor',
    verified: 'Terverifikasi',
    achievementArchive: 'Arsip prestasi',
    achievementTitle: 'Prestasi terverifikasi',
    approved: 'Disetujui tim Cogito',
    upload: 'Diunggah',
    review: 'Diverifikasi',
    public: 'Tampil publik',
    knowledge: 'Knowledge Bank',
    knowledgeTitle: 'Materi belajar',
    knowledgeCount: 'materi',
    search: 'Cari materi…',
    blog: 'Blog Cogito',
    blogTitle: 'Artikel terbaru',
    blogCount: 'artikel',
    readTime: 'menit baca',
    calendar: 'Kalender lomba',
    calendarTitle: 'Kompetisi terdekat',
    calendarCount: 'kompetisi',
    emptyTutors: 'Profil tutor segera hadir.',
    emptyResources: 'Materi belajar segera hadir.',
    emptyCalendar: 'Belum ada jadwal kompetisi baru.',
    wib: 'WIB',
    scale: {
      international: 'Internasional',
      national: 'Nasional',
      regional: 'Regional',
    } as Record<string, string>,
    resourceCategory: {
      'position-paper': 'Position paper',
      'resolution-bank': 'Bank resolusi',
      'study-guide': 'Panduan belajar',
      other: 'Materi',
    } as Record<string, string>,
  },
  en: {
    app: 'Cogito App',
    book: 'Book session',
    chooseSession: 'Choose a session',
    directory: 'Tutor directory',
    tutorTitle: 'Your matched tutor',
    tutorCount: 'tutor',
    verified: 'Verified',
    achievementArchive: 'Achievement archive',
    achievementTitle: 'Verified achievements',
    approved: 'Approved by the Cogito team',
    upload: 'Uploaded',
    review: 'Reviewed',
    public: 'Publicly listed',
    knowledge: 'Knowledge Bank',
    knowledgeTitle: 'Learning materials',
    knowledgeCount: 'material',
    search: 'Search materials…',
    blog: 'Cogito Blog',
    blogTitle: 'Latest articles',
    blogCount: 'article',
    readTime: 'min read',
    calendar: 'Competition calendar',
    calendarTitle: 'Upcoming competitions',
    calendarCount: 'competition',
    emptyTutors: 'Tutor profiles are coming soon.',
    emptyResources: 'Learning materials are coming soon.',
    emptyCalendar: 'No new competition dates yet.',
    wib: 'WIB',
    scale: {
      international: 'International',
      national: 'National',
      regional: 'Regional',
    } as Record<string, string>,
    resourceCategory: {
      'position-paper': 'Position paper',
      'resolution-bank': 'Resolution bank',
      'study-guide': 'Study guide',
      other: 'Material',
    } as Record<string, string>,
  },
} satisfies Record<RecordsStoryLocale, Record<string, unknown>>;

type StageCopy = (typeof STAGE_COPY)[RecordsStoryLocale];

interface StageAchievement {
  meta: string;
  eventName: string;
  award: string;
  level: string;
  student: string;
  year: string;
}

interface StageArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  publishedAt: string;
}

const STAGE_FEATURED: Record<
  RecordsStoryLocale,
  { achievement: StageAchievement; articles: StageArticle[] }
> = {
  id: {
    achievement: {
      meta: '100+ catatan',
      eventName: 'Olimpiade Sains Nasional',
      award: 'Medali Emas',
      level: 'Nasional',
      student: 'Siswa Cogito',
      year: '2026',
    },
    articles: [
      {
        id: 'panduan-lomba-pertama',
        title: 'Menyiapkan Lomba Pertamamu: Mulai dari Mana?',
        excerpt:
          'Susun target, pilih bidang, dan tentukan jadwal latihan yang realistis sebelum mendaftar.',
        category: 'Panduan kompetisi',
        readingMinutes: 6,
        publishedAt: '2026-10-12T00:00:00.000Z',
      },
      {
        id: 'membagi-waktu-belajar',
        title: 'Membagi Waktu antara Sekolah dan Latihan',
        excerpt:
          'Rencana belajar yang konsisten lebih penting daripada latihan maraton menjelang lomba.',
        category: 'Strategi',
        readingMinutes: 5,
        publishedAt: '2026-10-05T00:00:00.000Z',
      },
      {
        id: 'kebiasaan-hari-lomba',
        title: 'Kebiasaan Kecil yang Membantu di Hari Lomba',
        excerpt: 'Tidur cukup, cek perlengkapan, dan latihan simulasi agar tampil lebih tenang.',
        category: 'Catatan tutor',
        readingMinutes: 4,
        publishedAt: '2026-09-28T00:00:00.000Z',
      },
    ],
  },
  en: {
    achievement: {
      meta: '100+ records',
      eventName: 'National Science Olympiad',
      award: 'Gold Medal',
      level: 'National',
      student: 'Cogito student',
      year: '2026',
    },
    articles: [
      {
        id: 'first-competition-guide',
        title: 'Your First Competition: Where to Start?',
        excerpt:
          'Set a goal, choose your field, and build a realistic practice schedule before registering.',
        category: 'Competition guides',
        readingMinutes: 6,
        publishedAt: '2026-10-12T00:00:00.000Z',
      },
      {
        id: 'balance-school-and-practice',
        title: 'Balancing School and Practice Time',
        excerpt:
          'A consistent study plan matters more than marathon practice sessions before competition day.',
        category: 'Strategy',
        readingMinutes: 5,
        publishedAt: '2026-10-05T00:00:00.000Z',
      },
      {
        id: 'small-habits-competition-day',
        title: 'Small Habits That Help on Competition Day',
        excerpt:
          'Rest well, check your gear, and run a simulation so you can perform with more calm.',
        category: 'Tutor notes',
        readingMinutes: 4,
        publishedAt: '2026-09-28T00:00:00.000Z',
      },
    ],
  },
};

interface RecordsStageProps {
  screenId: string;
  stepKey: RecordsStoryStepKey;
  label: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  external?: boolean;
  data: RecordsStoryData;
  locale: RecordsStoryLocale;
  active: boolean;
  videoSrc?: string;
}

export function RecordsStage({
  screenId,
  stepKey,
  label,
  title,
  description,
  cta,
  href,
  external,
  data,
  locale,
  active,
  videoSrc,
}: RecordsStageProps) {
  const copy = STAGE_COPY[locale];
  const [videoFailed, setVideoFailed] = useState(false);
  const showVideo = Boolean(videoSrc) && !videoFailed;

  return (
    <article
      id={screenId}
      aria-hidden={!active}
      inert={!active}
      className={cn(styles.screen, active && styles.screenActive)}
    >
      <div className={styles.screenInner}>
        {!showVideo && <BrowserChrome path={APP_PATHS[stepKey]} />}

        <div className={styles.screenBody}>
          {showVideo && videoSrc ? (
            <StoryVideo
              src={videoSrc}
              active={active}
              label={`${label} — ${copy.app}`}
              onError={() => setVideoFailed(true)}
            />
          ) : (
            <div aria-hidden="true" className="flex min-h-0 flex-1 flex-col">
              <StagePreview stepKey={stepKey} data={data} locale={locale} copy={copy} />
            </div>
          )}
        </div>

        <div className={styles.screenFooter}>
          <h3 className={styles.screenTitle}>{title}</h3>
          <p className={styles.screenDescription}>{description}</p>
          <StoryCta cta={cta} href={href} external={external} />
        </div>
      </div>
    </article>
  );
}

function StoryCta({ cta, href, external }: { cta: string; href: string; external?: boolean }) {
  const className =
    'group inline-flex w-fit items-center gap-1.5 font-semibold text-neutral-900 text-xs underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';
  const arrow = (
    <ArrowRight
      className="size-3.5 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none"
      aria-hidden="true"
    />
  );

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {cta}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={href as '/tutors' | '/achievements' | '/calendar' | '/blog'} className={className}>
      {cta}
      {arrow}
    </Link>
  );
}

function BrowserChrome({ path }: { path: string }) {
  return (
    <div className="flex h-8 items-center gap-2 border-neutral-200/80 border-b bg-neutral-50 px-3">
      <div className="flex gap-1" aria-hidden="true">
        <span className="size-1.5 rounded-full bg-neutral-300" />
        <span className="size-1.5 rounded-full bg-neutral-300" />
        <span className="size-1.5 rounded-full bg-neutral-300" />
      </div>
      <div className="mx-auto flex h-5 w-full max-w-[240px] items-center justify-center rounded-md border border-neutral-200 bg-white px-2 font-medium text-[9px] text-neutral-500">
        <span className="truncate">{path}</span>
      </div>
      <span className="size-4" aria-hidden="true" />
    </div>
  );
}

function StoryVideo({
  src,
  active,
  label,
  onError,
}: {
  src: string;
  active: boolean;
  label: string;
  onError: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      void video.play().catch(() => {
        // Autoplay can be blocked. The preview stays usable without playback.
      });
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <video
      ref={videoRef}
      className="h-full w-full rounded-xl bg-neutral-900 object-contain"
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      onError={onError}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function StagePreview({
  stepKey,
  data,
  locale,
  copy,
}: {
  stepKey: RecordsStoryStepKey;
  data: RecordsStoryData;
  locale: RecordsStoryLocale;
  copy: StageCopy;
}) {
  if (stepKey === 'tutors') return <TutorPreview data={data} locale={locale} copy={copy} />;
  if (stepKey === 'achievements') {
    return <AchievementPreview locale={locale} copy={copy} />;
  }
  if (stepKey === 'knowledge') return <KnowledgePreview data={data} locale={locale} copy={copy} />;
  if (stepKey === 'blog') return <BlogPreview locale={locale} copy={copy} />;
  return <CalendarPreview data={data} locale={locale} copy={copy} />;
}

function PreviewHeader({
  icon: Icon,
  eyebrow,
  title,
  meta,
}: {
  icon: typeof Users;
  eyebrow: string;
  title: string;
  meta: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-neutral-100 text-neutral-700">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-[9px] text-neutral-500 uppercase tracking-[0.12em]">
            {eyebrow}
          </p>
          <h4 className="truncate font-bold text-sm text-neutral-1000 leading-tight">{title}</h4>
        </div>
      </div>
      <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-1 font-semibold text-[9px] text-neutral-600">
        {meta}
      </span>
    </div>
  );
}

function TutorPreview({
  data,
  locale,
  copy,
}: {
  data: RecordsStoryData;
  locale: RecordsStoryLocale;
  copy: StageCopy;
}) {
  const tutor = data.tutors.items[0];
  const sessions =
    locale === 'id'
      ? ['Sel 16:00', 'Kam 19:00', 'Sab 10:00']
      : ['Tue 4 PM', 'Thu 7 PM', 'Sat 10 AM'];

  return (
    <div className="flex h-full flex-col gap-2.5">
      <PreviewHeader
        icon={Users}
        eyebrow={copy.directory}
        title={copy.tutorTitle}
        meta={countLabel(data.tutors.total, copy.tutorCount, locale)}
      />

      {tutor ? (
        <div className="rounded-xl border border-neutral-200 bg-white p-2.5">
          <div className="flex items-start gap-2.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-tertiary-blue-100 font-bold text-tertiary-blue-1000 text-xs">
              {tutor.initials || 'CA'}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-xs text-neutral-1000">{tutor.name}</p>
              <p className="truncate text-[10px] text-neutral-500">
                {tutor.affiliation || copy.app}
              </p>
              {tutor.subject && (
                <span className="mt-1 inline-flex max-w-full truncate rounded bg-tertiary-blue-100 px-1.5 py-0.5 font-semibold text-[9px] text-tertiary-blue-1000">
                  {tutor.subject}
                </span>
              )}
            </div>
            <span className="shrink-0 rounded-full bg-green-100 px-1.5 py-0.5 font-semibold text-[9px] text-green-700">
              {copy.verified}
            </span>
          </div>
          {tutor.achievement && (
            <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-neutral-50 px-2 py-1.5 text-[10px] text-neutral-700">
              <Trophy className="size-3 shrink-0 text-tertiary-yellow-700" aria-hidden="true" />
              <span className="truncate">{tutor.achievement}</span>
            </div>
          )}
        </div>
      ) : (
        <EmptyPreview icon={Users} copy={copy.emptyTutors} />
      )}

      <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-[10px] text-neutral-700">{copy.chooseSession}</p>
          <span className="text-[9px] text-neutral-400">{copy.wib}</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {sessions.map((session, index) => (
            <span
              key={session}
              className={cn(
                'flex h-7 items-center justify-center rounded-md border font-semibold text-[9px]',
                index === 0
                  ? 'border-primary-500 bg-primary-500 text-white'
                  : 'border-neutral-200 bg-white text-neutral-600',
              )}
            >
              {session}
            </span>
          ))}
        </div>
        <div className="mt-2 flex h-7 items-center justify-center rounded-md bg-primary-500 font-semibold text-[10px] text-white">
          {copy.book}
        </div>
      </div>
    </div>
  );
}

function AchievementPreview({ locale, copy }: { locale: RecordsStoryLocale; copy: StageCopy }) {
  const achievement = STAGE_FEATURED[locale].achievement;

  return (
    <div className="flex h-full flex-col gap-2.5">
      <PreviewHeader
        icon={Medal}
        eyebrow={copy.achievementArchive}
        title={copy.achievementTitle}
        meta={achievement.meta}
      />

      <div className="relative overflow-hidden rounded-xl bg-tertiary-yellow-100 p-3">
        <Medal
          className="absolute -right-3 -bottom-4 size-24 rotate-12 text-tertiary-yellow-600/20"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-1 font-semibold text-[9px] text-tertiary-yellow-1000">
              <Check className="size-2.5" aria-hidden="true" />
              {copy.approved}
            </span>
            <span className="font-semibold text-[9px] text-tertiary-yellow-1000/70 uppercase tracking-[0.1em]">
              {achievement.level}
            </span>
          </div>
          <h5 className="mt-3 line-clamp-2 font-bold text-sm text-neutral-1000 leading-tight">
            {achievement.eventName}
          </h5>
          <p className="mt-1 font-semibold text-primary-700 text-xs">{achievement.award}</p>
          <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-neutral-700">
            <span className="truncate">{achievement.student}</span>
            <span className="shrink-0 font-semibold">{achievement.year}</span>
          </div>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-1.5">
        {[copy.upload, copy.review, copy.public].map((label) => (
          <div
            key={label}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-1.5 py-1.5 font-medium text-[8.5px] text-neutral-600"
          >
            <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-green-100 text-green-700">
              <Check className="size-2" aria-hidden="true" />
            </span>
            <span className="truncate">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function KnowledgePreview({
  data,
  locale,
  copy,
}: {
  data: RecordsStoryData;
  locale: RecordsStoryLocale;
  copy: StageCopy;
}) {
  return (
    <div className="flex h-full flex-col gap-2.5">
      <PreviewHeader
        icon={FileText}
        eyebrow={copy.knowledge}
        title={copy.knowledgeTitle}
        meta={countLabel(data.resources.total, copy.knowledgeCount, locale)}
      />

      <div className="flex h-7 items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-2 text-[10px] text-neutral-400">
        <Search className="size-3" aria-hidden="true" />
        <span>{copy.search}</span>
      </div>

      {data.resources.items.length > 0 ? (
        <div className="space-y-1.5">
          {data.resources.items.map((resource) => (
            <div
              key={resource.title}
              className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-2"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-secondary-100 text-secondary-1000">
                <FileText className="size-3.5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[10px] text-neutral-900">
                  {resource.title}
                </p>
                <p className="truncate text-[9px] text-neutral-500">
                  {resource.description || copy.knowledge}
                </p>
              </div>
              <span className="shrink-0 rounded bg-secondary-100 px-1.5 py-0.5 font-semibold text-[8px] text-secondary-1000 capitalize">
                {copy.resourceCategory[resource.category] || resource.category}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <EmptyPreview icon={FileText} copy={copy.emptyResources} />
      )}
    </div>
  );
}

function BlogPreview({ locale, copy }: { locale: RecordsStoryLocale; copy: StageCopy }) {
  const articles = STAGE_FEATURED[locale].articles;
  const [featured, ...rest] = articles;

  return (
    <div className="flex h-full flex-col gap-2.5">
      <PreviewHeader
        icon={Newspaper}
        eyebrow={copy.blog}
        title={copy.blogTitle}
        meta={countLabel(articles.length, copy.blogCount, locale)}
      />

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="relative flex h-16 items-end bg-gradient-to-br from-primary-100 via-tertiary-pink-100 to-tertiary-yellow-100 p-2.5">
          <Newspaper
            className="absolute -right-2 -bottom-3 size-16 rotate-[-8deg] text-white/55"
            aria-hidden="true"
          />
          <span className="rounded bg-white/85 px-1.5 py-0.5 font-semibold text-[8px] text-primary-800 uppercase tracking-[0.1em]">
            {featured.category}
          </span>
        </div>
        <div className="p-2.5">
          <h5 className="line-clamp-2 font-bold text-xs text-neutral-1000 leading-snug">
            {featured.title}
          </h5>
          <p className="mt-1 line-clamp-2 text-[9px] text-neutral-500 leading-relaxed">
            {featured.excerpt}
          </p>
          <div className="mt-2 flex items-center justify-between gap-2 font-medium text-[8.5px] text-neutral-500">
            <span>{formatBlogDate(featured.publishedAt, locale)}</span>
            <span>
              {featured.readingMinutes} {copy.readTime}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        {rest.map((article, index) => (
          <div
            key={article.id}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-2"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-md bg-tertiary-pink-100 font-bold text-[8px] text-tertiary-pink-1000">
              {String(index + 2).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-[10px] text-neutral-900">{article.title}</p>
              <p className="truncate text-[9px] text-neutral-500">{article.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarPreview({
  data,
  locale,
  copy,
}: {
  data: RecordsStoryData;
  locale: RecordsStoryLocale;
  copy: StageCopy;
}) {
  return (
    <div className="flex h-full flex-col gap-2.5">
      <PreviewHeader
        icon={CalendarDays}
        eyebrow={copy.calendar}
        title={copy.calendarTitle}
        meta={countLabel(data.competitions.total, copy.calendarCount, locale)}
      />

      {data.competitions.items.length > 0 ? (
        <div className="space-y-1.5">
          {data.competitions.items.map((competition) => {
            const { day, month } = getDateTile(competition.start, locale);
            return (
              <div
                key={`${competition.title}-${competition.start}`}
                className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-2"
              >
                <span className="flex size-9 shrink-0 flex-col items-center justify-center rounded-md bg-tertiary-green-100 text-tertiary-green-1000">
                  <span className="font-bold text-xs leading-none">{day}</span>
                  <span className="font-semibold text-[8px] uppercase tracking-wide">{month}</span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-[10px] text-neutral-900">
                    {competition.title}
                  </p>
                  <p className="truncate text-[9px] text-neutral-500">
                    {competition.organizer || copy.calendar}
                  </p>
                </div>
                {competition.scale && (
                  <span className="shrink-0 rounded bg-neutral-100 px-1.5 py-0.5 font-semibold text-[8px] text-neutral-600">
                    {copy.scale[competition.scale] || competition.scale}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyPreview icon={CalendarDays} copy={copy.emptyCalendar} />
      )}

      <div className="mt-auto flex items-center gap-1.5 rounded-lg bg-white/60 px-2 py-1.5 text-[9px] text-neutral-500">
        <GraduationCap className="size-3" aria-hidden="true" />
        <span>
          {locale === 'id'
            ? 'Dikurasi untuk jenjang SD sampai kuliah.'
            : 'Curated for primary through university students.'}
        </span>
      </div>
    </div>
  );
}

function EmptyPreview({ icon: Icon, copy }: { icon: typeof Users; copy: string }) {
  return (
    <div className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border border-neutral-200 border-dashed bg-neutral-50 p-3 text-center">
      <Icon className="size-5 text-neutral-400" aria-hidden="true" />
      <p className="max-w-[220px] text-[10px] text-neutral-500 leading-relaxed">{copy}</p>
    </div>
  );
}

function countLabel(count: number, label: string, locale: RecordsStoryLocale) {
  return `${count} ${locale === 'en' && count !== 1 ? `${label}s` : label}`;
}

function formatBlogDate(iso: string, locale: RecordsStoryLocale) {
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'short',
    timeZone: 'Asia/Jakarta',
  }).format(new Date(iso));
}

function getDateTile(iso: string, locale: RecordsStoryLocale) {
  const date = new Date(iso);
  const tag = locale === 'id' ? 'id-ID' : 'en-US';

  return {
    day: new Intl.DateTimeFormat(tag, {
      day: '2-digit',
      timeZone: 'Asia/Jakarta',
    }).format(date),
    month: new Intl.DateTimeFormat(tag, {
      month: 'short',
      timeZone: 'Asia/Jakarta',
    })
      .format(date)
      .replace('.', ''),
  };
}
