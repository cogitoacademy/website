import {
  InstagramLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Button } from "./ui/button";

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/cogitoacademy/",
    icon: <InstagramLogoIcon className="size-6" />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/cogitoacademy",
    icon: <XLogoIcon className="size-6" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/cogitoacademy/",
    icon: <LinkedinLogoIcon className="size-6" />,
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary-200 relative -mt-56">
      {/* Curved top section */}
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-60 -translate-y-full"
      >
        <path
          d="M0,160 C240,0 1200,0 1440,160 L1440,160 L0,160 Z"
          className="fill-primary-200"
        />
      </svg>

      <section className="flex max-w-7xl mx-auto flex-col justify-between pt-72 pb-12 md:pb-16 md:flex-row items-center md:items-start gap-8">
        {/* Left side - Logo */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/cogito-academy-logo.webp"
            alt="Cogito Academy"
            width={424}
            height={200}
            className="h-30 w-auto"
          />
        </div>

        {/* Right side - Text and Social Icons */}
        <div className="flex flex-col gap-y-5 items-center md:items-end text-center md:text-right">
          <p className="max-w-sm text-gray-700">
            Mengubah potensi menjadi prestasi dan kemampuan secara sistematis.
          </p>
          <div className="flex gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="icon-xl"
                  variant="cream"
                  className="cursor-pointer"
                >
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
