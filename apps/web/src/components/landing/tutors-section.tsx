import { BooksIcon } from '@phosphor-icons/react/dist/ssr';
import { ArrowRight } from 'lucide-react';
import { getLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { tryLoadPublicTutors } from '@/lib/tutor-api';
import { getFeaturedTutors } from '@/lib/tutors';
import { Badge } from '../ui/badge';
import { TutorsGrid } from './tutors-grid';

export async function TutorsSection() {
  const locale = await getLocale();
  const isId = locale === 'id';
  const result = await tryLoadPublicTutors(getFeaturedTutors);

  return (
    <section className="bg-background-primary py-16">
      <div
        id="tutors"
        className="invisible h-0 scroll-mt-24 md:scroll-mt-[6.5rem]"
        aria-hidden="true"
      />
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-8">
          <div className="space-y-2 text-center *:max-w-[335px] *:text-pretty">
            <Badge variant={'headline-cream'}>
              <BooksIcon className="size-5" /> <span>{isId ? 'Tim Tutor' : 'Team of Tutors'}</span>
            </Badge>
            <h2 className="mx-auto text-pretty font-bold text-2xl text-neutral-1000 lg:max-w-none lg:text-3xl">
              {isId ? (
                <>
                  Kuasai Strategi Pemenang bersama{' '}
                  <span className="text-primary-500">#TutorJuara</span>
                </>
              ) : (
                <>
                  Master the Game with <span className="text-primary-500">#ChampionTutors</span>
                </>
              )}
            </h2>
            <p className="mx-auto max-w-3xl font-medium text-neutral-1000 text-xs md:max-w-none md:text-sm xl:text-base">
              {isId
                ? 'Dapatkan bimbingan personal dari juara internasional untuk mengasah keunggulan kompetitifmu.'
                : 'Get personalized mentorship from world-class achievers to sharpen your competitive edge.'}
            </p>
          </div>

          {result.status === 'success' && result.items.length > 0 ? (
            <TutorsGrid tutors={result.items} />
          ) : (
            <p
              role={result.status === 'failure' ? 'alert' : 'status'}
              className="flex w-full max-w-3xl flex-col items-center gap-4 rounded-2xl border border-neutral-200 bg-white/60 px-6 py-10 text-center text-sm leading-relaxed text-neutral-600 md:py-12"
            >
              <BooksIcon aria-hidden="true" className="size-10 text-primary-500" />
              {isId
                ? 'Siap kenalan dengan #TutorJuara? Profil mereka segera hadir!'
                : 'Ready to meet our #ChampionTutors? Their profiles are coming soon!'}
            </p>
          )}

          <Link href="/tutors">
            <Button size="lg">
              <span className="text-sm">
                {isId ? 'Lihat Semua Tutor Unggul Kami' : 'View All Our Excellent Tutors'}
              </span>
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
