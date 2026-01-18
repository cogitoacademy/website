import { ArrowRight } from "lucide-react";
import { landingAssets } from "./assets";

export function EventsSection() {
  return (
    <section className="bg-background-cream py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-8">
          {/* Header */}
          <div className="space-y-3 text-center">
            <h2 className="font-extrabold text-[32px] text-neutral-1000">
              Satu <span className="text-primary-500">Bulan</span>, Satu{" "}
              <span className="text-primary-500">Inspirasi Dunia</span>
            </h2>
          </div>

          {/* Event Cards */}
          <div className="flex w-full flex-col items-center gap-6 lg:flex-row">
            {/* Previous Month Card */}
            <div className="relative h-[230px] w-full flex-shrink-0 overflow-hidden rounded-lg bg-tertiary-blue-200 shadow-sm lg:w-[185px]">
              <img
                src={landingAssets.rectangle24}
                alt="November Event"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-tertiary-blue-900/80" />
              <p className="absolute bottom-4 left-5 font-bold text-sm text-white italic">
                November 2026
              </p>
            </div>

            {/* Next Month Card */}
            <div className="relative h-[230px] w-full flex-shrink-0 overflow-hidden rounded-lg bg-tertiary-blue-200 shadow-sm lg:w-[185px]">
              <img
                src={landingAssets.rectangle24}
                alt="December Event"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-tertiary-blue-900/80" />
              <p className="absolute bottom-4 left-5 font-bold text-sm text-white italic">
                Desember 2026
              </p>
            </div>

            {/* Featured Event Card */}
            <div className="flex h-[230px] w-full overflow-hidden rounded-lg bg-tertiary-blue-100 shadow-sm lg:flex-1">
              {/* Event Image */}
              <div className="h-full w-[184px] flex-shrink-0">
                <img
                  src={landingAssets.rectangle24}
                  alt="Featured Event"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Event Info */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div className="space-y-2">
                  <p className="text-neutral-1000 text-sm italic">January 2026</p>
                  <h3 className="font-bold text-[26px] text-neutral-1000 leading-tight">
                    The Real Delegate:
                    <br />
                    Beyond MUN
                  </h3>
                  <div className="space-y-1 text-neutral-1000 text-sm">
                    <p>29 November 2025 | Online</p>
                    <p>12.00 - 13.30 WIB</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center self-end rounded-lg bg-background-cream shadow-sm transition-colors hover:bg-neutral-200"
                >
                  <ArrowRight className="size-5 text-neutral-1000" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
