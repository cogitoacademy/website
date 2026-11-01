'use client';

import type { MouseEvent } from 'react';
import { RiCalendarEventLine } from '@remixicon/react';
import { addDays, format, isToday } from 'date-fns';
import { useMemo } from 'react';

import {
  AgendaDaysToShow,
  type CalendarCompetition,
  EventItem,
  getAgendaEventsForDay,
  useDateLocale,
} from '@/components/competition-calendar';

interface AgendaViewProps {
  currentDate: Date;
  events: CalendarCompetition[];
  onEventSelect: (event: CalendarCompetition) => void;
}

export function AgendaView({ currentDate, events, onEventSelect }: AgendaViewProps) {
  const { isId, dateLocale } = useDateLocale();

  // Show events for the next days based on constant
  const days = useMemo(() => {
    return Array.from({ length: AgendaDaysToShow }, (_, i) => addDays(new Date(currentDate), i));
  }, [currentDate]);

  const agendaEvents = useMemo(() => {
    const seenEventIds = new Set<string>();

    return days.flatMap((day) =>
      getAgendaEventsForDay(events, day).flatMap((event) => {
        if (seenEventIds.has(event.id)) return [];
        seenEventIds.add(event.id);
        return [{ event, day }];
      }),
    );
  }, [days, events]);

  const handleEventClick = (event: CalendarCompetition, e: MouseEvent) => {
    e.stopPropagation();
    onEventSelect(event);
  };

  return (
    <div className="border-border/70 border-t px-4">
      {agendaEvents.length === 0 ? (
        <div className="flex min-h-[70svh] flex-col items-center justify-center py-16 text-center">
          <RiCalendarEventLine className="mb-2 text-muted-foreground/50" size={32} />
          <h3 className="font-medium text-lg">{isId ? 'Tidak ada acara' : 'No events found'}</h3>
          <p className="text-muted-foreground">
            {isId
              ? 'Tidak ada acara yang dijadwalkan untuk periode ini.'
              : 'There are no events scheduled for this time period.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4 py-6">
          {agendaEvents.map(({ event, day }) => (
            <div key={event.id}>
              <p
                className="mb-1 text-[10px] uppercase data-today:font-medium sm:text-xs"
                data-today={isToday(day) || undefined}
              >
                {format(day, 'd MMM, EEEE', { locale: dateLocale })}
              </p>
              <EventItem
                event={event}
                onClick={(e) => handleEventClick(event, e)}
                view="agenda"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
