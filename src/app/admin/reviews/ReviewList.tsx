'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ReviewActions } from './ReviewActions';
import { BulkActionBar, ReviewCheckbox } from './BulkReviewActions';
import { ConfirmDialog } from '../components/ConfirmDialog';

interface ReviewData {
  id: string;
  rating: number;
  title: string | null;
  comment: string;
  approved: boolean;
  adminReply: string | null;
  createdAt: string;
  user: { name: string | null; email: string };
  product: { name: string; slug: string };
}

export function ReviewList({ reviews }: { reviews: ReviewData[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === reviews.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(reviews.map((r) => r.id)));
    }
  };

  const handleBulkAction = async (action: 'approve' | 'delete') => {
    if (selected.size === 0) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/reviews/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selected), action }),
      });
      if (res.ok) {
        toast.success(action === 'approve' ? `${selected.size} recensioni approvate` : `${selected.size} recensioni eliminate`);
        setSelected(new Set());
        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Select All */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-3 mb-3">
          <ReviewCheckbox checked={selected.size === reviews.length && reviews.length > 0} onChange={toggleAll} />
          <span className="text-stone-500 text-xs font-inter">Seleziona tutte</span>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-stone-900 border border-stone-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <ReviewCheckbox
                  checked={selected.has(review.id)}
                  onChange={() => toggleSelect(review.id)}
                />
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
              </div>
              <ReviewActions reviewId={review.id} approved={review.approved} adminReply={review.adminReply} />
            </div>

            {review.title && <h4 className="text-white text-sm font-semibold mb-1 ml-7">{review.title}</h4>}
            <p className="text-stone-300 text-sm ml-7">{review.comment}</p>

            {review.adminReply && (
              <div className="mt-3 ml-7 pl-4 border-l-2 border-gold-500/30">
                <p className="text-xs text-stone-500 mb-1">Risposta admin:</p>
                <p className="text-stone-400 text-sm">{review.adminReply}</p>
              </div>
            )}
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="text-center py-12 text-stone-500 text-sm">
            Nessuna recensione
          </div>
        )}
      </div>

      <BulkActionBar
        selectedCount={selected.size}
        onApprove={() => handleBulkAction('approve')}
        onDelete={() => setConfirmDeleteOpen(true)}
        isLoading={isLoading}
      />

      <ConfirmDialog
        open={confirmDeleteOpen}
        onConfirm={() => { setConfirmDeleteOpen(false); handleBulkAction('delete'); }}
        onCancel={() => setConfirmDeleteOpen(false)}
        title="Eliminare recensioni?"
        message={`Stai per eliminare ${selected.size} recensioni. L'azione è irreversibile.`}
        confirmLabel="Elimina"
        variant="danger"
      />
    </>
  );
}
