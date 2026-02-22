"use client";

import Image from "next/image";
import { useState } from "react";
import { verifyPassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "@/i18n/routing";

export function PasswordGate() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const result = await verifyPassword(password);
      if (result.success) {
        router.refresh();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-primary px-4">
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-xl border bg-background-cream lg:rounded-3xl">
        <div className="flex h-full flex-col lg:flex-row">
          {/* Content Section */}
          <div className="relative z-10 h-full flex-1 justify-start p-5 sm:p-6 lg:p-8">
            <div className="text-left">
              <h1 className="font-bold text-2xl leading-none tracking-tight">
                Perdalam Ilmu melalui Latihan
              </h1>
              <p className="my-2 text-sm">
                Koleksi soal pilihan untuk asah pemahaman dan kesiapan kompetisimu.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={error ? "border-red-500" : ""}
                />
                {error && (
                  <p className="mt-2 text-red-500 text-sm">Incorrect password. Please try again.</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Access Resources"}
              </Button>
            </form>
          </div>

          {/* Image Section */}
          <div className="relative right-0 bottom-0 h-full min-h-[200px] w-full overflow-hidden sm:min-h-[250px] lg:min-h-[300px] lg:w-1/2">
            {/* Background Circle Decoration */}
            <div
              className={cn(
                "absolute -bottom-10 -left-10 z-0 size-48 rounded-full opacity-80 sm:size-64 lg:-bottom-20 lg:-left-20 lg:size-80",
                "bg-tertiary-blue-200",
              )}
            />

            {/* Main Image */}
            <div className="absolute right-0 bottom-0 z-10 h-full w-full">
              <Image
                src="/student-resources.webp"
                alt="Student Resources"
                width={287}
                height={399}
                className="absolute bottom-0 left-0 h-[120%] w-auto object-contain object-right-bottom"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
