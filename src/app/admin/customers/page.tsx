import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { CustomerSearch } from './CustomerSearch';
import { EmptyState } from '../components/EmptyState';
import { Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

const roleLabels: Record<string, string> = {
  CUSTOMER: 'Cliente',
  STAFF: 'Staff',
  ADMIN: 'Admin',
};

const roleColors: Record<string, string> = {
  CUSTOMER: 'bg-stone-500/10 text-stone-400',
  STAFF: 'bg-blue-500/10 text-blue-400',
  ADMIN: 'bg-gold-500/10 text-gold-500',
};

export default async function AdminCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const filter = params.filter || 'all';
  const search = params.search || '';
  const page = parseInt(params.page || '1');
  const perPage = 20;

  const where: Record<string, unknown> = {};
  if (filter === 'customers') where.role = 'CUSTOMER';
  if (filter === 'staff') where.role = 'STAFF';
  if (filter === 'admin') where.role = 'ADMIN';
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where,
      include: {
        _count: { select: { orders: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.user.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / perPage);

  const buildUrl = (extra: Record<string, string | undefined> = {}) => {
    const p = new URLSearchParams();
    const f = extra.filter !== undefined ? extra.filter : filter;
    if (f && f !== 'all') p.set('filter', f);
    if (search) p.set('search', search);
    if (extra.page) p.set('page', extra.page);
    const qs = p.toString();
    return `/admin/customers${qs ? `?${qs}` : ''}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-cinzel text-2xl text-white">Clienti</h1>
        <div className="flex items-center gap-3">
          <CustomerSearch />
          <span className="text-stone-400 text-sm font-inter">{totalCount} utenti</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'all', label: 'Tutti' },
          { key: 'customers', label: 'Clienti' },
          { key: 'staff', label: 'Staff' },
          { key: 'admin', label: 'Admin' },
        ].map((f) => (
          <Link
            key={f.key}
            href={buildUrl({ filter: f.key })}
            className={`px-4 py-2 text-xs font-inter uppercase tracking-wide rounded-full border transition-colors ${
              filter === f.key
                ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                : 'border-stone-700 text-stone-400 hover:text-white hover:border-stone-500'
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="text-left px-6 py-4 text-xs font-inter text-stone-400 uppercase tracking-wide">Nome</th>
              <th className="text-left px-6 py-4 text-xs font-inter text-stone-400 uppercase tracking-wide">Email</th>
              <th className="text-left px-6 py-4 text-xs font-inter text-stone-400 uppercase tracking-wide">Ruolo</th>
              <th className="text-center px-6 py-4 text-xs font-inter text-stone-400 uppercase tracking-wide">Ordini</th>
              <th className="text-right px-6 py-4 text-xs font-inter text-stone-400 uppercase tracking-wide">Registrato</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors">
                <td className="px-6 py-4">
                  <Link href={`/admin/customers/${user.id}`} className="text-sm text-white hover:text-gold-500 transition-colors">
                    {user.name || '—'}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-stone-400 font-inter">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${roleColors[user.role]}`}>
                    {roleLabels[user.role]}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-sm text-white font-inter">{user._count.orders}</td>
                <td className="px-6 py-4 text-right text-sm text-stone-400 font-inter">
                  {new Date(user.createdAt).toLocaleDateString('it-IT')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-3 md:hidden">
        {users.map((user) => (
          <Link key={user.id} href={`/admin/customers/${user.id}`} className="block bg-stone-900 border border-stone-800 rounded-lg p-4 hover:border-stone-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-inter">{user.name || '—'}</span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${roleColors[user.role]}`}>
                {roleLabels[user.role]}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-xs font-inter truncate">{user.email}</span>
              <span className="text-stone-500 text-xs font-inter flex-shrink-0">{user._count.orders} ordini</span>
            </div>
          </Link>
        ))}
      </div>

      {users.length === 0 && (
        <EmptyState
          icon={Users}
          title={search ? `Nessun utente per "${search}"` : 'Nessun utente'}
          description={search ? 'Prova con una ricerca diversa.' : 'Gli utenti registrati appariranno qui.'}
        />
      )}

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
