import {
  EnvelopeSimpleIcon,
  InstagramLogoIcon,
  MapPinLineIcon,
} from "@phosphor-icons/react/dist/ssr";
import { setRequestLocale } from "next-intl/server";
import { ActionCard } from "@/components/contact/action-card";
import NavbarResolver from "@/components/navbar-resolver";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

type Locale = "id" | "en";

type ButtonItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

const BUTTON_CONTENT: Record<Locale, ButtonItem[]> = {
  id: [
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
  ],
  en: [
    {
      icon: <MapPinLineIcon className="size-5" />,
      label: "Cogito Campus Location",
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
  ],
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isId = locale === "id";

  return (
    <main className="relative z-1 flex flex-col">
      <NavbarResolver className="pt-40" />
      <div className="mx-auto mb-10 flex max-w-7xl flex-col items-center justify-center px-4 text-center lg:mb-12">
        <h1 className="font-semibold text-3xl sm:text-4xl lg:text-5xl">
          {isId ? (
            <>
              Berkolaborasi dengan <br className="hidden sm:block" />
              <span className="font-extrabold text-primary-500 italic">
                Cogito Academy
              </span>
            </>
          ) : (
            <>
              Collaborate with <br className="hidden sm:block" />
              <span className="font-extrabold text-primary-500 italic">
                Cogito Academy
              </span>
            </>
          )}
        </h1>
        <p className="mt-2 max-w-lg text-sm sm:text-base lg:mt-5">
          {isId
            ? "Bergabunglah dalam perjalanan kami mencetak generasi unggul yang beneran jago di bidangnya dan siap berprestasi."
            : "Join our journey in creating an outstanding generation who are truly skilled in their fields and ready to achieve."}
        </p>
      </div>
      <section className="mx-4 w-auto max-w-[calc(80rem-32px)] space-y-4 rounded-4xl bg-primary-100 p-6 sm:p-8 md:p-12 lg:space-y-7.5 lg:p-15 xl:mx-auto xl:w-full pb-60!">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ActionCard
            title={isId ? "Menjadi #TutorJuara" : "Become #ChampionTutor"}
            highlight={isId ? "#TutorJuara" : "#ChampionTutor"}
            description={
              isId
                ? "Bimbing talenta muda menjadi juara yang berwawasan luas."
                : "Guide young talents to become broadly-minded champions."
            }
            action={{
              label: "+62 812-3456-7890",
              href: "https://wa.me/6281234567890",
            }}
            image={{
              src: "/contact-1.webp",
              alt: isId ? "Tutor Juana" : "Champion Tutor",
            }}
            theme="pink"
          />
          <ActionCard
            title={isId ? "Konsultasi Sekarang" : "Consult Now"}
            description={
              isId
                ? "Diskusikan rencana prestasimu secara gratis dan privat."
                : "Discuss your achievement plans for free and privately."
            }
            action={{
              label: "+62 812-3456-7890",
              href: "https://wa.me/6281234567890",
            }}
            image={{
              src: "/contact-2.webp",
              alt: isId ? "Konsultasi" : "Consultation",
            }}
            theme="blue"
          />
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-4 flex-row flex-wrap lg:gap-6">
          {BUTTON_CONTENT[locale as Locale].map((button, index) => (
            <a key={index} href={button.href as string} className="w-auto">
              <Button
                className="cursor-pointer font-normal text-base w-auto"
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
