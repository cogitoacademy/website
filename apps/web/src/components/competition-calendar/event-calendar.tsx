"use client";

import { RiCalendarCheckLine } from "@remixicon/react";
import {
  addDays,
  addMonths,
  addWeeks,
  endOfWeek,
  format,
  isSameMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  AgendaDaysToShow,
  AgendaView,
  type CalendarCompetition,
  CalendarDndProvider,
  type CalendarView,
  DayView,
  EventDetailsDialog,
  EventGap,
  EventHeight,
  MonthView,
  WeekCellsHeight,
  WeekView,
} from "@/components/competition-calendar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface EventCalendarProps {
  events?: CalendarCompetition[];
  readOnly?: boolean;
  className?: string;
  initialView?: CalendarView;
  onEventAdd?: (_date: Date) => void;
  onEventDelete?: (_id: string) => void;
  onEventUpdate?: (event: CalendarCompetition) => void;
}

export function EventCalendar({
  events = [],
  readOnly = false,
  className,
  initialView = "month",
  onEventAdd: _onEventAdd,
  onEventDelete: _onEventDelete,
  onEventUpdate,
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>(initialView);
  const [isEventDetailsDialogOpen, setIsEventDetailsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarCompetition | null>(null);

  // Add keyboard shortcuts for view switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input, textarea or contentEditable element
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "m":
          setView("month");
          break;
        case "w":
          setView("week");
          break;
        case "d":
          setView("day");
          break;
        case "a":
          setView("agenda");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlePrevious = () => {
    if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (view === "week") {
      setCurrentDate(subWeeks(currentDate, 1));
    } else if (view === "day") {
      setCurrentDate(addDays(currentDate, -1));
    } else if (view === "agenda") {
      // For agenda view, go back 30 days (a full month)
      setCurrentDate(addDays(currentDate, -AgendaDaysToShow));
    }
  };

  const handleNext = () => {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === "week") {
      setCurrentDate(addWeeks(currentDate, 1));
    } else if (view === "day") {
      setCurrentDate(addDays(currentDate, 1));
    } else if (view === "agenda") {
      // For agenda view, go forward 30 days (a full month)
      setCurrentDate(addDays(currentDate, AgendaDaysToShow));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventSelect = (event: CalendarCompetition) => {
    setSelectedEvent(event);
    setIsEventDetailsDialogOpen(true);
  };

  const viewTitle = useMemo(() => {
    if (view === "month") {
      return format(currentDate, "MMMM yyyy");
    }
    if (view === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 0 });
      const end = endOfWeek(currentDate, { weekStartsOn: 0 });
      if (isSameMonth(start, end)) {
        return format(start, "MMMM yyyy");
      }
      return `${format(start, "MMM")} - ${format(end, "MMM yyyy")}`;
    }
    if (view === "day") {
      return (
        <>
          <span aria-hidden="true" className="min-[480px]:hidden">
            {format(currentDate, "MMM d, yyyy")}
          </span>
          <span aria-hidden="true" className="max-[479px]:hidden min-md:hidden">
            {format(currentDate, "MMMM d, yyyy")}
          </span>
          <span className="max-md:hidden">{format(currentDate, "EEE MMMM d, yyyy")}</span>
        </>
      );
    }
    if (view === "agenda") {
      // Show the month range for agenda view
      const start = currentDate;
      const end = addDays(currentDate, AgendaDaysToShow - 1);

      if (isSameMonth(start, end)) {
        return format(start, "MMMM yyyy");
      }
      return `${format(start, "MMM")} - ${format(end, "MMM yyyy")}`;
    }
    return format(currentDate, "MMMM yyyy");
  }, [currentDate, view]);

  return (
    <div
      className="flex flex-col rounded-xl xl:rounded-3xl border bg-neutral-100"
      style={
        {
          "--event-gap": `${EventGap}px`,
          "--event-height": `${EventHeight}px`,
          "--week-cells-height": `${WeekCellsHeight}px`,
        } as React.CSSProperties
      }
    >
      <CalendarDndProvider onEventUpdate={readOnly || !onEventUpdate ? () => {} : onEventUpdate}>
        <div
          className={cn(
            "flex items-center justify-between rounded-t-xl xl:rounded-t-3xl bg-tertiary-pink-200 p-2 sm:p-4",
            className,
          )}
        >
          <div className="flex items-center gap-1 sm:gap-4">
            <Button
              className="text-neutral-1000 max-[479px]:aspect-square max-[479px]:p-0!"
              onClick={handleToday}
              variant="cream"
              // size="lg"
            >
              <RiCalendarCheckLine aria-hidden="true" className="min-[480px]:hidden" size={16} />
              <span className="max-[479px]:sr-only">Today</span>
            </Button>
            <div className="flex items-center sm:gap-2">
              <Button aria-label="Previous" onClick={handlePrevious} size="icon" variant="ghost">
                <ChevronLeftIcon aria-hidden="true" size={16} />
              </Button>
              <Button aria-label="Next" onClick={handleNext} size="icon" variant="ghost">
                <ChevronRightIcon aria-hidden="true" size={16} />
              </Button>
            </div>
            <h2 className="font-semibold text-sm sm:text-lg md:text-xl">{viewTitle}</h2>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button className="gap-1.5 max-[479px]:h-8" variant="outline" />}
              >
                <span>
                  <span aria-hidden="true" className="min-[480px]:hidden">
                    {view.charAt(0).toUpperCase()}
                  </span>
                  <span className="max-[479px]:sr-only">
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </span>
                </span>
                <ChevronDownIcon aria-hidden="true" className="-me-1 opacity-60" size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-32">
                <DropdownMenuItem onClick={() => setView("month")}>
                  Month <DropdownMenuShortcut>M</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView("week")}>
                  Week <DropdownMenuShortcut>W</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView("day")}>
                  Day <DropdownMenuShortcut>D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView("agenda")}>
                  Agenda <DropdownMenuShortcut>A</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {!readOnly && (
              <Button
                className="max-[479px]:aspect-square max-[479px]:p-0!"
                onClick={() => {
                  // This would be for future non-read-only usage
                }}
                size="sm"
              >
                <PlusIcon aria-hidden="true" className="opacity-60 sm:-ms-1" size={16} />
                <span className="max-sm:sr-only">New event</span>
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          {view === "month" && (
            <MonthView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              readOnly={readOnly}
            />
          )}
          {view === "week" && (
            <WeekView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              readOnly={readOnly}
            />
          )}
          {view === "day" && (
            <DayView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              readOnly={readOnly}
            />
          )}
          {view === "agenda" && (
            <AgendaView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
            />
          )}
        </div>

        <EventDetailsDialog
          event={selectedEvent}
          isOpen={isEventDetailsDialogOpen}
          onClose={() => {
            setIsEventDetailsDialogOpen(false);
            setSelectedEvent(null);
          }}
        />
      </CalendarDndProvider>
    </div>
  );
}
