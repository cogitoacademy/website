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
              Para ahli dan praktisi global yang siap mendampingimu meraih
              standar juara dunia di setiap kompetisi.
            </p>
          </div>

          {/* Tutors Grid */}
          <div>dsadsa</div>

          {/* CTA Button */}
          <Button size="lg">
            <span className="font-normal text-base">
              Lihat Semua Tutor Unggul Kami
            </span>
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
