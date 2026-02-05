import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ShoppingBag, CalendarDays, TrendingUp, Clock, Euro, Wallet, ArrowUp, ArrowDown } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getDashboardStats() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);
  const prevWeekStart = new Date(weekStart);
  prevWeekStart.setDate(prevWeekStart.getDate() - 7);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const [
    ordersTotal,
    ordersToday,
    ordersWeek,
    ordersMonth,
    ordersPending,
    ordersPrevWeek,
    ordersPrevMonth,
    revenueAll,
    revenueMonth,
    revenuePrevMonth,
    lowStockSizes,
    pendingReviews,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.order.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.order.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.order.count({ where: { status: 'PENDING' } }),
    prisma.order.count({ where: { createdAt: { gte: prevWeekStart, lt: weekStart } } }),
    prisma.order.count({ where: { createdAt: { gte: prevMonthStart, lt: monthStart } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: 'succeeded' } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: 'succeeded', createdAt: { gte: monthStart } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: 'succeeded', createdAt: { gte: prevMonthStart, lt: monthStart } } }),
    prisma.productSize.findMany({
      where: { stockQuantity: { lte: 5 } },
      include: { product: { select: { name: true } } },
      orderBy: { stockQuantity: 'asc' },
    }),
    prisma.review.count({ where: { approved: false } }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, orderNumber: true, shippingName: true, status: true, total: true, createdAt: true },
    }),
  ]);

  return {
    orders: { total: ordersTotal, today: ordersToday, week: ordersWeek, month: ordersMonth, pending: ordersPending, prevWeek: ordersPrevWeek, prevMonth: ordersPrevMonth },
    revenue: {
      total: Number(revenueAll._sum.total || 0),
      month: Number(revenueMonth._sum.total || 0),
      prevMonth: Number(revenuePrevMonth._sum.total || 0),
    },
    lowStock: lowStockSizes.map((s) => ({
      product: s.product.name,
      volume: s.volume,
      stock: s.stockQuantity,
      sku: s.sku,
    })),
    pendingReviews,
    recentOrders: recentOrders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customer: o.shippingName,
      status: o.status,
      total: Number(o.total),
      date: o.createdAt.toLocaleDateString('it-IT'),
    })),
  };
}

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

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const weekTrend = stats.orders.prevWeek > 0
    ? Math.round(((stats.orders.week - stats.orders.prevWeek) / stats.orders.prevWeek) * 100)
    : stats.orders.week > 0 ? 100 : 0;

  const monthTrend = stats.orders.prevMonth > 0
    ? Math.round(((stats.orders.month - stats.orders.prevMonth) / stats.orders.prevMonth) * 100)
    : stats.orders.month > 0 ? 100 : 0;

  const revenueTrend = stats.revenue.prevMonth > 0
    ? Math.round(((stats.revenue.month - stats.revenue.prevMonth) / stats.revenue.prevMonth) * 100)
    : stats.revenue.month > 0 ? 100 : 0;

  return (
    <div>
      <h1 className="font-cinzel text-2xl text-white mb-8">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={ShoppingBag} label="Ordini Totali" value={stats.orders.total} />
        <StatCard icon={CalendarDays} label="Ordini Settimana" value={stats.orders.week} trend={weekTrend} />
        <StatCard icon={TrendingUp} label="Ordini Mese" value={stats.orders.month} trend={monthTrend} />
        <StatCard icon={Clock} label="Ordini Pendenti" value={stats.orders.pending} highlight={stats.orders.pending > 0} />
      </div>

      {/* Revenue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Euro className="w-4 h-4 text-stone-500" />
            <p className="text-stone-400 text-sm font-inter uppercase tracking-wide">Revenue Totale</p>
          </div>
          <p className="text-3xl font-cinzel text-gold-500">&euro;{stats.revenue.total.toFixed(2)}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-stone-500" />
              <p className="text-stone-400 text-sm font-inter uppercase tracking-wide">Revenue Mese</p>
            </div>
            {revenueTrend !== 0 && <TrendBadge value={revenueTrend} />}
          </div>
          <p className="text-3xl font-cinzel text-gold-500">&euro;{stats.revenue.month.toFixed(2)}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-6 mb-8">
        <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">Azioni Rapide</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products/new" className="px-4 py-2 bg-gold-500 text-stone-950 text-sm font-inter font-semibold rounded hover:bg-gold-400 transition-colors">
            + Nuovo Prodotto
          </Link>
          <Link href="/admin/orders?status=PENDING" className="px-4 py-2 border border-yellow-500/30 text-yellow-400 text-sm font-inter rounded hover:bg-yellow-500/10 transition-colors">
            Ordini in Attesa
          </Link>
          <Link href="/admin/reviews?filter=pending" className="px-4 py-2 border border-blue-500/30 text-blue-400 text-sm font-inter rounded hover:bg-blue-500/10 transition-colors">
            Modera Recensioni
          </Link>
          <Link href="/admin/analytics" className="px-4 py-2 border border-stone-700 text-stone-300 text-sm font-inter rounded hover:border-gold-500 hover:text-gold-500 transition-colors">
            Vedi Analytics
          </Link>
        </div>
      </div>

      {/* Recent Orders + Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Recent Orders */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide">Ordini Recenti</h3>
            <Link href="/admin/orders" className="text-gold-500 text-xs hover:underline font-inter">
              Vedi tutti &rarr;
            </Link>
          </div>
          {stats.recentOrders.length === 0 ? (
            <p className="text-stone-500 text-sm">Nessun ordine</p>
          ) : (
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-stone-800/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/orders/${order.id}`} className="font-mono text-gold-500 hover:underline text-sm">
                      {order.orderNumber}
                    </Link>
                    <span className="text-stone-400 text-xs font-inter hidden sm:inline">{order.customer}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                    <span className="text-white text-sm font-inter">&euro;{order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alerts Column */}
        <div className="space-y-4">
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
                  Modera ora &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, highlight, trend }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number; highlight?: boolean; trend?: number }) {
  return (
    <div className={`bg-stone-900 border rounded-lg p-6 ${highlight ? 'border-yellow-500/50' : 'border-stone-800'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-stone-500" />
          <p className="text-stone-400 text-sm font-inter uppercase tracking-wide">{label}</p>
        </div>
        {trend !== undefined && trend !== 0 && <TrendBadge value={trend} />}
      </div>
      <p className={`text-3xl font-cinzel ${highlight ? 'text-yellow-400' : 'text-white'}`}>{value}</p>
    </div>
  );
}

function TrendBadge({ value }: { value: number }) {
  const isUp = value > 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-inter font-medium ${isUp ? 'text-green-400' : 'text-red-400'}`}>
      {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
      {Math.abs(value)}%
    </span>
  );
}
