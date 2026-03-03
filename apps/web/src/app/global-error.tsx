"use client";

import { AlertCircle } from "lucide-react";
import { Inter, Lexend_Deca } from "next/font/google";

import "@/index.css";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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

export default function GlobalError({
  error: _error,
  reset,
}: GlobalErrorProps) {
  return (
    <html lang="id">
      <body className={`${lexendDeca.variable} ${inter.variable} antialiased`}>
        <Empty className="min-h-screen bg-tertiary-red-50 px-4 py-16">
          <EmptyHeader>
            <EmptyMedia
              variant="icon"
              className="size-16 bg-tertiary-red-100 text-tertiary-red-400 lg:size-20"
            >
              <AlertCircle className="size-8 lg:size-10" strokeWidth={1.5} />
            </EmptyMedia>

            <EmptyTitle className="font-[family-name:var(--font-lexend-deca)] font-medium text-2xl text-tertiary-red-400 md:text-3xl">
              Terjadi kesalahan
            </EmptyTitle>

            <EmptyDescription className="text-muted-foreground text-sm md:text-base">
              Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi dukungan
              jika masalah berlanjut.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent className="mt-2">
            <button
              onClick={reset}
              className={cn(buttonVariants({ size: "md", variant: "gray" }))}
            >
              Coba lagi
            </button>
          </EmptyContent>
        </Empty>
      </body>
    </html>
  );
}
