import type { ReactNode } from "react";

export function MobileTestimonialsScroll({
  children,
  isId,
}: {
  children: ReactNode;
  isId: boolean;
}) {
  return (
    <div
      role="region"
      aria-label={isId ? "Testimoni" : "Testimonials"}
      tabIndex={0}
      className="-my-2 flex w-full min-w-0 snap-x snap-proximity scroll-px-1 gap-3 overflow-x-auto rounded-sm px-1 py-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-primary-500 min-[470px]:hidden [&::-webkit-scrollbar]:hidden [&>div]:m-0 [&>div]:w-[88%] [&>div]:shrink-0 [&>div]:snap-start [&>div:last-child]:snap-end"
    >
      {children}
    </div>
  );
}
