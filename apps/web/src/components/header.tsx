'use client';

import { ListIcon } from '@phosphor-icons/react/dist/ssr';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import LanguageToggle from './lang-toggle';
import MobileMenu from './mobile-menu';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const NAV_ITEMS_ID = [
  { label: '#TutorJuara', href: '/tutors' },
  { label: 'Kalender Lomba', href: '/calendar' },
  // { label: "Playground", href: "/playground" },
  {
    label: 'Kegiatan',
    items: [
      { label: 'Monthly Townhall', href: '/events/monthly-townhall' },
      { label: 'Cogito 101 Series', href: '/events/cogito-101-series' },
    ],
  },
  { label: 'Materi Siswa', href: '/student-resources' },
];

const NAV_ITEMS_EN = [
  { label: '#ChampionTutors', href: '/tutors' },
  { label: 'Competition Calendar', href: '/calendar' },
  // { label: "Playground", href: "/playground" },
  {
    label: 'Activities',
    items: [
      { label: 'Monthly Townhall', href: '/events/monthly-townhall' },
      { label: 'Cogito 101 Series', href: '/events/cogito-101-series' },
    ],
  },
  { label: 'Student Resources', href: '/student-resources' },
];

export default function Header() {
  const locale = useLocale();
  const isId = locale === 'id';
  const navItems = isId ? NAV_ITEMS_ID : NAV_ITEMS_EN;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-colors duration-300 ${
          isScrolled ? 'rounded-b-2xl bg-neutral-100 shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-10">
              <Link href="/" className="flex items-center">
                <div
                  className={
                    'flex h-10 w-fit items-center justify-center rounded transition-all duration-300 sm:h-12.5 sm:w-26.5'
                  }
                >
                  <Image
                    src="/cogito-academy-logo.png"
                    alt="Cogito Academy"
                    width={424}
                    height={200}
                    quality={100}
                    className="h-full w-auto object-contain"
                    priority
                    sizes="(max-width: 640px) 120px, 180px"
                  />
                </div>
              </Link>

              <nav className="hidden items-start gap-8 lg:flex">
                {navItems.map((item) =>
                  item.items ? (
                    <DropdownMenu key={item.label}>
                      <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-base text-neutral-1000 outline-none transition-colors hover:text-primary-500 data-[state=open]:text-primary-500">
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
                      className="font-medium text-base text-neutral-1000 transition-colors hover:text-primary-500"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <LanguageToggle />
              <Link href="/contact">
                <Button size="lg">
                  <span>{isId ? 'Hubungi Kami' : 'Contact Us'}</span>
                </Button>
              </Link>
            </div>

            <div className="relative lg:hidden">
              <Button
                size="icon-lg"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <ListIcon weight="bold" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
