"use client";

import Image from "next/image";
import * as m from "motion/react-m";
import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Award, Briefcase } from "lucide-react";
import { useLocale } from "next-intl";
import type { Tutor } from "@/types/tutor";
import { AnimatePresence } from "motion/react";

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
      className="bg-card text-card-foreground rounded-lg border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={tutor.profilePicture.asset.url}
              alt={tutor.profilePicture.asset.altText || tutor.name}
              fill
              className="object-cover rounded-full"
              sizes="96px"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold mb-1 truncate">{tutor.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{jurusan}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground capitalize">
              {tutor.location?.name.replace(/_/g, " ") || "no location yet"}
            </span>
          </div>

          {tutor.competitionFields?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tutor.competitionFields.map((field) => (
                <span
                  key={field._id}
                  className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                >
                  {field.name || "Unknown Field"}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Expandable Achievements */}
        {achievements.length > 0 && (
          <div>
            <button
              onClick={() => setShowAchievements((v) => !v)}
              className="flex items-center gap-2 w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Award className="w-4 h-4 flex-shrink-0" />
              <span>Achievements ({achievements.length})</span>
              {showAchievements ? (
                <ChevronUp className="w-4 h-4 ml-auto flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-auto flex-shrink-0" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {showAchievements && (
                <m.div
                  key="achievements"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="mt-3 space-y-2 overflow-hidden"
                >
                  {achievements.map((achievement, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {achievement}
                    </p>
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Expandable Experiences */}
        {experiences.length > 0 && (
          <div>
            <button
              onClick={() => setShowExperiences((v) => !v)}
              className="flex items-center gap-2 w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Briefcase className="w-4 h-4 flex-shrink-0" />
              <span>Experiences ({experiences.length})</span>
              {showExperiences ? (
                <ChevronUp className="w-4 h-4 ml-auto flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-auto flex-shrink-0" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {showExperiences && (
                <m.div
                  key="experiences"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="mt-3 space-y-2 overflow-hidden"
                >
                  {experiences.map((experience, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {experience}
                    </p>
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </m.div>
  );
}
