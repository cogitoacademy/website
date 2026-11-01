'use client';
import { useState, type ReactNode } from 'react';
import { ArrowUpRight, CalendarClock, CalendarDays, MapPin, XIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';
import type { OtherActivity } from '@/lib/other-activities';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
export default function OtherActivities({
  articles,
  failed,
  locale,
}: {
  articles: OtherActivity[];
  failed: boolean;
  locale: string;
}) {
  const [selected, setSelected] = useState<OtherActivity | null>(null);
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const [count, setCount] = useState(10);
  const id = locale === 'id';
  const selectedHasImage = Boolean(
    selected?.imageUrl && selected.imageUrl !== failedImageUrl,
  );
  const date = (v: string) =>
    new Intl.DateTimeFormat(id ? 'id-ID' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Jakarta',
    }).format(new Date(v)) + ' WIB';
  const runs = (content: { text: string; bold?: boolean; italic?: boolean; href?: string }[]) =>
    content.map((run, i) => {
      let text: ReactNode = run.text;
      if (run.bold) text = <strong>{text}</strong>;
      if (run.italic) text = <em>{text}</em>;
      return run.href ? (
        <a key={i} className="underline text-primary-700" href={run.href}>
          {text}
        </a>
      ) : (
        <span key={i}>{text}</span>
      );
    });
  return (
    <section aria-labelledby="others-title">
      <h2 id="others-title" className="font-semibold text-2xl md:text-3xl">
        {id ? 'Lainnya' : 'Others'}
      </h2>
      <p className="mb-6 text-sm text-neutral-900">
        {id
          ? 'Belajar, terhubung, dan mencoba ide baru.'
          : 'More ways to learn, connect, and put ideas into practice.'}
      </p>
      {failed ? (
        <Empty role="status" className="min-h-72 rounded-2xl bg-background-cream py-20">
          <EmptyHeader>
            <EmptyMedia
              variant="icon"
              className="bg-background-primary text-primary-500 lg:size-8 [&_svg]:lg:size-4"
            >
              <CalendarDays aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>
              {id ? 'Kegiatan belum dapat dimuat' : 'Activities could not be loaded'}
            </EmptyTitle>
            <EmptyDescription className="max-w-md text-pretty">
              {id ? 'Silakan coba lagi nanti.' : 'Please try again later.'}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : !articles.length ? (
        <Empty className="min-h-72 rounded-2xl bg-background-cream py-20">
          <EmptyHeader>
            <EmptyMedia
              variant="icon"
              className="bg-background-primary text-primary-500 lg:size-8 [&_svg]:lg:size-4"
            >
              <CalendarDays aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>{id ? 'Belum ada kegiatan' : 'No activities yet'}</EmptyTitle>
            <EmptyDescription className="max-w-md text-pretty">
              {id ? 'Kegiatan baru akan ditampilkan di sini.' : 'New activities will appear here.'}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {articles.slice(0, count).map((article) => (
            <button
              key={article.id}
              type="button"
              onClick={() => setSelected(article)}
              className="group flex w-full items-start justify-between gap-5 py-4 px-3 text-left transition-colors hover:bg-neutral-100/60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-500"
            >
              <span className="min-w-0 flex-1">
                <span className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-600">
                  <time dateTime={article.startAt}>{date(article.startAt)}</time>
                  <span aria-hidden="true">·</span>
                  <span>
                    {article.status === 'completed'
                      ? id
                        ? 'Sudah lewat'
                        : 'Completed'
                      : id
                        ? 'Akan datang'
                        : 'Upcoming'}
                  </span>
                </span>
                <span className="block font-bold text-lg leading-snug text-neutral-1000 transition-colors group-hover:text-primary-600 sm:text-xl">
                  {article.title}
                </span>
                <span className="mt-2 line-clamp-2 block max-w-3xl text-sm leading-relaxed text-neutral-700">
                  {article.description}
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="mt-1 size-5 shrink-0 text-neutral-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-600"
                strokeWidth={2}
              />
            </button>
          ))}
        </div>
      )}
      {count < articles.length ? (
        <div className="mt-10 flex justify-center">
          <Button variant="subtle" size="lg" onClick={() => setCount((value) => value + 10)}>
            {id ? 'Lihat lainnya' : 'View more'}
          </Button>
        </div>
      ) : null}
      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="flex w-full max-h-[90dvh] flex-col gap-0 overflow-y-auto rounded-t-2xl border-none bg-background p-0 text-base sm:data-[side=bottom]:inset-x-auto sm:data-[side=bottom]:inset-y-0 sm:data-[side=bottom]:right-0 sm:data-[side=bottom]:h-dvh sm:max-h-dvh sm:w-full sm:max-w-xl sm:rounded-none sm:data-[side=bottom]:data-open:slide-in-from-bottom-0 sm:data-[side=bottom]:data-closed:slide-out-to-bottom-0 sm:data-[side=bottom]:data-open:slide-in-from-right-10 sm:data-[side=bottom]:data-closed:slide-out-to-right-10"
        >
          {selected ? (
            <>
              {selectedHasImage ? (
                <div className="relative flex h-[240px] shrink-0 items-center justify-center overflow-hidden bg-muted sm:h-[280px]">
                  <img
                    src={selected.imageUrl ?? undefined}
                    alt=""
                    className="size-full object-cover"
                    onError={() => setFailedImageUrl(selected.imageUrl)}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent sm:hidden" />
                  <Badge
                    variant={selected.status === 'completed' ? 'completed' : 'upcoming'}
                    className="absolute bottom-4 left-4 z-10 sm:hidden"
                  >
                    {selected.status === 'completed'
                      ? id
                        ? 'Sudah lewat'
                        : 'Completed'
                      : id
                        ? 'Akan datang'
                        : 'Upcoming'}
                  </Badge>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-4 right-4 z-20 h-8 w-8 rounded-md bg-white/90 text-black shadow-sm hover:bg-white"
                    onClick={() => setSelected(null)}
                  >
                    <XIcon className="h-4 w-4" />
                    <span className="sr-only">{id ? 'Tutup' : 'Close'}</span>
                  </Button>
                </div>
              ) : null}

              <div className="bg-background">
                <div className="p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <SheetTitle className="font-bold text-2xl text-foreground leading-tight tracking-tight sm:text-3xl">
                        {selected.title}
                      </SheetTitle>
                      {!selectedHasImage ? (
                        <Button
                          variant="secondary"
                          size="icon"
                          className="-mt-1 shrink-0 rounded-md"
                          onClick={() => setSelected(null)}
                        >
                          <XIcon className="h-4 w-4" />
                          <span className="sr-only">{id ? 'Tutup' : 'Close'}</span>
                        </Button>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={selected.status === 'completed' ? 'completed' : 'upcoming'}
                        className={selectedHasImage ? 'hidden sm:inline-flex' : 'inline-flex'}
                      >
                        {selected.status === 'completed'
                          ? id
                            ? 'Sudah lewat'
                            : 'Completed'
                          : id
                            ? 'Akan datang'
                            : 'Upcoming'}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="inline-flex items-center gap-2 rounded-md bg-background-primary px-3 py-1.5 font-medium text-neutral-1000">
                        <CalendarClock aria-hidden="true" className="size-4 shrink-0" />
                        {date(selected.startAt)}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-md bg-background-primary px-3 py-1.5 font-medium text-neutral-1000">
                        <MapPin aria-hidden="true" className="size-4 shrink-0" />
                        {selected.location}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{selected.description}</p>
                  </div>

                  <div className="mt-5 space-y-4 rounded-xl bg-background-primary px-4 py-4 leading-relaxed [overflow-wrap:anywhere]">
                    {selected.body.blocks.map((block, i) =>
                      block.type === 'paragraph' ? (
                        <p key={i}>{runs(block.content)}</p>
                      ) : block.style === 'ordered' ? (
                        <ol key={i} className="list-decimal pl-6">
                          {block.items.map((item, j) => (
                            <li key={j}>{runs(item)}</li>
                          ))}
                        </ol>
                      ) : (
                        <ul key={i} className="list-disc pl-6">
                          {block.items.map((item, j) => (
                            <li key={j}>{runs(item)}</li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </section>
  );
}
