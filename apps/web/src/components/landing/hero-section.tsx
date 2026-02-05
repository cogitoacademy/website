import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landingAssets } from "./assets";
import { WordRotateHighlighter } from "../ui/word-rotate-highlighter";
import { Container } from "../ui/container";

export function HeroSection() {
  return (
    <Container className="py-50 flex-col items-center">
      <section className="flex flex-col items-center justify-center">
        {/* Headline */}
        <div className="*:text-center">
          <div className="font-bold text-4xl text-neutral-1000">
            Mulai Perjalananmu Menjadi
          </div>
          <div className="mb-4 flex items-baseline font-bold text-4xl text-neutral-1000 flex-wrap justify-center transition-normal">
            Pelajar yang<span className="w-2"> </span>
            <WordRotateHighlighter
              words={["Kompeten", "Tangguh", "Mendunia"]}
              className="italic"
              action="highlight"
              color="#f8eaa4"
              highlightDelay={500}
            />{" "}
          </div>
        </div>

        {/* Subtitle */}
        <p className="max-w-xl text-base text-neutral-1000 text-center">
          Menjadi ahli yang siap berprestasi, lebih dari sekadar kompetisi,
          bersama Cogito Academy melalui materi mendalam.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row my-6">
          <Button size="lg">
            <span>Jadwalkan Konsultasi Gratis</span>
            <MessageSquare className="size-4" />
          </Button>

          <Button variant="subtle" size="lg">
            <span>Lihat Program</span>
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </section>
      <section>
        <p>Cogito telah dipercaya oleh</p>
      </section>
    </Container>
  );
}
