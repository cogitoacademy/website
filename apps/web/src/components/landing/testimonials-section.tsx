import { ChevronLeft, ChevronRight } from "lucide-react";
import { landingAssets } from "./assets";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ayasha Yesa",
      role: "Praktisi PBB dan Best Delegate di Harvard National MUN",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: landingAssets.frame339,
      rotation: "rotate-[-5deg]",
      bgColor: "neutral-200",
    },
    {
      name: "Ayasha Yesa",
      role: "Praktisi PBB dan Best Delegate di Harvard National MUN",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: landingAssets.frame339,
      rotation: "rotate-0",
      bgColor: "primary-300",
      featured: true,
    },
    {
      name: "Ayasha Yesa",
      role: "Praktisi PBB dan Best Delegate di Harvard National MUN",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: landingAssets.frame339,
      rotation: "rotate-[5deg]",
      bgColor: "neutral-200",
    },
  ];

  return (
    <section className="bg-background-cream py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-12">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h2 className="font-extrabold text-[32px] text-neutral-1000">
              Dapatkan Strategi Langsung dari{" "}
              <span className="text-primary-500">Tangan Pertama</span>
            </h2>
            <p className="mx-auto max-w-3xl font-medium text-lg text-neutral-1000">
              Para ahli dan praktisi global yang siap mendampingimu meraih standar juara dunia di
              setiap kompetisi.
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative w-full max-w-6xl">
            <div className="flex min-h-[400px] items-center justify-center gap-8 lg:gap-12">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`
                    ${testimonial.featured ? "z-20 w-full max-w-[600px]" : "z-10 hidden w-[400px] opacity-70 lg:block"}
                    ${testimonial.rotation}transition-all duration-300`}
                >
                  <div
                    className={`bg-${testimonial.bgColor} relative rounded-2xl p-6 shadow-lg`}
                    style={{
                      backgroundColor: testimonial.featured
                        ? "var(--primary-300)"
                        : "var(--neutral-200)",
                    }}
                  >
                    {/* Quote Mark */}
                    <div className="absolute -top-4 left-6 font-bold text-[150px] text-neutral-400 leading-none">
                      "
                    </div>
                    <div className="absolute right-12 -bottom-8 font-bold text-[150px] text-neutral-400 leading-none">
                      "
                    </div>

                    {/* Profile */}
                    <div className="relative z-10 mb-6 flex items-center gap-4">
                      <div className="h-[69px] w-[69px] flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-black text-lg text-neutral-1000 leading-tight">
                          {testimonial.name}
                        </h4>
                        <p className="text-neutral-1000 text-sm leading-tight">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="relative z-10 text-base text-neutral-1000 leading-relaxed">
                      {testimonial.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-center gap-16">
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500 transition-colors hover:bg-primary-600"
              >
                <ChevronLeft className="size-5 text-white" />
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500 transition-colors hover:bg-primary-600"
              >
                <ChevronRight className="size-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
