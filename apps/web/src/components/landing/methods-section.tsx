import { Check, ListMagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { getLocale } from "next-intl/server";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export async function MethodsSection() {
  const locale = await getLocale();
  const isId = locale === "id";

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex flex-col items-center justify-center space-y-2">
        <Badge variant={"headline-primary"}>
          <ListMagnifyingGlassIcon />{" "}
          <span>{isId ? "Kenali Mengapa Kami" : "Discover Why Us"}</span>
        </Badge>
        <h2 className="mb-4 text-center font-bold text-xl leading-tight">
          {isId ? (
            <>
              Di Balik Setiap Medali,
              <br />
              <span className="text-2xl md:text-3xl">
                Inilah <span className="font-bold text-primary-500">Metode Kami</span>
              </span>
            </>
          ) : (
            <>
              Behind Every Medal,
              <br />
              <span className="text-2xl md:text-3xl">
                Here is Our <span className="font-bold text-primary-500">Method</span>
              </span>
            </>
          )}
        </h2>
        <div className="grid grid-cols-1 items-center justify-center gap-6 md:grid-cols-2 xl:grid-cols-4">
          <TutorJuaraDuniaCard isId={isId} />
          <PersonalTerukurCard isId={isId} />
          <KurikulumHolistikCard isId={isId} />
          <PembelajaranFleksibelCard isId={isId} />
        </div>
      </div>
    </section>
  );
}

function MethodCard({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-312/220 max-w-[400px] flex-col items-center overflow-hidden rounded-2xl px-6 pt-8 text-center md:aspect-[312/280] md:max-w-[293px]",
        className,
      )}
    >
      <h3 className="mb-2 font-bold text-lg text-neutral-900">{title}</h3>
      <p className="mb-4 text-neutral-800 text-sm leading-relaxed">{description}</p>
      <div className="relative mt-auto flex w-full flex-1 items-end justify-center">{children}</div>
    </div>
  );
}

function TutorJuaraDuniaCard({ isId }: { isId: boolean }) {
  return (
    <MethodCard
      title={isId ? "Tutor Juana Dunia" : "World Champion Tutors"}
      description={
        isId
          ? "Strategi rahasia dari mereka yang sudah berdiri di podium dunia."
          : "Secret strategies from those who have stood on the world podium."
      }
      className="bg-tertiary-red-200"
    >
      <div className="absolute -bottom-30 left-1/2 aspect-square w-[150%] -translate-x-1/2 translate-y-1/2 rounded-full bg-white/40 md:-bottom-12" />
      <div className="relative z-10 flex w-full items-end justify-center gap-x-8 px-2 pb-6">
        <div className="text-center">
          <p className="font-bold text-2xl text-primary-600">200+</p>
          <p className="font-medium text-[10px] text-neutral-800 leading-tight">
            {isId ? (
              <>
                Prestasi
                <br />
                National
              </>
            ) : (
              <>
                National
                <br />
                Achievements
              </>
            )}
          </p>
        </div>
        <div className="text-center">
          <p className="font-bold text-2xl text-primary-600">200+</p>
          <p className="font-medium text-[10px] text-neutral-800 leading-tight">
            {isId ? (
              <>
                Prestasi
                <br />
                International
              </>
            ) : (
              <>
                International
                <br />
                Achievements
              </>
            )}
          </p>
        </div>
      </div>
    </MethodCard>
  );
}

