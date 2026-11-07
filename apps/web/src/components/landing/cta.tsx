import { ChatsCircleIcon } from '@phosphor-icons/react/dist/ssr';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { getLocale } from 'next-intl/server';
import { APP_URL } from '@/lib/constants';
import { Button } from '../ui/button';

const WHATSAPP_URL = 'https://wa.me/62881011990195';

export default async function CtaSection() {
  const locale = await getLocale();
  const isId = locale === 'id';

  return (
    <section id="cta" className="relative bg-background-primary px-4 py-20">
      <div className="relative z-2 mx-auto flex flex-col max-w-[calc(80rem-2rem)] overflow-visible rounded-3xl bg-neutral-100 p-8 sm:min-h-[420px] sm:p-10">
        <div className="relative z-20 flex flex-1 flex-col justify-between gap-10 items-stretch">
          <div className="max-w-[560px]">
            <h2 className="font-bold text-3xl text-gray-900 leading-tight sm:text-4xl xl:text-5xl">
              {isId ? 'Susun Strategi Juaramu' : 'Map Out Your Winning Strategy'}
            </h2>
            <p className="md:my-3 mb-1 max-w-md text-base text-gray-700 text-sm sm:text-base md:text-lg">
              {isId
                ? 'Siap memulai perjalanan pengembangan dirimu?'
                : 'Ready to commence your personal growth journey?'}
            </p>
            <a
                href={`${APP_URL}/classes`}
                aria-label={
                  isId
                    ? 'Mulai belajar di aplikasi Cogito Academy'
                    : 'Start learning in the Cogito Academy app'
                }
              >
                <Button size="md">
                  <span>{isId ? 'Mulai Belajar' : 'Start Learning'}</span>
                  <ArrowRight className="size-4" />
                </Button>
              </a>
          </div>
          <div className="flex flex-col items-start gap-2 mb-0 mt-auto">
            <p className="text-sm text-gray-600">
              {isId ? 'Masih bingung mulai dari mana?' : 'Still unsure where to start?'}
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="md" variant="gray">
                <span>{isId ? 'Jadwalkan Konsultasi' : 'Schedule Consultation'}</span>
                <ChatsCircleIcon weight="duotone" color="#333333" className="size-4" />
              </Button>
            </a>
          </div>
        </div>

        {/* Purple circles - behind the image with overflow hidden */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl sm:block">
          <div className="absolute right-0 bottom-0">
            {/* Large purple circle */}
            <div
              className="absolute right-0 bottom-0 size-60 translate-x-1/6 translate-y-1/3 rounded-full bg-secondary-300 md:size-80 lg:size-120"
              aria-hidden="true"
            />

            {/* Small purple circle - top right area */}
            <div
              className="absolute top-[-12rem] right-[10rem] size-[50px] rounded-full bg-secondary-200 md:right-[15rem] md:top-[-15rem] lg:right-[25rem] lg:size-[80px]"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Person with laptop image - in front of circles */}
        <div className="absolute right-0 bottom-0 hidden h-full overflow-visible sm:block">
          <Image
            src="/person-with-laptop.webp"
            alt="Student studying"
            width={925}
            height={443}
            quality={100}
            className="relative z-10 h-full w-auto rounded-br-3xl object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
