import { CtaSection } from "@/components/landing/cta-section";
import { EventsSection } from "@/components/landing/events-section";
import { FaqSection } from "@/components/landing/faq-section";
import { HeroSection } from "@/components/landing/hero-section";
import { MethodsSection } from "@/components/landing/methods-section";
import { PartnersCarousel } from "@/components/landing/partners-carousel";
import { ProgramsSection } from "@/components/landing/programs-section";
import { SkillsSection } from "@/components/landing/skills-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { TutorsSection } from "@/components/landing/tutors-section";

export default function HomePage() {
  return (
    <div className="w-full overflow-x-clip">
      <HeroSection />
      <PartnersCarousel />
      <EventsSection />
      <MethodsSection />
      <SkillsSection />
      <TutorsSection />
      <TestimonialsSection />
      <ProgramsSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
