'use client';

import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { m } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import EventDetailModal from './event-detail-modal';

/** Change this value to control how many events show per page (5 or 10) */
const PAGE_SIZE = 10;

/** Serializable version of Event (date as ISO string instead of Date object) */
export type SerializedEvent = {
  id: string;
  title: string;
  slug: string;
  category: string;
  imageUrl?: string;
  description?: string;
  date: string;
  time?: string;
  place?: string;
  summary?: string;
  registrationLink?: string;
  status: 'upcoming' | 'past';
};

type EventsGridProps = {
  events: SerializedEvent[];
  lang: string;
};

export function EventsGrid({ events, lang }: EventsGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleEvents = events.slice(0, visibleCount);
  const hasMore = visibleCount < events.length;

  if (events.length === 0) {
    return (
      <section className="py-20 text-center">
        <p className="text-lg text-neutral-500">
          {lang === 'id' ? 'Belum ada kegiatan yang terdaftar.' : 'No events available yet.'}
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-10">
      {/* Events Grid */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 min-[500px]:grid-cols-2"
      >
        {visibleEvents.map((event, index) => (
          <m.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <EventCard event={event} lang={lang} />
          </m.div>
        ))}
      </m.div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center">
          <Button
            variant="subtle"
            size="lg"
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
          >
            <span>{lang === 'id' ? 'Lihat yang lain' : 'View more'}</span>
          </Button>
        </div>
      )}
    </div>
  );
}

function EventCard({ event, lang }: { event: SerializedEvent; lang: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-neutral-100 transition-shadow hover:shadow-md"
        onClick={() => setIsModalOpen(true)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        {/* Arrow icon indicator */}
        <Button className="absolute top-3 right-3 z-2" variant="gray" size="icon-lg">
          <ArrowUpRightIcon strokeWidth={2.5} className="size-5" />
        </Button>

        {/* Image */}
        <div className="relative aspect-[4/4] bg-neutral-300">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-200">
              <span className="text-neutral-400 text-sm">No image</span>
            </div>
          )}

          {/* Status badge overlay */}
          {event.status === 'upcoming' ? (
            <div className="absolute bottom-7 left-3">
              <Badge variant="upcoming">{lang === 'id' ? 'Acara Terbaru' : 'Upcoming'}</Badge>
            </div>
          ) : (
            <div className="absolute bottom-7 left-3">
              <Badge variant="completed">{lang === 'id' ? 'Sudah Lewat' : 'Completed'}</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative z-2 -mt-4 flex flex-1 flex-col gap-1.5 rounded-xl bg-neutral-100 p-4">
          <h3 className="line-clamp-2 font-bold text-neutral-1000 text-sm leading-snug">
            {event.title}
          </h3>
          {event.description && (
            <p className="line-clamp-3 text-neutral-600 text-xs leading-relaxed">
              {event.description}
            </p>
          )}
        </div>
      </div>

      <EventDetailModal
        event={event}
        lang={lang}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
