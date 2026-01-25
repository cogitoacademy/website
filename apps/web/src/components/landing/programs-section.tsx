import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landingAssets } from "./assets";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

export function ProgramsSection() {
  const programs = [
    {
      title: "Kelas Reguler",
      description: "Kuasai kompetisi dari dasar hingga podium dunia dengan kurikulum holistik.",
      image: "landingAssets.student2",
    },
    {
      title: "Kelas Intensif",
      description: "Persiapan kilat menuju satu ajang juara dengan strategi taktis yang teruji.",
      image: landingAssets.student2,
    },
    {
      title: "Kelas Ekstrakurikuler",
      description: "Bentuk ekosistem juara di sekolahmu dengan program rutin yang fleksibel.",
      image: landingAssets.student2,
    },
  ];

  return (
    <section className="bg-background-cream py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h2 className="font-extrabold text-[32px] text-neutral-1000">
              Tentukan Langkah <span className="text-primary-500">Juaramu</span>
            </h2>
            <p className="mx-auto max-w-3xl font-medium text-lg text-neutral-1000">
              Dari bimbingan individu hingga sekolah, tentukan jalur prestasimu menuju podium.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <div key={index} className="overflow-hidden rounded-2xl shadow-lg bg-secondary-300">
                {/* Program Image */}
                <div className="relative h-[280px] overflow-hidden">
                  {/*<img
                    src={program.image}
                    alt={program.title}
                    className="h-full w-full object-cover"
                  />*/}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
                </div>

                {/* Program Info */}
                <div className="flex flex-col justify-between bg-white rounded-[14px] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-xl md:text-2xl text-neutral-1000 leading-tight">
                          {program.title}
                        </h3>
                        <Button variant={"gray"} size={"icon-lg"}>
                          <ArrowRightIcon weight="bold" />
                        </Button>
                      </div>
                      <p className="text-sm md:text-base text-neutral-1000 leading-tight">
                        {program.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button size="lg">
            <span className="font-normal text-base">Jadwalkan Konsultasi Sekarang</span>
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
