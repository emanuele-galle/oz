'use client';

import React from 'react';
import Link from 'next/link';

function PaymentIcons() {
  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      {/* Visa */}
      <div className="h-7 w-11 rounded bg-white/[0.08] border border-white/[0.06] flex items-center justify-center">
        <svg className="h-3 w-auto" viewBox="0 0 60 20" fill="none">
          <path d="M25.2 1.2l-4.6 17.6h-3.8L21.4 1.2h3.8zm18.4 11.4l2-5.4 1.1 5.4h-3.1zm4.2 6.2h3.5L48.2 1.2h-3.2c-.7 0-1.3.4-1.6 1.1l-5.6 16.5h3.9l.8-2.1h4.8l.5 2.1zM35 12.6c0-4.6-6.4-4.9-6.4-6.9 0-.6.6-1.3 1.9-1.4.7-.1 2.5-.2 4.5.8l.8-3.7A12.6 12.6 0 0031.5.8c-3.7 0-6.3 1.9-6.3 4.7 0 2 1.9 3.2 3.3 3.9 1.5.7 2 1.2 2 1.8 0 1-.8 1.4-2.3 1.4-2 0-3.5-.5-4.5-1l-.8 3.8c1 .5 2.9.9 4.9.9 3.9 0 6.5-1.9 6.5-4.8h-.3zM17.9 1.2L12 18.8H8L5.1 4.3c-.2-.7-.3-1-.9-1.3C3.2 2.5 1.5 1.9 0 1.5l.1-.3h6.3c.8 0 1.5.5 1.7 1.4l1.6 8.3 3.8-9.7h4.4z" fill="white" fillOpacity="0.5"/>
        </svg>
      </div>
      {/* Mastercard */}
      <div className="h-7 w-11 rounded bg-white/[0.08] border border-white/[0.06] flex items-center justify-center">
        <svg className="h-4 w-auto" viewBox="0 0 32 20" fill="none">
          <circle cx="12" cy="10" r="8" fill="#EB001B" fillOpacity="0.5"/>
          <circle cx="20" cy="10" r="8" fill="#F79E1B" fillOpacity="0.5"/>
          <path d="M16 3.8a8 8 0 010 12.4 8 8 0 000-12.4z" fill="#FF5F00" fillOpacity="0.5"/>
        </svg>
      </div>
      {/* Apple Pay */}
      <div className="h-7 w-11 rounded bg-white/[0.08] border border-white/[0.06] flex items-center justify-center">
        <svg className="h-3.5 w-auto" viewBox="0 0 50 20" fill="none">
          <path d="M9.2 2.7c-.6.7-1.5 1.2-2.5 1.2-.1-1 .4-2 .9-2.7C8.2.5 9.2 0 10.1 0c.1 1-.3 2-.9 2.7zm.9 1.4c-1.4-.1-2.6.8-3.2.8-.7 0-1.7-.7-2.8-.7-1.5 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.5 2.2 2.7 2.2 1-.1 1.5-.7 2.8-.7 1.2 0 1.7.7 2.8.7 1.1 0 1.8-1 2.6-2.1.8-1.2 1.1-2.3 1.1-2.4-1.1-.4-2-1.5-2-3.1 0-1.3.7-2.5 1.7-3.1-.7-.9-1.7-1.6-3.3-1.6v.3z" fill="white" fillOpacity="0.5"/>
          <path d="M20.2 1.2c3.2 0 5.4 2.2 5.4 5.3 0 3.2-2.2 5.4-5.5 5.4h-3.5v5.6h-2.5V1.2h6.1zm-3.6 8.5h2.9c2.2 0 3.5-1.2 3.5-3.2s-1.3-3.2-3.5-3.2h-2.9v6.4zm10.5 4.6c0-2.1 1.6-3.4 4.4-3.5l3.3-.2v-.9c0-1.3-.9-2.1-2.4-2.1-1.4 0-2.3.7-2.5 1.7h-2.3c.1-2.1 2-3.7 4.8-3.7 2.9 0 4.8 1.5 4.8 3.9v8h-2.4v-1.9c-.7 1.3-2.2 2.1-3.8 2.1-2.4 0-3.9-1.4-3.9-3.4zm7.7-1v-1l-3 .2c-1.5.1-2.3.7-2.3 1.7 0 1 .8 1.7 2.2 1.7 1.7 0 3.1-1.1 3.1-2.6zm4.6 5.5v-2c.2 0 .6.1.9.1 1.3 0 2-.5 2.4-1.9l.3-.8-4.5-12.5h2.7l3.2 10.2 3.2-10.2h2.6L46 16.3c-1 2.8-2.2 3.7-4.6 3.7-.3 0-.8 0-1-.2v-.2z" fill="white" fillOpacity="0.5"/>
        </svg>
      </div>
      {/* PayPal */}
      <div className="h-7 w-11 rounded bg-white/[0.08] border border-white/[0.06] flex items-center justify-center">
        <span className="text-white/40 text-[8px] font-semibold tracking-tight">PayPal</span>
      </div>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-stone-950 overflow-hidden">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="relative z-10 container-luxury">
        {/* Main Footer Content */}
        <div className="py-12 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-4 space-y-5">
              <Link href="/" className="inline-block">
                <img src="/uploads/images/logo.png" alt="OZ Extrait" className="h-12 w-auto" />
              </Link>
              <p className="font-inter text-sm text-white/60 leading-relaxed max-w-xs">
                Extrait de Parfum artigianale italiano. Tre fragranze d&apos;autore al 40% di concentrazione, create da Zoe Cristofoli.
              </p>

              {/* Social */}
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.instagram.com/zoe_cristofoli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-9 h-9 flex items-center justify-center border border-white/[0.08] hover:border-gold-500/40 hover:bg-gold-500/5 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 text-white/35 group-hover:text-gold-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@zoe_cristofoli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-9 h-9 flex items-center justify-center border border-white/[0.08] hover:border-gold-500/40 hover:bg-gold-500/5 transition-all duration-300"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4 text-white/35 group-hover:text-gold-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.27 8.27 0 005.58 2.17V11.7a4.84 4.84 0 01-3.57-1.77V6.69h3.57z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Fragranze */}
            <div className="lg:col-span-2">
              <h4 className="font-inter text-[10px] uppercase tracking-[0.25em] text-gold-500/50 mb-5">
                Fragranze
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Cristallo', href: '/products/cristallo' },
                  { name: 'Scintilla', href: '/products/scintilla' },
                  { name: "Potion d'Amour", href: '/products/potion-damour' },
                  { name: 'Tutte le Fragranze', href: '/fragranze' },
                ].map((product) => (
                  <li key={product.href}>
                    <Link
                      href={product.href}
                      className="font-inter text-sm text-white/55 hover:text-gold-400 transition-colors duration-300"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Il Brand */}
            <div className="lg:col-span-2">
              <h4 className="font-inter text-[10px] uppercase tracking-[0.25em] text-gold-500/50 mb-5">
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
                      className="font-inter text-sm text-white/55 hover:text-gold-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Assistenza */}
            <div className="lg:col-span-2">
              <h4 className="font-inter text-[10px] uppercase tracking-[0.25em] text-gold-500/50 mb-5">
                Assistenza
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Guida Fragranze', href: '/guida/scegliere-fragranza' },
                  { name: 'FAQ', href: '/guida/faq' },
                  { name: 'Spedizioni e Resi', href: '/terms' },
                  { name: 'Il Mio Account', href: '/account' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-inter text-sm text-white/55 hover:text-gold-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contatti */}
            <div className="lg:col-span-2">
              <h4 className="font-inter text-[10px] uppercase tracking-[0.25em] text-gold-500/50 mb-5">
                Contatti
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:info@oz-extrait.com"
                  className="block font-inter text-[13px] text-white/55 hover:text-gold-400 transition-colors duration-300"
                >
                  info@oz-extrait.com
                </a>
                <p className="font-inter text-sm text-white/40 leading-relaxed">
                  Verona, Italia
                </p>
              </div>

              {/* Legal links */}
              <div className="mt-6 pt-4 border-t border-white/[0.04]">
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/privacy" className="font-inter text-[12px] text-white/35 hover:text-gold-400 transition-colors duration-300">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="font-inter text-[12px] text-white/35 hover:text-gold-400 transition-colors duration-300">
                      Termini e Condizioni
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-5 border-t border-white/[0.05]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/35 text-[11px] font-inter tracking-wide">
              &copy; {currentYear} OZ Extrait. Tutti i diritti riservati.
            </p>
            <PaymentIcons />
          </div>
        </div>
      </div>
    </footer>
  );
}
