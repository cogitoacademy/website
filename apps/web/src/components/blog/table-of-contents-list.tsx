'use client';

import { useEffect, useState } from 'react';

export type TocHeading = { id: string; text: string; level: 2 | 3 };

export function TableOfContentsList({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [headings]);

  return (
    <div className="relative">
      <div aria-hidden className="hidden flex-col items-end gap-1.5 py-3 lg:flex lg:group-hover:invisible lg:group-focus-within:invisible">
        {headings.map((heading) => (
          <span key={heading.id} className={`h-0.5 ${heading.level === 3 ? 'w-2' : 'w-3.5'} ${heading.id === activeId ? 'bg-primary-600' : 'bg-neutral-300'}`} />
        ))}
      </div>
      <ol className="mt-3 flex flex-col gap-0.5 text-sm lg:absolute lg:top-1/2 lg:right-0 lg:mt-0 lg:w-72 lg:-translate-y-1/2 lg:rounded-lg lg:border lg:border-neutral-200 lg:bg-white lg:p-2 lg:opacity-0 lg:pointer-events-none lg:group-hover:opacity-100 lg:group-hover:pointer-events-auto lg:group-focus-within:opacity-100 lg:group-focus-within:pointer-events-auto lg:max-h-[70vh] lg:overflow-y-auto">
      {headings.map((heading) => {
        const active = heading.id === activeId;

        return (
          <li key={heading.id} className={heading.level === 3 ? 'pl-3' : undefined}>
            <a
              href={`#${heading.id}`}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                const target = document.getElementById(heading.id);
                if (!target) return;
                event.preventDefault();
                const header = document.querySelector('header');
                const offset = (header?.getBoundingClientRect().height ?? 80) + 24;
                window.history.pushState(null, '', `#${heading.id}`);
                window.scrollTo({
                  top: window.scrollY + target.getBoundingClientRect().top - offset,
                  behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
                });
                setActiveId(heading.id);
              }}
              aria-current={active ? 'location' : undefined}
              className={`flex items-start gap-2 rounded-md px-px py-px text-[13px] leading-5 transition hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-primary-500 ${
                active
                  ? 'text-primary-600'
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              <span
                aria-hidden
                className={`mt-2 size-1 shrink-0 rounded-full bg-primary-500 ${
                  active ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <span className="min-w-0 break-words">{heading.text}</span>
            </a>
          </li>
        );
      })}
      </ol>
    </div>
  );
}
