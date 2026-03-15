'use client';

import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

import { useCalendarDnd } from '@/components/competition-calendar';
import { cn } from '@/lib/utils';

interface DroppableCellProps {
  id: string;
  date: Date;
  time?: number; // For week/day views, represents hours (e.g., 9.25 for 9:15)
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function DroppableCell({
  id,
  date,
  time,
  children,
  className,
  onClick,
}: DroppableCellProps) {
  const { activeEvent } = useCalendarDnd();

  const { setNodeRef, isOver } = useDroppable({
    data: {
      date,
      time,
    },
    id,
  });

  // Format time for display in tooltip (only for debugging)
  const formattedTime =
    time !== undefined
      ? `${Math.floor(time)}:${Math.round((time - Math.floor(time)) * 60)
          .toString()
          .padStart(2, '0')}`
      : null;

  const handleKeyDown = (e: ReactKeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  /* eslint-disable jsx-a11y/no-static-element-interactions -- div with onClick for droppable cell */
  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-b-3xl px-0.5 py-1 data-dragging:bg-accent sm:px-1 2xl:min-h-50',
        className,
      )}
      data-dragging={isOver && activeEvent ? true : undefined}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      ref={setNodeRef}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      title={formattedTime ? `${formattedTime}` : undefined}
    >
      {children}
    </div>
  );
}
