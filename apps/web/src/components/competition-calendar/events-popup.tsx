'use client';

import { format, isSameDay } from 'date-fns';
import { XIcon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  type CalendarCompetition,
  EventItem,
  useDateLocale,
} from '@/components/competition-calendar';

interface EventsPopupProps {
  date: Date;
  events: CalendarCompetition[];
  position: { top: number; left: number };
  onClose: () => void;
  onEventSelect: (event: CalendarCompetition) => void;
}

export function EventsPopup({ date, events, position, onClose, onEventSelect }: EventsPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const { isId, dateLocale } = useDateLocale();

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle escape key to close popup
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const handleEventClick = (event: CalendarCompetition) => {
    onEventSelect(event);
    onClose();
  };

  const [popupRect, setPopupRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (popupRef.current) {
      setPopupRect(popupRef.current.getBoundingClientRect());
    }
  }, []);

  const adjustedPosition = useMemo(() => {
    const positionCopy = { ...position };

    if (popupRect) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (positionCopy.left + popupRect.width > viewportWidth) {
        positionCopy.left = Math.max(0, viewportWidth - popupRect.width);
      }

      if (positionCopy.top + popupRect.height > viewportHeight) {
        positionCopy.top = Math.max(0, viewportHeight - popupRect.height);
      }
    }

    return positionCopy;
  }, [position, popupRect]);

  return (
    <div
      className="absolute z-50 max-h-96 w-80 overflow-auto rounded-md border bg-background shadow-lg"
      ref={popupRef}
      style={{
        left: `${adjustedPosition.left}px`,
        top: `${adjustedPosition.top}px`,
      }}
    >
      <div className="sticky top-0 flex items-center justify-between border-b bg-background p-3">
        <h3 className="font-medium">{format(date, 'd MMMM yyyy', { locale: dateLocale })}</h3>
        <button
          aria-label={isId ? 'Tutup' : 'Close'}
          className="rounded-full p-1 hover:bg-muted"
          onClick={onClose}
          type="button"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2 p-3">
        {events.length === 0 ? (
          <div className="py-2 text-muted-foreground text-sm">
            {isId ? 'Tidak ada acara' : 'No events'}
          </div>
        ) : (
          events.map((event) => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            const isFirstDay = isSameDay(date, eventStart);
            const isLastDay = isSameDay(date, eventEnd);

            return (
              <div
                className="cursor-pointer"
                key={event.id}
                onClick={() => handleEventClick(event)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleEventClick(event);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <EventItem
                  event={event}
                  isFirstDay={isFirstDay}
                  isLastDay={isLastDay}
                  view="agenda"
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
