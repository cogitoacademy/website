import Image from "next/image";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { ChatsCircleIcon } from "@phosphor-icons/react/dist/ssr";

export default function Cta() {
  return (
    <section className="relative bg-primary-100 py-20">
      <Container>
        <div className="relative z-1 overflow-visible rounded-3xl bg-neutral-100 p-10 h-[383px]">
          {/* Left Content */}
          <div className="flex flex-col justify-between items-start h-full">
            <div>
              <h2 className="font-bold text-3xl text-gray-900 md:text-5xl leading-snug">
                Temukan Potensi <br />
                Terbesar Dalam Dirimu
              </h2>
              <p className="text-base text-gray-700 mt-2 max-w-md">
                Sampaikan pertanyaanmu langsung kepada konsultan ahli kami
                melalui sesi diskusi gratis.
              </p>
            </div>
            <div className="flex-1 h-full" />
            <Button size="lg" className="mt-auto mb-0">
              <span>Jadwalkan Konsultasi gratis</span>
              <ChatsCircleIcon
                weight="duotone"
                color="#ffffff"
                className="size-5"
              />
            </Button>
          </div>

          <div className="absolute right-0 bottom-0 h-[110%]">
            <Image
              src="/person-with-laptop.webp"
              alt="Student studying"
              width={925}
              height={443}
              quality={100}
              className="z-10 h-full w-auto object-contain object-bottom rounded-br-3xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
