import Link from 'next/link';
import { prisma } from '@/lib/prisma';

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
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const statusFilter = params.status;
  const page = parseInt(params.page || '1');
  const perPage = 20;

  const where = statusFilter ? { status: statusFilter as any } : {};

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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-cinzel text-2xl text-white">Ordini</h1>
        <span className="text-stone-400 text-sm font-inter">{total} ordini totali</span>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <FilterLink href="/admin/orders" label="Tutti" active={!statusFilter} />
        {Object.entries(statusLabels).map(([key, label]) => (
          <FilterLink
            key={key}
            href={`/admin/orders?status=${key}`}
            label={label}
            active={statusFilter === key}
          />
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
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
                  €{Number(order.total).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right text-sm text-stone-400 font-inter">
                  {new Date(order.createdAt).toLocaleDateString('it-IT')}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-stone-500 text-sm">
                  Nessun ordine trovato
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/orders?${statusFilter ? `status=${statusFilter}&` : ''}page=${p}`}
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
