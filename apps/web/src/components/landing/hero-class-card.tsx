"use client";

import { ArrowRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

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
          <p className="text-neutral-1000 text-sm">{description}</p>
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
          className="overflow-hidden border-none p-0 sm:max-w-[600px] rounded-t-2xl sm:rounded-lg flex flex-col"
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
          <div className="min-h-0 flex-1 overflow-y-auto bg-background">
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
          </div>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
