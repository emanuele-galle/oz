'use client';

/**
 * FOOTER — Immersive Luxury Design
 * Background gradient, depth, interactive elements
 */

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  return (
    <footer className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-midnight overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gold-500/5 to-transparent pointer-events-none" />

      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10 container-luxury py-20 md:py-24">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="font-cinzel text-4xl font-bold text-gold-500">
              OZ EXTRAIT
            </h2>
            <p className="font-playfair text-lg text-white/80 leading-relaxed max-w-md">
              Extrait de Parfum artigianale italiano.
              <br />
              Tre fragranze d'autore al 40% di concentrazione.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/zoe_cristofoli"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center border-2 border-gold-500/30 rounded-sm hover:border-gold-500 hover:bg-gold-500/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6 text-gold-500 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="md:col-span-2">
            <h3 className="font-cinzel text-lg text-gold-400 mb-6 uppercase tracking-wide">
              Fragranze
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Cristallo', href: '/products/cristallo', subtitle: 'Purezza' },
                { name: 'Scintilla', href: '/products/scintilla', subtitle: 'Energia' },
                { name: "Potion d'Amour", href: '/products/potion-damour', subtitle: 'Passione' },
              ].map((product) => (
                <li key={product.href}>
                  <Link
                    href={product.href}
                    className="group block"
                  >
                    <div className="font-inter text-white/80 group-hover:text-gold-400 transition-colors duration-300">
                      {product.name}
                    </div>
                    <div className="font-inter text-xs text-white/40 group-hover:text-gold-400/60 transition-colors duration-300">
                      {product.subtitle}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="md:col-span-2">
            <h3 className="font-cinzel text-lg text-gold-400 mb-6 uppercase tracking-wide">
              Informazioni
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'La Nostra Storia', href: '/il-brand/storia' },
                { name: 'Filosofia', href: '/il-brand/filosofia' },
                { name: 'Il Processo', href: '/il-brand/processo' },
                { name: 'Guida', href: '/guida/scegliere-fragranza' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-white/80 hover:text-gold-400 transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span>{link.name}</span>
                    <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter CTA */}
          <div className="md:col-span-3">
            <h3 className="font-cinzel text-lg text-gold-400 mb-6 uppercase tracking-wide">
              Newsletter
            </h3>
            <p className="font-inter text-sm text-white/70 mb-4 leading-relaxed">
              Anteprime esclusive, offerte riservate, guide premium.
            </p>
            <button
              onClick={() => router.push('/#newsletter')}
              className="w-full px-6 py-3 bg-gold-500/20 border border-gold-500/50 text-gold-400 font-inter text-sm font-semibold uppercase tracking-wide rounded-sm hover:bg-gold-500 hover:text-midnight hover:border-gold-500 transition-all duration-300"
            >
              Iscriviti
            </button>
          </div>
        </div>

        {/* Divider con gradient */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/50 text-sm font-inter">
            © {currentYear} OZ Extrait. Creato con passione a Verona, Italia.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/50 hover:text-gold-400 text-sm font-inter transition-colors duration-300">
              Privacy
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/terms" className="text-white/50 hover:text-gold-400 text-sm font-inter transition-colors duration-300">
              Termini
            </Link>
          </div>
        </div>

        {/* Tagline finale */}
        <div className="mt-12 text-center">
          <p className="font-playfair text-2xl text-gold-500/60 italic">
            Extrait de Parfum. Extrait d'Âme.
          </p>
        </div>
      </div>
    </footer>
  );
}
