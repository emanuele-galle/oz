import { prisma } from '@/lib/prisma';
import { DateRangePicker } from './DateRangePicker';

export const dynamic = 'force-dynamic';

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const params = await searchParams;
  const now = new Date();

  // Parse date range (default: last 30 days)
  const toDate = params.to ? new Date(params.to + 'T23:59:59') : now;
  const fromDate = params.from
    ? new Date(params.from + 'T00:00:00')
    : new Date(new Date(toDate).setDate(toDate.getDate() - 30));

  const [
    recentOrders,
    topProducts,
    inventoryStatus,
    totalCustomers,
    averageOrderValue,
    totalOrdersAll,
    recurringCustomers,
  ] = await Promise.all([
    prisma.order.findMany({
      where: { createdAt: { gte: fromDate, lte: toDate }, paymentStatus: 'succeeded' },
      select: { createdAt: true, total: true },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.orderItem.groupBy({
      by: ['productName'],
      where: { order: { createdAt: { gte: fromDate, lte: toDate }, paymentStatus: 'succeeded' } },
      _sum: { subtotal: true, quantity: true },
      _count: true,
      orderBy: { _sum: { subtotal: 'desc' } },
      take: 10,
    }),
    prisma.productSize.findMany({
      include: { product: { select: { name: true } } },
      orderBy: { stockQuantity: 'asc' },
    }),
    prisma.order.groupBy({
      by: ['email'],
      where: { createdAt: { gte: fromDate, lte: toDate } },
      _count: true,
    }),
    prisma.order.aggregate({
      _avg: { total: true },
      where: { paymentStatus: 'succeeded', createdAt: { gte: fromDate, lte: toDate } },
    }),
    prisma.order.count({ where: { paymentStatus: 'succeeded', createdAt: { gte: fromDate, lte: toDate } } }),
    prisma.order.groupBy({
      by: ['email'],
      where: { createdAt: { gte: fromDate, lte: toDate } },
      _count: true,
      having: { email: { _count: { gt: 1 } } },
    }),
  ]);

  // Process revenue by day
  const revenueByDay: Record<string, { revenue: number; orders: number }> = {};
  recentOrders.forEach((order) => {
    const d = order.createdAt;
    const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (!revenueByDay[day]) revenueByDay[day] = { revenue: 0, orders: 0 };
    revenueByDay[day].revenue += Number(order.total);
    revenueByDay[day].orders += 1;
  });

  const totalRevenue = recentOrders.reduce((sum, o) => sum + Number(o.total), 0);
  const totalOrders = recentOrders.length;
  const conversionRate = totalCustomers.length > 0 ? ((totalOrdersAll / totalCustomers.length) * 100).toFixed(1) : '0';
  const recurringRate = totalCustomers.length > 0 ? ((recurringCustomers.length / totalCustomers.length) * 100).toFixed(1) : '0';

  // Revenue per product for bar chart
  const maxProductRevenue = topProducts.length > 0 ? Math.max(...topProducts.map(p => Number(p._sum.subtotal || 0))) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-cinzel text-2xl text-white">Analytics</h1>
        <DateRangePicker />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <p className="text-stone-400 text-xs font-inter uppercase tracking-wide mb-2">Revenue</p>
          <p className="text-2xl font-cinzel text-gold-500">&euro;{totalRevenue.toFixed(0)}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <p className="text-stone-400 text-xs font-inter uppercase tracking-wide mb-2">Ordini</p>
          <p className="text-2xl font-cinzel text-white">{totalOrders}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <p className="text-stone-400 text-xs font-inter uppercase tracking-wide mb-2">Clienti Unici</p>
          <p className="text-2xl font-cinzel text-white">{totalCustomers.length}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <p className="text-stone-400 text-xs font-inter uppercase tracking-wide mb-2">Ordine Medio</p>
          <p className="text-2xl font-cinzel text-white">&euro;{Number(averageOrderValue._avg.total || 0).toFixed(0)}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <p className="text-stone-400 text-xs font-inter uppercase tracking-wide mb-2">Tasso Conversione</p>
          <p className="text-2xl font-cinzel text-white">{conversionRate}%</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <p className="text-stone-400 text-xs font-inter uppercase tracking-wide mb-2">Clienti Ricorrenti</p>
          <p className="text-2xl font-cinzel text-white">{recurringRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">
            Revenue Giornaliera
          </h3>
          <div className="space-y-2">
            {(() => {
              const entries = Object.entries(revenueByDay).slice(-14);
              const maxAmount = entries.length > 0 ? Math.max(...entries.map(([, d]) => d.revenue)) : 0;
              return entries.map(([day, data]) => {
                const width = maxAmount > 0 ? (data.revenue / maxAmount) * 100 : 0;
                return (
                  <div key={day} className="group flex items-center gap-3">
                    <span className="text-stone-500 text-xs font-mono w-20 flex-shrink-0">
                      {day.slice(5)}
                    </span>
                    <div className="flex-1 bg-stone-800 rounded-full h-5 overflow-hidden relative">
                      <div
                        className="h-full bg-gold-500/60 rounded-full transition-all group-hover:bg-gold-500/80"
                        style={{ width: `${Math.max(width, 2)}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        &euro;{data.revenue.toFixed(0)} · {data.orders} ord.
                      </span>
                    </div>
                    <span className="text-stone-300 text-xs font-mono w-20 text-right">&euro;{data.revenue.toFixed(0)}</span>
                  </div>
                );
              });
            })()}
            {Object.keys(revenueByDay).length === 0 && (
              <p className="text-stone-500 text-sm">Nessun dato disponibile</p>
            )}
          </div>
          {Object.keys(revenueByDay).length > 0 && (
            <div className="mt-4 pt-3 border-t border-stone-800 flex justify-between text-sm">
              <span className="text-stone-500">Totale periodo</span>
              <span className="text-gold-500 font-semibold">&euro;{totalRevenue.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Top Products with bars */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">
            Revenue per Prodotto
          </h3>
          <div className="space-y-3">
            {topProducts.map((item, index) => {
              const revenue = Number(item._sum.subtotal || 0);
              const barWidth = maxProductRevenue > 0 ? (revenue / maxProductRevenue) * 100 : 0;
              return (
                <div key={item.productName}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gold-500 font-cinzel text-sm w-5">{index + 1}</span>
                      <span className="text-stone-300 text-sm truncate">{item.productName}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-white text-sm font-inter">&euro;{revenue.toFixed(0)}</span>
                      <span className="text-stone-500 text-xs ml-2">{item._sum.quantity || 0} pz</span>
                    </div>
                  </div>
                  <div className="bg-stone-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gold-500/40 rounded-full"
                      style={{ width: `${Math.max(barWidth, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {topProducts.length === 0 && (
              <p className="text-stone-500 text-sm">Nessun dato disponibile</p>
            )}
          </div>
        </div>

        {/* Inventory */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6 lg:col-span-2">
          <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">
            Stato Inventario
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventoryStatus.map((size) => (
              <div key={size.id} className="flex items-center justify-between p-3 bg-stone-800/50 rounded">
                <div>
                  <p className="text-stone-300 text-sm">{size.product.name}</p>
                  <p className="text-stone-500 text-xs">{size.volume}ml · {size.sku}</p>
                </div>
                <span className={`text-sm font-mono px-2 py-1 rounded ${
                  size.stockQuantity <= 2 ? 'bg-red-500/10 text-red-400' :
                  size.stockQuantity <= 5 ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-green-500/10 text-green-400'
                }`}>
                  {size.stockQuantity}
                </span>
              </div>
            ))}
            {inventoryStatus.length === 0 && (
              <p className="text-stone-500 text-sm">Nessun prodotto</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
