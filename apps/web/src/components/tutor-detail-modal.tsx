"use client";

import { MapPinIcon, RadioIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getCoreCategoryBadgeColor } from "@/lib/colors/brandColors";
import type { Tutor } from "@/types/tutor";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalTitle,
} from "./ui/responsive-modal";

interface TutorDetailModalProps {
  tutor: Tutor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Helper: ambil value berdasarkan locale
 * fallback ke item pertama kalau locale ga ketemu
 */
const getLocalizedValue = (
  arr?: { _key: string; value: string }[],
  locale?: string,
) => arr?.find((item) => item._key === locale)?.value || arr?.[0]?.value || "";

export default function TutorDetailModal({
  tutor,
  open,
  onOpenChange,
}: TutorDetailModalProps) {
  const locale = useLocale();
  const t = useTranslations("tutors");
  const [maxHeight, setMaxHeight] = useState<string>("85vh");

  // Use window.innerHeight for reliable mobile viewport height
  // This accounts for address bar, notch, safe areas etc.
  useEffect(() => {
    const SM_BREAKPOINT = 640;
    function updateHeight() {
      if (window.innerWidth < SM_BREAKPOINT) {
        const vh = window.innerHeight;
        setMaxHeight(`${vh * 0.85}px`);
      } else {
        setMaxHeight("85vh");
      }
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Normalized data
  const affiliation = getLocalizedValue(tutor.affiliation, locale);
  const achievements =
    tutor.achievements?.map((a) => getLocalizedValue(a.text, locale)) || [];
  const experiences =
    tutor.experiences?.map((e) => getLocalizedValue(e.text, locale)) || [];

  const badges = tutor.competitionFields?.map((field) => (
    <span
      key={field._id}
      className={`inline-flex items-center rounded px-2.5 py-0.5 font-medium text-xs ${getCoreCategoryBadgeColor(
        field.coreCategory,
      )}`}
    >
      {field.name || "Unknown Field"}
    </span>
  ));

  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveModalContent
        side="bottom"
        className="flex w-full max-w-full flex-col gap-0 overflow-hidden rounded-t-2xl border-none bg-background p-0 sm:max-h-[85vh] sm:w-[calc(100%-2rem)] sm:max-w-5xl sm:flex-row sm:rounded-lg"
        style={{ maxHeight }}
        showCloseButton={false}
      >
        {/* Left/Top: Image Section */}
        <div className="relative h-[300px] shrink-0 overflow-hidden bg-[#A855F7] sm:h-auto sm:w-2/5">
          {/* Main Image */}
          {tutor.profilePicture?.asset?.url && (
            <Image
              src={tutor.profilePicture.asset.url}
              alt={tutor.profilePicture.asset.altText || tutor.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 40vw"
            />
          )}

          {/* Gradient Overlay for Text Readability (Mobile) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent sm:hidden" />

          {/* Mobile Badges Overlay */}
          <div className="absolute right-4 bottom-4 left-4 z-10 flex flex-wrap gap-2 sm:hidden">
            {badges}
          </div>

          {/* Custom Close Button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 z-20 h-8 w-8 rounded-md bg-white/90 text-black shadow-sm hover:bg-white sm:right-auto sm:left-4"
            onClick={() => onOpenChange(false)}
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Right/Bottom: Content Section */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-background">
          <div className="space-y-6 p-6">
            {/* Header Info */}
            <div className="space-y-3">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <ResponsiveModalTitle className="font-bold text-2xl text-foreground tracking-tight sm:text-3xl">
                  {tutor.name}
                </ResponsiveModalTitle>

                {/* Desktop Badges */}
                <div className="hidden max-w-[50%] flex-wrap justify-end gap-2 sm:flex">
                  {badges}
                </div>
              </div>

              {affiliation && (
                <p className="font-medium text-base text-muted-foreground">
                  {affiliation}
                </p>
              )}

              {/* Locations / Status */}
              <div className="flex flex-wrap gap-3 pt-1">
                <div className="inline-flex items-center gap-2 rounded-md bg-muted/50 px-3 py-1.5 font-medium text-muted-foreground text-sm">
                  <RadioIcon className="h-4 w-4" />
                  <span>Online</span>
                </div>
                {tutor.locations && tutor.locations.length > 0 && (
                  <div className="inline-flex items-center gap-2 rounded-md bg-muted/50 px-3 py-1.5 font-medium text-muted-foreground text-sm">
                    <MapPinIcon className="h-4 w-4" />
                    <span className="capitalize">
                      {tutor.locations
                        .map((loc) => loc.replace(/_/g, " "))
                        .join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Content Columns */}
            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              <div className="h-full space-y-3 rounded-xl bg-[#FFF5EB] p-5">
                <h3 className="font-semibold text-base text-foreground">
                  Rekam Jejak Prestasi
                </h3>
                {achievements.length == 0 && (
                  <p className="text-muted-foreground/90 text-sm leading-relaxed">
                    isinya sedang diracik, ditunggu ya!
                  </p>
                )}
                {achievements.length > 0 && (
                  <ul className="list-outside list-disc space-y-2 pl-4 text-muted-foreground/90 text-sm leading-relaxed">
                    {achievements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="h-full space-y-3 rounded-xl bg-[#FFF5EB] p-5">
                <h3 className="font-semibold text-base text-foreground">
                  {t("experiences") || "Pengalaman"}
                </h3>
                {experiences.length == 0 && (
                  <p className="text-muted-foreground/90 text-sm leading-relaxed">
                    isinya sedang diracik, ditunggu ya!
                  </p>
                )}
                {experiences.length > 0 && (
                  <ul className="list-outside list-disc space-y-2 pl-4 text-muted-foreground/90 text-sm leading-relaxed">
                    {experiences.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
