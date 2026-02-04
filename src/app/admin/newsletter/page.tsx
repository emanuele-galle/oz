import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { NewsletterActions } from './NewsletterActions';

export const dynamic = 'force-dynamic';

export default async function AdminNewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; page?: string }>;
}) {
  const params = await searchParams;
  const filter = params.filter || 'all';
  const page = parseInt(params.page || '1');
  const perPage = 30;

  const where = filter === 'active' ? { active: true } : filter === 'inactive' ? { active: false } : {};

  const [subscribers, totalCount] = await Promise.all([
    prisma.newsletterSubscriber.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.newsletterSubscriber.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cinzel text-2xl text-white">Newsletter</h1>
          <p className="text-stone-500 text-sm font-inter mt-1">{totalCount} iscritti totali</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'all', label: 'Tutti' },
          { key: 'active', label: 'Attivi' },
          { key: 'inactive', label: 'Disattivati' },
        ].map((f) => (
          <Link
            key={f.key}
            href={`/admin/newsletter?filter=${f.key}`}
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

      {/* Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="text-left px-6 py-3 text-stone-500 text-xs font-inter uppercase tracking-wide">Email</th>
              <th className="text-left px-6 py-3 text-stone-500 text-xs font-inter uppercase tracking-wide">Fonte</th>
              <th className="text-left px-6 py-3 text-stone-500 text-xs font-inter uppercase tracking-wide">Data Iscrizione</th>
              <th className="text-left px-6 py-3 text-stone-500 text-xs font-inter uppercase tracking-wide">Stato</th>
              <th className="text-right px-6 py-3 text-stone-500 text-xs font-inter uppercase tracking-wide">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id} className="border-b border-stone-800/50 hover:bg-stone-800/30">
                <td className="px-6 py-4 text-white text-sm font-inter">{sub.email}</td>
                <td className="px-6 py-4 text-stone-400 text-sm font-inter">{sub.source}</td>
                <td className="px-6 py-4 text-stone-400 text-sm font-inter">
                  {new Date(sub.createdAt).toLocaleDateString('it-IT')}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    sub.active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {sub.active ? 'Attivo' : 'Disattivato'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <NewsletterActions subscriberId={sub.id} active={sub.active} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {subscribers.length === 0 && (
          <div className="text-center py-12 text-stone-500 text-sm">
            Nessun iscritto{filter === 'active' ? ' attivo' : filter === 'inactive' ? ' disattivato' : ''}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/newsletter?filter=${filter}&page=${p}`}
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
