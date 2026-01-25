"use client";

import Image from "next/image";
import * as m from "motion/react-m";
import { useState } from "react";
import { useLocale } from "next-intl";
import type { Tutor } from "@/types/tutor";

interface TutorCardProps {
  tutor: Tutor;
}

/**
 * Helper: ambil value berdasarkan locale
 * fallback ke item pertama kalau locale ga ketemu
 */
const getLocalizedValue = (arr?: { _key: string; value: string }[], locale?: string) =>
  arr?.find((item) => item._key === locale)?.value || arr?.[0]?.value || "";

export default function TutorCard({ tutor }: TutorCardProps) {
  const locale = useLocale();
  const [showAchievements, setShowAchievements] = useState(false);
  const [showExperiences, setShowExperiences] = useState(false);

  // ===== normalized data (UI cuma render) =====
  const jurusan = getLocalizedValue(tutor.jurusan, locale);

  const achievements = tutor.achievements?.map((a) => getLocalizedValue(a.text, locale)) || [];

  const experiences = tutor.experiences?.map((e) => getLocalizedValue(e.text, locale)) || [];

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
    >
      {/* Header */}
      <div className="flex flex-col">
        <div className="relative h-70 w-full shrink-0 bg-muted z-1">
          <Image
            src={tutor.profilePicture.asset.url}
            alt={tutor.profilePicture.asset.altText || tutor.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Bawah */}
        <div className="p-2.5 rounded-t-xl -mt-2 bg-neutral-100 relative z-2">
          <h3 className="font-semibold text-lg leading-tight truncate">{tutor.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{jurusan}</p>

          {/* Location */}
          {/*<div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="capitalize">
              {tutor.location?.name.replace(/_/g, " ") || "Location not set"}
            </span>
          </div>*/}

          {/* Tags */}
          {tutor.competitionFields?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tutor.competitionFields.map((field) => (
                <span
                  key={field._id}
                  className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {field.name || "Unknown Field"}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </m.div>
  );
}
