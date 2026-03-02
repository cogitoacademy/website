"use client";

import { ArrowRightIcon, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useState } from "react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const REGULER_SUBJECTS = [
  {
    slug: "mun",
    labelId: "Model United Nations",
    labelEn: "Model United Nations",
    sessionsId:
      "24 sesi pembelajaran intensif dengan jadwal satu pertemuan setiap minggu.",
    sessionsEn: "24 intensive learning sessions with one meeting every week.",
    topicsId: [
      "Dasar-dasar MUN dan menguasai prosedur",
      "Riset negara, dewan, dan topik",
      "Menulis position paper yang kuat",
      "Public speaking dan retorika",
      "Strategi diplomasi dan negosiasi",
      "Menulis draft resolusi",
    ],
    topicsEn: [
      "MUN basics and mastering rules of procedure",
      "Country, council, and topic research methods",
      "Writing a strong position paper",
      "Public speaking and rhetorics",
      "Diplomacy and negotiation strategies",
      "Writing draft resolution",
    ],
  },
  {
    slug: "wsc",
    labelId: "World Scholar's Cup",
    labelEn: "World Scholar's Cup",
    sessionsId:
      "36 sesi pembelajaran intensif dengan jadwal satu pertemuan setiap minggu.",
    sessionsEn: "36 intensive learning sessions with one meeting every week.",
    topicsId: [
      "Teknik Scholar's Bowl",
      "Penguasaan materi lintas disiplin",
      "Menulis esai akademik",
      "Analisis dan evaluasi sumber",
      "Strategi dan kolaborasi tim",
      "Taktik soal pilihan ganda",
    ],
    topicsEn: [
      "Scholar's Bowl techniques",
      "Cross-disciplinary subject mastery",
      "Academic essay writing",
      "Source analysis and evaluation",
      "Team strategy and collaboration",
      "Multiple-choice question tactics",
    ],
  },
  {
    slug: "debat",
    labelId: "Debat",
    labelEn: "Debate",
    sessionsId:
      "18 sesi pembelajaran intensif dengan jadwal satu pertemuan setiap minggu.",
    sessionsEn: "18 intensive learning sessions with one meeting every week.",
    topicsId: [
      "Fundamentasi argumentasi",
      "Analisis mosi",
      "Peran narasumber (1, 2, 3)",
      "Teknik rebuttal",
      "Cross-examination",
      "Penyampaian final focus",
    ],
    topicsEn: [
      "Argumentation fundamentals",
      "Motion analysis",
      "Speaker roles (first, second, third)",
      "Rebuttal techniques",
      "Cross-examination",
      "Final focus delivery",
    ],
  },
] as const;

const COLOR_BORDER_MAP: Record<string, string> = {
  "tertiary-blue-500": "border-l-tertiary-blue-500",
  "tertiary-yellow-600": "border-l-tertiary-yellow-600",
  "secondary-500": "border-l-secondary-500",
};

const COLOR_BG_LIGHT_MAP: Record<string, string> = {
  "tertiary-blue-500": "bg-tertiary-blue-100",
  "tertiary-yellow-600": "bg-tertiary-yellow-100",
  "secondary-500": "bg-secondary-100",
};

const COLOR_TEXT_MAP: Record<string, string> = {
  "tertiary-blue-500": "text-tertiary-blue-500",
  "tertiary-yellow-600": "text-tertiary-yellow-600",
  "secondary-500": "text-secondary-500",
};

const COLOR_BORDER_HEX: Record<string, string> = {
  "tertiary-blue-500": "#29aae1",
  "tertiary-yellow-600": "#ffd600",
  "secondary-500": "#a64ac9",
};

