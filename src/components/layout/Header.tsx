'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products/cristallo', label: 'Cristallo' },
    { href: '/products/scintilla', label: 'Scintilla' },
    { href: '/products/potion-damour', label: "Potion d'Amour" },
    { href: '/about', label: 'Storia' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-black/95 backdrop-blur-xl border-b border-gold/20 py-3 shadow-2xl shadow-gold/5'
          : 'bg-gradient-to-b from-black/80 to-transparent py-6'
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
                isScrolled ? "h-14" : "h-16 md:h-20"
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-inter text-sm uppercase tracking-widest text-white/90 hover:text-gold transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Cart Icon */}
          <button
            onClick={openCart}
            className="hidden md:block group relative"
            aria-label="Open cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white/80 group-hover:text-gold transition-colors duration-300"
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
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-black rounded-full flex items-center justify-center text-xs font-bold">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={cn(
                  'w-full h-0.5 bg-gold transition-all duration-300',
                  isMobileMenuOpen && 'rotate-45 translate-y-2'
                )}
              />
              <span
                className={cn(
                  'w-full h-0.5 bg-gold transition-all duration-300',
                  isMobileMenuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'w-full h-0.5 bg-gold transition-all duration-300',
                  isMobileMenuOpen && '-rotate-45 -translate-y-2'
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-6 flex flex-col gap-4 border-t border-white/10 pt-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-inter text-sm uppercase tracking-wide text-white/80 hover:text-gold transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
