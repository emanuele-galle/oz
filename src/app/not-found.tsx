import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        {/* OZ branding */}
        <h1 className="font-cinzel text-[120px] md:text-[160px] leading-none text-gold-gradient mb-4">
          OZ
        </h1>

        <p className="font-cinzel text-2xl md:text-3xl text-white mb-3">
          Pagina Non Trovata
        </p>

        <p className="font-inter text-base text-white/50 mb-10 leading-relaxed">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-gold-500 text-stone-950 font-inter text-sm font-semibold uppercase tracking-[0.15em] hover:bg-gold-400 transition-all duration-300"
          >
            Torna alla Home
          </Link>
          <Link
            href="/fragranze"
            className="px-8 py-4 border border-gold-500/40 text-gold-400 font-inter text-sm font-medium uppercase tracking-[0.15em] hover:bg-gold-500/10 transition-all duration-300"
          >
            Scopri le Fragranze
          </Link>
        </div>
      </div>
    </div>
  );
}
