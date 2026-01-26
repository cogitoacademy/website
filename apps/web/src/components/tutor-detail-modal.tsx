"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import type { Tutor } from "@/types/tutor";
import { getCoreCategoryBadgeColor } from "@/lib/colors/brandColors";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
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
const getLocalizedValue = (arr?: { _key: string; value: string }[], locale?: string) =>
  arr?.find((item) => item._key === locale)?.value || arr?.[0]?.value || "";

export default function TutorDetailModal({ tutor, open, onOpenChange }: TutorDetailModalProps) {
  const locale = useLocale();
  const t = useTranslations("tutors");

  // Normalized data
  const affiliation = getLocalizedValue(tutor.affiliation, locale);
  const achievements = tutor.achievements?.map((a) => getLocalizedValue(a.text, locale)) || [];
  const experiences = tutor.experiences?.map((e) => getLocalizedValue(e.text, locale)) || [];

  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveModalContent side="bottom" className="max-h-[90vh] overflow-y-auto">
        <ResponsiveModalHeader>
          {/* Profile Picture and Name */}
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="relative h-32 w-32 rounded-full overflow-hidden bg-muted shrink-0">
              <Image
                src={tutor.profilePicture.asset.url}
                alt={tutor.profilePicture.asset.altText || tutor.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <ResponsiveModalTitle>{tutor.name}</ResponsiveModalTitle>
              {affiliation && (
                <ResponsiveModalDescription className="mt-2">
                  {affiliation}
                </ResponsiveModalDescription>
              )}
            </div>
          </div>
        </ResponsiveModalHeader>

        <div className="space-y-6">
          {/* Locations */}
          {tutor.locations && tutor.locations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">{t("location")}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPinIcon className="h-4 w-4 shrink-0" />
                <span className="capitalize">
                  {tutor.locations.map((loc) => loc.replace(/_/g, " ")).join(", ")}
                </span>
              </div>
            </div>
          )}

          {/* Competition Fields */}
          {tutor.competitionFields?.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">{t("competitionField")}</h4>
              <div className="flex flex-wrap gap-2">
                {tutor.competitionFields.map((field) => (
                  <span
                    key={field._id}
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${getCoreCategoryBadgeColor(field.coreCategory)}`}
                  >
                    {field.name || "Unknown Field"}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">{t("achievements")}</h4>
              <ul className="space-y-2 list-disc list-outside pl-5">
                {achievements.map((achievement, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Experiences */}
          {experiences.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">{t("experiences")}</h4>
              <ul className="space-y-2 list-disc list-outside pl-5">
                {experiences.map((experience, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    <span className="flex items-start gap-2">{experience}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
