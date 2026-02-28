import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { EmptyState } from '../components/EmptyState';
import { Activity } from 'lucide-react';

export const dynamic = 'force-dynamic';

const actionLabels: Record<string, string> = {
  'product.created': 'Prodotto creato',
  'product.updated': 'Prodotto aggiornato',
  'product.deleted': 'Prodotto eliminato',
  'product.duplicated': 'Prodotto duplicato',
  'order.status_changed': 'Stato ordine cambiato',
  'review.approved': 'Recensione approvata',
  'review.rejected': 'Recensione nascosta',
  'review.replied': 'Risposta a recensione',
  'review.deleted': 'Recensione eliminata',
  'customer.role_changed': 'Ruolo utente cambiato',
};

const actionColors: Record<string, string> = {
  'product.created': 'text-green-400',
  'product.updated': 'text-blue-400',
  'product.deleted': 'text-red-400',
  'product.duplicated': 'text-purple-400',
  'order.status_changed': 'text-yellow-400',
  'review.approved': 'text-green-400',
  'review.rejected': 'text-yellow-400',
  'review.replied': 'text-blue-400',
  'review.deleted': 'text-red-400',
  'customer.role_changed': 'text-gold-500',
};

export default async function AdminActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const perPage = 30;

  const [logs, total] = await Promise.all([
    prisma.activityLog.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.activityLog.count(),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-cinzel text-2xl text-white">Attività</h1>
        <span className="text-stone-400 text-sm font-inter">{total} eventi</span>
      </div>

      {logs.length === 0 ? (
        <EmptyState
          icon={Activity}
          title="Nessuna attività"
          description="Le azioni degli admin verranno registrate qui."
        />
      ) : (
        <div className="space-y-2">
          {logs.map((log) => {
            let details: Record<string, unknown> = {};
            try { if (log.details) details = JSON.parse(log.details); } catch {}

            return (
              <div key={log.id} className="bg-stone-900 border border-stone-800 rounded-lg px-6 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-inter font-medium ${actionColors[log.action] || 'text-stone-300'}`}>
                      {actionLabels[log.action] || log.action}
                    </span>
                    {log.targetType && !!details.name && (
                      <span className="text-stone-400 text-sm font-inter truncate">
                        — {String(details.name)}
                      </span>
                    )}
                  </div>
                  <p className="text-stone-500 text-xs font-inter">
                    {log.user.name || log.user.email} · {new Date(log.createdAt).toLocaleString('it-IT')}
                  </p>
                </div>
                {log.targetType && log.targetId && (
                  <Link
                    href={`/admin/${log.targetType === 'product' ? 'products' : log.targetType === 'order' ? 'orders' : log.targetType === 'review' ? 'reviews' : 'customers'}/${log.targetId}`}
                    className="text-gold-500 text-xs hover:underline font-inter flex-shrink-0"
                  >
                    Vedi &rarr;
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/activity?page=${p}`}
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
