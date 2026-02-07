import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { EVENT_SLUGS, type EventSlug } from "@/lib/dummy-events";

type Props = {
  params: Promise<{
    locale: string;
    event: string;
  }>;
};

export default async function EventPage({ params }: Props) {
  const { event } = await params;

  const eventData = EVENT_SLUGS[event as EventSlug];

  if (!eventData) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-20">
      <Container>
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="font-bold text-4xl text-neutral-1000 tracking-tight md:text-5xl">
                {eventData.title}
              </h1>
              <p className="font-medium text-neutral-600 text-xl md:text-2xl">
                {eventData.subtitle}
              </p>
              <p className="max-w-lg text-base text-neutral-600 leading-relaxed">
                {eventData.description}
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-100 shadow-md">
              {/* Fallback image if the specific image path doesn't work in dev */}
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-neutral-400">
                <span className="font-medium text-lg">{eventData.title} Image</span>
              </div>
              {/*
               Uncomment this when real images are available
               <Image 
                  src={eventData.image} 
                  alt={eventData.title}
                  fill
                  className="object-cover"
                /> 
                */}
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="py-12">
          <h2 className="mb-8 font-bold text-3xl text-neutral-1000">
            {event === "cogito-101-series" ? "Episodes" : "Upcoming & Past Events"}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eventData.cards.map((card) => (
              <Card
                key={card.id}
                className="overflow-hidden border-neutral-200 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/9] bg-neutral-100">
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-neutral-400 text-sm">
                    {card.title}
                  </div>
                  {/*
                   <Image 
                      src={card.image} 
                      alt={card.title}
                      fill
                      className="object-cover"
                    /> 
                    */}
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1 text-lg md:text-xl">{card.title}</CardTitle>
                  <div className="mt-1 flex items-center gap-2 text-neutral-500 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{card.date}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 text-sm">
                    {card.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <a
                    href={card.link}
                    className={buttonVariants({
                      variant: "outline",
                      className: "w-full",
                    })}
                  >
                    Details
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
