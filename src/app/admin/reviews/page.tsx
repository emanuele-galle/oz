import { prisma } from '@/lib/prisma';
import { ReviewActions } from './ReviewActions';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const params = await searchParams;
  const filter = params.filter || 'pending';

  const where = filter === 'pending' ? { approved: false } : filter === 'approved' ? { approved: true } : {};

  const reviews = await prisma.review.findMany({
    where,
    include: {
      product: { select: { name: true, slug: true } },
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return (
    <div>
      <h1 className="font-cinzel text-2xl text-white mb-8">Recensioni</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'pending', label: 'Da Approvare' },
          { key: 'approved', label: 'Approvate' },
          { key: 'all', label: 'Tutte' },
        ].map((f) => (
          <a
            key={f.key}
            href={`/admin/reviews?filter=${f.key}`}
            className={`px-4 py-2 text-xs font-inter uppercase tracking-wide rounded-full border transition-colors ${
              filter === f.key
                ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                : 'border-stone-700 text-stone-400 hover:text-white hover:border-stone-500'
            }`}
          >
            {f.label}
          </a>
        ))}
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-stone-900 border border-stone-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-gold-500 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                  <span className="text-white font-inter text-sm">{review.user.name || review.user.email}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${review.approved ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                    {review.approved ? 'Approvata' : 'In Attesa'}
                  </span>
                </div>
                <p className="text-stone-500 text-xs font-inter">
                  {review.product.name} · {new Date(review.createdAt).toLocaleDateString('it-IT')}
                </p>
              </div>
              <ReviewActions reviewId={review.id} approved={review.approved} />
            </div>

            {review.title && <h4 className="text-white text-sm font-semibold mb-1">{review.title}</h4>}
            <p className="text-stone-300 text-sm">{review.comment}</p>

            {review.adminReply && (
              <div className="mt-3 pl-4 border-l-2 border-gold-500/30">
                <p className="text-xs text-stone-500 mb-1">Risposta admin:</p>
                <p className="text-stone-400 text-sm">{review.adminReply}</p>
              </div>
            )}
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="text-center py-12 text-stone-500 text-sm">
            Nessuna recensione{filter === 'pending' ? ' da approvare' : ''}
          </div>
        )}
      </div>
    </div>
  );
}
