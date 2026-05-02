import { UserSoundIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { cn } from "@/lib/utils";
import Carousel from "../carousel";
import { Badge } from "../ui/badge";

export async function TestimonialsSection() {
  const locale = await getLocale();
  const isId = locale === "id";

  const testimonials = [
    {
      id: 1,
      name: "Nasywa Gian",
      initials: "NG",
      color: "bg-blue-500",
      title: isId
        ? "Verbal Commendation of UNESCO, CASMUN 2026"
        : "Verbal Commendation of UNESCO, CASMUN 2026",
      desc: isId
        ? "When I first got into Cogito, I fell HARD in love. When they explain something to me it just clicks, and somehow makes me think like I'm smart and I can do it.Cogito motivates me so much and is truly a big part of my MUN journey."
        : "When I first got into Cogito, I fell HARD in love. When they explain something to me it just clicks, and somehow makes me think like I'm smart and I can do it. Cogito motivates me so much and is truly a big part of my MUN journey.",
      avatar: "/images/testimonials/NG.webp",
      img: "/images/testimonials/NG.webp",
    },
    {
      id: 2,
      name: "Athaya Praha",
      initials: "AP",
      color: "bg-pink-500",
      title: isId
        ? "Honorable Mention of NBA, MAINMUN 2026"
        : "Honorable Mention of NBA, MAINMUN 2026",
      desc: isId
        ? "The research and speaking lessons I had learned from just a couple sessions drastically improved my skills and confidence that ultimately helped me win my first award in my second ever MUN."
        : "The research and speaking lessons I had learned from just a couple sessions drastically improved my skills and confidence that ultimately helped me win my first award in my second ever MUN.",
      avatar: "/images/testimonials/AP.webp",
      img: "/images/testimonials/AP.webp",
    },
    {
      id: 3,
      name: "Alicia Ibrahim",
      initials: "AI",
      color: "bg-green-500",
      title: isId
        ? "Chair of Congress of Olympus, CHEMUN 2026"
        : "Chair of Congress of Olympus, CHEMUN 2026",
      desc: isId
        ? "Success in a conference requires both strategy and in-depth knowledge. Cogito’s training provided the technical clarity I needed to ensure a smooth flow throughout the council."
        : "Success in a conference requires both strategy and in-depth knowledge. Cogito’s training provided the technical clarity I needed to ensure a smooth flow throughout the council.",
      avatar: "/images/testimonials/AI.webp",
      img: "/images/testimonials/AI.webp",
    },
    {
      id: 3,
      name: "Farazahdi Dhaniarta|",
      initials: "FD",
      color: "bg-green-500",
      title: isId
        ? "Jac Khor Award, WSC Surabaya Round 2026"
        : "Jac Khor Award, WSC Surabaya Round 2026",
      desc: isId
        ? "Back then, I didn't know how to debate or even speak structurally and empirically to an audience. But Cogito actually managed to assist me in getting tons of medals and even a trophy for the Jac Khor Award in WSC!"
        : "Back then, I didn't know how to debate or even speak structurally and empirically to an audience. But Cogito actually managed to assist me in getting tons of medals and even a trophy for the Jac Khor Award in WSC!",
      avatar: "/images/testimonials/AI.webp",
      img: "/images/testimonials/AI.webp",
    },
  ];

  return (
    <section className="overflow-hidden bg-background-cream py-16">
      <div
        id="testimonials"
        className="invisible h-0 scroll-mt-24 md:scroll-mt-[6.5rem]"
        aria-hidden="true"
      />
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-6 md:gap-8 lg:gap-12">
          <div className="space-y-2 text-center">
            <Badge variant={"headline-primary"}>
              <UserSoundIcon />{" "}
              <span>{isId ? "Testimoni" : "Testimonials"}</span>
            </Badge>
            <h2 className="mx-auto text-pretty font-bold text-2xl text-neutral-1000 lg:max-w-none lg:text-3xl">
              {isId ? (
                <>
                  Lebih dari Sekadar{" "}
                  <span className="text-primary-500">Medali</span>
                </>
              ) : (
                <>
                  Progress Beyond the{" "}
                  <span className="text-primary-500">Podium</span>
                </>
              )}
            </h2>
            <p className="mx-auto max-w-3xl font-medium text-neutral-1000 text-xs md:max-w-none md:text-sm xl:text-base text-pretty">
              {isId
                ? "Simak cerita mereka yang berhasil menemukan kepercayaan diri dan menguasai keahlian baru."
                : "Hear from students who found their voice and mastered new skills with us."}
            </p>
          </div>

          <div className="hidden min-[470px]:block">
            <Carousel
              items={testimonials}
              showNavigation={true}
              showDots={true}
              autoPlay={false}
              gap={36}
              responsiveGap={true}
              className=""
            />
          </div>

          <div className="flex flex-col gap-4 max-[469px]:flex min-[470px]:hidden">
            {testimonials.map((testimonial) => (
              <MobileCard key={testimonial.id} item={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialItem {
  id: number;
  name: string;
  initials: string;
  color: string;
  title: string;
  desc: string;
  avatar: string;
  img: string;
}

function MobileCard({ item }: { item: TestimonialItem }) {
  const bgColor =
    item.id % 2 === 0
      ? "bg-tertiary-yellow-200 border-neutral-200 *:text-black"
      : "bg-secondary-200 *:text-neutral-1000 border-neutral-200";

  const showInitials = item.avatar === "/placeholder.jpg" && item.initials;

  return (
    <div
      className={`mx-auto flex aspect-video w-full max-w-[90vw] flex-col overflow-hidden rounded-[20px] border shadow-sm transition sm:max-w-none ${bgColor}`}
    >
      <div className="flex flex-1 flex-col justify-between text-pretty p-4 text-left">
        <p className="max-h-full overflow-y-auto text-xs min-[420px]:text-sm min-[500px]:text-base">
          {item.desc}
        </p>
        <div className="flex items-center space-x-2">
          <div
            className={`flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full lg:size-13 ${
              showInitials
                ? `${item.color || "bg-primary-500"} font-medium text-sm text-white`
                : "bg-primary-100"
            }`}
          >
            {showInitials ? (
              <span>{item.initials}</span>
            ) : (
              <Image
                src={item.avatar}
                alt="Avatar"
                width={100}
                height={100}
                className="h-full w-full"
              />
            )}
          </div>
          <div className="flex flex-col items-start justify-center">
            <h3 className={cn("font-medium text-base leading-none")}>
              {item.name}
            </h3>
            <h4 className="line-clamp-2 text-xs">{item.title}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
