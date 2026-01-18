"use client";

import { Globe } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import LanguageToggle from "./lang-toggle";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-background-cream">
      <div className="container mx-auto px-4 py-5 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex h-[50px] w-[106px] items-center justify-center rounded">
              <Image
                src="/cogito-academy-logo.webp"
                alt="Cogito Academy"
                width={424}
                height={200}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/tutors"
              className="font-medium text-lg text-neutral-1000 transition-colors hover:text-primary-500"
            >
              Tutor Cogito
            </Link>
            <Link
              href="/events"
              className="font-medium text-lg text-neutral-1000 transition-colors hover:text-primary-500"
            >
              Lomba-Lomba
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle Button */}
            <LanguageToggle />

            {/* Contact Button */}
            <Button

              size="lg"
            >
              <span>Hubungi Kami</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="mt-4 flex items-center justify-around gap-4 border-neutral-200 border-t pt-4 lg:hidden">
          <Link
            href="/tutors"
            className="font-medium text-neutral-1000 text-sm transition-colors hover:text-primary-500"
          >
            Tutor Cogito
          </Link>
          <Link
            href="/events"
            className="font-medium text-neutral-1000 text-sm transition-colors hover:text-primary-500"
          >
            Lomba-Lomba
          </Link>
        </nav>
      </div>
    </header>
  );
}
