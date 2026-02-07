import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landingAssets } from "./assets";
import { WordRotateHighlighter } from "../ui/word-rotate-highlighter";
import { Container } from "../ui/container";
import { ChatsCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { LogoCloud } from "./logo-cloud";

const sampleLogos = [
  {
    id: "1",
    name: "Framer Motion",
    url: "https://cdn.worldvectorlogo.com/logos/framer-2.svg",
  },
  {
    id: "2",
    name: "Next.js",
    url: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
  },
  {
    id: "3",
    name: "TypeScript",
    url: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
  },
  {
    id: "4",
    name: "Tailwind CSS",
    url: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
  },
  {
    id: "5",
    name: "Framer Motion",
    url: "https://cdn.worldvectorlogo.com/logos/framer-2.svg",
  },
  {
    id: "6",
    name: "Node.js",
    url: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
  },
];

export function HeroSection() {
  return (
    <>
      <div className="absolute inset-0 z-0 w-full bottom-70 bg-neutral-100 [clip-path:polygon(0_0,100%_0,100%_70%,50%_100%,0%_70%)]" />
      <Container className="py-50 flex-col items-center relative z-1">
        <section className="flex flex-col items-center justify-center">
          <div className="bg-background-primary leading-none px-2.5 py-2 rounded-[12px]">
            Didukung oleh 200+ prestasi tutor di 9 bidang keilmuan
          </div>

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
              <span>Jadwalkan Konsultasi gratis</span>
              <ChatsCircleIcon
                weight="duotone"
                color="#ffffff"
                className="size-5"
              />
            </Button>

            <Button variant="subtle" size="lg">
              <span>Lihat Program</span>
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </div>
        </section>
        <section className="flex flex-col items-center">
          <p>Cogito telah dipercaya oleh</p>
          <LogoCloud logos={sampleLogos} interval={3000} displayCount={3} />
        </section>
      </Container>
    </>
  );
}
