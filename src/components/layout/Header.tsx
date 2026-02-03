'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);
  const { openCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

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
        isScrolled
          ? 'bg-black/95 backdrop-blur-xl border-b border-gold-500/15 py-3'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
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
                "w-auto transition-all duration-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]",
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
                className="font-inter text-sm uppercase tracking-widest text-white/80 hover:text-gold-500 transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {/* Brand Dropdown */}
            <div ref={brandRef} className="relative">
              <button
                onClick={() => setIsBrandOpen(!isBrandOpen)}
                className="font-inter text-sm uppercase tracking-widest text-white/80 hover:text-gold-500 transition-colors duration-300 flex items-center gap-1"
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 bg-stone-950 border border-gold-500/20 shadow-2xl">
                  {brandLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-5 py-3 font-inter text-sm text-white/70 hover:text-gold-400 hover:bg-white/5 transition-all duration-200"
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
              className="font-inter text-sm uppercase tracking-widest text-white/80 hover:text-gold-500 transition-colors duration-300 relative group"
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
                className="h-6 w-6 text-white/70 group-hover:text-gold-500 transition-colors duration-300"
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

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-96 mt-6 pb-6 border-t border-white/10 pt-6' : 'max-h-0'
          )}
        >
          <nav className="flex flex-col gap-4">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-inter text-sm uppercase tracking-wide text-white/70 hover:text-gold-500 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-1" />
            <span className="font-inter text-xs uppercase tracking-wider text-gold-500/60">Il Brand</span>
            {brandLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-inter text-sm uppercase tracking-wide text-white/70 hover:text-gold-500 transition-colors duration-300 pl-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-1" />
            <Link
              href="/guida/scegliere-fragranza"
              className="font-inter text-sm uppercase tracking-wide text-white/70 hover:text-gold-500 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Guida
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
