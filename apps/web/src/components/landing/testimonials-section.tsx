// import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserSoundIcon } from "@phosphor-icons/react/dist/ssr";
import { getLocale } from "next-intl/server";
import Carousel from "../carousel";
import { Badge } from "../ui/badge";
import { landingAssets } from "./assets";

export async function TestimonialsSection() {
  const locale = await getLocale();
  const isId = locale === "id";

  const testimonials = [
    {
      id: 1,
      name: "Ayasha Yesa",
      title: isId
        ? "Praktisi PBB dan Best Delegate di Harvard National MUN"
        : "UN Practitioner and Best Delegate at Harvard National MUN",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      avatar: "/placeholder.jpg",
      img: "/placeholder.jpg",
    },
    {
      id: 2,
      name: "Ayasha Yesa",
      title: isId
        ? "Praktisi PBB dan Best Delegate di Harvard National MUN"
        : "UN Practitioner and Best Delegate at Harvard National MUN",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      avatar: "/placeholder.jpg",
      img: "/placeholder.jpg",
    },
    {
      id: 3,
      name: "Ayasha Yesa",
      title: isId
        ? "Praktisi PBB dan Best Delegate di Harvard National MUN"
        : "UN Practitioner and Best Delegate at Harvard National MUN",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      avatar: "/placeholder.jpg",
      img: "/placeholder.jpg",
    },
  ];

  return (
    <section className="bg-background-cream py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-12">
          <div className="space-y-2 text-center">
            <Badge variant={"headline-primary"}>
              <UserSoundIcon />{" "}
              <span>{isId ? "Testimoni" : "Testimonials"}</span>
            </Badge>
            <h2 className="mx-auto text-pretty font-bold text-2xl text-neutral-1000 lg:max-w-none lg:text-3xl">
              {isId ? (
                <>
                  Dapatkan Strategi Langsung <br /> dari{" "}
                  <span className="text-primary-500">Tangan Pertama</span>
                </>
              ) : (
                <>
                  Get Direct Strategies from{" "}
                  <span className="text-primary-500">First Hand</span>
                </>
              )}
            </h2>
            <p className="mx-auto max-w-3xl font-medium text-neutral-1000 text-xs md:max-w-none md:text-sm xl:text-base">
              {isId
                ? "Para ahli dan praktisi global yang siap mendampingimu meraih standar juara dunia di setiap kompetisi."
                : "Global experts and practitioners ready to accompany you in achieving world champion standards in every competition."}
            </p>
          </div>

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
      </div>
    </section>
  );
}
