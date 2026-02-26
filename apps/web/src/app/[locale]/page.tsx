import { setRequestLocale } from "next-intl/server";
import { EventsSection } from "@/components/landing/events-section";
// import { FaqSection } from "@/components/landing/faq-section";
import { HeroSection } from "@/components/landing/hero-section";
import { MethodsSection } from "@/components/landing/methods-section";
// import { PartnersCarousel } from "@/components/landing/partners-carousel";
import { SkillsSection } from "@/components/landing/skills-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { TutorsSection } from "@/components/landing/tutors-section";
import Cta from "../../components/landing/cta";
import FaqSectionV2 from "../../components/landing/faq-v2";
import { Suspense } from "react";
import Loading from "./loading";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Suspense
      fallback={
        <div className="w-full overflow-x-clip bg-background-cream min-h-screen flex items-center justify-center">
          <Loading />
        </div>
      }
    >
      <div className="w-full overflow-x-clip bg-background-cream">
        <HeroSection />
        {/*<PartnersCarousel />*/}
        <EventsSection />
        <MethodsSection />
        <SkillsSection />
        <TutorsSection />
        <TestimonialsSection />
        {/*<FaqSection />*/}
        <FaqSectionV2 />
        <Cta />
      </div>
    </Suspense>
  );
}
