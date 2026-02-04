import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getDashboardStats() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    ordersTotal,
    ordersToday,
    ordersWeek,
    ordersMonth,
    ordersPending,
    revenueAll,
    revenueMonth,
    lowStockSizes,
    pendingReviews,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.order.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.order.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.order.count({ where: { status: 'PENDING' } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: 'succeeded' } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: 'succeeded', createdAt: { gte: monthStart } } }),
    prisma.productSize.findMany({
      where: { stockQuantity: { lte: 5 } },
      include: { product: { select: { name: true } } },
      orderBy: { stockQuantity: 'asc' },
    }),
    prisma.review.count({ where: { approved: false } }),
  ]);

  return {
    orders: { total: ordersTotal, today: ordersToday, week: ordersWeek, month: ordersMonth, pending: ordersPending },
    revenue: {
      total: Number(revenueAll._sum.total || 0),
      month: Number(revenueMonth._sum.total || 0),
    },
    lowStock: lowStockSizes.map((s) => ({
      product: s.product.name,
      volume: s.volume,
      stock: s.stockQuantity,
      sku: s.sku,
    })),
    pendingReviews,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="font-cinzel text-2xl text-white mb-8">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Ordini Totali" value={stats.orders.total} />
        <StatCard label="Ordini Oggi" value={stats.orders.today} />
        <StatCard label="Ordini Mese" value={stats.orders.month} />
        <StatCard label="Ordini Pendenti" value={stats.orders.pending} highlight={stats.orders.pending > 0} />
      </div>

      {/* Revenue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <p className="text-stone-400 text-sm font-inter uppercase tracking-wide mb-2">Revenue Totale</p>
          <p className="text-3xl font-cinzel text-gold-500">€{stats.revenue.total.toFixed(2)}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <p className="text-stone-400 text-sm font-inter uppercase tracking-wide mb-2">Revenue Mese</p>
          <p className="text-3xl font-cinzel text-gold-500">€{stats.revenue.month.toFixed(2)}</p>
        </div>
      </div>

      {/* Alerts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Low Stock */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">
            Stock Basso
          </h3>
          {stats.lowStock.length === 0 ? (
            <p className="text-stone-500 text-sm">Nessun prodotto con stock basso</p>
          ) : (
            <div className="space-y-3">
              {stats.lowStock.map((item) => (
                <div key={item.sku} className="flex items-center justify-between">
                  <span className="text-stone-300 text-sm">
                    {item.product} {item.volume}ml
                  </span>
                  <span className={`text-sm font-mono ${item.stock <= 2 ? 'text-red-400' : 'text-yellow-400'}`}>
                    {item.stock} pz
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Reviews */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">
            Recensioni da Approvare
          </h3>
          {stats.pendingReviews === 0 ? (
            <p className="text-stone-500 text-sm">Nessuna recensione in attesa</p>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-3xl font-cinzel text-yellow-400">{stats.pendingReviews}</span>
              <Link href="/admin/reviews" className="text-gold-500 text-sm hover:underline font-inter">
                Modera ora →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`bg-stone-900 border rounded-lg p-6 ${highlight ? 'border-yellow-500/50' : 'border-stone-800'}`}>
      <p className="text-stone-400 text-sm font-inter uppercase tracking-wide mb-2">{label}</p>
      <p className={`text-3xl font-cinzel ${highlight ? 'text-yellow-400' : 'text-white'}`}>{value}</p>
    </div>
  );
}
