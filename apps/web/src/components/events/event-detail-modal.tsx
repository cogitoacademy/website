"use client";

import { ArrowRight, CalendarDays, Clock, MapPin, XIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import type { SerializedEvent } from "./events-grid";

interface EventDetailModalProps {
  event: SerializedEvent;
  lang: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EventDetailModal({
  event,
  lang,
  open,
  onOpenChange,
}: EventDetailModalProps) {
  // Format the ISO date string into a readable format
  const formattedDate = (() => {
    try {
      const d = new Date(event.date);
      return d.toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return event.date;
    }
  })();

  const statusBadge =
    event.status === "upcoming" ? (
      <Badge variant="upcoming">{lang === "id" ? "Acara Terbaru" : "Upcoming"}</Badge>
    ) : (
      <Badge variant="completed">{lang === "id" ? "Sudah Lewat" : "Completed"}</Badge>
    );

  const showRegistration = !!(event.registrationLink && event.status === "upcoming");

  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveModalContent
        side="bottom"
        className="flex w-full max-w-full flex-col gap-0 overflow-hidden rounded-t-2xl border-none bg-background p-0 sm:max-h-[85vh] sm:w-[calc(100%-2rem)] sm:max-w-5xl sm:flex-row sm:rounded-lg"
        style={{ maxHeight: "85dvh" }}
        showCloseButton={false}
      >
        {/* Left/Top: Image Section */}
        <div className="relative h-[35svh] sm:h-[300px] shrink-0 overflow-hidden bg-neutral-300 sm:h-auto sm:w-2/5">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 40vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-200">
              <span className="text-neutral-400 text-sm">No image</span>
            </div>
          )}

          {/* Gradient Overlay for Text Readability (Mobile) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent sm:hidden" />

          {/* Mobile Status Badge Overlay */}
          <div className="absolute right-4 bottom-4 left-4 z-10 flex flex-wrap gap-2 sm:hidden">
            {statusBadge}
          </div>

          {/* Custom Close Button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 z-20 h-8 w-8 rounded-md bg-white/90 text-black shadow-sm hover:bg-white sm:right-auto sm:left-4"
            onClick={() => onOpenChange(false)}
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">{lang === "id" ? "Tutup" : "Close"}</span>
          </Button>
        </div>

        {/* Right/Bottom: Content Section */}
        <div className="flex min-h-0 flex-1 flex-col bg-background">
          {/* Scrollable content */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="space-y-4 p-6">
              {/* Header: Title + Badge */}
              <div className="space-y-2">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <ResponsiveModalTitle className="font-bold text-2xl text-foreground leading-tight tracking-tight sm:text-3xl">
                    {event.title}
                  </ResponsiveModalTitle>

                  {/* Desktop Status Badge */}
                  <div className="hidden shrink-0 sm:block">{statusBadge}</div>
                </div>

                {/* Description */}
                {event.description && (
                  <p className="text-neutral-600 text-sm leading-relaxed">{event.description}</p>
                )}
              </div>

              {/* Metadata Row */}
              <div className="flex flex-wrap gap-3">
                {/* Date */}
                <div className="inline-flex items-center gap-1.5 rounded-md bg-background-primary px-3 py-1.5 font-medium text-neutral-1000 text-sm">
                  <CalendarDays className="h-4 w-4 shrink-0" />
                  <span>{formattedDate}</span>
                </div>

                {/* Time */}
                {event.time && (
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-background-primary px-3 py-1.5 font-medium text-neutral-1000 text-sm">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                )}

                {/* Place */}
                {event.place && (
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-background-primary px-3 py-1.5 font-medium text-neutral-1000 text-sm">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span>{event.place}</span>
                  </div>
                )}
              </div>

              {/* Summary / Detail Box */}
              {event.summary && (
                <div className="rounded-xl bg-background-primary px-4 py-3">
                  <p className="text-muted-foreground text-sm leading-relaxed">{event.summary}</p>
                </div>
              )}

              {/* Registration Link Button — Desktop only (inline in scroll) */}
              {showRegistration && (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-5 py-3 font-medium text-sm text-white shadow-sm transition-colors hover:bg-primary-600 sm:inline-flex"
                >
                  <span>Registration Link</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Registration Link Button — Mobile only (fixed at bottom) */}
          {showRegistration && (
            <div className="shrink-0 border-neutral-200 border-t bg-background p-4 sm:hidden">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-5 py-3 font-medium text-sm text-white shadow-sm transition-colors hover:bg-primary-600"
              >
                <span>Registration Link</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
