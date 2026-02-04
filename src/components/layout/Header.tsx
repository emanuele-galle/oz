'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

// Pages with dark hero backgrounds need light header text
const DARK_HERO_PAGES = ['/', '/il-brand/storia', '/il-brand/processo', '/about'];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { openCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  const isDarkHero = DARK_HERO_PAGES.includes(pathname);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (brandRef.current && !brandRef.current.contains(e.target as Node)) {
        setIsBrandOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const mainLinks = [
    { href: '/', label: 'Home' },
    { href: '/fragranze', label: 'Fragranze' },
  ];

  const brandLinks = [
    { href: '/il-brand/storia', label: 'La Nostra Storia' },
    { href: '/il-brand/filosofia', label: 'Filosofia' },
    { href: '/il-brand/processo', label: 'Il Processo' },
    { href: '/about', label: 'Chi Siamo' },
  ];

  const isLinkActive = (href: string) => pathname === href;
  const isBrandActive = brandLinks.some((l) => pathname === l.href);

  // Text color logic
  const textClass = isScrolled || isMobileMenuOpen || !isDarkHero
    ? 'text-stone-700'
    : 'text-white/90';
  const hoverClass = isScrolled || isMobileMenuOpen || !isDarkHero
    ? 'hover:text-gold-600'
    : 'hover:text-gold-400';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled || isMobileMenuOpen
            ? 'bg-white/95 backdrop-blur-xl border-b border-stone-200/60 py-3'
            : isDarkHero
              ? 'bg-gradient-to-b from-black/50 to-transparent py-5'
              : 'bg-gradient-to-b from-[#FEFDFB]/90 to-transparent py-5'
        )}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group relative z-10">
              <img
                src="/uploads/images/logo.png"
                alt="OZ Extrait"
                className={cn(
                  "w-auto transition-all duration-500",
                  isScrolled ? "h-10 md:h-12" : "h-12 md:h-14 lg:h-16"
                )}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-inter text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 relative group py-2",
                    textClass, hoverClass,
                    isLinkActive(link.href) && 'text-gold-600'
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute -bottom-0.5 left-0 h-[1.5px] bg-gold-500 transition-all duration-300",
                    isLinkActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              ))}

              {/* Brand Dropdown */}
              <div ref={brandRef} className="relative">
                <button
                  onClick={() => setIsBrandOpen(!isBrandOpen)}
                  onMouseEnter={() => setIsBrandOpen(true)}
                  className={cn(
                    "font-inter text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 flex items-center gap-1.5 py-2 relative group",
                    textClass, hoverClass,
                    isBrandActive && 'text-gold-600'
                  )}
                >
                  Il Brand
                  <svg
                    className={cn("w-3 h-3 transition-transform duration-300", isBrandOpen && "rotate-180")}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className={cn(
                    "absolute -bottom-0.5 left-0 h-[1.5px] bg-gold-500 transition-all duration-300",
                    isBrandActive ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </button>

                <AnimatePresence>
                  {isBrandOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      onMouseLeave={() => setIsBrandOpen(false)}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white border border-stone-100 shadow-xl shadow-black/5 overflow-hidden"
                    >
                      <div className="py-2">
                        {brandLinks.map((link, i) => (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                          >
                            <Link
                              href={link.href}
                              className={cn(
                                "block px-5 py-2.5 font-inter text-sm transition-all duration-200",
                                isLinkActive(link.href)
                                  ? "text-gold-600 bg-gold-500/5"
                                  : "text-stone-600 hover:text-gold-600 hover:bg-[#FBF8F3]"
                              )}
                              onClick={() => setIsBrandOpen(false)}
                            >
                              {link.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/guida/scegliere-fragranza"
                className={cn(
                  "font-inter text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 relative group py-2",
                  textClass, hoverClass,
                  isLinkActive('/guida/scegliere-fragranza') && 'text-gold-600'
                )}
              >
                Guida
                <span className={cn(
                  "absolute -bottom-0.5 left-0 h-[1.5px] bg-gold-500 transition-all duration-300",
                  isLinkActive('/guida/scegliere-fragranza') ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            </nav>

            {/* Right side — Cart + Mobile menu */}
            <div className="flex items-center gap-5">
              {/* Cart Icon */}
              <button
                onClick={openCart}
                className="group relative p-2"
                aria-label="Apri carrello"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn(
                    "h-5 w-5 transition-colors duration-300",
                    isScrolled || isMobileMenuOpen || !isDarkHero
                      ? "text-stone-600 group-hover:text-gold-600"
                      : "text-white/90 group-hover:text-gold-400"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {isMounted && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-gold-500 text-stone-950 rounded-full flex items-center justify-center text-[10px] font-bold leading-none"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden relative z-10 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={cn(
                      'w-full h-[1.5px] transition-all duration-300 origin-left',
                      isMobileMenuOpen
                        ? 'rotate-45 translate-y-[-1px] bg-stone-800'
                        : isDarkHero && !isScrolled ? 'bg-white/90' : 'bg-stone-700'
                    )}
                  />
                  <span
                    className={cn(
                      'w-full h-[1.5px] transition-all duration-300',
                      isMobileMenuOpen
                        ? 'opacity-0 scale-x-0'
                        : isDarkHero && !isScrolled ? 'bg-white/90' : 'bg-stone-700'
                    )}
                  />
                  <span
                    className={cn(
                      'w-full h-[1.5px] transition-all duration-300 origin-left',
                      isMobileMenuOpen
                        ? '-rotate-45 translate-y-[1px] bg-stone-800'
                        : isDarkHero && !isScrolled ? 'bg-white/90' : 'bg-stone-700'
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-[#FEFDFB]"
          >
            <nav className="flex flex-col items-center justify-center h-full px-8">
              <div className="space-y-1 text-center w-full max-w-xs">
                {/* Main links */}
                {mainLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block py-3 font-cinzel text-2xl tracking-wide transition-colors duration-300",
                        isLinkActive(link.href)
                          ? "text-gold-600"
                          : "text-stone-700 hover:text-gold-600"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Gold divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent my-4"
                />

                {/* Brand section label */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-inter text-[10px] uppercase tracking-[0.3em] text-gold-500/50 pt-2 pb-1"
                >
                  Il Brand
                </motion.p>

                {brandLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block py-2.5 font-inter text-base text-stone-500 hover:text-gold-600 transition-colors duration-300",
                        isLinkActive(link.href) && "text-gold-600"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Gold divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent my-4"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  <Link
                    href="/guida/scegliere-fragranza"
                    className={cn(
                      "block py-3 font-cinzel text-2xl tracking-wide transition-colors duration-300",
                      isLinkActive('/guida/scegliere-fragranza')
                        ? "text-gold-600"
                        : "text-stone-700 hover:text-gold-600"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Guida
                  </Link>
                </motion.div>
              </div>

              {/* Footer tagline in mobile menu */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute bottom-10 font-playfair text-sm italic text-stone-400"
              >
                Extrait de Parfum. Extrait d'Âme.
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
