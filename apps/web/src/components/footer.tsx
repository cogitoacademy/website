import { Container } from "./ui/container";
import Image from "next/image";
import { Button } from "./ui/button";
import { InstagramLogoIcon, XLogoIcon } from "@phosphor-icons/react/dist/ssr";

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
];

export default function Footer() {
  return (
    <footer className="bg-background-cream py-20">
      <Container className="bg-primary-100 rounded-2xl shadow-xl p-10 pb-9 max-w-312 flex flex-col md:flex-row justify-between item-center">
        <div className="flex items-center md:items-start gap-y-5 flex-col">
          <Image
            src="/cogito-academy-logo.webp"
            alt="Cogito Academy"
            width={424}
            height={200}
            className="h-21 w-auto -my-3"
          />
          <p className="max-w-2xs text-pretty">
            Mengubah potensi menjadi prestasi dan kemampuan secara sistematis.
          </p>
          <div className="space-x-3">
            {SOCIALS.map((social) => (
              <a key={social.name} href={social.href}>
                <Button size="icon-xl" variant={"cream"} className="cursor-pointer">
                  {social.icon}
                </Button>
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-x-10 *:text-pretty">
          <div>
            <h3 className="font-semibold md:text-lg mb-2">Navigasi Cepat</h3>
            <ul className="grid grid-cols-2 gap-2">
              <li>Beranda</li>
              <li>Kelas-Kelas Cogito</li>
              <li>Bidang Cogito</li>
              <li>Kalender Lomba</li>
              <li>#TutorJuara</li>
              <li>Hubungi Kami</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold md:text-lg mb-2">Temukan Kami di Cogito Campus</h3>
            <ul className="max-w-xs">
              <li>Dharmahusada Indah Selatan VII Blok D No. 162 A, Surabaya</li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
