"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import LanguageToggle from "./lang-toggle";
import { Button } from "./ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-300 ${isScrolled ? "bg-background-cream" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            {/*<div
              className={`flex h-[50px] w-[106px] items-center justify-center rounded transition-all duration-300 ${isScrolled ? "" : "bg-background-cream/90 backdrop-blur-sm"
                }`}
            >
              <Image
                src="/cogito-academy-logo.webp"
                alt="Cogito Academy"
                width={424}
                height={200}
              />
            </div>*/}
            <Button size="lg" variant="subtle" className="w-[106px] px-2 py-1">
              <Image
                src="/cogito-academy-logo.webp"
                alt="Cogito Academy"
                width={424}
                height={200}
              />
            </Button>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
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

          <div className="hidden items-center gap-3 md:flex">
            <LanguageToggle />
            <Button size="lg">
              <span>Hubungi Kami</span>
            </Button>
          </div>

          <div className="relative md:hidden">
            <Button
              size="icon-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </motion.div>
            </Button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full right-0 left-auto mt-2 w-auto overflow-hidden rounded-lg bg-background-cream shadow-lg"
                >
                  <nav className="flex flex-col p-4">
                    <Link
                      href="/tutors"
                      className="rounded-md px-4 py-3 font-medium text-neutral-1000 transition-colors hover:bg-primary-50 hover:text-primary-500"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Tutor Cogito
                    </Link>
                    <Link
                      href="/events"
                      className="rounded-md px-4 py-3 font-medium text-neutral-1000 transition-colors hover:bg-primary-50 hover:text-primary-500"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Lomba-Lomba
                    </Link>
                    <div className="w-fit">
                      <LanguageToggle />
                    </div>
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>Hubungi Kami</span>
                    </Button>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header >
  );
}
