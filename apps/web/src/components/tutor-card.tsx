'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useState } from 'react';
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
              <div className="mt-auto mb-0 flex flex-wrap gap-2">
                {tutor.subjects.map((subject) => (
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <TutorDetailModal tutor={tutor} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
