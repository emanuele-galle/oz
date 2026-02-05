'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ConfirmDialog } from '../../components/ConfirmDialog';

export function ProductActions({ productId }: { productId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = async () => {
    setConfirmOpen(false);
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Prodotto eliminato');
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || 'Errore durante l\'eliminazione');
      }
    } catch {
      toast.error('Errore di connessione');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDuplicate = async () => {
    setIsDuplicating(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}/duplicate`, {
        method: 'POST',
      });

      if (res.ok) {
        const data = await res.json();
        toast.success('Prodotto duplicato');
        router.push(`/admin/products/${data.productId}`);
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || 'Errore durante la duplicazione');
      }
    } catch {
      toast.error('Errore di connessione');
    } finally {
      setIsDuplicating(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDuplicate}
        disabled={isDuplicating}
        className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-sm rounded hover:bg-blue-500/20 transition-colors disabled:opacity-50 flex-shrink-0"
      >
        {isDuplicating ? 'Duplicando...' : 'Duplica'}
      </button>
      <button
        onClick={() => setConfirmOpen(true)}
        disabled={isDeleting}
        className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 text-sm rounded hover:bg-red-500/20 transition-colors disabled:opacity-50 flex-shrink-0"
      >
        {isDeleting ? 'Eliminando...' : 'Elimina'}
      </button>
      <ConfirmDialog
        open={confirmOpen}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        title="Eliminare prodotto?"
        message="L'azione è irreversibile e rimuoverà anche taglie, immagini e note olfattive."
        confirmLabel="Elimina"
        variant="danger"
      />
    </>
  );
}
