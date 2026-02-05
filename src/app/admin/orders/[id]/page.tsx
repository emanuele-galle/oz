import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { OrderActions } from './OrderActions';
import { OrderTimeline } from '../../components/OrderTimeline';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const dynamic = 'force-dynamic';

const statusLabels: Record<string, string> = {
  PENDING: 'In Attesa',
  PROCESSING: 'In Lavorazione',
  SHIPPED: 'Spedito',
  DELIVERED: 'Consegnato',
  CANCELLED: 'Annullato',
  REFUNDED: 'Rimborsato',
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true, user: { select: { name: true, email: true } } },
  });

  if (!order) notFound();

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Ordini', href: '/admin/orders' },
        { label: order.orderNumber },
      ]} />

      <h1 className="font-cinzel text-2xl text-white mb-8">
        Ordine {order.orderNumber}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <OrderTimeline
            status={order.status}
            createdAt={order.createdAt.toISOString()}
            shippedAt={order.shippedAt?.toISOString() || null}
            deliveredAt={order.deliveredAt?.toISOString() || null}
          />

          {/* Items */}
          <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
            <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">Prodotti</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-stone-800/50 last:border-0">
                  <div>
                    <p className="text-white text-sm">{item.productName}</p>
                    <p className="text-stone-500 text-xs">{item.sizeVolume}ml &times; {item.quantity}</p>
                  </div>
                  <p className="text-white text-sm font-inter">&euro;{Number(item.subtotal).toFixed(2)}</p>
                </div>
              ))}
              <div className="pt-3 space-y-1">
                <div className="flex justify-between text-stone-400 text-sm">
                  <span>Subtotale</span>
                  <span>&euro;{Number(order.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-400 text-sm">
                  <span>Spedizione</span>
                  <span>{Number(order.shippingCost) === 0 ? 'Gratuita' : `€${Number(order.shippingCost).toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gold-500 font-bold text-lg pt-2 border-t border-stone-800">
                  <span>Totale</span>
                  <span>&euro;{Number(order.total).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
            <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">Spedizione</h3>
            <div className="text-sm text-stone-300 space-y-1">
              <p>{order.shippingName}</p>
              <p>{order.shippingAddress}</p>
              <p>{order.shippingPostal} {order.shippingCity}{order.shippingState ? `, ${order.shippingState}` : ''}</p>
              <p>{order.shippingCountry}</p>
              {order.shippingPhone && <p>Tel: {order.shippingPhone}</p>}
            </div>
          </div>

          {/* Notes */}
          {(order.customerNotes || order.adminNotes) && (
            <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
              <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">Note</h3>
              {order.customerNotes && (
                <div className="mb-4">
                  <p className="text-stone-500 text-xs mb-1">Note cliente:</p>
                  <p className="text-stone-300 text-sm">{order.customerNotes}</p>
                </div>
              )}
              {order.adminNotes && (
                <div>
                  <p className="text-stone-500 text-xs mb-1">Note interne:</p>
                  <p className="text-stone-300 text-sm">{order.adminNotes}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar — Actions */}
        <div className="space-y-6">
          <OrderActions
            orderId={order.id}
            currentStatus={order.status}
            trackingNumber={order.trackingNumber}
            carrier={order.carrier}
            adminNotes={order.adminNotes}
            statusLabels={statusLabels}
          />

          {/* Info */}
          <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
            <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Email</span>
                <span className="text-stone-300">{order.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Pagamento</span>
                <span className="text-stone-300">{order.paymentStatus || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Creato</span>
                <span className="text-stone-300">{new Date(order.createdAt).toLocaleString('it-IT')}</span>
              </div>
              {order.shippedAt && (
                <div className="flex justify-between">
                  <span className="text-stone-500">Spedito</span>
                  <span className="text-stone-300">{new Date(order.shippedAt).toLocaleString('it-IT')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
