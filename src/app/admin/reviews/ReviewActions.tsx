'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ConfirmDialog } from '../components/ConfirmDialog';

export function ReviewActions({ reviewId, approved, adminReply }: { reviewId: string; approved: boolean; adminReply: string | null }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState(adminReply || '');
  const [isSavingReply, setIsSavingReply] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleAction = async (action: 'approve' | 'reject' | 'delete') => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: action === 'delete' ? 'DELETE' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (res.ok) {
        if (action === 'approve') toast.success('Recensione approvata');
        else if (action === 'reject') toast.success('Recensione nascosta');
        else toast.success('Recensione eliminata');
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || 'Errore durante l\'operazione');
      }
    } catch {
      toast.error('Errore di connessione');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;

    setIsSavingReply(true);
    try {
      const res = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminReply: replyText.trim() }),
      });

      if (res.ok) {
        toast.success('Risposta salvata');
        setShowReplyForm(false);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || 'Errore durante il salvataggio');
      }
    } catch {
      toast.error('Errore di connessione');
    } finally {
      setIsSavingReply(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-2 flex-shrink-0">
        {!approved && (
          <button
            onClick={() => handleAction('approve')}
            disabled={isLoading}
            className="px-3 py-1 text-xs bg-green-500/10 text-green-400 border border-green-500/30 rounded hover:bg-green-500/20 transition-colors disabled:opacity-50"
          >
            Approva
          </button>
        )}
        {approved && (
          <button
            onClick={() => handleAction('reject')}
            disabled={isLoading}
            className="px-3 py-1 text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 rounded hover:bg-yellow-500/20 transition-colors disabled:opacity-50"
          >
            Nascondi
          </button>
        )}
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="px-3 py-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded hover:bg-blue-500/20 transition-colors"
        >
          {adminReply ? 'Modifica Risposta' : 'Rispondi'}
        </button>
        <button
          onClick={() => setConfirmOpen(true)}
          disabled={isLoading}
          className="px-3 py-1 text-xs bg-red-500/10 text-red-400 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors disabled:opacity-50"
        >
          Elimina
        </button>
      </div>

      {showReplyForm && (
        <div className="w-full mt-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={3}
            placeholder="Scrivi la risposta admin..."
            className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded text-white text-sm font-inter focus:outline-none focus:border-gold-500 resize-none"
          />
          <div className="flex gap-2 mt-2 justify-end">
            <button
              onClick={() => setShowReplyForm(false)}
              className="px-3 py-1 text-xs text-stone-400 border border-stone-700 rounded hover:text-white transition-colors"
            >
              Annulla
            </button>
            <button
              onClick={handleReply}
              disabled={isSavingReply || !replyText.trim()}
              className="px-3 py-1 text-xs bg-gold-500 text-stone-950 font-semibold rounded hover:bg-gold-400 transition-colors disabled:opacity-50"
            >
              {isSavingReply ? 'Invio...' : 'Invia Risposta'}
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onConfirm={() => { setConfirmOpen(false); handleAction('delete'); }}
        onCancel={() => setConfirmOpen(false)}
        title="Eliminare recensione?"
        message="L'azione è irreversibile."
        confirmLabel="Elimina"
        variant="danger"
      />
    </div>
  );
}
