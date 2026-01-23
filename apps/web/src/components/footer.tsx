import Link from "next/link";
import { Container } from "./ui/container";
import Image from "next/image";
import { Button } from "./ui/button";
import { InstagramLogoIcon, XLogoIcon } from "@phosphor-icons/react/dist/ssr";

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/cogitoacademy/",
    icon: <InstagramLogoIcon />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/cogitoacademy",
    icon: <XLogoIcon />,
  },
];

export default function Footer() {
  return (
    <footer className="bg-background-cream py-20">
      <Container className="bg-primary-100 rounded-2xl shadow-xl p-10 pb-9">
        <div>
          <Image
            src="/cogito-academy-logo.webp"
            alt="Cogito Academy"
            width={424}
            height={200}
            className="h-21 w-auto"
          />
          <p>Mengubah potensi menjadi prestasi dan kemampuan secara sistematis.</p>
          <div>
            {SOCIALS.map((social) => (
              <a key={social.name} href={social.href}>
                <Button size="icon">
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
