"use client";

import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { differenceInMinutes, format, getMinutes, isPast } from "date-fns";
import { useMemo } from "react";

import {
  type CalendarCompetition,
  getBorderRadiusClasses,
  getCompetitionColorClasses,
} from "@/components/competition-calendar";
import { Badge } from "@/components/ui/badge";
import { getBrandColorClass } from "@/lib/colors/brandColors";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

// Using date-fns format with custom formatting:
// 'h' - hours (1-12)
// 'a' - am/pm
// ':mm' - minutes with leading zero (only if the token 'mm' is present)
const formatTimeWithOptionalMinutes = (date: Date) => {
  return format(date, getMinutes(date) === 0 ? "ha" : "h:mma").toLowerCase();
};

interface EventWrapperProps {
  event: CalendarCompetition;
  isFirstDay?: boolean;
  isLastDay?: boolean;
  isDragging?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children: React.ReactNode;
  currentTime?: Date;
  dndListeners?: SyntheticListenerMap;
  dndAttributes?: DraggableAttributes;
  onMouseDown?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
}

// Shared wrapper component for event styling
function EventWrapper({
  event,
  isFirstDay = true,
  isLastDay = true,
  isDragging,
  onClick,
  className,
  children,
  currentTime,
  dndListeners,
  dndAttributes,
  onMouseDown,
  onTouchStart,
}: EventWrapperProps) {
  // Always use the currentTime (if provided) to determine if the event is in the past
  const displayEnd = currentTime
    ? new Date(
        new Date(currentTime).getTime() +
          (new Date(event.end).getTime() - new Date(event.start).getTime()),
      )
    : new Date(event.end);

  const isEventInPast = isPast(displayEnd);

  // Get the inset shadow color based on event color
  // Blue: 500, Yellow: 400, Orange(KTI/primary): 400, Pink: 500, Green: 600, Red: 500, Purple: 500
  const getInsetShadowColor = () => {
    if (event.color?.startsWith("tertiary-blue"))
      return "rgba(59, 130, 246, 0.6)"; // Blue 500
    if (event.color?.startsWith("tertiary-pink"))
      return "rgba(236, 72, 153, 0.6)"; // Pink 500
    if (event.color?.startsWith("tertiary-red"))
      return "rgba(239, 68, 68, 0.6)"; // Red 500
    if (event.color?.startsWith("tertiary-yellow"))
      return "rgba(250, 204, 21, 0.6)"; // Yellow 400
    if (event.color?.startsWith("tertiary-green"))
      return "rgba(22, 163, 74, 0.6)"; // Green 600
    if (event.color?.startsWith("primary")) return "rgba(255, 134, 52, 1)"; // Primary 400 (Orange/KTI)
    if (event.color?.startsWith("secondary")) return "rgba(168, 85, 247, 0.6)"; // Purple 500
    if (event.color === "sky") return "rgba(14, 165, 233, 0.6)";
    if (event.color === "amber") return "rgba(245, 158, 11, 0.6)";
    if (event.color === "violet") return "rgba(139, 92, 246, 0.6)";
    if (event.color === "rose") return "rgba(244, 63, 94, 0.6)";
    if (event.color === "emerald") return "rgba(16, 185, 129, 0.6)";
    if (event.color === "orange") return "rgba(249, 115, 22, 0.6)";
    return "rgba(59, 130, 246, 0.6)"; // Default Blue 500
  };

  return (
    <button
      className={cn(
        "relative flex size-full select-none overflow-hidden text-left font-medium outline-none backdrop-blur-md transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 data-dragging:cursor-grabbing data-past-event:line-through data-dragging:shadow-lg px-3",
        getCompetitionColorClasses(event.color),
        getBorderRadiusClasses(isFirstDay, isLastDay),
        className,
      )}
      data-dragging={isDragging || undefined}
      data-past-event={isEventInPast || undefined}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={
        isFirstDay
          ? { boxShadow: `inset 6px 0 0 0 ${getInsetShadowColor()}` }
          : undefined
      }
      type="button"
      {...dndListeners}
      {...dndAttributes}
    >
      {children}
    </button>
  );
}

interface EventItemProps {
  event: CalendarCompetition;
  view: "month" | "week" | "day" | "agenda";
  isDragging?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  showTime?: boolean;
  currentTime?: Date; // For updating time during drag
  isFirstDay?: boolean;
  isLastDay?: boolean;
  children?: React.ReactNode;
  className?: string;
  dndListeners?: SyntheticListenerMap;
  dndAttributes?: DraggableAttributes;
  onMouseDown?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
}

