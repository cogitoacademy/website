"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import LanguageToggle from "./lang-toggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const NAV_ITEMS = [
  { label: "#TutorJuara", href: "/tutors" },
  { label: "Kalender Lomba", href: "/calendar" },
  { label: "Playground", href: "/playground" },
  {
    label: "Kegiatan",
    href: "#",
    items: [
      { label: "Monthly Townhall", href: "/monthly-town-hall" },
      { label: "Cogito 101 Series", href: "/cogito-101-series" },
    ],
  },
];

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
      className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-background-cream shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link href="/" className="flex items-center">
              <div
                className={`flex h-[50px] w-[106px] items-center justify-center rounded transition-all duration-300`}
              >
                <Image
                  src="/cogito-academy-logo.webp"
                  alt="Cogito Academy"
                  width={424}
                  height={200}
                />
              </div>
              {/*<Button size="lg" variant="subtle" className="w-[106px] px-2 py-1">
                <Image
                  src="/cogito-academy-logo.webp"
                  alt="Cogito Academy"
                  width={424}
                  height={200}
                />
              </Button>*/}
            </Link>

            <nav className="hidden items-start gap-8 md:flex">
              {NAV_ITEMS.map((item) =>
                item.items ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-lg text-neutral-1000 outline-none transition-colors hover:text-primary-500 data-[state=open]:text-primary-500">
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48 bg-background-cream">
                      {item.items.map((subItem) => (
                        <DropdownMenuItem
                          key={subItem.href}
                          render={
                            <Link
                              href={subItem.href}
                              className="w-full cursor-pointer font-medium text-base text-neutral-1000 hover:text-primary-500 focus:text-primary-500"
                            >
                              {subItem.label}
                            </Link>
                          }
                        />
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="font-medium text-lg text-neutral-1000 transition-colors hover:text-primary-500"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageToggle />
            <Link href="/contact">
              <Button size="lg">
                <span>Hubungi Kami</span>
              </Button>
            </Link>
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
                  className="absolute top-full right-0 left-auto mt-2 w-auto min-w-[200px] overflow-hidden rounded-lg bg-background-cream shadow-lg"
                >
                  <nav className="flex flex-col p-4">
                    {NAV_ITEMS.map((item) =>
                      item.items ? (
                        <div key={item.label} className="flex flex-col">
                          <div className="px-4 py-3 font-medium text-neutral-1000">
                            {item.label}
                          </div>
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="rounded-md py-2 pr-4 pl-8 font-medium text-neutral-1000 transition-colors hover:bg-primary-50 hover:text-primary-500"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="rounded-md px-4 py-3 font-medium text-neutral-1000 transition-colors hover:bg-primary-50 hover:text-primary-500"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ),
                    )}
                    <div className="w-fit pt-2">
                      <LanguageToggle />
                    </div>
                    <Button
                      size="lg"
                      className="mt-4 flex-1"
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
    </header>
  );
}