export function ClassCard({
  className,
  innerClassName,
  title,
  description,
  tags,
  isActiveTrigger,
  tutorType,
}: {
  className?: string;
  innerClassName?: string;
  title: string;
  description: string;
  tags: string[];
  isActiveTrigger?: boolean;
  tutorType?: string;
}) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const isId = locale === "id";

  const getModalContent = () => {
    if (tutorType === "Tutor Kelas Intensif") {
      return {
        title: "Kelas Intensif",
        description:
          "Persiapan kilat menuju satu ajang juara dengan strategi taktis yang teruji.",
        features: [
          "Fokus pada satu kompetisi target",
          "Durasi intensif 2-4 minggu",
          "Mentor berpengalaman di bidangnya",
          "Simulasi langsung (mock competition)",
          "Strategi dan teknik winning",
        ],
        ctaText: "Daftar Kelas Intensif",
        badge: "Best for Competition",
        badgeColor: "bg-yellow-400",
      };
    }
    if (tutorType === "Tutor Kelas Ekstrakurikuler") {
      return {
        title: "Kelas Ekstrakurikuler",
        description:
          "Bentuk ekosistem juara di sekolahmu dengan program rutin yang fleksibel.",
        features: [
          "Program rutin mingguan",
          "Kurikulum disesuaikan sekolah",
          "Pengembangan skill jangka panjang",
          "Latihan kolaboratif",
          "Monitoring progress berkala",
        ],
        ctaText: "Daftar Kelas Ekstrakurikuler",
        badge: "For Schools",
        badgeColor: "bg-blue-400",
      };
    }
    return {
      title: "Kelas Reguler",
      description:
        "Belajar semua tentang suatu jenis perlombaan dari dasar sampai mahir dengan kurikulum holistik.",
      features: [
        "Kurikulum komprehensif",
        "Belajar dari dasar hingga mahir",
        "Tutor profesional berpengalaman",
        "Fleksibel (Individu & Kelompok)",
        "Sertifikat completion",
      ],
      ctaText: "Daftar Kelas Reguler",
      badge: "Most Popular",
      badgeColor: "bg-pink-400",
    };
  };

  const modalContent = getModalContent();

  const handleClick = () => {
    if (tutorType) {
      setOpen(true);
    }
  };

  return (
    <>
      <div
        className={`overflow-hidden rounded-2xl ${className} relative md:min-h-100 ${
          tutorType ? "cursor-pointer" : ""
        }`}
        onClick={handleClick}
      >
        <AnimatePresence initial={false}>
          {isActiveTrigger && (
            <motion.div
              key="trigger"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div className="my-3 flex w-full items-center justify-between px-5 sm:px-6">
                <p className="text-sm lg:text-base">Baca Selengkapnya</p>
                <ArrowRightIcon className="size-4 lg:size-5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ marginTop: isActiveTrigger ? 0 : 12 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            "flex min-h-full flex-col gap-3 rounded-2xl p-5 sm:p-6",
            innerClassName ?? "",
          )}
        >
          <h2 className="font-bold text-neutral-1000 text-xl sm:text-2xl">
            {title}
          </h2>
          <p className="text-neutral-1000 text-sm line-clamp-2 lg:line-clamp-none">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-neutral-100/80 px-3 py-1.5 font-medium text-neutral-1000 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <ResponsiveModal open={open} onOpenChange={setOpen}>
        <ResponsiveModalContent
          side={"bottom"}
          style={{ maxHeight: "75dvh" }}
          className="flex flex-col overflow-hidden rounded-t-2xl border-none p-0 sm:max-w-[600px] lg:max-w-4xl sm:rounded-lg"
        >
          {/* Top: Image Section */}
          <div className="relative h-[200px] shrink-0 overflow-hidden bg-[#A855F7] md:h-50">
            {/* Main Image */}
            <Image
              src="/placeholder.jpg"
              alt="Class in Cogito Academy"
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 40vw"
            />

            {/* Gradient Overlay for Text Readability (Mobile) */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent sm:hidden" />

            {/* Mobile Badges Overlay */}
            <div className="absolute right-4 bottom-4 left-4 z-10 flex flex-wrap gap-2 sm:hidden">
              <span
                className={`inline-flex items-center rounded-full ${modalContent.badgeColor} px-3 py-1.5 font-medium text-white text-xs`}
              >
                {modalContent.badge}
              </span>
            </div>
          </div>

          {/* Right/Bottom: Content Section */}
          <div className="min-h-0 flex-1 overflow-y-auto p-4 pt-0">
            {/* Kelas Reguler: Tabbed Layout */}
            {tutorType === "Tutor Kelas Reguler" ? (
              <Tabs
                defaultValue={REGULER_SUBJECTS[0].slug}
                className="flex-col sm:flex-row"
              >
                {/* Left Panel: Tabs List */}
                <div className="shrink-0 sm:w-60">
                  <TabsList
                    variant="sidebar"
                    className="flex w-full flex-row overflow-x-auto sm:flex-col"
                  >
                    {REGULER_SUBJECTS.map((subject) => (
                      <TabsTrigger
                        key={subject.slug}
                        value={subject.slug}
                        className="min-w-[110px] shrink-0 px-4 py-3 text-sm sm:w-full sm:min-w-full justify-between bg-background-cream shadow-xs"
                        style={
                          {
                            "--active-color": COLOR_BORDER_HEX[subject.color],
                          } as React.CSSProperties
                        }
                      >
                        {isId ? subject.labelId : subject.labelEn}
                        <ArrowRightIcon className="" />
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {/* Right Panel: Tab Content */}
                <div className="min-w-0 flex-1 bg-tertiary-blue-500 rounded-lg overflow-hidden">
                  {REGULER_SUBJECTS.map((subject) => (
                    <TabsContent key={subject.slug} value={subject.slug}>
                      <div className="p-4">
                        <ResponsiveModalTitle className="font-semibold text-2xl text-foreground leading-none tracking-tight sm:text-xl">
                          {isId ? subject.labelId : subject.labelEn}
                        </ResponsiveModalTitle>
                      </div>

                      <div className="space-y-3 bg-background-cream p-4 rounded-lg overflow-hidden">
                        <p className="text-sm text-neutral-1000">
                          {isId ? subject.sessionsId : subject.sessionsEn}
                        </p>
                        <h3 className="font-semibold text-lg text-neutral-1000">
                          {isId
                            ? "Apa yang Akan Kamu Pelajari dan Kuasai!"
                            : "What You Will Learn and Master!"}
                        </h3>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {(isId ? subject.topicsId : subject.topicsEn).map(
                            (topic, index) => (
                              <div
                                key={index}
                                className={cn(
                                  "flex items-start gap-3 rounded-lg p-3",
                                  COLOR_BG_LIGHT_MAP[subject.color],
                                )}
                              >
                                <Trophy
                                  className={cn(
                                    "mt-0.5 h-4 w-4 shrink-0",
                                    COLOR_TEXT_MAP[subject.color],
                                  )}
                                />
                                <span className="text-neutral-700 text-sm">
                                  {topic}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            ) : (
              /* Intensif & Ekstrakurikuler: Original Feature List */
              <div className="p-6">
                {/* Header Info */}
                <div className="space-y-3">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <ResponsiveModalTitle className="font-bold text-2xl text-foreground leading-none tracking-tight sm:text-3xl">
                      {modalContent.title}
                    </ResponsiveModalTitle>

                    {/* Desktop Badges */}
                    <div className="hidden max-w-[50%] flex-wrap justify-end gap-2 sm:flex">
                      <span
                        className={`inline-flex items-center rounded-full ${modalContent.badgeColor} px-3 py-1.5 font-medium text-white text-xs`}
                      >
                        {modalContent.badge}
                      </span>
                    </div>
                  </div>

                  <p className="leading -none font-medium text-base text-neutral-1000">
                    {modalContent.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <h3 className="font-semibold text-lg text-neutral-1000">
                    Apa yang kamu dapatkan:
                  </h3>
                  <ul className="space-y-2">
                    {modalContent.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-neutral-700"
                      >
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100">
                          <svg
                            className="h-3 w-3 text-primary-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <Button className="w-full">{modalContent.ctaText}</Button>
                </div>
              </div>
            )}
          </div>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
