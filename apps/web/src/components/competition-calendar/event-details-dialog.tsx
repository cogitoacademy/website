"use client";

import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import { getBrandColorClass } from "@/lib/colors/brandColors";
import { cn } from "@/lib/utils";
import type { CalendarCompetition } from "./types";

interface EventDetailsDialogProps {
  event: CalendarCompetition | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailsDialog({
  event,
  isOpen,
  onClose,
}: EventDetailsDialogProps) {
  if (!event) return null;

  // Check if this is a Sanity competition (has categories) or manual competition (has color)
  const isSanityCompetition = event.categories && event.categories.length > 0;

  const timelineStart = format(event.start, "dd");
  const timelineEnd = format(event.end, "dd MMMM yyyy");
  const timeline = `${timelineStart} - ${timelineEnd}`;

  return (
    <ResponsiveModal onOpenChange={(open) => !open && onClose()} open={isOpen}>
      <ResponsiveModalContent
        side="bottom"
        className="flex max-h-[90vh] w-full max-w-full flex-col overflow-y-auto rounded-t-2xl sm:max-h-[85vh] sm:max-w-2xl sm:rounded-lg gap-0"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <ResponsiveModalTitle className="font-bold text-2xl tracking-tight mr-9">
              {event.title}
            </ResponsiveModalTitle>
            <ResponsiveModalDescription className="sr-only">
              Competition details and information
            </ResponsiveModalDescription>

            {/* Mobile: subtitle + badge below title */}
            {isSanityCompetition &&
              event.categories &&
              event.categories.length > 0 && (
                <div className="sm:hidden mt-3">
                  <div className="flex flex-wrap gap-2">
                    {event.categories.map((category, index) => (
                      <Badge
                        key={index}
                        variant="tutor"
                        className={getBrandColorClass(category.color)}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Desktop: badge to the right of title */}
          {isSanityCompetition &&
            event.categories &&
            event.categories.length > 0 && (
              <div className="hidden shrink-0 flex-wrap gap-2 sm:flex mr-9">
                {event.categories.map((category, index) => (
                  <Badge
                    key={index}
                    variant="tutor"
                    className={getBrandColorClass(category.color)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}
        </div>

        {/* Info Cards */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Mobile: single combined card */}
          <div className="rounded-lg bg-background-primary p-4 sm:hidden">
            <div className="space-y-1 text-sm">
              {event.educationLevels && event.educationLevels.length > 0 && (
                <p>
                  <strong>Jenjang Lomba:</strong>{" "}
                  {event.educationLevels.join(", ")}
                </p>
              )}
              {event.scale && (
                <p>
                  <strong>Scale:</strong> {event.scale}
                </p>
              )}
              {event.organizer && (
                <p>
                  <strong>Organizer:</strong> {event.organizer}
                </p>
              )}
              {event.location && (
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
              )}
              <p>
                <strong>Timeline Lomba:</strong> {timeline}
              </p>
              {event.registrationDeadline && (
                <p>
                  <strong>Close Registration:</strong>{" "}
                  {format(event.registrationDeadline, "dd MMMM yyyy")}
                </p>
              )}
            </div>
          </div>

          {/* Desktop: left card */}
          <div className="hidden rounded-lg bg-background-primary p-4 sm:block">
            <div className="space-y-1 text-sm">
              {event.educationLevels && event.educationLevels.length > 0 && (
                <p>
                  <strong>Jenjang Lomba:</strong>{" "}
                  <span className="uppercase">
                    {event.educationLevels.join(", ")}
                  </span>
                </p>
              )}
              {event.scale && (
                <p>
                  <strong>Scale:</strong>{" "}
                  <span className="capitalize">{event.scale}</span>
                </p>
              )}
              {event.organizer && (
                <p>
                  <strong>Organizer:</strong> {event.organizer}
                </p>
              )}
            </div>
          </div>

          {/* Desktop: right card */}
          <div className="hidden rounded-lg bg-background-primary p-4 sm:block">
            <div className="space-y-1 text-sm">
              {event.location && (
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
              )}
              <p>
                <strong>Tanggal Pelaksanaan:</strong> {timeline}
              </p>
              {event.registrationDeadline && (
                <p>
                  <strong>Close Registration:</strong>{" "}
                  {format(event.registrationDeadline, "dd MMMM yyyy")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description Card */}
        {event.description && (
          <div className="rounded-lg bg-background-primary p-4 mt-4">
            <h4 className="mb-1 font-semibold text-sm">Description</h4>
            <p className="text-sm opacity-80">{event.description}</p>
          </div>
        )}

        {/* Action Buttons */}
        {(event.registrationLink || event.socialMediaLink) && (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {event.socialMediaLink && (
              <a
                href={event.socialMediaLink}
                rel="noopener noreferrer"
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full justify-center",
                )}
              >
                Social Media Post
              </a>
            )}
            {event.registrationLink && (
              <a
                href={event.registrationLink}
                rel="noopener noreferrer"
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "default", size: "md" }),
                  "w-full justify-center gap-2 bg-orange-500 text-white hover:bg-orange-600",
                )}
              >
                Registration Link
                <ArrowRight className="size-4" />
              </a>
            )}
          </div>
        )}
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
