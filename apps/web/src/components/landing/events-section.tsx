import { ArrowRightIcon, CalendarDotsIcon } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

type EventDummy = {
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  image: string;
  link: string;
};

const EVENT_DUMMY: EventDummy[] = [
  {
    titleId: 'Monthly Townhall',
    titleEn: 'Monthly Townhall',
    descId: 'Gali wawasan baru dalam diskusi bulanan kami.',
    descEn: 'Explore new insights in our monthly discussions.',
    image: '/event.webp',
    link: '/events/monthly-townhall',
  },
  {
    titleId: 'Cogito 101 Series',
    titleEn: 'Cogito 101 Series',
    descId: 'Kenali ragam peluang prestasi global dan siapkan dirimu!',
    descEn: 'Discover global achievement opportunities and prepare yourself!',
    image: '/event.webp',
    link: '/events/cogito-101-series',
  },
];

export function EventsSection() {
  const locale = useLocale();
  const isId = locale === 'id';

  return (
    <div className="relative z-1">
      <div
        id="events"
        className="invisible h-0 scroll-mt-20 md:scroll-mt-[6.5rem]"
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 h-30 w-full -translate-y-full"
      >
        <path d="M0,160 C240,0 1200,0 1440,160 L1440,160 L0,160 Z" className="fill-primary-100" />
      </svg>
      <section className="bg-primary-100 pt-5 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-4 lg:gap-8">
            <div className="flex flex-col items-center space-y-2 px-4 xl:px-10">
              <Badge variant={'headline-primary'}>
                <CalendarDotsIcon /> <span>{isId ? 'Acara Publik' : 'Public Events'}</span>
              </Badge>
              <h2 className="text-center font-extrabold text-2xl text-neutral-1000 lg:text-3xl">
                {isId ? (
                  <>
                    Satu <span className="text-primary-500">Bulan</span>, Satu{' '}
                    <span className="text-primary-500">Inspirasi Dunia</span>
                  </>
                ) : (
                  <>
                    One <span className="text-primary-500">Month</span>, One{' '}
                    <span className="text-primary-500">World Inspiration</span>
                  </>
                )}
              </h2>
            </div>
            <div className="grid w-full grid-cols-1 items-center justify-center gap-4 px-4 md:grid-cols-2 lg:gap-5 xl:gap-8 xl:px-10">
              {EVENT_DUMMY.slice(0, 2).map((event) => (
                <EventCard
                  key={event.titleId}
                  title={isId ? event.titleId : event.titleEn}
                  desc={isId ? event.descId : event.descEn}
                  image={event.image}
                  link={event.link}
                  isId={isId}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function EventCard({
  title,
  desc,
  image,
  link,
  isId,
}: {
  title: string;
  desc: string;
  image: string;
  link: string;
  isId: boolean;
}) {
  return (
    <div className="relative mx-auto flex h-45 overflow-hidden rounded-2xl bg-background-cream p-6 md:w-auto lg:mx-0 lg:h-68 lg:p-10 min-[450px]:w-100">
      <div className="flex h-full flex-col items-start">
        <div>
          <p className="font-bold text-lg text-primary-500 leading-tight lg:text-2xl min-[380px]:text-xl">
            {title}
          </p>
          <p className="text-2xs sm:text-sm lg:text-base min-[380px]:text-xs">{desc}</p>
        </div>

        <Link href={link} className="mt-auto mb-0">
          <Button size="md" className="hidden cursor-pointer md:inline-flex">
            <span>{isId ? 'Lihat Selengkapnya' : 'View More'}</span>
            <ArrowRightIcon color="#ffffff" className="size-5" />
          </Button>
          <Button size="icon" className="cursor-pointer md:hidden">
            {/*<span>{isId ? "Lihat Selengkapnya" : "View More"}</span>*/}
            <ArrowRightIcon color="#ffffff" weight="bold" />
          </Button>
        </Link>
      </div>

      <Image
        src={image}
        width={317}
        height={388}
        alt={'Event Image'}
        className="flex h-[121%] w-auto translate-x-7 items-center justify-center bg-gray-200 object-cover text-neutral-100 lg:translate-x-11"
      />
    </div>
  );
}
