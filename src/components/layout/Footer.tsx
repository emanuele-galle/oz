'use client';

/**
 * FOOTER — Luxury E-Commerce Design
 * Full-width dark bg, refined columns, payment icons, trust seals
 */

import React from 'react';
import Link from 'next/link';

function PaymentIcons() {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Visa */}
      <svg className="h-6 w-auto text-white/40" viewBox="0 0 48 32" fill="currentColor">
        <rect width="48" height="32" rx="4" fill="currentColor" opacity="0.15" />
        <path d="M19.5 21h-3l1.9-11.5h3L19.5 21zm-6-11.5l-2.8 7.9-.3-1.6-1-5.3s-.1-1-1.3-1H4.1l-.1.3s1.4.3 3 1.2l2.5 9.5h3.1l4.7-11h-3.8zm26.3 11.5h2.7l-2.4-11.5h-2.4c-.9 0-1.6.5-1.9 1.3L31 21h3.1l.6-1.7h3.8l.3 1.7zm-3.3-4l1.6-4.3.9 4.3h-2.5zM32 13l.4-2.5s-1.3-.5-2.6-.5c-1.4 0-4.8.6-4.8 3.6 0 2.8 3.9 2.8 3.9 4.3 0 1.5-3.5 1.2-4.7.3l-.4 2.6s1.3.6 3.3.6c2 0 4.9-.8 4.9-3.7 0-2.8-3.9-3.1-3.9-4.3 0-1.2 2.7-1.1 3.9-.4z" fill="white" opacity="0.7" />
      </svg>
      {/* Mastercard */}
      <svg className="h-6 w-auto text-white/40" viewBox="0 0 48 32" fill="currentColor">
        <rect width="48" height="32" rx="4" fill="currentColor" opacity="0.15" />
        <circle cx="20" cy="16" r="8" fill="white" opacity="0.3" />
        <circle cx="28" cy="16" r="8" fill="white" opacity="0.3" />
      </svg>
      {/* Amex */}
      <svg className="h-6 w-auto text-white/40" viewBox="0 0 48 32" fill="currentColor">
        <rect width="48" height="32" rx="4" fill="currentColor" opacity="0.15" />
        <text x="24" y="18" textAnchor="middle" fill="white" opacity="0.6" fontSize="8" fontWeight="bold" fontFamily="sans-serif">AMEX</text>
      </svg>
      {/* Apple Pay */}
      <svg className="h-6 w-auto text-white/40" viewBox="0 0 48 32" fill="currentColor">
        <rect width="48" height="32" rx="4" fill="currentColor" opacity="0.15" />
        <text x="24" y="18" textAnchor="middle" fill="white" opacity="0.6" fontSize="7" fontWeight="600" fontFamily="sans-serif">Pay</text>
      </svg>
      {/* Google Pay */}
      <svg className="h-6 w-auto text-white/40" viewBox="0 0 48 32" fill="currentColor">
        <rect width="48" height="32" rx="4" fill="currentColor" opacity="0.15" />
        <text x="24" y="18" textAnchor="middle" fill="white" opacity="0.6" fontSize="7" fontWeight="600" fontFamily="sans-serif">GPay</text>
      </svg>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-stone-950 overflow-hidden">
      {/* Subtle gold gradient at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="relative z-10 container-luxury">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 space-y-5">
              <img src="/uploads/images/logo.png" alt="OZ Extrait" className="h-14 w-auto" />
              <p className="font-inter text-sm text-white/70 leading-relaxed max-w-xs">
                Extrait de Parfum artigianale italiano. Tre fragranze d'autore al 40% di concentrazione.
              </p>

              {/* Social */}
              <div className="flex gap-2.5 pt-1">
                <a
                  href="https://www.instagram.com/zoe_cristofoli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 flex items-center justify-center border border-white/[0.1] hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-[18px] h-[18px] text-white/40 group-hover:text-gold-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Fragranze */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="font-inter text-[10px] uppercase tracking-[0.25em] text-gold-500/60 mb-5">
                Fragranze
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Cristallo', href: '/products/cristallo' },
                  { name: 'Scintilla', href: '/products/scintilla' },
                  { name: "Potion d'Amour", href: '/products/potion-damour' },
                ].map((product) => (
                  <li key={product.href}>
                    <Link
                      href={product.href}
                      className="font-inter text-sm text-white/70 hover:text-gold-400 transition-colors duration-300"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Il Brand */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="font-inter text-[10px] uppercase tracking-[0.25em] text-gold-500/60 mb-5">
                Il Brand
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'La Nostra Storia', href: '/il-brand/storia' },
                  { name: 'Filosofia', href: '/il-brand/filosofia' },
                  { name: 'Il Processo', href: '/il-brand/processo' },
                  { name: 'Chi Siamo', href: '/about' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-inter text-sm text-white/70 hover:text-gold-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Assistenza */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="font-inter text-[10px] uppercase tracking-[0.25em] text-gold-500/60 mb-5">
                Assistenza
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Guida Fragranze', href: '/guida/scegliere-fragranza' },
                  { name: 'Spedizioni', href: '/terms' },
                  { name: 'Privacy Policy', href: '/privacy' },
                  { name: 'Termini e Condizioni', href: '/terms' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-inter text-sm text-white/70 hover:text-gold-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contatti */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="font-inter text-[10px] uppercase tracking-[0.25em] text-gold-500/60 mb-5">
                Contatti
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:info@oz-extrait.com"
                  className="block font-inter text-sm text-white/70 hover:text-gold-400 transition-colors duration-300"
                >
                  info@oz-extrait.com
                </a>
                <p className="font-inter text-sm text-white/50 leading-relaxed">
                  Verona, Italia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/[0.06]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <p className="text-white/50 text-xs font-inter">
                © {currentYear} OZ Extrait. Tutti i diritti riservati.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="text-white/50 hover:text-gold-400 text-xs font-inter transition-colors duration-300">
                  Privacy
                </Link>
                <span className="text-white/10">|</span>
                <Link href="/terms" className="text-white/50 hover:text-gold-400 text-xs font-inter transition-colors duration-300">
                  Termini
                </Link>
              </div>
            </div>

            {/* Payment Methods */}
            <PaymentIcons />
          </div>
        </div>
      </div>
    </footer>
  );
}
