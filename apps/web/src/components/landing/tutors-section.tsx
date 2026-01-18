import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landingAssets } from "./assets";

export function TutorsSection() {
  const tutors = [
    {
      name: "John Doe",
      description: "Praktisi PBB dan Best Delegate di Harvard National MUN",
      bgColor: "primary-300",
      image: landingAssets.frame339,
    },
    {
      name: "Ayasha",
      description: "Praktisi PBB dan Best Delegate di Harvard National MUN",
      bgColor: "secondary-300",
      image: landingAssets.frame339,
    },
    {
      name: "Betty Bartholomew",
      description: "Praktisi PBB dan Best Delegate di Harvard National MUN",
      bgColor: "tertiary-pink-500",
      image: landingAssets.frame339,
    },
    {
      name: "Pinanazwie Ayesha",
      description: "Praktisi PBB dan Best Delegate di Harvard National MUN",
      bgColor: "tertiary-blue-300",
      image: landingAssets.frame339,
    },
    {
      name: "John Doe",
      description: "Praktisi PBB dan Best Delegate di Harvard National MUN",
      bgColor: "tertiary-yellow-300",
      image: landingAssets.frame339,
    },
  ];

  return (
    <section className="bg-background-cream py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-8">
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

          {/* Tutors Grid */}
          <div className="flex w-full flex-wrap justify-center gap-6">
            {tutors.map((tutor, index) => (
              <div
                key={index}
                className="h-[359px] w-full overflow-hidden rounded-lg shadow-sm sm:w-[284px]"
                style={{ backgroundColor: `var(--${tutor.bgColor})` }}
              >
                {/* Tutor Image */}
                <div className="relative h-[258px] overflow-hidden">
                  <img src={tutor.image} alt={tutor.name} className="h-full w-full object-cover" />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                </div>

                {/* Tutor Info */}
                <div className="h-[101px] bg-white p-3">
                  <h3 className="mb-1 font-black text-lg text-neutral-1000 leading-tight">
                    {tutor.name}
                  </h3>
                  <p className="text-neutral-1000 text-sm leading-tight">{tutor.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="h-auto rounded-lg border-primary-600 bg-primary-500 px-5 py-6 text-white shadow-sm hover:bg-primary-600"
          >
            <span className="font-normal text-base">Lihat Semua Tutor Unggul Kami</span>
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