function PersonalTerukurCard({ isId }: { isId: boolean }) {
  return (
    <MethodCard
      title={isId ? "Personal dan Terukur" : "Personal and Measurable"}
      description={
        isId
          ? "Pantau progresmu lewat laporan detail dan personal di tiap sesi."
          : "Monitor your progress through detailed and personal reports in each session."
      }
      className="bg-tertiary-blue-200"
    >
      <div className="relative mt-4 h-28 w-full">
        <div className="absolute right-2 bottom-[-10px] h-24 w-32 rotate-6 rounded-lg border border-neutral-100 bg-white p-2 opacity-80 shadow-sm">
          <div className="flex h-full w-full flex-col gap-1 rounded bg-neutral-50 p-1">
            <div className="h-1.5 w-1/2 rounded-full bg-neutral-200" />
            <div className="h-1 w-full rounded-full bg-neutral-200" />
            <div className="h-1 w-full rounded-full bg-neutral-200" />
          </div>
        </div>

        <div className="absolute bottom-[-10px] left-4 z-10 flex h-24 w-36 -rotate-3 flex-col rounded-lg border border-neutral-100 bg-white p-3 shadow-md">
          <div className="mb-2 flex items-center gap-1">
            <span className="font-extrabold text-[10px] text-primary-500">cogito</span>
          </div>
          <p className="mb-1 font-bold text-[6px] text-neutral-800 uppercase">
            {isId ? "Laporan Hasil Belajar" : "Learning Progress Report"}
          </p>
          <div className="space-y-1">
            <div className="h-[2px] w-full rounded-full bg-neutral-200" />
            <div className="h-[2px] w-3/4 rounded-full bg-neutral-200" />
            <div className="h-[2px] w-1/2 rounded-full bg-neutral-200" />
          </div>
          <div className="mt-auto flex gap-1">
            <div className="h-4 w-4 rounded-sm bg-neutral-100" />
            <div className="h-4 w-4 rounded-sm bg-neutral-100" />
          </div>
        </div>
      </div>
    </MethodCard>
  );
}

function KurikulumHolistikCard({ isId }: { isId: boolean }) {
  const itemsId = ["Riset Strategis", "Teknik Orasi Persuasif", "Analisis Isu Global"];
  const itemsEn = ["Strategic Research", "Persuasive Oratory Techniques", "Global Issue Analysis"];

  return (
    <MethodCard
      title={isId ? "Kurikulum Holistik" : "Holistic Curriculum"}
      description={
        isId
          ? "Kurikulum kami dirancang khusus oleh tutor untuk mendapatkan hasil optimal."
          : "Our curriculum is specially designed by tutors to achieve optimal results."
      }
      className="bg-primary-200"
    >
      <div className="w-full translate-y-2 px-2">
        <div className="mx-auto w-full max-w-[90%] space-y-2 rounded-t-xl bg-white p-3 pb-6 shadow-sm">
          {(isId ? itemsId : itemsEn).map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded border border-neutral-100 bg-neutral-50 p-1.5"
            >
              <div className="flex-shrink-0 rounded-full bg-green-100 p-0.5 text-green-600">
                <Check size={10} weight="bold" />
              </div>
              <span className="truncate text-left font-medium text-[10px] text-neutral-700">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MethodCard>
  );
}

function PembelajaranFleksibelCard({ isId }: { isId: boolean }) {
  return (
    <MethodCard
      title={isId ? "Pembelajaran yang Fleksibel" : "Flexible Learning"}
      description={
        isId
          ? "Cogito dapat menyesuaikan jadwal belajarmu, baik secara tatap muka atau online."
          : "Cogito can adjust your learning schedule, whether face-to-face or online."
      }
      className="bg-secondary-200"
    >
      <div className="flex w-full translate-y-4 items-end justify-center gap-3 px-4">
        <div className="flex h-24 w-1/2 flex-col items-center justify-center gap-2 rounded-t-lg border-secondary-300 border-t-4 bg-white p-3 text-center shadow-sm">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary-100">
            <div className="h-2 w-2 rounded-full bg-secondary-500" />
          </div>
          <p className="font-bold text-[10px] text-neutral-800 leading-tight">
            {isId ? "Kelas Tatap Muka" : "Offline Classes"}
          </p>
        </div>
        <div className="relative z-10 flex h-28 w-1/2 flex-col items-center justify-center gap-2 rounded-t-lg border-secondary-500 border-t-4 bg-white p-3 text-center shadow-md">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary-100">
            <div className="h-2 w-2 animate-pulse rounded-full bg-secondary-500" />
          </div>
          <p className="font-bold text-[10px] text-neutral-800 leading-tight">
            {isId ? "Kelas Online" : "Online Classes"}
          </p>
        </div>
      </div>
    </MethodCard>
  );
}
