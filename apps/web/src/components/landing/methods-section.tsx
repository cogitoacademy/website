import { Award, BookOpen, Briefcase, Check, Globe } from "lucide-react";
import { landingAssets } from "./assets";

export function MethodsSection() {
  return (
    <section className="bg-background-cream py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <p className="font-bold text-[22px] text-neutral-1000">Di Balik Setiap Medali,</p>
            <h2 className="font-extrabold text-[32px] text-neutral-1000">
              Inilah <span className="text-primary-500">Metode Kami</span>
            </h2>
          </div>

          {/* Three Column Layout */}
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column - 2 Cards */}
            <div className="flex flex-col gap-6">
              {/* Card 1: Mentor Juara Dunia */}
              <div className="flex h-[200px] flex-col overflow-hidden rounded-lg bg-primary-100 shadow-sm">
                <div className="flex flex-1 flex-col gap-3 bg-background-cream p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded bg-secondary-100 p-2">
                      <Award className="size-6 text-secondary-500" />
                    </div>
                    <h3 className="font-bold text-[22px] text-neutral-1000 leading-tight">
                      Mentor Juara Dunia
                    </h3>
                  </div>
                  <p className="text-base text-neutral-1000">
                    Strategi rahasia dari mereka yang sudah berdiri di podium dunia
                  </p>
                </div>
                <div className="flex items-center gap-6 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[26px] text-secondary-500">98%</span>
                    <span className="text-neutral-1000 text-xs leading-tight">
                      Lolos ke
                      <br />
                      Babak Final
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[26px] text-secondary-500">150+</span>
                    <span className="text-neutral-1000 text-xs leading-tight">
                      Jam
                      <br />
                      Simulasi
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Personal dan Terukur */}
              <div className="relative flex h-[200px] flex-col overflow-hidden rounded-lg bg-primary-100 shadow-sm">
                <div className="relative z-10 flex flex-1 flex-col gap-3 bg-background-cream p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded bg-secondary-100 p-2">
                      <Briefcase className="size-6 text-secondary-500" />
                    </div>
                    <h3 className="font-bold text-[22px] text-neutral-1000 leading-tight">
                      Personal dan Terukur
                    </h3>
                  </div>
                  <p className="text-base text-neutral-1000">
                    Pantau progresmu lewat laporan detail dan personal di tiap sesi.
                  </p>
                </div>
                {/* Preview Cards */}
                <div className="absolute right-5 bottom-4 left-5 z-0 flex gap-3">
                  <div className="flex-1 rounded-lg bg-white p-2 text-neutral-1000 text-xs shadow-sm">
                    <p className="font-bold">Evaluasi Sesi 4: Debat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column - Image */}
            <div className="relative h-[416px] overflow-hidden rounded-lg lg:h-[424px]">
              <div className="absolute inset-0">
                <img
                  src={landingAssets.photoroom}
                  alt="Student Success"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Decorative circles */}
              <div className="absolute bottom-8 -left-16 h-[200px] w-[200px] rounded-full bg-tertiary-pink-500 opacity-30 blur-2xl" />
              <div className="absolute top-16 -right-8 h-[100px] w-[100px] rounded-full bg-tertiary-blue-400 opacity-30 blur-xl" />
            </div>

            {/* Right Column - 2 Cards */}
            <div className="flex flex-col gap-6">
              {/* Card 3: Kurikulum Holistik */}
              <div className="flex h-[200px] flex-col overflow-hidden rounded-lg bg-primary-100 shadow-sm">
                <div className="flex flex-1 flex-col gap-3 bg-background-cream p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded bg-secondary-100 p-2">
                      <BookOpen className="size-6 text-secondary-500" />
                    </div>
                    <h3 className="font-bold text-[22px] text-neutral-1000 leading-tight">
                      Kurikulum Holistik
                    </h3>
                  </div>
                  <p className="text-base text-neutral-1000">
                    Kurikulum yang terbukti meloloskan ratusan delegasi ke level global.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 px-5 py-4">
                  <span className="flex items-center gap-1 rounded bg-white px-2 py-1 text-neutral-1000 text-xs">
                    <Check className="size-3" /> Riset Strategis
                  </span>
                  <span className="flex items-center gap-1 rounded bg-white px-2 py-1 text-neutral-1000 text-xs">
                    <Check className="size-3" /> Analisis Isu Global
                  </span>
                  <span className="flex items-center gap-1 rounded bg-white px-2 py-1 text-neutral-1000 text-xs">
                    <Check className="size-3" /> Teknik Orasi Persuasif
                  </span>
                  <span className="flex items-center gap-1 rounded bg-white px-2 py-1 text-neutral-1000 text-xs">
                    <Check className="size-3" /> Logika dan Berpikir Kritis
                  </span>
                </div>
              </div>

              {/* Card 4: Belajar Fleksibel */}
              <div className="flex h-[200px] flex-col overflow-hidden rounded-lg bg-primary-100 shadow-sm">
                <div className="flex flex-1 flex-col gap-3 bg-background-cream p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded bg-secondary-100 p-2">
                      <Globe className="size-6 text-secondary-500" />
                    </div>
                    <h3 className="font-bold text-[22px] text-neutral-1000 leading-tight">
                      Belajar Fleksibel
                    </h3>
                  </div>
                  <p className="text-base text-neutral-1000">
                    Atur waktu belajarmu tanpa mengganggu aktivitas sekolah harian.
                  </p>
                </div>
                <div className="flex gap-3 px-5 py-4">
                  <div className="flex-1 rounded-lg bg-white px-3 py-3 text-center shadow-sm">
                    <span className="text-neutral-1000 text-xs">Kelas Online</span>
                  </div>
                  <div className="flex-1 rounded-lg bg-white px-3 py-3 text-center shadow-sm">
                    <span className="text-neutral-1000 text-xs">Kelas Tatap Muka</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
