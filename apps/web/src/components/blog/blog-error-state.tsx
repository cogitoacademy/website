import { RotateCw } from 'lucide-react';

export function BlogErrorState({
  title,
  description,
  retryLabel,
  retryHref,
}: {
  title: string;
  description: string;
  retryLabel: string;
  retryHref: string;
}) {
  return (
    <div
      role="alert"
      className="flex max-w-xl flex-col items-start gap-4 rounded-2xl bg-neutral-100 p-6 ring-1 ring-neutral-200"
    >
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-lg text-neutral-1000">{title}</p>
        <p className="text-neutral-600 text-sm leading-relaxed">{description}</p>
      </div>
      <a
        href={retryHref}
        className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 font-medium text-sm text-white transition hover:bg-primary-600"
      >
        <RotateCw aria-hidden className="size-4" />
        {retryLabel}
      </a>
    </div>
  );
}
