"use client";

import { Instagram, Linkedin, MapPin, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import LanguageToggle from "./lang-toggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: "#TutorJuara", href: "/tutors" },
  { label: "Kalender Lomba", href: "/calendar" },
  { label: "Playground", href: "/playground" },
];

const KEGIATAN_ITEMS = [
  { label: "Monthly Townhall", href: "/events/monthly-townhall" },
  { label: "Cogito 101 Series", href: "/events/cogito-101-series" },
];

const QUICK_NAV_ITEMS = [
  { label: "Acara Publik", href: "#" },
  { label: "Tutor Cogito", href: "/tutors" },
  { label: "Kenapa Kita", href: "#" },
  { label: "Testimoni", href: "#" },
  { label: "Jenis Perlombaan", href: "#" },
  { label: "Frequently Asked Question", href: "#" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      y: "-100%",
      transition: {
        duration: 0.4,
        ease: [0.32, 0.72, 0, 1] as const,
      },
    },
    open: {
      y: "0%",
      transition: {
        duration: 0.5,
        ease: [0.32, 0.72, 0, 1] as const,
      },
    },
  };

  const containerVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-50 flex h-dvh flex-col bg-background-cream"
        >
          {/* Header - Orange */}
          <div className="bg-primary-500 px-4 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={onClose} className="flex items-center">
                <div className="flex h-[40px] items-center justify-center">
                  <Image
                    src="/cogito-academy-logo.webp"
                    alt="Cogito Academy"
                    width={120}
                    height={56}
                    className="h-full w-auto object-contain brightness-0 invert"
                  />
                </div>
              </Link>

              <div className="flex items-center gap-2">
                <LanguageToggle variant="cream" className="h-10 px-3 text-primary-500" />
                <Button
                  size="icon-xl"
                  variant="cream"
                  onClick={onClose}
                  className="rounded-md text-primary-500 hover:bg-background-cream/90"
                >
                  <X className="size-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Body - Cream (Scrollable) */}
          <motion.div className="flex-1 overflow-y-auto px-6 py-8" variants={containerVariants}>
            <div className="flex flex-col gap-4">
              {/* Primary Links */}
              <div className="flex flex-col gap-4">
                {NAV_ITEMS.map((item) => (
                  <motion.div key={item.label} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="font-bold text-neutral-1000"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Activities Accordion */}
              <motion.div variants={itemVariants}>
                <Accordion className="w-full">
                  <AccordionItem
                    value="kegiatan"
                    className="border-none bg-transparent shadow-none"
                  >
                    <AccordionTrigger className="bg-transparent p-0 font-bold text-base text-neutral-1000 shadow-none hover:bg-transparent hover:no-underline hover:shadow-none focus-visible:ring-0 [&>svg]:ml-2 [&>svg]:size-5 [&>svg]:text-neutral-1000">
                      Kegiatan
                    </AccordionTrigger>
                    <AccordionContent className="pb-0 pl-10">
                      <div className="flex flex-col gap-3 pt-3">
                        {KEGIATAN_ITEMS.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={onClose}
                            className="font-medium"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>

              {/* Quick Nav */}
              <motion.div variants={itemVariants} className="mt-4">
                <h3 className="mb-4 font-bold text-base text-neutral-1000">Navigasi Cepat</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {QUICK_NAV_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="font-medium text-neutral-700 text-sm"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer - Orange */}
          <div className="bg-primary-500 px-6 py-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-medium text-sm text-white/90">Follow Us on</span>
                <div className="flex gap-4">
                  <Link href="#" className="text-white hover:text-white/80">
                    <MapPin className="size-6" />
                  </Link>
                  <Link href="#" className="text-white hover:text-white/80">
                    <Instagram className="size-6" />
                  </Link>
                  <Link href="#" className="text-white hover:text-white/80">
                    <Linkedin className="size-6" />
                  </Link>
                </div>
              </div>

              <Link href="/contact" onClick={onClose} className="w-full">
                <Button variant="gray" size="lg" className="w-full text-base">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
