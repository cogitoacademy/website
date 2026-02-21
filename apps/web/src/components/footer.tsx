"use client";

import {
  EnvelopeSimpleIcon,
  InstagramLogoIcon,
  MapPinLineIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const SOCIALS = [
  {
    name: "Location",
    href: "https://maps.app.goo.gl/or7SSBb39RZQUC298",
    icon: <MapPinLineIcon className="size-6" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/cogitoacademy/",
    icon: <InstagramLogoIcon className="size-6" />,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/62881011990195",
    icon: <WhatsappLogoIcon className="size-6" />,
  },
  {
    name: "Email",
    href: "mailto:cogitoacademy.id@gmail.com",
    icon: <EnvelopeSimpleIcon className="size-6" />,
  },
];

export default function Footer() {
  const pathname = usePathname();
  const locale = useLocale();
  const isId = locale === "id";
  const isContactPage = pathname?.includes("/contact");

  return (
    <footer
      className={cn(
        "relative z-1 -mt-18",
        isContactPage ? "bg-background-primary" : "bg-primary-200",
      )}
    >
      {isContactPage ? (
        <div className="absolute top-0 left-0 z-1 h-40 lg:h-60 w-full -translate-y-full bg-background-primary [clip-path:polygon(0%_0%,0%_100%,100%_100%,100%_0%,100%_20%,50%_100%,0%_20%)]" />
      ) : (
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 lg:h-60 w-full -translate-y-full z-1"
        >
          <path d="M0,160 C240,0 1200,0 1440,160 L1440,160 L0,160 Z" className="fill-primary-200" />
        </svg>
      )}

      <section
        className={cn(
          "mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 pb-12 md:flex-row md:items-start md:pb-16",
          isContactPage ? "pt-30" : "pt-30",
        )}
      >
        <div className="flex flex-col items-center md:items-start w-full">
          <Image
            src="/cogito-academy-logo.webp"
            alt="Cogito Academy"
            width={424}
            height={200}
            className="w-full h-auto sm:h-30 sm:w-auto"
          />
        </div>

        <div className="flex flex-col items-end sm:items-center gap-y-5  text-right sm:text-center md:items-end md:text-right w-full">
          <p className="max-w-sm text-gray-700">
            {isId
              ? "Mengubah potensi menjadi prestasi dan kemampuan secara sistematis."
              : "Systematically transforming potential into achievements and abilities."}
          </p>
          <div className="flex gap-3">
            {SOCIALS.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
                <Button size="icon-xl" variant="cream" className="cursor-pointer">
                  {social.icon}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
}
