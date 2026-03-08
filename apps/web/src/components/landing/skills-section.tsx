'use client';

import {
  BookOpenIcon,
  ChartBarIcon,
  ChatsCircleIcon,
  HandshakeIcon,
  LightbulbFilamentIcon,
  MagnifyingGlassIcon,
  MedalIcon,
  MegaphoneSimpleIcon,
  PencilLineIcon,
  PresentationChartIcon,
  TrophyIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Badge } from '../ui/badge';
import { Container } from '../ui/container';
import FieldCard from './field-card';

type Focus = {
  icon: React.ComponentType<{
    className?: string;
    weight?: 'bold' | 'regular' | 'duotone' | 'fill' | 'thin';
  }>;
  labelId: string;
  labelEn: string;
};

export type Skill = {
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  longDescriptionId: string;
  longDescriptionEn: string;
  color: string;
  levels: string[];
  focuses: Focus[];
};

const skills: Skill[] = [
  {
    titleId: 'Model United Nations',
    titleEn: 'Model United Nations',
    descriptionId: 'Ahli negosiasi dan diplomasi global.',
    descriptionEn: 'Expert in negotiation and global diplomacy.',
    longDescriptionId:
      'Model United Nations (MUN) adalah simulasi sidang PBB yang melatih pelajar untuk berperan sebagai diplomat dalam meriset, bernegosiasi, dan merumuskan solusi cerdas atas berbagai isu global.',
    longDescriptionEn:
      'Model United Nations (MUN) is a simulation of UN sessions that trains students to act as diplomats in researching, negotiating, and formulating smart solutions to various global issues.',
    color: 'tertiary-blue-500',
    levels: ['SD', 'SMP', 'SMA', 'Kuliah'],
    focuses: [
      {
        icon: MagnifyingGlassIcon,
        labelId: 'Riset dan Penulisan Strategis',
        labelEn: 'Strategic Research & Writing',
      },
      {
        icon: UsersThreeIcon,
        labelId: 'Public Speaking dan Persuasi',
        labelEn: 'Public Speaking & Persuasion',
      },
      {
        icon: HandshakeIcon,
        labelId: 'Diplomasi dan Negosiasi',
        labelEn: 'Diplomacy & Negotiation',
      },
    ],
  },
  {
    titleId: 'Pidato',
    titleEn: 'Public Speaking',
    descriptionId: 'Bicara publik di berbagai tingkat.',
    descriptionEn: 'Public speaking at various levels.',
    longDescriptionId:
      'Pelatihan pidato dirancang untuk membangun kepercayaan diri dan kemampuan komunikasi verbal yang kuat. Peserta berlatih menyampaikan pesan dengan jelas, meyakinkan, dan berkesan di hadapan audiens.',
    longDescriptionEn:
      'Public speaking training is designed to build confidence and strong verbal communication skills. Participants practice delivering messages clearly, convincingly, and memorably before an audience.',
    color: 'tertiary-pink-300',
    levels: ['SD', 'SMP', 'SMA'],
    focuses: [
      {
        icon: MegaphoneSimpleIcon,
        labelId: 'Teknik Vokal dan Artikulasi',
        labelEn: 'Vocal Technique & Articulation',
      },
      {
        icon: PencilLineIcon,
        labelId: 'Struktur Pidato yang Efektif',
        labelEn: 'Effective Speech Structure',
      },
      {
        icon: UsersThreeIcon,
        labelId: 'Penguasaan Panggung',
        labelEn: 'Stage Presence',
      },
    ],
  },
  {
    titleId: 'Olimpiade',
    titleEn: 'Olympiad',
    descriptionId: 'Juara sains dan matematika dunia.',
    descriptionEn: 'World science and math champions.',
    longDescriptionId:
      'Program olimpiade mempersiapkan pelajar berprestasi untuk berkompetisi di bidang matematika, fisika, kimia, biologi, dan informatika di tingkat nasional maupun internasional.',
    longDescriptionEn:
      'The olympiad program prepares high-achieving students to compete in mathematics, physics, chemistry, biology, and informatics at national and international levels.',
    color: 'tertiary-red-600',
    levels: ['SD', 'SMP', 'SMA'],
    focuses: [
      {
        icon: MagnifyingGlassIcon,
        labelId: 'Pemahaman Konsep Mendalam',
        labelEn: 'Deep Concept Understanding',
      },
      {
        icon: PencilLineIcon,
        labelId: 'Latihan Soal Intensif',
        labelEn: 'Intensive Problem Practice',
      },
      {
        icon: TrophyIcon,
        labelId: 'Strategi Kompetisi',
        labelEn: 'Competition Strategy',
      },
    ],
  },
  {
    titleId: "World Scholar's Cup",
    titleEn: "World Scholar's Cup",
    descriptionId: 'Eksplorasi ilmu di panggung dunia.',
    descriptionEn: 'Explore knowledge on the world stage.',
    longDescriptionId:
      "World Scholar's Cup (WSC) adalah kompetisi akademik internasional yang menggabungkan debat, penulisan esai, dan kuis beregu. Peserta mengeksplorasi tema unik lintas disiplin ilmu setiap tahunnya.",
    longDescriptionEn:
      "World Scholar's Cup (WSC) is an international academic competition combining debate, essay writing, and team quiz. Participants explore unique cross-disciplinary themes each year.",
    color: 'tertiary-yellow-600',
    levels: ['SMP', 'SMA'],
    focuses: [
      {
        icon: BookOpenIcon,
        labelId: 'Penguasaan Materi Lintas Bidang',
        labelEn: 'Cross-Disciplinary Mastery',
      },
      {
        icon: ChatsCircleIcon,
        labelId: 'Debat dan Argumentasi',
        labelEn: 'Debate & Argumentation',
      },
      {
        icon: PencilLineIcon,
        labelId: 'Penulisan Esai Akademik',
        labelEn: 'Academic Essay Writing',
      },
    ],
  },
  {
    titleId: 'KTI dan Esai',
    titleEn: 'Scientific Writing & Essays',
    descriptionId: 'Susun riset ilmiah standar dunia.',
    descriptionEn: 'Compose world-standard scientific research.',
    longDescriptionId:
      'Program Karya Tulis Ilmiah (KTI) dan Esai membimbing pelajar dalam menyusun penelitian orisinal dan esai argumentatif sesuai standar akademik internasional, dari perumusan masalah hingga publikasi.',
    longDescriptionEn:
      'The Scientific Writing & Essay program guides students in composing original research and argumentative essays according to international academic standards, from problem formulation to publication.',
    color: 'primary-500',
    levels: ['SMP', 'SMA', 'Kuliah'],
    focuses: [
      {
        icon: MagnifyingGlassIcon,
        labelId: 'Metodologi Penelitian',
        labelEn: 'Research Methodology',
      },
      {
        icon: PencilLineIcon,
        labelId: 'Penulisan Akademik Terstruktur',
        labelEn: 'Structured Academic Writing',
      },
      {
        icon: LightbulbFilamentIcon,
        labelId: 'Analisis dan Sintesis Data',
        labelEn: 'Data Analysis & Synthesis',
      },
    ],
  },
  {
    titleId: 'Debat',
    titleEn: 'Debate',
    descriptionId: 'Latih logika dan argumen kritis.',
    descriptionEn: 'Train logic and critical arguments.',
    longDescriptionId:
      'Pelatihan debat mengasah kemampuan berpikir kritis, membangun argumen yang logis, dan merespons lawan secara cepat dan tepat. Program ini mencakup format debat nasional maupun internasional.',
    longDescriptionEn:
      'Debate training sharpens critical thinking skills, builds logical arguments, and trains quick and accurate responses. The program covers national and international debate formats.',
    color: 'secondary-500',
    levels: ['SMP', 'SMA', 'Kuliah'],
    focuses: [
      {
        icon: LightbulbFilamentIcon,
        labelId: 'Berpikir Kritis dan Analitis',
        labelEn: 'Critical & Analytical Thinking',
      },
      {
        icon: ChatsCircleIcon,
        labelId: 'Konstruksi Argumen',
        labelEn: 'Argument Construction',
      },
      {
        icon: MegaphoneSimpleIcon,
        labelId: 'Rebutan dan Sanggahan',
        labelEn: 'Rebuttal & Counter-Argument',
      },
    ],
  },
  {
    titleId: 'Business Plan',
    titleEn: 'Business Plan',
    descriptionId: 'Rancang inovasi bisnis masa depan.',
    descriptionEn: 'Design future business innovations.',
    longDescriptionId:
      'Program Business Plan melatih pelajar untuk mengidentifikasi peluang bisnis, merancang model usaha yang layak, dan mempresentasikan rencana bisnis secara profesional di hadapan juri dan investor.',
    longDescriptionEn:
      'The Business Plan program trains students to identify business opportunities, design viable business models, and professionally present business plans before judges and investors.',
    color: 'tertiary-green-600',
    levels: ['SMA', 'Kuliah'],
    focuses: [
      {
        icon: LightbulbFilamentIcon,
        labelId: 'Inovasi dan Ideasi Bisnis',
        labelEn: 'Business Innovation & Ideation',
      },
      {
        icon: ChartBarIcon,
        labelId: 'Analisis Pasar dan Keuangan',
        labelEn: 'Market & Financial Analysis',
      },
      {
        icon: PresentationChartIcon,
        labelId: 'Presentasi dan Pitching',
        labelEn: 'Presentation & Pitching',
      },
    ],
  },
];

