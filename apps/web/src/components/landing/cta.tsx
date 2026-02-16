// import { Container } from "../ui/container";
import { ChatsCircleIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Button } from "../ui/button";

export default async function Cta() {
  const locale = await getLocale();
  const isId = locale === "id";

  return (
    <section className="relative bg-primary-100 px-4 py-20">
      {/*<Container>*/}
      <div className="relative z-2 mx-auto h-[383px] max-w-[calc(80rem-2rem)] overflow-visible rounded-3xl bg-neutral-100 p-10">
        <div className="flex h-full flex-col items-start sm:justify-between">
          <div>
            <h2 className="font-bold text-3xl text-gray-900 leading-tight sm:text-4xl xl:text-5xl">
              {isId ? (
                <>
                  Temukan Potensi <br />
                  Terbesar Dalam Dirimu
                </>
              ) : (
                <>
                  Discover Your Greatest <br />
                  Potential Within Yourself
                </>
              )}
            </h2>
            <p className="mt-2 md:max-w-md text-base text-gray-700 max-w-[380px]">
              {isId
                ? "Sampaikan pertanyaanmu langsung kepada konsultan ahli kami melalui sesi diskusi gratis."
                : "Ask your questions directly to our expert consultants through free discussion sessions."}
            </p>
          </div>
          <div className="hidden sm:flex-1 h-full" />
          <Link href="/contact" className="relative z-1 mt-2 sm:mt-auto sm:mb-0">
            <Button size="lg">
              <span>{isId ? "Jadwalkan Konsultasi gratis" : "Schedule Free Consultation"}</span>
              <ChatsCircleIcon weight="duotone" color="#ffffff" className="size-5" />
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 right-0 h-[110%]">
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
