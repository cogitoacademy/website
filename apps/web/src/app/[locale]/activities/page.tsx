import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ActivitiesContent from '@/components/activities/activities-content';
import NavbarResolver from '@/components/navbar-resolver';
import { getActivityClasses } from '@/lib/activities-api';
import { BASE_URL } from '@/lib/constants';
import { getOtherActivities } from '@/lib/other-activities';

type Props = { params: Promise<{ locale: string }> };

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'id' ? 'Acara' : 'Events',
    description:
      locale === 'id'
        ? 'Temukan kelas dan acara komunitas Cogito Academy.'
        : 'Explore classes and community events at Cogito Academy.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/activities`,
      languages: { en: `${BASE_URL}/en/activities`, id: `${BASE_URL}/id/activities` },
    },
  };
}

export default async function ActivitiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const id = locale === 'id';
  const [classes, events] = await Promise.allSettled([
    getActivityClasses(process.env.COGITO_APP_API_URL ?? ''),
    getOtherActivities(process.env.COGITO_APP_API_URL ?? '', locale),
  ]);
  if (classes.status === 'rejected')
    console.error('Activities classes unavailable', classes.reason);
  if (events.status === 'rejected') console.error('Activities content unavailable', events.reason);

  return (
    <>
      <NavbarResolver className="bg-background" />
      <div className="bg-background pb-60 text-neutral-1000 lg:pb-80">
        <div className="mx-auto max-w-7xl space-y-12 px-4 md:space-y-16">
          <header className="max-w-4xl">
            <h1 className="font-semibold text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {id ? 'Temukan ' : 'Find your next '}
              <span className="font-extrabold text-primary-500">
                {id ? 'pengalaman belajarmu.' : 'learning experience.'}
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-neutral-600 text-sm leading-relaxed md:text-base">
              {id
                ? 'Asah kemampuan kompetisimu, jelajahi ide baru, dan belajar bersama komunitas Cogito.'
                : 'Build your competition skills, explore new ideas, and learn alongside the Cogito community.'}
            </p>
          </header>
          <ActivitiesContent
            classes={classes.status === 'fulfilled' ? classes.value : []}
            events={events.status === 'fulfilled' ? events.value : []}
            classesFailed={classes.status === 'rejected'}
            eventsFailed={events.status === 'rejected'}
            locale={locale}
          />
        </div>
      </div>
    </>
  );
}
