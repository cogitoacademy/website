import Image from 'next/image';
import { Marquee } from '../ui/marquee';

export function PartnersCarousel() {
  // Array of partner logos (using placeholder for now)
  const partners = Array.from({ length: 13 }, (_, i) => ({
    id: i,
    src: '/images/landing/favicon porto.png',
  }));

  return (
    <section className="overflow-hidden bg-tertiary-yellow-200 py-5">
      <div className="overflow-hidden">
        <Marquee className="[--duration:120s]" repeat={5}>
          {partners.map((partner) => (
            <span key={partner.id} className="flex items-center">
              <Image
                src={partner.src}
                alt=""
                width={3500}
                height={1445}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="h-16 w-auto object-contain lg:h-20"
                loading="eager"
              />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