export function EventItem({
  event,
  view,
  isDragging,
  onClick,
  showTime: _showTime,
  currentTime,
  isFirstDay = true,
  isLastDay = true,
  children,
  className,
  dndListeners,
  dndAttributes,
  onMouseDown,
  onTouchStart,
}: EventItemProps) {
  const eventColor = event.color;

  // Use the provided currentTime (for dragging) or the event's actual time
  const displayStart = useMemo(() => {
    return currentTime || new Date(event.start);
  }, [currentTime, event.start]);

  const displayEnd = useMemo(() => {
    return currentTime
      ? new Date(
          new Date(currentTime).getTime() +
            (new Date(event.end).getTime() - new Date(event.start).getTime()),
        )
      : new Date(event.end);
  }, [currentTime, event.start, event.end]);

  // Calculate event duration in minutes
  const durationMinutes = useMemo(() => {
    return differenceInMinutes(displayEnd, displayStart);
  }, [displayStart, displayEnd]);

  const _getEventTime = () => {
    if (event.allDay) return "All day";

    // For short events (less than 45 minutes), only show start time
    if (durationMinutes < 45) {
      return formatTimeWithOptionalMinutes(displayStart);
    }

    // For longer events, show both start and end time
    return `${formatTimeWithOptionalMinutes(displayStart)} - ${formatTimeWithOptionalMinutes(displayEnd)}`;
  };

  if (view === "month") {
    return (
      <EventWrapper
        className={cn(
          "mt-[var(--event-gap)] h-[var(--event-height)] items-center text-[10px] sm:text-xs text-neutral-1000",
          className,
        )}
        currentTime={currentTime}
        dndAttributes={dndAttributes}
        dndListeners={dndListeners}
        event={event}
        isDragging={isDragging}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {children || <span className="truncate">{event.title}</span>}
      </EventWrapper>
    );
  }

  if (view === "week" || view === "day") {
    return (
      <EventWrapper
        className={cn(
          "py-1",
          durationMinutes < 45 ? "items-center" : "flex-col",
          view === "week" ? "text-[10px] sm:text-xs" : "text-xs",
          className,
        )}
        currentTime={currentTime}
        dndAttributes={dndAttributes}
        dndListeners={dndListeners}
        event={event}
        isDragging={isDragging}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {durationMinutes < 45 ? (
          <div className="truncate">{event.title}</div>
        ) : (
          <div className="truncate font-medium">{event.title}</div>
        )}
      </EventWrapper>
    );
  }

  // Get the inset shadow color for agenda view
  // Blue: 500, Yellow: 400, Orange(KTI/primary): 400, Pink: 500, Green: 600, Red: 500, Purple: 500
  const getAgendaInsetShadowColor = () => {
    if (event.color?.startsWith("tertiary-blue"))
      return "rgba(59, 130, 246, 0.6)"; // Blue 500
    if (event.color?.startsWith("tertiary-pink"))
      return "rgba(236, 72, 153, 0.6)"; // Pink 500
    if (event.color?.startsWith("tertiary-red"))
      return "rgba(239, 68, 68, 0.6)"; // Red 500
    if (event.color?.startsWith("tertiary-yellow"))
      return "rgba(250, 204, 21, 0.6)"; // Yellow 400
    if (event.color?.startsWith("tertiary-green"))
      return "rgba(22, 163, 74, 0.6)"; // Green 600
    if (event.color?.startsWith("primary")) return "rgba(255, 134, 52, 1)"; // Primary 400 (Orange/KTI)
    if (event.color?.startsWith("secondary")) return "rgba(168, 85, 247, 0.6)"; // Purple 500
    if (event.color === "sky") return "rgba(14, 165, 233, 0.6)";
    if (event.color === "amber") return "rgba(245, 158, 11, 0.6)";
    if (event.color === "violet") return "rgba(139, 92, 246, 0.6)";
    if (event.color === "rose") return "rgba(244, 63, 94, 0.6)";
    if (event.color === "emerald") return "rgba(16, 185, 129, 0.6)";
    if (event.color === "orange") return "rgba(249, 115, 22, 0.6)";
    return "rgba(59, 130, 246, 0.6)"; // Default Blue 500
  };

  // Agenda view - kept separate since it's significantly different
  return (
    <button
      className={cn(
        "flex w-full flex-col gap-1 rounded-2xl p-3 text-left outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 data-past-event:line-through data-past-event:opacity-90 pl-7",
        getCompetitionColorClasses(eventColor),
        className,
      )}
      data-past-event={isPast(new Date(event.end)) || undefined}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={
        isFirstDay
          ? { boxShadow: `inset 10px 0 0 0 ${getAgendaInsetShadowColor()}` }
          : undefined
      }
      type="button"
      {...dndListeners}
      {...dndAttributes}
    >
      {/* Category Badges */}
      {/*{event.categories && event.categories.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {event.categories.map((category, index) => (
            <Badge
              key={index}
              variant={"tutor"}
              className={cn(getBrandColorClass(category.color))}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      )}*/}

      {/* Event Title */}
      <div className="font-bold text-neutral-1000 text-xl">{event.title}</div>

      {/* Location */}
      <div className="flex items-center justify-start gap-x-2 *:text-neutral-1000">
        {event.organizer && <div className="text-sm">{event.organizer}</div>}

        <Separator orientation="vertical" />

        {event.scale && <div className="text-sm capitalize">{event.scale}</div>}

        <Separator orientation="vertical" />

        {event.location && <div className="text-sm">{event.location}</div>}

        {/* Education Levels */}
        {/*{event.educationLevels && event.educationLevels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.educationLevels.map((level, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {level}
              </Badge>
            ))}
          </div>
        )}*/}

        {/* Description */}
        {/*{event.description && (
          <div className="my-1 text-xs opacity-90">{event.description}</div>
        )}*/}
      </div>
    </button>
  );
}
