import { Check, ListMagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export function MethodsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex flex-col items-center justify-center space-y-2">
        <Badge variant={"headline-primary"}>
          <ListMagnifyingGlassIcon /> <span>Kenapa Kita</span>
        </Badge>
        <h2 className="mb-4 text-center font-bold text-xl leading-tight">
          Di Balik Setiap Medali,
          <br />
          <span className="text-3xl">
            Inilah <span className="font-bold text-primary-500">Metode Kami</span>
          </span>
        </h2>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <TutorJuaraDuniaCard />
          <PersonalTerukurCard />
          <KurikulumHolistikCard />
          <PembelajaranFleksibelCard />
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
        "relative flex aspect-[312/340] flex-col items-center overflow-hidden rounded-2xl px-6 pt-8 text-center xl:aspect-[312/280]",
        className,
      )}
    >
      <h3 className="mb-2 font-bold text-lg text-neutral-900">{title}</h3>
      <p className="mb-4 text-neutral-800 text-sm leading-relaxed">{description}</p>
      <div className="relative mt-auto flex w-full flex-1 items-end justify-center">{children}</div>
    </div>
  );
}

function TutorJuaraDuniaCard() {
  return (
    <MethodCard
      title="Tutor Juara Dunia"
      description="Strategi rahasia dari mereka yang sudah berdiri di podium dunia."
      className="bg-tertiary-red-200"
    >
      <div className="absolute -bottom-[60%] left-1/2 aspect-square w-[150%] -translate-x-1/2 rounded-full bg-white/40" />
      <div className="relative z-10 flex w-full items-end justify-between px-2 pb-6">
        <div className="text-center">
          <p className="font-bold text-2xl text-primary-600">200+</p>
          <p className="font-medium text-[10px] text-neutral-800 leading-tight">
            Prestasi
            <br />
            National
          </p>
        </div>
        <div className="text-center">
          <p className="font-bold text-2xl text-primary-600">200+</p>
          <p className="font-medium text-[10px] text-neutral-800 leading-tight">
            Prestasi
            <br />
            International
          </p>
        </div>
      </div>
    </MethodCard>
  );
}

function PersonalTerukurCard() {
  return (
    <MethodCard
      title="Personal dan Terukur"
      description="Pantau progresmu lewat laporan detail dan personal di tiap sesi."
      className="bg-tertiary-blue-200"
    >
      {/* Decorative Cards Container */}
      <div className="relative mt-4 h-28 w-full">
        {/* Back Card */}
        <div className="absolute right-2 bottom-[-10px] h-24 w-32 rotate-6 rounded-lg border border-neutral-100 bg-white p-2 opacity-80 shadow-sm">
          <div className="flex h-full w-full flex-col gap-1 rounded bg-neutral-50 p-1">
            <div className="h-1.5 w-1/2 rounded-full bg-neutral-200" />
            <div className="h-1 w-full rounded-full bg-neutral-200" />
            <div className="h-1 w-full rounded-full bg-neutral-200" />
          </div>
        </div>

        {/* Front Card */}
        <div className="absolute bottom-[-10px] left-4 z-10 flex h-24 w-36 -rotate-3 flex-col rounded-lg border border-neutral-100 bg-white p-3 shadow-md">
          <div className="mb-2 flex items-center gap-1">
            <span className="font-extrabold text-[10px] text-primary-500">cogito</span>
          </div>
          <p className="mb-1 font-bold text-[6px] text-neutral-800 uppercase">
            Laporan Hasil Belajar
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

function KurikulumHolistikCard() {
  const items = ["Riset Strategis", "Teknik Orasi Persuasif", "Analisis Isu Global"];

  return (
    <MethodCard
      title="Kurikulum Holistik"
      description="Kurikulum kami dirancang khusus oleh tutor untuk mendapatkan hasil optimal."
      className="bg-primary-200"
    >
      <div className="w-full translate-y-2 px-2">
        <div className="mx-auto w-full max-w-[90%] space-y-2 rounded-t-xl bg-white p-3 pb-6 shadow-sm">
          {items.map((item, i) => (
            <div
              key={i}
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

function PembelajaranFleksibelCard() {
  return (
    <MethodCard
      title="Pembelajaran yang Fleksibel"
      description="Cogito dapat menyesuaikan jadwal belajarmu, baik secara tatap muka atau online."
      className="bg-secondary-200"
    >
      <div className="flex w-full translate-y-4 items-end justify-center gap-3 px-4">
        {/* Offline Card */}
        <div className="flex h-24 w-1/2 flex-col items-center justify-center gap-2 rounded-t-lg border-secondary-300 border-t-4 bg-white p-3 text-center shadow-sm">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary-100">
            <div className="h-2 w-2 rounded-full bg-secondary-500" />
          </div>
          <p className="font-bold text-[10px] text-neutral-800 leading-tight">Kelas Tatap Muka</p>
        </div>
        {/* Online Card */}
        <div className="relative z-10 flex h-28 w-1/2 flex-col items-center justify-center gap-2 rounded-t-lg border-secondary-500 border-t-4 bg-white p-3 text-center shadow-md">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary-100">
            <div className="h-2 w-2 animate-pulse rounded-full bg-secondary-500" />
          </div>
          <p className="font-bold text-[10px] text-neutral-800 leading-tight">Kelas Online</p>
        </div>
      </div>
    </MethodCard>
  );
}
