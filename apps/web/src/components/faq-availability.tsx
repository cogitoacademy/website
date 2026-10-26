interface FaqAvailabilityProps {
  status: 'empty' | 'error';
  emptyMessage?: string;
  title?: string;
  description?: string;
  retryLabel?: string;
  className?: string;
}

export function FaqAvailability({
  status,
  emptyMessage,
  title,
  description,
  retryLabel,
  className,
}: FaqAvailabilityProps) {
  if (status === 'empty') {
    return (
      <p role="status" className={className}>
        {emptyMessage}
      </p>
    );
  }

  return (
    <div role="alert" className={className}>
      <h2 className="font-semibold text-base">{title}</h2>
      <p className="mt-2">{description}</p>
      <a
        href=""
        className="mt-4 inline-flex rounded-lg font-semibold text-primary-600 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
      >
        {retryLabel}
      </a>
    </div>
  );
}
