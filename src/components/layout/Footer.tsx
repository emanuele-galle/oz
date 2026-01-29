import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-midnight border-t border-white/10">
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="font-cinzel text-3xl font-bold text-gold mb-4">
              OZ EXTRAIT
            </h2>
            <p className="font-playfair text-white/60 text-lg leading-relaxed max-w-md">
              Profumi di lusso Extrait de Parfum artigianali. Creati con passione da Zoe Cristofoli a Verona, Italia.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/zoe_cristofoli"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-gold/30 hover:bg-gold hover:border-gold transition-all duration-300 group"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 text-gold group-hover:text-black transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-inter text-sm uppercase tracking-wider text-white mb-4">
              Prodotti
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products/cristallo"
                  className="text-white/60 hover:text-gold transition-colors duration-300"
                >
                  Cristallo
                </Link>
              </li>
              <li>
                <Link
                  href="/products/scintilla"
                  className="text-white/60 hover:text-gold transition-colors duration-300"
                >
                  Scintilla
                </Link>
              </li>
              <li>
                <Link
                  href="/products/potion-damour"
                  className="text-white/60 hover:text-gold transition-colors duration-300"
                >
                  Potion d'Amour
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-inter text-sm uppercase tracking-wider text-white mb-4">
              Informazioni
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-white/60 hover:text-gold transition-colors duration-300"
                >
                  La Nostra Storia
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-white/60 hover:text-gold transition-colors duration-300"
                >
                  Spedizioni
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-white/60 hover:text-gold transition-colors duration-300"
                >
                  Resi
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/60 hover:text-gold transition-colors duration-300"
                >
                  Contatti
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm font-inter">
            © {currentYear} OZ Extrait. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6 text-sm font-inter">
            <Link
              href="/privacy"
              className="text-white/40 hover:text-gold transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/40 hover:text-gold transition-colors duration-300"
            >
              Termini e Condizioni
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
