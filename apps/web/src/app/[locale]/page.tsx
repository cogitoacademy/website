import type { Metadata } from 'next';
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
import { BASE_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === 'id';
  const title = isId
    ? 'Cogito Academy — Talent Incubator & Pelatihan Kompetisi'
    : 'Cogito Academy — Talent Incubator & Competition Training';
  const description = isId
    ? 'Cogito Academy membentuk cendekiawan-juara kelas dunia melalui pelatihan kompetisi yang terukur untuk MUN, WSC, debat, dan olimpiade.'
    : 'Cogito Academy shapes world-class scholar-champions through measurable competition training for MUN, WSC, debate, and olympiads.';

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        id: `${BASE_URL}/id`,
        en: `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/id`,
      },
    },
  };
}

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
