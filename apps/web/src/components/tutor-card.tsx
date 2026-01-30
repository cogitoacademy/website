"use client";

import Image from "next/image";
import * as m from "motion/react-m";
import { useState } from "react";
import { useLocale } from "next-intl";
import type { Tutor } from "@/types/tutor";
import { getCoreCategoryBadgeColor } from "@/lib/colors/brandColors";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./ui/button";
import TutorDetailModal from "./tutor-detail-modal";
import { Badge, badgeVariants } from "./ui/badge";
import { cn } from "@/lib/utils";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const affiliation = getLocalizedValue(tutor.affiliation, locale);

  return (
    <>
      <m.div
        initial={false}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
      >
        {/* Button as modal trigger */}
        <Button
          className={"absolute top-5 right-5 z-2"}
          variant="gray"
          size="icon-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <ArrowUpRightIcon weight="bold" />
        </Button>

        {/* Header */}
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="relative h-70 w-full shrink-0 bg-muted z-1">
            <Image
              src={tutor.profilePicture.asset.url}
              alt={tutor.profilePicture.asset.altText || tutor.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Bawah */}
          <div className="relative z-2 -mt-2 flex min-h-0 flex-1 flex-col rounded-xl bg-neutral-100 p-2.5 shadow-inset-top">
            <h3 className="font-semibold text-lg leading-tight truncate">{tutor.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{affiliation}</p>

            {/* Tags */}
            {tutor.competitionFields?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto mb-0">
                {tutor.competitionFields.map((field) => (
                  <Badge
                    key={field._id}
                    className={cn(
                      badgeVariants({ variant: "tutor" }),
                      getCoreCategoryBadgeColor(field.coreCategory),
                    )}
                  >
                    {field.name || "Unknown Field"}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </m.div>

      <TutorDetailModal tutor={tutor} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
