import { getLocale } from 'next-intl/server';
import { KNOWLEDGE_BANK_URL } from '@/lib/constants';
import { getRecordsStoryData } from '@/lib/records-story';
import type { RecordsStoryLocale } from '@/types/records-story';
import { RecordsStory } from './records-story';

export async function RecordsSection() {
  const locale = await getLocale();
  const storyLocale: RecordsStoryLocale = locale === 'en' ? 'en' : 'id';
  const isId = storyLocale === 'id';
  const data = await getRecordsStoryData(storyLocale);

  return (
    <section
      id="records"
      className="relative scroll-mt-24 overflow-x-clip bg-background-cream py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-primary-100 via-primary-100/40 to-background-cream"
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto flex flex-col items-center gap-3 text-center">
          <h2 className="text-balance font-bold text-2xl text-neutral-1000 leading-tight tracking-[-0.03em] md:text-3xl lg:text-4xl">
            {isId ? (
              <>
                Satu aplikasi untuk{' '}
                <span className="text-primary-500">seluruh perjalanan juaramu.</span>
              </>
            ) : (
              <>
                One app for your <span className="text-primary-500">entire champion journey.</span>
              </>
            )}
          </h2>
          <p className="max-w-xl text-pretty font-medium text-neutral-800 text-sm leading-relaxed md:text-base">
            {isId
              ? 'Rekaman belajar, prestasi, materi, artikel, dan jadwal lomba tersusun rapi. Geser untuk melihat bagaimana Cogito App menemanimu dari latihan sampai podium.'
              : 'Learning records, achievements, materials, articles, and competition dates in one place. Scroll to see how Cogito App supports you from practice to the podium.'}
          </p>
        </div>

        <RecordsStory data={data} locale={storyLocale} knowledgeBankUrl={KNOWLEDGE_BANK_URL} />
      </div>
    </section>
  );
}
