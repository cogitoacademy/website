import { ArrowRight } from "lucide-react";
import { landingAssets } from "./assets";

const EVENT_DUMMY = [
  {
    title: "Event 1",
    desc: "Description of Event 1",
    image: "/path/to/image1.jpg",
  },
  {
    title: "Event 2",
    desc: "Description of Event 2",
    image: "/path/to/image2.jpg",
  },
];

export function EventsSection() {
  return (
    <section className="bg-background-cream py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-8">
          {/* Header */}
          <h2 className="font-extrabold text-[32px] text-neutral-1000">
            Satu <span className="text-primary-500">Bulan</span>, Satu{" "}
            <span className="text-primary-500">Inspirasi Dunia</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {EVENT_DUMMY.slice(0, 2).map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>
        </div>
      </div>
    </section>
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
    <div className="flex flex-col items-center gap-4 outline">
      <img src={image} alt={title} className="w-full rounded-lg" />
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-bold text-xl text-neutral-1000">{title}</h3>
        <p className="text-neutral-500">{desc}</p>
      </div>
    </div>
  );
}
