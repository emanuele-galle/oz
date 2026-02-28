import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ReviewList } from './ReviewList';
import { ReviewFilters } from './ReviewFilters';
import { EmptyState } from '../components/EmptyState';
import { Star } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; page?: string; product?: string; rating?: string }>;
}) {
  const params = await searchParams;
  const filter = params.filter || 'pending';
  const page = parseInt(params.page || '1');
  const perPage = 20;
  const productFilter = params.product || '';
  const ratingFilter = params.rating ? parseInt(params.rating) : 0;

  const where: Record<string, unknown> = {};
  if (filter === 'pending') where.approved = false;
  else if (filter === 'approved') where.approved = true;
  if (productFilter) where.productId = productFilter;
  if (ratingFilter) where.rating = ratingFilter;

  const [reviews, totalCount, products] = await Promise.all([
    prisma.review.findMany({
      where,
      include: {
        product: { select: { name: true, slug: true } },
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.review.count({ where }),
    prisma.product.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / perPage);

  // Serialize dates for client component
  const serializedReviews = reviews.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }));

  const buildUrl = (extra: Record<string, string | undefined> = {}) => {
    const p = new URLSearchParams();
    const f = extra.filter !== undefined ? extra.filter : filter;
    if (f) p.set('filter', f);
    const prod = extra.product !== undefined ? extra.product : productFilter;
    if (prod) p.set('product', prod);
    const rat = extra.rating !== undefined ? extra.rating : (ratingFilter ? String(ratingFilter) : '');
    if (rat) p.set('rating', rat);
    if (extra.page) p.set('page', extra.page);
    const qs = p.toString();
    return `/admin/reviews${qs ? `?${qs}` : ''}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-cinzel text-2xl text-white">Recensioni</h1>
        <span className="text-stone-400 text-sm font-inter">{totalCount} totali</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { key: 'pending', label: 'Da Approvare' },
          { key: 'approved', label: 'Approvate' },
          { key: 'all', label: 'Tutte' },
        ].map((f) => (
          <Link
            key={f.key}
            href={buildUrl({ filter: f.key })}
            className={`px-4 py-2 text-xs font-inter uppercase tracking-wide rounded-full border transition-colors ${
              filter === f.key
                ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                : 'border-stone-700 text-stone-400 hover:text-white hover:border-stone-500'
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {/* Advanced Filters */}
      <ReviewFilters
        products={products}
        productFilter={productFilter}
        ratingFilter={ratingFilter}
        filter={filter}
      />

      {/* Reviews with bulk selection */}
      {serializedReviews.length > 0 ? (
        <ReviewList reviews={serializedReviews} />
      ) : (
        <EmptyState
          icon={Star}
          title="Nessuna recensione"
          description="Le recensioni appariranno qui quando i clienti le invieranno."
        />
      )}

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
