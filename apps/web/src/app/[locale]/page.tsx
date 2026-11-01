import { setRequestLocale } from 'next-intl/server';
import { AchievementsSection } from '@/components/landing/achievements-section';
import { HeroSection } from '@/components/landing/hero-section';
import { MethodsSection } from '@/components/landing/methods-section';
// import { PartnersCarousel } from "@/components/landing/partners-carousel";
import { SkillsSection } from '@/components/landing/skills-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { TutorsSection } from '@/components/landing/tutors-section';
import FaqSectionV2 from '@/components/landing/faq-v2-section';
import Cta from '../../components/landing/cta';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="w-full overflow-x-clip bg-background-cream">
      <HeroSection />
      {/*<PartnersCarousel />*/}
      <MethodsSection />
      <SkillsSection />
      <TutorsSection />
      <AchievementsSection />
      <TestimonialsSection />
      {/*<FaqSection />*/}
      <FaqSectionV2 />
      <Cta />
    </div>
  );
}