export function SkillsSection() {
  const locale = useLocale();
  const isId = locale === 'id';

  return (
    <section className="bg-primary-100 px-4 py-20">
      <div
        id="skills"
        className="invisible h-0 scroll-mt-24 md:scroll-mt-[6.5rem]"
        aria-hidden="true"
      />
      <Container className="relative max-w-[calc(80rem-2rem)] overflow-hidden rounded-2xl border bg-tertiary-pink-500 pt-9 pb-20">
        <Image
          src="/images/landing/fields-background.webp"
          alt="Skills Section Image"
          width={1400}
          height={422}
          className="absolute inset-0 bottom-0 z-3 mt-auto w-full"
        />

        <div className="absolute top-20 left-0 aspect-[500/520] w-full lg:aspect-16/5">
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="h-full w-full">
            <polygon points="0,0 1000,0 1000,80 500,120 0,80" className="fill-tertiary-pink-300" />
          </svg>
        </div>

        <div className="absolute top-0 left-0 aspect-[500/520] w-full lg:aspect-16/5">
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="h-full w-full">
            <polygon points="0,0 1000,0 1000,80 500,120 0,80" className="fill-neutral-100" />
          </svg>
        </div>

        <div className="relative z-3 flex flex-col items-center justify-center">
          <Badge variant={'headline-cream'}>
            <MedalIcon className="size-5" />
            <span>{isId ? 'Jenis Perlombaan' : 'Types of Competitions'}</span>
          </Badge>

          <h2 className="relative z-1 text-center font-bold text-3xl">
            {isId ? (
              <>
                Fokus <span className="text-primary-500">Pembelajaran</span>
              </>
            ) : (
              <>
                Learning <span className="text-primary-500">Focus</span>
              </>
            )}
          </h2>
        </div>

        {/* MOBILE = full width stack | SM+ = flex wrap cards */}
        <div className="relative z-3 md:mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
          {skills.map((skill) => (
            <FieldCard key={skill.titleEn} skill={skill} isId={isId} />
          ))}
        </div>
      </Container>
    </section>
  );
}
