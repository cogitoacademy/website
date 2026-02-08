import { ActionCard } from "@/components/contact/action-card";
import NavbarResolver from "@/components/navbar-resolver";
import { Button } from "@/components/ui/button";
import {
  EnvelopeSimpleIcon,
  InstagramLogoIcon,
  MapPinLineIcon,
} from "@phosphor-icons/react/dist/ssr";

const BUTTON_CONTENT = [
  {
    icon: <MapPinLineIcon className="size-5" />,
    label: "Lokasi Cogito Campus",
    href: "https://goo.gl/maps/1234567890",
  },
  {
    icon: <EnvelopeSimpleIcon className="size-5" />,
    label: "cogitoacademy.id@gmail.com",
    href: "mailto:info@cogitoacademy.id",
  },
  {
    icon: <InstagramLogoIcon className="size-5" />,
    label: "cogitoacademy.id",
    href: "https://instagram.com/cogitoacademy.id",
  },
];

export default function ContactPage() {
  return (
    <main className="relative z-1 flex min-h-screen flex-col">
      <NavbarResolver className="pt-40" />
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center text-center flex-col mb-10 lg:mb-12">
        <h1 className="text-5xl font-semibold">
          Berkolaborasi dengan <br />
          <span className="text-primary-500 italic font-extrabold">Cogito Academy</span>
        </h1>
        <p className="max-w-lg mt-2 lg:mt-5">
          Bergabunglah dalam perjalanan kami mencetak generasi unggul yang
          beneran jago di bidangnya dan siap berprestasi.
        </p>
      </div>
      <section className="mx-auto min-h-[80svh] w-full max-w-[calc(80rem-32px)] bg-primary-100 p-15 rounded-4xl space-y-4 lg:space-y-7.5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ActionCard
            title="Menjadi #TutorJuara"
            highlight="#TutorJuara"
            description="Bimbing talenta muda menjadi juara yang berwawasan luas."
            action={{
              label: "+62 812-3456-7890",
              href: "https://wa.me/6281234567890",
            }}
            image={{
              src: "/placeholder.jpg",
              alt: "Tutor Juara",
            }}
            theme="pink"
          />
          <ActionCard
            title="Konsultasi Sekarang"
            description="Diskusikan rencana prestasimu secara gratis dan privat."
            action={{
              label: "+62 812-3456-7890",
              href: "https://wa.me/6281234567890",
            }}
            image={{
              src: "/placeholder.jpg",
              alt: "Konsultasi",
            }}
            theme="blue"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {BUTTON_CONTENT.map((button, index) => (
            <a key={index} href={button.href as string}>
              <Button
                className="cursor-pointer text-base font-normal"
                variant="primary"
                size="lg"
              >
                {button.icon}
                {button.label}
              </Button>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
