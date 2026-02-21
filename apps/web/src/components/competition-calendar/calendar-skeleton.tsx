import { Skeleton } from "@/components/ui/skeleton";

const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_ID = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

interface CalendarSkeletonProps {
  locale?: string;
}

export function CalendarSkeleton({ locale }: CalendarSkeletonProps) {
  const weekdays = locale === "id" ? WEEKDAYS_ID : WEEKDAYS_EN;
  return (
    <div className="flex flex-col rounded-xl border bg-neutral-100 xl:rounded-3xl">
      {/* Header toolbar */}
      <div className="flex items-center justify-between rounded-t-xl bg-tertiary-pink-200 p-2 sm:p-4 xl:rounded-t-3xl">
        <div className="flex items-center gap-1 sm:gap-4">
          <Skeleton className="h-10.5 w-20 rounded-md max-[479px]:w-9" />
          <div className="flex items-center sm:gap-2">
            <Skeleton className="size-10 rounded-md" />
            <Skeleton className="size-10 rounded-md" />
          </div>
          <Skeleton className="h-6 w-32 rounded-md sm:w-40" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10.5 w-20 rounded-md" />
        </div>
      </div>

      {/* Month view grid */}
      <div className="flex flex-1 flex-col">
        <div className="overflow-x-auto overscroll-x-none lg:overflow-x-visible">
          <div className="min-w-[800px] lg:min-w-0">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 border-border/70 border-y">
              {weekdays.map((day) => (
                <div
                  className="bg-background-cream py-2 text-center text-neutral-1000 text-sm"
                  key={day}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid - 5 weeks */}
            <div className="grid flex-1 auto-rows-fr">
              {Array.from({ length: 5 }).map((_, weekIndex) => (
                <div
                  className="grid grid-cols-7 [&:last-child>*]:border-b-0"
                  key={`skeleton-week-${weekIndex}`}
                >
                  {Array.from({ length: 7 }).map((_, dayIndex) => (
                    <div
                      className="border-border/70 border-r border-b p-1 last:border-r-0"
                      key={`skeleton-day-${weekIndex}-${dayIndex}`}
                    >
                      {/* Day number */}
                      <Skeleton className="mt-1 mb-1 ml-1 size-6 rounded-full" />

                      {/* Event placeholders */}
                      <div className="min-h-[calc((24px+4px)*3)] space-y-1 lg:min-h-[calc((24px+4px)*4)]">
                        {weekIndex % 2 === 0 && dayIndex % 3 === 0 && (
                          <Skeleton className="h-[24px] w-full rounded-sm" />
                        )}
                        {weekIndex % 3 === 1 && dayIndex % 2 === 1 && (
                          <>
                            <Skeleton className="h-[24px] w-full rounded-sm" />
                            <Skeleton className="h-[24px] w-3/4 rounded-sm" />
                          </>
                        )}
                        {weekIndex === 2 && dayIndex === 3 && (
                          <Skeleton className="h-[24px] w-5/6 rounded-sm" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
