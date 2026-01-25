"use client";

import { format } from "date-fns";

import type { CalendarEvent } from "@/components/competition-calendar/types";
import { getBrandColorClass } from "@/lib/colors/brandColors";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface EventDetailsDialogProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailsDialog({ event, isOpen, onClose }: EventDetailsDialogProps) {
  if (!event) return null;

  // Check if this is a Sanity event (has categories) or manual event (has color)
  const isSanityEvent = event.categories && event.categories.length > 0;

  return (
    <Dialog onOpenChange={(open) => !open && onClose()} open={isOpen}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{event.title}</DialogTitle>
          <DialogDescription className="sr-only">Event details and information</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Categories Section - Only for Sanity events */}
          {isSanityEvent && event.categories && event.categories.length > 0 && (
            <div>
              <h4 className="mb-2 font-semibold">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {event.categories.map((category, index) => (
                  <Badge key={index} className={getBrandColorClass(category.color)}>
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Education Levels */}
          {event.educationLevels && event.educationLevels.length > 0 && (
            <div>
              <h4 className="mb-2 font-semibold">Jenjang Pendidikan</h4>
              <div className="flex flex-wrap gap-2">
                {event.educationLevels.map((level, index) => (
                  <Badge key={index} variant="outline">
                    {level}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Event Details */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              {event.scale && (
                <div>
                  <strong>Scale:</strong> {event.scale}
                </div>
              )}
              {event.organizer && (
                <div>
                  <strong>Organizer:</strong> {event.organizer}
                </div>
              )}
              {event.location && (
                <div>
                  <strong>Location:</strong> {event.location}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div>
                <strong>Start:</strong> {format(event.start, "dd MMM yyyy")}
              </div>
              <div>
                <strong>End:</strong> {format(event.end, "dd MMM yyyy")}
              </div>
              {event.registrationDeadline && (
                <div>
                  <strong>Registration Deadline:</strong>{" "}
                  {format(event.registrationDeadline, "dd MMM yyyy")}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div>
              <h4 className="mb-2 font-semibold">Description</h4>
              <p className="text-sm opacity-80">{event.description}</p>
            </div>
          )}

          {/* Actions */}
          {(event.registrationLink || event.socialMediaLink) && (
            <div className="flex flex-wrap gap-3 border-t pt-4">
              {event.registrationLink && (
                <a
                  href={event.registrationLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={cn(buttonVariants({ variant: "outline" }), "min-w-37.5 flex-1")}
                >
                  Register Now
                </a>
              )}
              {event.socialMediaLink && (
                <a
                  href={event.socialMediaLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={cn(buttonVariants({ variant: "outline" }), "min-w-37.5 flex-1")}
                >
                  Social Media
                </a>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
