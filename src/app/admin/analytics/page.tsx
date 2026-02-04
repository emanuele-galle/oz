import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminAnalyticsPage() {
  const now = new Date();
  const last30Days = new Date(now);
  last30Days.setDate(last30Days.getDate() - 30);

  // Revenue by month (last 6 months)
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const [
    recentOrders,
    topProducts,
    inventoryStatus,
    totalCustomers,
    averageOrderValue,
  ] = await Promise.all([
    // Revenue trend - orders in last 30 days grouped by day
    prisma.order.findMany({
      where: { createdAt: { gte: last30Days }, paymentStatus: 'succeeded' },
      select: { createdAt: true, total: true },
      orderBy: { createdAt: 'asc' },
    }),

    // Top products by order count
    prisma.orderItem.groupBy({
      by: ['productName'],
      _sum: { subtotal: true, quantity: true },
      _count: true,
      orderBy: { _sum: { subtotal: 'desc' } },
      take: 10,
    }),

    // Inventory status
    prisma.productSize.findMany({
      include: { product: { select: { name: true } } },
      orderBy: { stockQuantity: 'asc' },
    }),

    // Total unique customers
    prisma.order.groupBy({
      by: ['email'],
      _count: true,
    }),

    // Average order value
    prisma.order.aggregate({
      _avg: { total: true },
      where: { paymentStatus: 'succeeded' },
    }),
  ]);

  // Process revenue by day — use locale date to avoid UTC offset issues
  const revenueByDay: Record<string, number> = {};
  recentOrders.forEach((order) => {
    const d = order.createdAt;
    const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    revenueByDay[day] = (revenueByDay[day] || 0) + Number(order.total);
  });

  const totalRevenue30d = recentOrders.reduce((sum, o) => sum + Number(o.total), 0);
  const totalOrders30d = recentOrders.length;

  return (
    <div>
      <h1 className="font-cinzel text-2xl text-white mb-8">Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <p className="text-stone-400 text-xs font-inter uppercase tracking-wide mb-2">Revenue (30g)</p>
          <p className="text-2xl font-cinzel text-gold-500">€{totalRevenue30d.toFixed(2)}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <p className="text-stone-400 text-xs font-inter uppercase tracking-wide mb-2">Ordini (30g)</p>
          <p className="text-2xl font-cinzel text-white">{totalOrders30d}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <p className="text-stone-400 text-xs font-inter uppercase tracking-wide mb-2">Clienti Unici</p>
          <p className="text-2xl font-cinzel text-white">{totalCustomers.length}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <p className="text-stone-400 text-xs font-inter uppercase tracking-wide mb-2">Ordine Medio</p>
          <p className="text-2xl font-cinzel text-white">€{Number(averageOrderValue._avg.total || 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart (text-based) */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">
            Revenue Giornaliera (30g)
          </h3>
          <div className="space-y-2">
            {(() => {
              const entries = Object.entries(revenueByDay).slice(-14);
              const maxAmount = entries.length > 0 ? Math.max(...entries.map(([, a]) => a)) : 0;
              return entries.map(([day, amount]) => {
                const width = maxAmount > 0 ? (amount / maxAmount) * 100 : 0;
                return (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-stone-500 text-xs font-mono w-20 flex-shrink-0">
                      {day.slice(5)}
                    </span>
                    <div className="flex-1 bg-stone-800 rounded-full h-4 overflow-hidden">
                      <div className="h-full bg-gold-500/60 rounded-full transition-all" style={{ width: `${Math.max(width, 2)}%` }} />
                    </div>
                    <span className="text-stone-300 text-xs font-mono w-20 text-right">€{amount.toFixed(0)}</span>
                  </div>
                );
              });
            })()}
            {Object.keys(revenueByDay).length === 0 && (
              <p className="text-stone-500 text-sm">Nessun dato disponibile</p>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
          <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">
            Prodotti Più Venduti
          </h3>
          <div className="space-y-3">
            {topProducts.map((item, index) => (
              <div key={item.productName} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-gold-500 font-cinzel text-lg w-6">{index + 1}</span>
                  <span className="text-stone-300 text-sm">{item.productName}</span>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-inter">€{Number(item._sum.subtotal || 0).toFixed(0)}</p>
                  <p className="text-stone-500 text-xs">{item._sum.quantity || 0} venduti</p>
                </div>
              </div>
            ))}
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
