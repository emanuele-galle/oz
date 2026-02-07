'use client';

import { useRouter } from 'next/navigation';

interface ReviewFiltersProps {
  products: { id: string; name: string }[];
  productFilter: string;
  ratingFilter: number;
  filter: string;
}

export function ReviewFilters({ products, productFilter, ratingFilter, filter }: ReviewFiltersProps) {
  const router = useRouter();

  const buildUrl = (extra: Record<string, string | undefined> = {}) => {
    const p = new URLSearchParams();
    const f = extra.filter !== undefined ? extra.filter : filter;
    if (f) p.set('filter', f);
    const prod = extra.product !== undefined ? extra.product : productFilter;
    if (prod) p.set('product', prod);
    const rat = extra.rating !== undefined ? extra.rating : (ratingFilter ? String(ratingFilter) : '');
    if (rat) p.set('rating', rat);
    const qs = p.toString();
    return `/admin/reviews${qs ? `?${qs}` : ''}`;
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <div className="flex items-center gap-2">
        <label className="text-stone-500 text-xs font-inter">Prodotto:</label>
        <select
          defaultValue={productFilter}
          onChange={(e) => { router.push(buildUrl({ product: e.target.value || undefined, page: undefined })); }}
          className="px-3 py-1.5 bg-stone-800 border border-stone-700 rounded text-white text-xs font-inter focus:outline-none focus:border-gold-500"
        >
          <option value="">Tutti</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-stone-500 text-xs font-inter">Rating:</label>
        <select
          defaultValue={ratingFilter || ''}
          onChange={(e) => { router.push(buildUrl({ rating: e.target.value || undefined, page: undefined })); }}
          className="px-3 py-1.5 bg-stone-800 border border-stone-700 rounded text-white text-xs font-inter focus:outline-none focus:border-gold-500"
        >
          <option value="">Tutti</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{'★'.repeat(r)} ({r})</option>
          ))}
        </select>
      </div>
    </div>
  );
}
