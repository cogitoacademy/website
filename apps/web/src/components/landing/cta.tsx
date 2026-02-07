// import { Container } from "../ui/container";
import { ChatsCircleIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="relative bg-primary-100 py-20 px-4">
      {/*<Container>*/}
      <div className="relative z-1 mx-auto h-[383px] max-w-7xl overflow-visible rounded-3xl bg-neutral-100 p-10">
        {/* Left Content */}
        <div className="flex h-full flex-col items-start justify-between">
          <div>
            <h2 className="font-bold text-3xl sm:text-4xl text-gray-900 leading-tight xl:text-5xl">
              Temukan Potensi <br />
              Terbesar Dalam Dirimu
            </h2>
            <p className="mt-2 max-w-md text-base text-gray-700">
              Sampaikan pertanyaanmu langsung kepada konsultan ahli kami melalui
              sesi diskusi gratis.
            </p>
          </div>
          <div className="h-full flex-1" />
          <Link href="/dsa" className="mt-auto mb-0 relative z-1">
            <Button size="lg">
              <span>Jadwalkan Konsultasi gratis</span>
              <ChatsCircleIcon
                weight="duotone"
                color="#ffffff"
                className="size-5"
              />
            </Button>
          </Link>
        </div>

        <div className="absolute right-0 bottom-0 h-[110%]">
          <Image
            src="/person-with-laptop.webp"
            alt="Student studying"
            width={925}
            height={443}
            quality={100}
            className="z-10 h-full w-auto rounded-br-3xl object-contain object-bottom"
          />
        </div>
      </div>
      {/*</Container>*/}
    </section>
  );
}
