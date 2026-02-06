import { Button } from "../ui/button";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const EVENT_DUMMY = [
  {
    title: "Event 1",
    desc: "Description of Event 1",
    image: "/path/to/image1.jpg",
  },
  {
    title: "Event 2",
    desc: "Description of Event 2",
    image: "/placeholder.jpg",
  },
];

export function EventsSection() {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-30 -translate-y-full"
      >
        <path
          d="M0,160 C240,0 1200,0 1440,160 L1440,160 L0,160 Z"
          className="fill-primary-100"
        />
      </svg>
      <section className="bg-primary-100 pt-5 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-8">
            {/* Header */}
            <h2 className="font-extrabold text-3xl text-neutral-1000">
              Satu <span className="text-primary-500">Bulan</span>, Satu{" "}
              <span className="text-primary-500">Inspirasi Dunia</span>
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 w-full">
              {EVENT_DUMMY.slice(0, 2).map((event) => (
                <EventCard key={event.title} {...event} />
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
}: {
  title: string;
  desc: string;
  image: string;
}) {
  return (
    <div className="h-45 grid grid-cols-3 xl:h-68 bg-background-cream rounded-2xl p-6 xl:p-10 relative overflow-hidden">
      <div className="h-full flex flex-col items-start col-span-2">
        <div>
          <p className="text-primary-500 text-3xl font-semibold">
            Monthly Town Hall
          </p>
          <p>Gali wawasan baru dalam diskusi bulanan kami.</p>
        </div>

        <Button size="lg" className="mt-auto mb-0">
          <span>Jadwalkan Konsultasi gratis</span>
          <ArrowRightIcon color="#ffffff" className="size-5" />
        </Button>
      </div>

      <Image
        src={image}
        width={500}
        height={500}
        alt={"Event Image"}
        className="w-full h-[121%] object-cover translate-x-11 bg-gray-200 items-center flex justify-center text-neutral-100"
      />
    </div>
  );
}
