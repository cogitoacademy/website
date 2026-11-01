'use client';

import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock,
  GraduationCap,
  MapPin,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from '@/components/ui/responsive-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { APP_URL } from '@/lib/constants';
import type { ActivityClass } from '@/lib/activities-api';
import type { OtherActivity } from '@/lib/other-activities';
import OtherActivities from './other-activities';

type Props = {
  classes: ActivityClass[];
  events: OtherActivity[];
  classesFailed: boolean;
  eventsFailed: boolean;
  locale: string;
};

export default function ActivitiesContent({
  classes,
  events,
  classesFailed,
  eventsFailed,
  locale,
}: Props) {
  const id = locale === 'id';
  const [kind, setKind] = useState('all');
  const [selectedClass, setSelectedClass] = useState<ActivityClass | null>(null);
  const visibleClasses = classes.filter((item) => kind === 'all' || item.kind === kind);

  return (
    <div className="space-y-16 md:space-y-20">
      <section aria-labelledby="classes-title">
        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="classes-title" className="font-semibold text-2xl tracking-tight md:text-3xl">
              {id ? 'Kelas' : 'Classes'}
            </h2>
            <p className="text-neutral-900 text-sm">
              {id
                ? 'Belajar bertahap dalam cohort atau fokus pada satu topik.'
                : 'Learn over a series of sessions or focus on one topic.'}
            </p>
          </div>
          <ActivitiesFilter
            value={kind}
            onChange={setKind}
            label={id ? 'Jenis kelas' : 'Class type'}
            allLabel={id ? 'Semua kelas' : 'All classes'}
            options={[
              { value: 'cohort', label: 'Cohorts' },
              { value: 'masterclass', label: 'Masterclasses' },
            ]}
          />
        </div>
        {classesFailed ? (
          <ClassEmpty id={id} failed />
        ) : visibleClasses.length === 0 ? (
          <ClassEmpty id={id} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleClasses.map((item) => {
              const title = id && item.titleId?.trim() ? item.titleId : item.titleEn;
              const tutors = [
                ...new Set(
                  item.sessions.flatMap((session) => (session.tutor ? [session.tutor.name] : [])),
                ),
              ];
              const modes = [
                ...new Set(
                  item.sessions.map((session) =>
                    session.mode === 'online' ? 'Online' : id ? 'Tatap muka' : 'In person',
                  ),
                ),
              ];
              const date = new Date(item.sessions[0].startAt);
              const datePart = (options: Intl.DateTimeFormatOptions) =>
                new Intl.DateTimeFormat(id ? 'id-ID' : 'en-US', {
                  ...options,
                  timeZone: 'Asia/Jakarta',
                }).format(date);
              const meta = (
                <div className="min-w-0 space-y-1 text-xs md:max-w-48">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock aria-hidden="true" className="size-3.5 shrink-0 text-neutral-800 md:size-5" />
                    <span className="truncate">
                      {datePart({ hour: '2-digit', minute: '2-digit' })} WIB
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-800">
                    <MapPin aria-hidden="true" className="size-3.5 shrink-0 md:size-5" />
                    <span className="truncate">{modes.join(' / ')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-800">
                    {item.kind === 'cohort' ? (
                      <>
                        <CalendarDays aria-hidden="true" className="size-3.5 shrink-0 md:size-5" />
                        <span className="truncate">
                          {item.sessions.length}{' '}
                          {id ? 'sesi' : item.sessions.length === 1 ? 'session' : 'sessions'}
                        </span>
                      </>
                    ) : (
                      <>
                        <GraduationCap aria-hidden="true" className="size-3.5 shrink-0 md:size-5" />
                        <span className="truncate" title={tutors.join(', ')}>
                          {tutors.join(', ') || (id ? 'Tutor Cogito' : 'Cogito tutor')}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
              return (
                <Card key={item.id} className="flex min-w-0 rounded-xl border border-neutral-200 bg-neutral-100 py-0">
                  <CardContent className="flex h-full w-full min-w-0 flex-col gap-4 p-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <time
                        dateTime={item.sessions[0].startAt}
                        className="flex aspect-square size-16 shrink-0 flex-col items-center justify-center rounded-md bg-background-primary text-center"
                      >
                        <span className="text-[.625rem] font-medium uppercase opacity-80 lg:text-[10px]">
                          {datePart({ weekday: 'short' })}
                        </span>
                        <span className="my-px text-xl font-semibold leading-none lg:text-2xl">
                          {datePart({ day: 'numeric' })}
                        </span>
                        <span className="text-[.65rem] font-medium uppercase opacity-80 lg:text-[10px]">
                          {datePart({ month: 'short' })}
                        </span>
                      </time>
                      <div className="min-w-0 flex-1">{meta}</div>
                    </div>
                    <div className="flex min-w-0 flex-col gap-2">
                      <h3 className="truncate text-sm font-semibold leading-6 md:text-base" title={title}>
                        {title}
                      </h3>
                      <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-xs">
                        <span className="text-neutral-800">{item.competition.name}</span>
                      </div>
                    </div>
                    <div className="mt-auto flex w-full min-w-0 flex-col gap-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant={item.kind === 'cohort' ? 'headline-primary' : 'headline-cream'}
                          className="px-2 py-0.5 text-[10px] leading-4 lg:text-[10px]"
                        >
                          {item.kind === 'cohort' ? 'Cohort' : 'Masterclass'}
                        </Badge>
                        {item.state === 'postponed' ? (
                          <Badge variant="outline">{id ? 'Ditunda' : 'Postponed'}</Badge>
                        ) : null}
                      </div>
                      <Button
                        type="button"
                        variant="default"
                        size="default"
                        className="w-full justify-center"
                        aria-label={`${id ? 'Lihat kelas' : 'View class'}: ${title}`}
                        onClick={() => setSelectedClass(item)}
                      >
                        {id ? 'Lihat kelas' : 'View class'}
                        <ChevronRight className="size-3.5" aria-hidden="true" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
      <OtherActivities articles={events} failed={eventsFailed} locale={locale} />
      <ResponsiveModal
        open={Boolean(selectedClass)}
        onOpenChange={(open) => {
          if (!open) setSelectedClass(null);
        }}
      >
        <ResponsiveModalContent className="sm:max-w-md">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>
              {id ? 'Lanjut ke aplikasi Cogito?' : 'Continue to the Cogito app?'}
            </ResponsiveModalTitle>
            <ResponsiveModalDescription>
              {id
                ? 'Kamu akan membuka detail kelas dan pilihan pendaftaran di aplikasi Cogito.'
                : 'You’ll open class details and enrollment options in the Cogito app.'}
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <ResponsiveModalFooter>
            <ResponsiveModalClose render={<Button variant="outline" size="default" />}>
              {id ? 'Tetap di sini' : 'Stay here'}
            </ResponsiveModalClose>
            {selectedClass ? (
              <Button
                render={
                  <a href={`${APP_URL}/classes/${encodeURIComponent(selectedClass.id)}`} />
                }
                size="default"
              >
                {id ? 'Lanjut ke aplikasi' : 'Continue to app'}
              </Button>
            ) : null}
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </div>
  );
}

function ClassEmpty({ id, failed = false }: { id: boolean; failed?: boolean }) {
  return (
    <Empty role={failed ? 'status' : undefined} className="min-h-72 rounded-2xl bg-background-cream py-20">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-background-primary text-primary-500 lg:size-8 [&_svg]:lg:size-4">
          <CalendarDays aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>
          {failed
            ? id
              ? 'Kelas belum dapat dimuat'
              : 'Classes could not be loaded'
            : id
              ? 'Belum ada kelas'
              : 'No classes yet'}
        </EmptyTitle>
        <EmptyDescription className="max-w-md text-pretty">
          {failed
            ? id
              ? 'Silakan coba lagi nanti.'
              : 'Please try again later.'
            : id
              ? 'Belum ada kelas yang tersedia untuk pilihan ini.'
              : 'No classes are available for this selection yet.'}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

function ActivitiesFilter({
  value,
  onChange,
  label,
  allLabel,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  allLabel: string;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <span>{value === 'all' ? label : options.find((option) => option.value === value)?.label}</span>
        <ChevronDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          <DropdownMenuRadioItem value="all">{allLabel}</DropdownMenuRadioItem>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
