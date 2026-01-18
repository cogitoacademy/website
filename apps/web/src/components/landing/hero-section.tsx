import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landingAssets } from "./assets";
import { WordRotateHighlighter } from "../ui/word-rotate-highlighter";
import { Container } from "../ui/container";

export function HeroSection() {
  return (
    <Container asChild className="pb-0 pt-64">
      <section className="relative overflow-hidden">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left Content */}
          <div className="z-10 flex-1 space-y-8">
            {/* Headline */}
            <div >
              <div className="font-bold text-4xl text-neutral-1000">Wujudkan Prestasi Nyata</div>
              <div className="mb-4 flex items-baseline font-bold text-4xl text-neutral-1000 flex-wrap">
                di Tingkat<span className="w-2"> </span>
                <WordRotateHighlighter
                  words={["Internasional", "Regional", "Nasional"]}
                  className="italic"
                  action="highlight"
                  color="#f8eaa4"
                  highlightDelay={500}
                />{" "}
              </div>
            </div>

            {/* Subtitle */}
            <p className="max-w-xl text-base text-neutral-1000">
              Jangan hanya berpartisipasi, jadilah juara. Dapatkan pendampingan strategis dari tutor
              Cogito Academy untuk menaklukkan setiap arena kompetisi.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
              >
                <span >Jadwalkan Konsultasi Gratis</span>
                <MessageSquare className="size-4" />
              </Button>

              <Button
                variant="subtle"
                size="lg"
              >
                <span>Lihat Program</span>
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </div>

            {/* Stats Card */}
            <div className="inline-flex flex-wrap gap-6 rounded-lg bg-tertiary-pink-100 p-5 shadow-sm">
              <div className="flex flex-col">
                <span className="font-bold text-[26px] text-secondary-500 leading-tight">9</span>
                <span className="mt-2 text-neutral-1000 text-sm leading-tight">Bidang Lomba</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[26px] text-secondary-500 leading-tight">50+</span>
                <span className="mt-2 text-neutral-1000 text-sm leading-tight">Medali Diraih</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[26px] text-secondary-500 leading-tight">200+</span>
                <span className="mt-2 text-neutral-1000 text-sm leading-tight">
                  Prestasi Mentor
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[26px] text-secondary-500 leading-tight">250+</span>
                <span className="mt-2 text-neutral-1000 text-sm leading-tight">Siswa Berhasil</span>
              </div>
            </div>
          </div>

          {/* Right Content - Images */}
          <div className="relative h-[400px] w-full flex-1 lg:h-[600px]">
            {/* Purple Ellipse Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[500px] w-[500px] rounded-full bg-secondary-300 opacity-50" />
            </div>

            {/* Student Images */}
            <div className="relative flex h-full items-center justify-center">
              <img
                src={landingAssets.student2}
                alt="Student"
                className="relative z-10 h-[80%] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
