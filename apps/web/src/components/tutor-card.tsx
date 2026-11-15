'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { fitBadgeCount } from '@/lib/badge-overflow';
import type { TutorSubject } from '@/types/tutor';
import type { Tutor } from '@/types/tutor';
import TutorDetailModal from './tutor-detail-modal';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface TutorCardProps {
  tutor: Tutor;
  index?: number;
}

function subjectName(subject: TutorSubject, locale: string) {
  return locale === 'id' ? subject.nameId || subject.name : subject.name;
}

export default function TutorCard({ tutor }: TutorCardProps) {
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const badgeRowRef = useRef<HTMLDivElement>(null);
  const measurementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = badgeRowRef.current;
    const measurement = measurementRef.current;
    if (!row || !measurement) return;
    const measure = () => {
      const widths = Array.from(
        measurement.children,
        (child) => child.getBoundingClientRect().width,
      );
      setVisibleCount(
        fitBadgeCount(
          widths.slice(0, tutor.subjects.length),
          widths.slice(tutor.subjects.length),
          row.clientWidth,
          Number.parseFloat(getComputedStyle(row).columnGap) || 0,
        ),
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    observer.observe(measurement);
    measure();
    return () => observer.disconnect();
  }, [tutor.subjects, locale]);

  const renderSubjectBadge = (subject: TutorSubject) => (
    <Badge
      key={subject.id}
      variant="tutor"
      className="bg-background-cream text-neutral-1000"
      style={{
        color: subject.parent.lightTextColor ?? undefined,
        backgroundColor: subject.parent.lightBackgroundColor ?? undefined,
      }}
    >
      {subjectName(subject, locale)}
    </Badge>
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
        onClick={() => setIsModalOpen(true)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <Button className="absolute top-3 right-3 z-2" variant="gray" size="icon-lg">
          <ArrowUpRightIcon strokeWidth={2.5} className="size-5" />
        </Button>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="relative z-1 flex h-60 w-full shrink-0 items-center justify-center overflow-hidden bg-muted">
            {tutor.profileImageUrl ? (
              <Image
                src={tutor.profileImageUrl}
                alt={tutor.name}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <span aria-hidden="true" className="font-semibold text-4xl text-muted-foreground">
                {tutor.name.slice(0, 1).toUpperCase()}
              </span>
            )}
          </div>

          <div className="relative z-2 -mt-2 flex min-h-0 flex-1 flex-col rounded-xl bg-neutral-100 p-2.5 shadow-inset-top">
            <h3 className="truncate font-semibold text-lg leading-tight">{tutor.name}</h3>
            <p className="mt-1 mb-2.5 line-clamp-2 text-muted-foreground text-xs">
              {tutor.affiliation || '\u00a0'}
            </p>

            {tutor.subjects.length > 0 && (
              <div className="relative mt-auto mb-0 min-w-0">
                <div ref={badgeRowRef} className="flex flex-nowrap gap-2 overflow-hidden">
                  {tutor.subjects.slice(0, visibleCount).map(renderSubjectBadge)}
                  {visibleCount < tutor.subjects.length && (
                    <Badge variant="tutor" className="bg-neutral-200 text-neutral-1000">
                      +{tutor.subjects.length - visibleCount}
                    </Badge>
                  )}
                </div>
                <div
                  ref={measurementRef}
                  aria-hidden="true"
                  className="pointer-events-none invisible absolute top-0 left-0 flex w-max gap-2"
                >
                  {tutor.subjects.map(renderSubjectBadge)}
                  {tutor.subjects.map((subject, index) => (
                    <Badge
                      key={`count-${subject.id}`}
                      variant="tutor"
                      className="bg-neutral-200 text-neutral-1000"
                    >
                      +{index + 1}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <TutorDetailModal tutor={tutor} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
