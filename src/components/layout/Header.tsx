'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

// Pages with dark hero backgrounds need light header text
const DARK_HERO_PAGES = ['/', '/il-brand/storia', '/il-brand/processo'];

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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled || isMobileMenuOpen
          ? 'bg-white/95 backdrop-blur-xl border-b border-stone-200 py-3'
          : isDarkHero
            ? 'bg-gradient-to-b from-black/50 to-transparent py-5'
            : 'bg-gradient-to-b from-[#FEFDFB]/90 to-transparent py-5'
      )}
    >
      <div className="container-luxury">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative">
            <img
              src="/uploads/images/logo.png"
              alt="OZ Extrait"
              className={cn(
                "w-auto transition-all duration-500",
                isScrolled ? "h-12" : "h-14 md:h-16"
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-inter text-sm uppercase tracking-widest transition-colors duration-300 relative group",
                  isScrolled || isMobileMenuOpen || !isDarkHero ? "text-stone-700 hover:text-gold-600" : "text-white/90 hover:text-gold-400"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {/* Brand Dropdown */}
            <div ref={brandRef} className="relative">
              <button
                onClick={() => setIsBrandOpen(!isBrandOpen)}
                className={cn(
                  "font-inter text-sm uppercase tracking-widest transition-colors duration-300 flex items-center gap-1",
                  isScrolled || isMobileMenuOpen || !isDarkHero ? "text-stone-700 hover:text-gold-600" : "text-white/90 hover:text-gold-400"
                )}
              >
                Il Brand
                <svg
                  className={cn("w-3.5 h-3.5 transition-transform duration-200", isBrandOpen && "rotate-180")}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isBrandOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 bg-white border border-stone-200 shadow-lg">
                  {brandLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-5 py-3 font-inter text-sm text-stone-600 hover:text-gold-600 hover:bg-[#FBF8F3] transition-all duration-200"
                      onClick={() => setIsBrandOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/guida/scegliere-fragranza"
              className={cn(
                "font-inter text-sm uppercase tracking-widest transition-colors duration-300 relative group",
                isScrolled || isMobileMenuOpen || !isDarkHero ? "text-stone-700 hover:text-gold-600" : "text-white/90 hover:text-gold-400"
              )}
            >
              Guida
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>

          {/* Right side — Cart + Mobile menu */}
          <div className="flex items-center gap-4">
            {/* Cart Icon (both mobile and desktop) */}
            <button
              onClick={openCart}
              className="group relative"
              aria-label="Apri carrello"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "h-6 w-6 transition-colors duration-300",
                  isScrolled || isMobileMenuOpen || !isDarkHero ? "text-stone-600 group-hover:text-gold-600" : "text-white/90 group-hover:text-gold-400"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {isMounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold-500 text-stone-950 rounded-full flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={cn(
                    'w-full h-0.5 bg-gold-500 transition-all duration-300',
                    isMobileMenuOpen && 'rotate-45 translate-y-2'
                  )}
                />
                <span
                  className={cn(
                    'w-full h-0.5 bg-gold-500 transition-all duration-300',
                    isMobileMenuOpen && 'opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'w-full h-0.5 bg-gold-500 transition-all duration-300',
                    isMobileMenuOpen && '-rotate-45 -translate-y-2'
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu — AnimatePresence for smooth animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:hidden overflow-hidden"
            >
              <nav className="flex flex-col mt-6 pb-6 border-t border-stone-200 pt-6">
                {mainLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block py-3 font-inter text-sm uppercase tracking-wide text-stone-600 hover:text-gold-600 transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="h-px bg-stone-200 my-1" />
                <span className="py-2 font-inter text-xs uppercase tracking-wider text-gold-500/60">Il Brand</span>
                {brandLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (mainLinks.length + i) * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block py-3 font-inter text-sm uppercase tracking-wide text-stone-600 hover:text-gold-600 transition-colors duration-300 pl-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="h-px bg-stone-200 my-1" />
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (mainLinks.length + brandLinks.length) * 0.05 }}
                >
                  <Link
                    href="/guida/scegliere-fragranza"
                    className="block py-3 font-inter text-sm uppercase tracking-wide text-stone-600 hover:text-gold-600 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Guida
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
