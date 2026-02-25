"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { useState } from "react";
import { getCoreCategoryBadgeColor } from "@/lib/colors/brandColors";
import { cn } from "@/lib/utils";
import type { Tutor } from "@/types/tutor";
import TutorDetailModal from "./tutor-detail-modal";
import { Badge, badgeVariants } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowUpRightIcon } from "lucide-react";

interface TutorCardProps {
  tutor: Tutor;
  index?: number;
}

/**
 * Helper: ambil value berdasarkan locale
 * fallback ke item pertama kalau locale ga ketemu
 */
const getLocalizedValue = (arr?: { _key: string; value: string }[], locale?: string) =>
  arr?.find((item) => item._key === locale)?.value || arr?.[0]?.value || "";

export default function TutorCard({ tutor }: TutorCardProps) {
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const affiliation = getLocalizedValue(tutor.affiliation, locale);

  return (
    <>
      <div
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Arrow icon indicator */}
        <Button className="absolute top-3 right-3 z-2" variant="gray" size="icon-lg">
          <ArrowUpRightIcon strokeWidth={2.5} className="size-5" />
        </Button>

        {/* Header */}
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="relative z-1 h-60 w-full shrink-0 bg-muted">
            <Image
              src={tutor.profilePicture.asset.url}
              alt={tutor.profilePicture.asset.altText || tutor.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Bawah */}
          <div className="relative z-2 -mt-2 flex min-h-0 flex-1 flex-col rounded-xl bg-neutral-100 p-2.5 shadow-inset-top">
            <h3 className="truncate font-semibold text-lg leading-tight">{tutor.name}</h3>
            <p className="mt-1 mb-2.5 line-clamp-2 text-muted-foreground text-xs">{affiliation}</p>

            {/* Tags */}
            {tutor.competitionFields?.length > 0 && (
              <div className="mt-auto mb-0 flex flex-wrap gap-2">
                {tutor.competitionFields.map((field) => (
                  <Badge
                    key={field._id}
                    className={cn(
                      badgeVariants({ variant: "tutor" }),
                      getCoreCategoryBadgeColor(field.coreCategory),
                    )}
                  >
                    {field.name || (locale === "id" ? "Bidang Tidak Diketahui" : "Unknown Field")}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <TutorDetailModal tutor={tutor} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
