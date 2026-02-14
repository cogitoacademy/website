"use client";

import { Inter, Lexend_Deca } from "next/font/google";

import "@/index.css";

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error: _error, reset }: GlobalErrorProps) {
  return (
    <html lang="id">
      <body className={`${lexendDeca.variable} ${inter.variable} antialiased`}>
        <div className="flex min-h-screen flex-col items-center justify-center bg-tertiary-red-100 px-4 py-16">
          <div className="max-w-lg text-center">
            <h1 className="mb-4 font-medium text-4xl text-white md:text-5xl">Terjadi kesalahan.</h1>

            <p className="mb-8 text-base text-white/90 leading-relaxed md:text-lg">
              Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi dukungan jika masalah
              berlanjut.
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-medium text-neutral-1000 transition-colors duration-200 hover:bg-white/90"
              >
                Coba lagi
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
