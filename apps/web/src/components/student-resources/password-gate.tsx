"use client";

/* eslint-disable react-compiler/react-compiler -- try/finally required for loading state */
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { verifyPassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import NavbarResolver from "../navbar-resolver";

export function PasswordGate() {
  const t = useTranslations("studentResources.passwordGate");
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
    <div className="flex min-h-screen flex-col items-center justify-start bg-background-primary px-4">
      <NavbarResolver />
      <div className="relative z-30 mx-auto w-full max-w-7xl overflow-hidden rounded-xl border bg-background-cream lg:rounded-3xl">
        <div className="flex h-full flex-col lg:flex-row-reverse">
          {/* Content Section */}
          <div className="relative z-10 h-full flex-1 justify-start p-5 sm:p-6 lg:p-8">
            <div className="text-left">
              <h1 className="font-bold text-2xl leading-tight tracking-tight lg:text-5xl lg:leading-normal">
                {t("title")}
              </h1>
              <p className="my-2 text-sm lg:text-lg">{t("description")}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="sr-only" htmlFor="password">
                  {t("placeholder")}
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("placeholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn("h-10.5 text-base", error && "border-red-500")}
                />
                {error && <p className="mt-2 text-red-500 text-sm">{t("error")}</p>}
              </div>
              <Button type="submit" size="md" className="w-full" disabled={isLoading}>
                {isLoading ? t("verifying") : t("button")}
              </Button>
            </form>
          </div>

          {/* Image Section */}
          <div className="relative flex min-h-[200px] w-full items-end overflow-hidden sm:min-h-[350px] md:min-h-[400px] lg:min-h-[500px] lg:w-1/2">
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
