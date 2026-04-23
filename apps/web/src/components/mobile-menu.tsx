'use client';

import {
  InstagramLogoIcon,
  MapPinLineIcon,
  WhatsappLogoIcon,
  XIcon,
} from '@phosphor-icons/react/dist/ssr';
import { AnimatePresence, m } from 'motion/react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import LanguageToggle from './lang-toggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS_ID = [
  { label: '#TutorJuara', href: '/tutors' },
  { label: 'Kalender Lomba', href: '/calendar' },
  { label: 'Bank Pengetahuan', href: '/student-resources' },
];

const NAV_ITEMS_EN = [
  { label: '#ChampionTutors', href: '/tutors' },
  { label: 'Competition Calendar', href: '/calendar' },
  { label: 'Knowledge Bank', href: '/student-resources' },
];

const KEGIATAN_ITEMS_ID = [
  { label: 'Townhall & 101 Series', href: '/events/townhall-and-101-series' },
  { label: 'Simulation Days', href: '/events/simulation-days' },
];

const KEGIATAN_ITEMS_EN = [
  { label: 'Townhall & 101 Series', href: '/events/townhall-and-101-series' },
  { label: 'Simulation Days', href: '/events/simulation-days' },
];

const QUICK_NAV_ITEMS_ID = [
  { label: 'Acara Publik', href: '#events' },
  { label: '#TutorJuara', href: '#tutors' },
  { label: 'Kenapa Kita?', href: '#methods' },
  { label: 'Testimoni', href: '#testimonials' },
  { label: 'Jenis Perlombaan', href: '#skills' },
  { label: 'FAQ', href: '#faq' },
];

const QUICK_NAV_ITEMS_EN = [
  { label: 'Public Events', href: '#events' },
  { label: 'Cogito Tutors', href: '#tutors' },
  { label: 'Why Us?', href: '#methods' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Types of Competitions', href: '#skills' },
  { label: 'FAQ', href: '#faq' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const locale = useLocale();
  const isId = locale === 'id';

  const navItems = isId ? NAV_ITEMS_ID : NAV_ITEMS_EN;
  const kegiatanItems = isId ? KEGIATAN_ITEMS_ID : KEGIATAN_ITEMS_EN;
  const quickNavItems = isId ? QUICK_NAV_ITEMS_ID : QUICK_NAV_ITEMS_EN;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      y: '-100%',
      transition: {
        duration: 0.4,
        ease: [0.32, 0.72, 0, 1] as const,
      },
    },
    open: {
      y: '0%',
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
        <m.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-50 flex h-dvh flex-col bg-background-cream"
        >
          <div className="bg-primary-500 px-4 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={onClose} className="flex items-center">
                <div className="flex h-[40px] items-center justify-center">
                  <Image
                    src="/cogito-academy-logo.webp"
                    alt="Cogito Academy"
                    width={120}
                    height={56}
                    priority
                    className="h-full w-auto object-contain brightness-0 invert"
                  />
                </div>
              </Link>

              <div className="flex items-center gap-2">
                <LanguageToggle variant="cream" className="h-9 px-3 text-primary-500" />
                <Button
                  size="icon-lg"
                  variant="cream"
                  onClick={onClose}
                  className="rounded-md text-primary-500 hover:bg-background-cream/90"
                >
                  <XIcon weight="bold" />
                </Button>
              </div>
            </div>
          </div>

          <m.div className="flex-1 overflow-y-auto p-4" variants={containerVariants}>
            <div className="flex h-full flex-col gap-4">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <m.div key={item.label} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="font-bold text-neutral-1000 text-sm min-[550px]:text-base"
                    >
                      {item.label}
                    </Link>
                  </m.div>
                ))}
              </div>

              <m.div variants={itemVariants}>
                <Accordion defaultValue={['kegiatan']} className="w-full">
                  <AccordionItem
                    value="kegiatan"
                    className="border-none bg-transparent shadow-none"
                  >
                    <AccordionTrigger className="bg-transparent p-0 font-bold text-neutral-1000 text-sm shadow-none hover:bg-transparent hover:no-underline hover:shadow-none focus-visible:ring-0 min-[550px]:text-base [&>svg]:ml-2 [&>svg]:size-5 [&>svg]:text-neutral-1000">
                      {isId ? 'Kegiatan' : 'Activities'}
                    </AccordionTrigger>
                    <AccordionContent className="pb-0 pl-5">
                      <div className="flex flex-col gap-3 pt-3">
                        {kegiatanItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={onClose}
                            className="text-sm min-[550px]:text-base"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </m.div>

              <m.div variants={itemVariants} className="mt-auto mb-0">
                <h3 className="mb-4 font-bold text-neutral-1000 text-sm min-[550px]:text-base">
                  {isId ? 'Navigasi Cepat' : 'Quick Navigation'}
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {quickNavItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="font-medium text-neutral-700 text-sm min-[550px]:text-base"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </m.div>
            </div>
          </m.div>

          <div className="bg-primary-500 p-4">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-medium text-sm text-white/90">Follow Us on</span>
                <div className="flex gap-4">
                  <Link
                    href="https://maps.app.goo.gl/or7SSBb39RZQUC298"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80"
                  >
                    <MapPinLineIcon className="size-6" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/cogitoacademy.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80"
                  >
                    <InstagramLogoIcon className="size-6" />
                  </Link>
                  <Link
                    href="https://wa.me/62881011990195"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80"
                  >
                    <WhatsappLogoIcon className="size-6" />
                  </Link>
                </div>
              </div>

              <Link href="/contact" onClick={onClose} className="w-full cursor-pointer">
                <Button variant="gray" size="md" className="w-full text-sm">
                  {isId ? 'Hubungi Kami' : 'Contact Us'}
                </Button>
              </Link>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
