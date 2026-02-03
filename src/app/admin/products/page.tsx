import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      sizes: { orderBy: { volume: 'asc' } },
      images: { where: { isPrimary: true }, take: 1 },
      _count: { select: { reviews: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-cinzel text-2xl text-white">Prodotti</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-gold-500 text-stone-950 font-inter text-sm font-semibold rounded hover:bg-gold-400 transition-colors"
        >
          + Nuovo Prodotto
        </Link>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-stone-900 border border-stone-800 rounded-lg p-6 flex items-center gap-6">
            {/* Image */}
            <div className="w-16 h-16 bg-stone-800 rounded overflow-hidden flex-shrink-0">
              {product.images[0] && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-white font-cinzel text-lg">{product.name}</h3>
                <span className={`px-2 py-0.5 text-xs rounded-full ${product.active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {product.active ? 'Attivo' : 'Disattivato'}
                </span>
                {product.featured && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gold-500/10 text-gold-500">In Evidenza</span>
                )}
              </div>
              <p className="text-stone-400 text-sm font-inter truncate">{product.tagline}</p>
            </div>

            {/* Sizes & Stock */}
            <div className="flex gap-4 flex-shrink-0">
              {product.sizes.map((size) => (
                <div key={size.id} className="text-center">
                  <p className="text-white text-sm font-inter">{size.volume}ml</p>
                  <p className="text-xs text-stone-500">€{Number(size.price).toFixed(0)}</p>
                  <p className={`text-xs font-mono ${size.stockQuantity <= 5 ? 'text-yellow-400' : 'text-stone-400'}`}>
                    {size.stockQuantity} pz
                  </p>
                </div>
              ))}
            </div>

            {/* Reviews count */}
            <div className="text-center flex-shrink-0">
              <p className="text-white text-sm">{product._count.reviews}</p>
              <p className="text-stone-500 text-xs">reviews</p>
            </div>

            {/* Actions */}
            <Link
              href={`/admin/products/${product.id}`}
              className="px-4 py-2 border border-stone-700 text-stone-300 text-sm rounded hover:border-gold-500 hover:text-gold-500 transition-colors flex-shrink-0"
            >
              Modifica
            </Link>
          </div>
        ))}

        {products.length === 0 && (
          <div className="text-center py-12 text-stone-500">
            Nessun prodotto. <Link href="/admin/products/new" className="text-gold-500 hover:underline">Crea il primo</Link>
          </div>
        )}
      </div>
    </div>
  );
}
