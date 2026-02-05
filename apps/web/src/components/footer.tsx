import { InstagramLogoIcon, XLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Button } from "./ui/button";
import { Container } from "./ui/container";

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
    href: "#",
    icon: (
      <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
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

      <Container className="flex flex-col justify-between pt-72 pb-12 md:pb-16 md:flex-row items-center md:items-start gap-8">
        {/* Left side - Logo */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/cogito-academy-logo.webp"
            alt="Cogito Academy"
            width={200}
            height={100}
            className="h-24 w-auto"
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
                  size="icon"
                  variant="cream"
                  className="cursor-pointer bg-white hover:bg-gray-100 text-gray-700 rounded-lg h-12 w-12"
                >
                  {social.icon}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
