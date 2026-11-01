'use client';

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
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
import Link from 'next/link';
import { APP_URL, KNOWLEDGE_BANK_URL } from '@/lib/constants';
import { buttonVariants } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useLocale } from 'next-intl';
import { Badge } from '../ui/badge';
import { Container } from '../ui/container';

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
    descriptionId: 'Berdiplomasi dan negosiasikan solusi strategis untuk berbagai isu global.',
    descriptionEn: 'Negotiate strategic solutions and master the art of global diplomacy.',
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
    descriptionId: 'Pikat audiensmu dan sampaikan pesan yang memberikan pengaruh luas.',
    descriptionEn: 'Captivate your audience and deliver messages with lasting influence.',
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
    descriptionId: 'Pecahkan persoalan rumit dengan presisi akademik dan kecepatan analisis.',
    descriptionEn: 'Solve complex problems with academic precision and analytical speed.',
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
    descriptionId: 'Hubungkan berbagai bidang ilmu untuk menjawab tantangan multidisipliner.',
    descriptionEn: 'Connect diverse fields of knowledge to tackle multidisciplinary challenges.',
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
    titleId: 'Esai & Karya Tulis',
    titleEn: 'Essay & Scientific Writing',
    descriptionId: 'Ubah data dan ide kompleks menjadi riset berkualitas standar dunia.',
    descriptionEn: 'Transform complex data into compelling, world-standard research.',
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
    descriptionId: 'Bangun argumen yang kokoh dan asah kecepatan berpikir kritismu.',
    descriptionEn: 'Construct unshakeable arguments and outthink your opponents in real-time.',
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
        labelId: 'Sanggahan dan Respons',
        labelEn: 'Rebuttal & Counter-Argument',
      },
    ],
  },
  {
    titleId: 'Business Plan',
    titleEn: 'Business Plan',
    descriptionId: 'Analisis peluang pasar dan hitung risiko bisnis secara strategis.',
    descriptionEn: 'Analyze market opportunities and calculate strategic business risks.',
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

const sessions = [
  {
    heading: ['Latihan diplomasi bersama tutor', 'Practise diplomacy with a tutor'],
    steps: [
      [
        'Diskusi isu',
        'Bahas isu sidang dan posisi negara yang kamu wakili.',
        'Discuss the topic',
        'Explore the committee topic and your country’s position.',
      ],
      [
        'Simulasi sidang',
        'Latih pidato, negosiasi, dan penyusunan resolusi bersama tutor.',
        'Committee simulation',
        'Practise speeches, negotiation, and resolution drafting with your tutor.',
      ],
      [
        'Umpan balik tutor',
        'Bahas argumen dan strategi yang perlu diperkuat.',
        'Tutor feedback',
        'Review your arguments and identify strategies to improve.',
      ],
    ],
  },
  {
    heading: ['Lebih percaya diri saat berbicara', 'Speak with more confidence'],
    steps: [
      [
        'Susun pesan',
        'Diskusikan ide dan struktur pidatomu bersama tutor.',
        'Shape your message',
        'Discuss your ideas and speech structure with your tutor.',
      ],
      [
        'Praktik penyampaian',
        'Latih artikulasi, intonasi, dan cara membawakan pidato.',
        'Practise delivery',
        'Work on articulation, intonation, and presenting your speech.',
      ],
      [
        'Umpan balik tutor',
        'Evaluasi penyampaian dan tentukan fokus latihan berikutnya.',
        'Tutor feedback',
        'Review your delivery and choose what to practise next.',
      ],
    ],
  },
  {
    heading: ['Pahami konsep, bahas cara berpikirnya', 'Understand the concepts and the reasoning'],
    steps: [
      [
        'Bahas konsep',
        'Mulai dari materi yang ingin kamu kuasai bersama tutor.',
        'Explore concepts',
        'Work with your tutor on the topics you want to master.',
      ],
      [
        'Kerjakan bersama',
        'Uraikan soal dan diskusikan pendekatan penyelesaiannya.',
        'Work through problems',
        'Break down problems and discuss possible approaches.',
      ],
      [
        'Evaluasi cara berpikir',
        'Kenali kesalahan dan perbaiki langkah penyelesaianmu.',
        'Review your reasoning',
        'Identify mistakes and improve your problem-solving process.',
      ],
    ],
  },
  {
    heading: ['Persiapan WSC bersama tutor dan tim', 'Prepare for WSC with a tutor and your team'],
    steps: [
      [
        'Diskusi materi',
        'Hubungkan topik lintas bidang dengan bimbingan tutor.',
        'Discuss the material',
        'Connect topics across subjects with tutor guidance.',
      ],
      [
        'Latihan bersama',
        'Latih debat, penulisan, dan kuis sesuai kebutuhan tim.',
        'Practise together',
        'Work on debate, writing, and quizzes around your team’s needs.',
      ],
      [
        'Umpan balik tutor',
        'Bahas kontribusi tiap anggota dan strategi kerja tim.',
        'Tutor feedback',
        'Review individual contributions and teamwork strategies.',
      ],
    ],
  },
  {
    heading: ['Kembangkan tulisan lewat diskusi', 'Develop your writing through discussion'],
    steps: [
      [
        'Bahas ide dan draft',
        'Diskusikan topik, kerangka, atau tulisan yang sudah kamu buat.',
        'Discuss ideas and drafts',
        'Bring a topic, outline, or draft to discuss with your tutor.',
      ],
      [
        'Tinjau bersama',
        'Bedah alur argumen, penggunaan sumber, dan struktur tulisan.',
        'Review together',
        'Examine your argument, sources, and writing structure.',
      ],
      [
        'Arah revisi',
        'Tentukan perbaikan yang bisa kamu kerjakan setelah sesi.',
        'Plan revisions',
        'Identify changes you can work on after the session.',
      ],
    ],
  },
  {
    heading: ['Bangun argumen bersama tutor', 'Build your arguments with a tutor'],
    steps: [
      [
        'Diskusi mosi',
        'Bedah topik dan susun posisi bersama tutor.',
        'Discuss the motion',
        'Unpack the topic and develop your position with a tutor.',
      ],
      [
        'Simulasi debat',
        'Praktik menyampaikan argumen dan sanggahan.',
        'Debate simulation',
        'Practise presenting arguments and rebuttals.',
      ],
      [
        'Umpan balik tutor',
        'Bahas bagian yang sudah kuat dan yang perlu dilatih.',
        'Tutor feedback',
        'Discuss your strengths and what to work on next.',
      ],
    ],
  },
  {
    heading: ['Dari ide bisnis ke presentasi', 'From business idea to presentation'],
    steps: [
      [
        'Diskusi ide',
        'Bahas masalah, calon pelanggan, dan solusi yang kamu tawarkan.',
        'Discuss your idea',
        'Explore the problem, customers, and proposed solution.',
      ],
      [
        'Tinjau rencana',
        'Bedah model bisnis, analisis pasar, dan perhitungan dasar.',
        'Review the plan',
        'Work through the business model, market analysis, and basic financials.',
      ],
      [
        'Latihan presentasi',
        'Simulasikan presentasi dan tanya jawab bersama tutor.',
        'Practise your pitch',
        'Rehearse your presentation and questions with a tutor.',
      ],
    ],
  },
];

const panelColors = [
  'bg-tertiary-blue-100',
  'bg-tertiary-pink-100',
  'bg-tertiary-green-100',
  'bg-tertiary-yellow-100',
  'bg-tertiary-red-100',
  'bg-secondary-100',
  'bg-tertiary-blue-100',
];
const shortLabels = ['MUN', null, null, 'WSC', null, null, 'Business Plan'];

export function SkillsSection() {
  const locale = useLocale();
  const isId = locale === 'id';

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="scroll-mt-24 bg-primary-100 px-4 py-16 md:py-24"
    >
      <Container className="max-w-7xl gap-8 p-0 md:gap-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Badge variant="headline-cream">
            <MedalIcon className="size-5" />
            {isId ? 'Bidang Lomba' : 'Competition Fields'}
          </Badge>
          <h2 id="skills-title" className="text-3xl font-bold tracking-tight md:text-4xl">
            {isId ? 'Temukan bidang yang ' : 'Find what '}
            <span className="text-primary-500">
              {isId ? 'bikin kamu tertantang.' : 'challenges you.'}
            </span>
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            {isId
              ? 'Pilih bidang dan lihat bagaimana kamu bisa belajar bersama tutor lewat sesi online.'
              : 'Choose a field and discover how you can learn with a tutor in live online sessions.'}
          </p>
        </div>
        <Tabs defaultValue={skills[0].titleEn} className="min-w-0 flex-col">
          <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
            <TabsList
              aria-label={isId ? 'Pilih bidang lomba' : 'Choose a competition field'}
              variant="sidebar"
              className="w-max min-w-full gap-2!"
            >
              {skills.map((skill, index) => (
                <TabsTrigger
                  key={skill.titleEn}
                  value={skill.titleEn}
                  className="shrink-0 border-neutral-300 bg-background-cream px-3 py-1 text-sm transition-colors hover:border-primary-500 data-active:border-primary-500 data-active:bg-primary-500 data-active:text-white focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  {shortLabels[index] ?? (isId ? skill.titleId : skill.titleEn)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {skills.map((skill, index) => {
            const session = sessions[index];
            return (
              <TabsContent
                key={skill.titleEn}
                value={skill.titleEn}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-background-cream focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <div className="grid md:min-h-[460px] md:grid-cols-2">
                  <div className="flex flex-col items-start p-6 sm:p-8 lg:p-12">
                    <p className="mb-4 text-xs font-medium text-neutral-600">
                      {isId ? 'Kenali bidangnya' : 'Explore the field'}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-tight text-neutral-1000 lg:text-3xl">
                      {isId ? skill.titleId : skill.titleEn}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600 md:text-base">
                      {isId ? skill.longDescriptionId : skill.longDescriptionEn}
                    </p>
                    <ul className="my-6 space-y-3">
                      {skill.focuses.map((focus) => (
                        <li
                          key={focus.labelEn}
                          className="flex items-center gap-3 text-sm text-neutral-900"
                        >
                          <focus.icon className="size-5 shrink-0 text-primary-500" />
                          {isId ? focus.labelId : focus.labelEn}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={{ pathname: `${APP_URL}/tutors` }}
                      className={buttonVariants({ size: 'lg', className: 'mt-auto gap-2' })}
                    >
                      {isId ? 'Cari Tutor' : 'Find a Tutor'}
                      <span aria-hidden="true">
                        <ArrowRightIcon />
                      </span>
                    </Link>
                  </div>
                  <div
                    className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 ${panelColors[index]}`}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3 text-xs font-medium text-neutral-700">
                      <span>{isId ? 'Gambaran sesi belajar' : 'Inside a learning session'}</span>
                      <span className="rounded-full border border-current/20 px-2.5 py-1">
                        {isId ? 'Bersama tutor' : 'With a tutor'}
                      </span>
                    </div>
                    <p className="mb-6 text-xl font-semibold leading-snug tracking-tight text-neutral-1000 lg:text-2xl">
                      {session.heading[isId ? 0 : 1]}
                    </p>
                    <ol className="space-y-3">
                      {session.steps.map((step) => (
                        <li
                          key={step[0]}
                          className="rounded-xl border border-black/5 bg-white/75 px-4 py-3"
                        >
                          <p className="text-sm font-semibold text-neutral-1000">
                            {step[isId ? 0 : 2]}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-neutral-700">
                            {step[isId ? 1 : 3]}
                          </p>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-6 border-t border-black/10 pt-4">
                      <p className="mb-3 text-xs font-medium text-neutral-700">
                        {isId ? 'Lengkapi persiapanmu' : 'Support your preparation'}
                      </p>
                      <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium">
                        <Link
                          href={{ pathname: KNOWLEDGE_BANK_URL }}
                          className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4"
                        >
                          {isId ? 'Bank Materi' : 'Knowledge Bank'}{' '}
                          <ArrowUpRightIcon aria-hidden="true" className="size-4 shrink-0" />
                        </Link>
                        <Link
                          href={{ pathname: `${APP_URL}/calendar` }}
                          className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4"
                        >
                          {isId ? 'Kalender Lomba' : 'Competition Calendar'}{' '}
                          <ArrowUpRightIcon aria-hidden="true" className="size-4 shrink-0" />
                        </Link>
                        <Link
                          href={`/${locale}/activities`}
                          className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4"
                        >
                          {isId ? 'Kelas & Acara' : 'Classes & Events'}{' '}
                          <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </Container>
    </section>
  );
}
