// import { Container } from "../ui/container";
import { ChatsCircleIcon } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { Button } from '../ui/button';

export default async function CtaSection() {
  const locale = await getLocale();
  const isId = locale === 'id';

  return (
    <section className="relative bg-primary-100 px-4 py-20">
      {/*<Container>*/}
      <div className="relative z-2 mx-auto h-[520px] max-w-[calc(80rem-2rem)] overflow-visible rounded-3xl bg-neutral-100 p-10 min-[540px]:h-[383px]">
        <div className="flex h-full flex-col items-start sm:justify-between">
          <div>
            {isId ? (
              <h2 className="font-bold text-3xl text-gray-900 leading-tight sm:text-4xl xl:text-5xl">
                Susun Strategi Juaramu
              </h2>
            ) : (
              <h2 className="font-bold text-3xl text-gray-900 leading-tight sm:text-4xl xl:text-5xl max-w-[80%]">
                Map Out Your Winning Strategy
              </h2>
            )}
            <div className="mt-2 max-w-[380px] text-base text-gray-700 md:max-w-md">
              {isId ? (
                <>
                  <p>Masih bingung mulai dari mana?</p>
                  <p>
                    Jadwalkan konsultasi gratis dan biarkan tim ahli kami membantumu menyusun jalur
                    belajar yang tepat.
                  </p>
                </>
              ) : (
                <>
                  <p>Still unsure where to start?</p>
                  <p>
                    Book a free consultation and let our experts help you build a personalized
                    learning path.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="hidden h-full sm:flex-1" />
          <Link
            href="https://wa.me/62881011990195"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-50 mt-3 sm:mt-auto sm:mb-0 cursor-pointer"
          >
            <Button size="lg">
              <span>{isId ? 'Jadwalkan Konsultasi gratis' : 'Schedule Free Consultation'}</span>
              <ChatsCircleIcon weight="duotone" color="#ffffff" className="size-5" />
            </Button>
          </Link>
        </div>

        {/* Purple circles - behind the image with overflow hidden */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute right-0 bottom-0">
            {/* Large purple circle */}
            <div
              className="absolute right-0 bottom-0 translate-x-1/6 translate-y-1/3 rounded-full bg-secondary-300 size-60 md:size-80 lg:size-120"
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
        <div className="absolute right-0 bottom-0 h-[110%] overflow-visible">
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
      {/*</Container>*/}
    </section>
  );
}
