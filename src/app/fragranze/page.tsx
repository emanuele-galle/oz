import { Metadata } from 'next';
import { getProducts } from '@/data/products-db';
import { ShopHero } from '@/components/sections/heroes';
import { Grid } from '@/components/layout';
import { ProductCard } from '@/components/product/ProductCard';
import { BreadcrumbSchema } from '@/components/JsonLd';
import { Product } from '@/types/product';

export const metadata: Metadata = {
  title: 'Fragranze — Extrait de Parfum Artigianale | OZ Extrait',
  description: 'Scopri le tre fragranze OZ Extrait: Cristallo, Scintilla, Potion d\'Amour. Extrait de Parfum al 40-42% di concentrazione. Heritage veneziano, visione contemporanea.',
  openGraph: {
    title: 'Le Nostre Fragranze — OZ Extrait',
    description: 'Tre fragranze d\'autore al 40% di concentrazione. Artigianale italiano.',
  },
};

export const revalidate = 3600; // Revalidate ogni ora
export const dynamic = 'force-dynamic'; // Skip SSG during build

export default async function FragranzePage() {
  // Get products con fallback se DB unavailable
  let products: Product[];
  try {
    products = await getProducts();
  } catch (error) {
    console.warn('FragranzePage: DB unavailable during build, using empty array');
    products = [];
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Fragranze', url: '/fragranze' },
        ]}
      />

      {/* Hero con search */}
      <ShopHero totalProducts={products.length} />

      {/* Products Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Products Grid */}
          <Grid cols={3} colsMd={2} colsSm={1} gap="lg">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>

          {/* Empty state (se no prodotti) */}
          {products.length === 0 && (
            <div className="text-center py-24">
              <p className="font-inter text-stone-600">
                Nessuna fragranza trovata. Torna presto per nuove creazioni.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Educational CTA */}
      <section className="py-16 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-cinzel text-3xl md:text-4xl text-ink-950 mb-6">
            Non Sai Quale Scegliere?
          </h2>
          <p className="font-inter text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
            Scopri la nostra guida completa per trovare la fragranza perfetta per te.
          </p>
          <a
            href="/guida/scegliere-fragranza"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold-500 text-gold-600 font-inter text-sm font-semibold uppercase tracking-wide rounded-sm hover:bg-gold-500 hover:text-white transition-all duration-300"
          >
            <span>Leggi la Guida</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
