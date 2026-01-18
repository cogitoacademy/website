import Image from "next/image";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-background-primary py-16">
      {/* Background Text */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 text-center">
        <Image
          src="/cogito-academy-logo.webp"
          alt="Cogito Academy"
          width={424}
          height={200}
          className="right-0 bottom-0 left-0 mx-auto h-auto w-96 object-contain"
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-primary-100 p-12 shadow-lg lg:p-16">
            {/* Background gradient decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-100 to-primary-200 opacity-50" />

            <div className="relative z-10 max-w-3xl">
              <div className="space-y-4">
                <h2 className="font-bold text-[32px] text-neutral-1000">Wujudkan Prestasi Nyata</h2>
                <h2 className="font-bold text-[32px] text-neutral-1000">
                  di Tingkat <span className="text-primary-500">Internasional</span>
                </h2>
                <p className="max-w-xl text-base text-neutral-1000 leading-relaxed">
                  Jangan hanya berpartisipasi, jadilah juara. Dapatkan pendampingan strategis dari
                  tutor Cogito Academy untuk menaklukkan setiap arena kompetisi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
