'use client';

import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { useDateLocale } from '@/components/competition-calendar';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalTitle,
} from '@/components/ui/responsive-modal';
import { getEducationLevelLabel } from '@/lib/config/educationLevels';
import { getBrandColorClass } from '@/lib/colors/brandColors';
import { cn } from '@/lib/utils';
import type { CalendarCompetition } from './types';

interface EventDetailsDialogProps {
  event: CalendarCompetition | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailsDialog({ event, isOpen, onClose }: EventDetailsDialogProps) {
  const { isId, dateLocale } = useDateLocale();

  if (!event) return null;

  // Check if this is a Sanity competition (has categories) or manual competition (has color)
  const isSanityCompetition = event.categories && event.categories.length > 0;

  const timelineStart = format(event.start, 'dd');
  const timelineEnd = format(event.end, 'dd MMMM yyyy', { locale: dateLocale });
  const timeline = `${timelineStart} - ${timelineEnd}`;
  const formattedScale = event.scale
    ? event.scale.charAt(0).toUpperCase() + event.scale.slice(1).toLowerCase()
    : undefined;

  return (
    <ResponsiveModal onOpenChange={(open) => !open && onClose()} open={isOpen}>
      <ResponsiveModalContent
        side="bottom"
        className="flex max-h-[90vh] w-full max-w-full flex-col gap-0 overflow-y-auto rounded-t-2xl sm:max-h-[85vh] sm:max-w-2xl sm:rounded-lg"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <ResponsiveModalTitle className="mr-9 font-bold text-2xl tracking-tight">
              {event.title}
            </ResponsiveModalTitle>
            <ResponsiveModalDescription className="sr-only">
              {isId ? 'Detail dan informasi kompetisi' : 'Competition details and information'}
            </ResponsiveModalDescription>

            {/* Mobile: subtitle + badge below title */}
            {isSanityCompetition && event.categories && event.categories.length > 0 && (
              <div className="mt-3 sm:hidden">
                <div className="flex flex-wrap gap-2">
                  {event.categories.map((category) => (
                    <Badge
                      key={category.name}
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
          {isSanityCompetition && event.categories && event.categories.length > 0 && (
            <div className="mr-9 hidden shrink-0 flex-wrap gap-2 sm:flex">
              {event.categories.map((category) => (
                <Badge
                  key={category.name}
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
                  <strong>{isId ? 'Jenjang Lomba:' : 'Competition Level:'}</strong>{' '}
                  {event.educationLevels.map(getEducationLevelLabel).join(', ')}
                </p>
              )}
              {event.scale && (
                <p>
                  <strong>{isId ? 'Skala:' : 'Scale:'}</strong> {formattedScale}
                </p>
              )}
              {event.organizer && (
                <p>
                  <strong>{isId ? 'Penyelenggara:' : 'Organizer:'}</strong> {event.organizer}
                </p>
              )}
              {event.location && (
                <p>
                  <strong>{isId ? 'Lokasi:' : 'Location:'}</strong> {event.location}
                </p>
              )}
              <p>
                <strong>{isId ? 'Timeline Lomba:' : 'Competition Timeline:'}</strong> {timeline}
              </p>
              {event.registrationDeadline && (
                <p>
                  <strong>{isId ? 'Tutup Pendaftaran:' : 'Close Registration:'}</strong>{' '}
                  {format(event.registrationDeadline, 'dd MMMM yyyy', {
                    locale: dateLocale,
                  })}
                </p>
              )}
            </div>
          </div>

          {/* Desktop: left card */}
          <div className="hidden rounded-lg bg-background-primary p-4 sm:block">
            <div className="space-y-1 text-sm">
              {event.educationLevels && event.educationLevels.length > 0 && (
                <p>
                  <strong>{isId ? 'Jenjang Lomba:' : 'Competition Level:'}</strong>{' '}
                  <span>{event.educationLevels.map(getEducationLevelLabel).join(', ')}</span>
                </p>
              )}
              {event.scale && (
                <p>
                  <strong>{isId ? 'Skala:' : 'Scale:'}</strong>{' '}
                  <span>{formattedScale}</span>
                </p>
              )}
              {event.organizer && (
                <p>
                  <strong>{isId ? 'Penyelenggara:' : 'Organizer:'}</strong> {event.organizer}
                </p>
              )}
            </div>
          </div>

          {/* Desktop: right card */}
          <div className="hidden rounded-lg bg-background-primary p-4 sm:block">
            <div className="space-y-1 text-sm">
              {event.location && (
                <p>
                  <strong>{isId ? 'Lokasi:' : 'Location:'}</strong> {event.location}
                </p>
              )}
              <p>
                <strong>{isId ? 'Tanggal Pelaksanaan:' : 'Event Date:'}</strong> {timeline}
              </p>
              {event.registrationDeadline && (
                <p>
                  <strong>{isId ? 'Tutup Pendaftaran:' : 'Close Registration:'}</strong>{' '}
                  {format(event.registrationDeadline, 'dd MMMM yyyy', {
                    locale: dateLocale,
                  })}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description Card */}
        {event.description && (
          <div className="mt-4 rounded-lg bg-background-primary p-4">
            <h4 className="mb-1 font-semibold text-sm">{isId ? 'Deskripsi' : 'Description'}</h4>
            <p className="text-sm opacity-80">{event.description}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {event.socialMediaLink ? (
            <a
              href={event.socialMediaLink}
              rel="noopener noreferrer"
              target="_blank"
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'md',
                }),
                'w-full justify-center',
              )}
            >
              {isId ? 'Postingan Media Sosial' : 'Social Media Post'}
            </a>
          ) : (
            <button
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'md',
                }),
                'pointer-events-none w-full justify-center opacity-50',
              )}
              disabled
            >
              {isId ? 'Postingan Media Sosial' : 'Social Media Post'}
            </button>
          )}

          {event.registrationLink ? (
            <a
              href={event.registrationLink}
              rel="noopener noreferrer"
              target="_blank"
              className={cn(
                buttonVariants({ variant: 'default', size: 'md' }),
                'w-full justify-center gap-2 bg-orange-500 text-white hover:bg-orange-600',
              )}
            >
              {isId ? 'Link Pendaftaran' : 'Registration Link'}
              <ArrowRight className="size-4" />
            </a>
          ) : (
            <button
              className={cn(
                buttonVariants({ variant: 'default', size: 'md' }),
                'pointer-events-none w-full justify-center gap-2 bg-orange-500 text-white opacity-50 hover:bg-orange-600',
              )}
              disabled
            >
              {isId ? 'Link Pendaftaran' : 'Registration Link'}
              <ArrowRight className="size-4" />
            </button>
          )}
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
