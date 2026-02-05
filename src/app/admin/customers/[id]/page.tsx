import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/admin/auth';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { RoleEditor } from './RoleEditor';

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

const roleColors: Record<string, string> = {
  CUSTOMER: 'bg-stone-500/10 text-stone-400',
  STAFF: 'bg-blue-500/10 text-blue-400',
  ADMIN: 'bg-gold-500/10 text-gold-500',
};

export default async function AdminCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [user, currentAdmin] = await Promise.all([
    prisma.user.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        reviews: {
          include: { product: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    }),
    getAdminUser(),
  ]);

  if (!user) notFound();

  const totalSpent = user.orders.reduce((sum, o) => sum + Number(o.total), 0);
  const isAdmin = currentAdmin?.role === 'ADMIN';

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Clienti', href: '/admin/customers' },
        { label: user.name || user.email },
      ]} />

      <h1 className="font-cinzel text-2xl text-white mb-8">{user.name || user.email}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Card */}
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
            <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">Informazioni</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Nome</span>
                <span className="text-stone-300">{user.name || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Email</span>
                <span className="text-stone-300">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Ruolo</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${roleColors[user.role]}`}>{user.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Registrato</span>
                <span className="text-stone-300">{new Date(user.createdAt).toLocaleDateString('it-IT')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Ordini</span>
                <span className="text-white font-semibold">{user.orders.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Totale Speso</span>
                <span className="text-gold-500 font-semibold">&euro;{totalSpent.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Role Editor (only for ADMIN) */}
          {isAdmin && (
            <RoleEditor userId={user.id} currentRole={user.role} />
          )}
        </div>

        {/* Orders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
            <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">
              Storico Ordini
            </h3>
            {user.orders.length === 0 ? (
              <p className="text-stone-500 text-sm">Nessun ordine</p>
            ) : (
              <div className="space-y-3">
                {user.orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-stone-800/50 last:border-0">
                    <div>
                      <Link href={`/admin/orders/${order.id}`} className="font-mono text-gold-500 hover:underline text-sm">
                        {order.orderNumber}
                      </Link>
                      <p className="text-stone-500 text-xs">{new Date(order.createdAt).toLocaleDateString('it-IT')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 text-xs rounded-full border ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                      <span className="text-white text-sm font-inter">&euro;{Number(order.total).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
            <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">
              Recensioni ({user.reviews.length})
            </h3>
            {user.reviews.length === 0 ? (
              <p className="text-stone-500 text-sm">Nessuna recensione</p>
            ) : (
              <div className="space-y-3">
                {user.reviews.map((review) => (
                  <div key={review.id} className="py-2 border-b border-stone-800/50 last:border-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-gold-500 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                      <span className="text-stone-400 text-xs">{review.product.name}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${review.approved ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                        {review.approved ? 'Approvata' : 'In Attesa'}
                      </span>
                    </div>
                    {review.title && <p className="text-white text-sm font-semibold">{review.title}</p>}
                    <p className="text-stone-300 text-sm line-clamp-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
