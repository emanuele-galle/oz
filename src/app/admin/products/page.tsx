import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductActions } from './components/ProductActions';
import { ProductSearch } from './components/ProductSearch';
import { QuickStockUpdate } from './components/QuickStockUpdate';
import { EmptyState } from '../components/EmptyState';
import { Package } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const search = params.search || '';
  const page = parseInt(params.page || '1');
  const perPage = 20;

  const where = search
    ? { name: { contains: search, mode: 'insensitive' as const } }
    : {};

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        sizes: { orderBy: { volume: 'asc' } },
        images: { where: { isPrimary: true }, take: 1 },
        _count: { select: { reviews: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  const buildUrl = (extra: Record<string, string | undefined> = {}) => {
    const p = new URLSearchParams();
    if (search) p.set('search', search);
    if (extra.page) p.set('page', extra.page);
    const qs = p.toString();
    return `/admin/products${qs ? `?${qs}` : ''}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cinzel text-2xl text-white">Prodotti</h1>
          <p className="text-stone-500 text-sm font-inter mt-1">{total} prodotti</p>
        </div>
        <div className="flex items-center gap-3">
          <ProductSearch />
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-gold-500 text-stone-950 font-inter text-sm font-semibold rounded hover:bg-gold-400 transition-colors"
          >
            + Nuovo Prodotto
          </Link>
        </div>
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
                  <p className="text-xs text-stone-500">&euro;{Number(size.price).toFixed(0)}</p>
                  <QuickStockUpdate sizeId={size.id} currentStock={size.stockQuantity} />
                </div>
              ))}
            </div>

            {/* Reviews count */}
            <div className="text-center flex-shrink-0">
              <p className="text-white text-sm">{product._count.reviews}</p>
              <p className="text-stone-500 text-xs">reviews</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-shrink-0">
              <Link
                href={`/admin/products/${product.id}`}
                className="px-4 py-2 border border-stone-700 text-stone-300 text-sm rounded hover:border-gold-500 hover:text-gold-500 transition-colors"
              >
                Modifica
              </Link>
              <ProductActions productId={product.id} />
            </div>
          </div>
        ))}

        {products.length === 0 && (
          search ? (
            <div className="text-center py-12 text-stone-500">
              Nessun prodotto trovato per &quot;{search}&quot;
            </div>
          ) : (
            <EmptyState
              icon={Package}
              title="Nessun prodotto"
              description="Crea il tuo primo prodotto per iniziare."
              actionLabel="+ Nuovo Prodotto"
              actionHref="/admin/products/new"
            />
          )
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={buildUrl({ page: String(p) })}
              className={`px-3 py-1 text-sm rounded ${
                p === page ? 'bg-gold-500 text-black' : 'bg-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
