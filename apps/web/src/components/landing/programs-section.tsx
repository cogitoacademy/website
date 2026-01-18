import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landingAssets } from "./assets";

export function ProgramsSection() {
  const programs = [
    {
      title: "Kelas Reguler",
      description: "Kuasai kompetisi dari dasar hingga podium dunia dengan kurikulum holistik.",
      bgColor: "secondary-300",
      image: landingAssets.student2,
    },
    {
      title: "Kelas Intensif",
      description: "Persiapan kilat menuju satu ajang juara dengan strategi taktis yang teruji.",
      bgColor: "secondary-300",
      image: landingAssets.student2,
    },
    {
      title: "Kelas Ekstrakurikuler",
      description: "Bentuk ekosistem juara di sekolahmu dengan program rutin yang fleksibel.",
      bgColor: "secondary-300",
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
              <div
                key={index}
                className="h-[420px] overflow-hidden rounded-2xl shadow-lg"
                style={{ backgroundColor: `var(--${program.bgColor})` }}
              >
                {/* Program Image */}
                <div className="relative h-[280px] overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
                </div>

                {/* Program Info */}
                <div className="flex h-[140px] flex-col justify-between bg-white p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="mb-2 font-black text-[22px] text-neutral-1000 leading-tight">
                        {program.title}
                      </h3>
                      <p className="text-base text-neutral-1000 leading-tight">
                        {program.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-200 transition-colors hover:bg-neutral-300"
                    >
                      <ArrowRight className="size-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="mt-4 h-auto rounded-lg border-primary-600 bg-primary-500 px-5 py-6 text-white shadow-sm hover:bg-primary-600"
          >
            <span className="font-normal text-base">Jadwalkan Konsultasi Sekarang</span>
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
