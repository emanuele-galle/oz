'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ConfirmDialog } from '../components/ConfirmDialog';

export function NewsletterActions({ subscriberId, active }: { subscriberId: string; active: boolean }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/newsletter/${subscriberId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      });
      if (res.ok) {
        toast.success(active ? 'Iscritto disattivato' : 'Iscritto riattivato');
        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setConfirmOpen(false);
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/newsletter/${subscriberId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Iscritto eliminato');
        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`px-3 py-1 text-xs border rounded transition-colors disabled:opacity-50 ${
          active
            ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20'
            : 'bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20'
        }`}
      >
        {active ? 'Disattiva' : 'Attiva'}
      </button>
      <button
        onClick={() => setConfirmOpen(true)}
        disabled={isLoading}
        className="px-3 py-1 text-xs bg-red-500/10 text-red-400 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors disabled:opacity-50"
      >
        Elimina
      </button>
      <ConfirmDialog
        open={confirmOpen}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        title="Eliminare iscritto?"
        message="L'iscritto verrà rimosso dalla newsletter."
        confirmLabel="Elimina"
        variant="danger"
      />
    </div>
  );
}
