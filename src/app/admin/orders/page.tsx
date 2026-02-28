import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { OrderSearch } from './OrderSearch';
import { EmptyState } from '../components/EmptyState';
import { ShoppingBag } from 'lucide-react';

export const dynamic = 'force-dynamic';

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  PROCESSING: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  SHIPPED: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  DELIVERED: 'bg-green-500/10 text-green-400 border-green-500/30',
  CANCELLED: 'bg-red-500/10 text-red-400 border-red-500/30',
  REFUNDED: 'bg-stone-500/10 text-stone-400 border-stone-500/30',
};

const statusLabels: Record<string, string> = {
  PENDING: 'In Attesa',
  PROCESSING: 'In Lavorazione',
  SHIPPED: 'Spedito',
  DELIVERED: 'Consegnato',
  CANCELLED: 'Annullato',
  REFUNDED: 'Rimborsato',
};

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const statusFilter = params.status;
  const search = params.search || '';
  const page = parseInt(params.page || '1');
  const perPage = 20;

  const where: Record<string, unknown> = {};
  if (statusFilter) where.status = statusFilter;
  if (search) {
    where.OR = [
      { orderNumber: { contains: search, mode: 'insensitive' } },
      { shippingName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.order.count({ where }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  // Build URL params preserving search and status
  const buildUrl = (extra: Record<string, string | undefined> = {}) => {
    const p = new URLSearchParams();
    if (extra.status !== undefined) {
      if (extra.status) p.set('status', extra.status);
    } else if (statusFilter) {
      p.set('status', statusFilter);
    }
    if (search) p.set('search', search);
    if (extra.page) p.set('page', extra.page);
    const qs = p.toString();
    return `/admin/orders${qs ? `?${qs}` : ''}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-cinzel text-2xl text-white">Ordini</h1>
        <div className="flex items-center gap-3">
          <OrderSearch />
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- CSV download link, not a navigation */}
          <a
            href="/api/admin/orders/export"
            className="px-4 py-2 border border-stone-700 text-stone-300 text-sm font-inter rounded hover:border-gold-500 hover:text-gold-500 transition-colors"
          >
            Esporta CSV
          </a>
          <span className="text-stone-400 text-sm font-inter">{total} ordini</span>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <FilterLink href={buildUrl({ status: '' })} label="Tutti" active={!statusFilter} />
        {Object.entries(statusLabels).map(([key, label]) => (
          <FilterLink
            key={key}
            href={buildUrl({ status: key })}
            label={label}
            active={statusFilter === key}
          />
        ))}
      </div>

      {/* Orders Table — Desktop */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="text-left px-6 py-4 text-xs font-inter text-stone-400 uppercase tracking-wide">Ordine</th>
              <th className="text-left px-6 py-4 text-xs font-inter text-stone-400 uppercase tracking-wide">Cliente</th>
              <th className="text-left px-6 py-4 text-xs font-inter text-stone-400 uppercase tracking-wide">Stato</th>
              <th className="text-right px-6 py-4 text-xs font-inter text-stone-400 uppercase tracking-wide">Totale</th>
              <th className="text-right px-6 py-4 text-xs font-inter text-stone-400 uppercase tracking-wide">Data</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors">
                <td className="px-6 py-4">
                  <Link href={`/admin/orders/${order.id}`} className="font-mono text-gold-500 hover:underline text-sm">
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-white">{order.shippingName}</div>
                  <div className="text-xs text-stone-500">{order.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 text-xs font-inter font-medium rounded-full border ${statusColors[order.status]}`}>
                    {statusLabels[order.status] || order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm text-white font-inter">
                  &euro;{Number(order.total).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right text-sm text-stone-400 font-inter">
                  {new Date(order.createdAt).toLocaleDateString('it-IT')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <EmptyState
            icon={ShoppingBag}
            title={search ? `Nessun ordine per "${search}"` : 'Nessun ordine'}
            description={search ? 'Prova con una ricerca diversa.' : 'Gli ordini appariranno qui.'}
          />
        )}
      </div>

      {/* Orders — Mobile Card View */}
      <div className="space-y-3 md:hidden">
        {orders.map((order) => (
          <Link key={order.id} href={`/admin/orders/${order.id}`} className="block bg-stone-900 border border-stone-800 rounded-lg p-4 hover:border-stone-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-gold-500 text-sm">{order.orderNumber}</span>
              <span className={`px-2 py-0.5 text-xs font-inter font-medium rounded-full border ${statusColors[order.status]}`}>
                {statusLabels[order.status]}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm">{order.shippingName}</p>
                <p className="text-stone-500 text-xs">{new Date(order.createdAt).toLocaleDateString('it-IT')}</p>
              </div>
              <span className="text-white text-sm font-inter font-semibold">&euro;{Number(order.total).toFixed(2)}</span>
            </div>
          </Link>
        ))}
        {orders.length === 0 && (
          <EmptyState
            icon={ShoppingBag}
            title={search ? `Nessun ordine per "${search}"` : 'Nessun ordine'}
            description={search ? 'Prova con una ricerca diversa.' : 'Gli ordini appariranno qui.'}
          />
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

function FilterLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 text-xs font-inter uppercase tracking-wide rounded-full border transition-colors ${
        active
          ? 'border-gold-500 bg-gold-500/10 text-gold-500'
          : 'border-stone-700 text-stone-400 hover:text-white hover:border-stone-500'
      }`}
    >
      {label}
    </Link>
  );
}
