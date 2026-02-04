'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function NewsletterActions({ subscriberId, active }: { subscriberId: string; active: boolean }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/newsletter/${subscriberId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      });
      if (res.ok) router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Eliminare questo iscritto?')) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/newsletter/${subscriberId}`, {
        method: 'DELETE',
      });
      if (res.ok) router.refresh();
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
        onClick={handleDelete}
        disabled={isLoading}
        className="px-3 py-1 text-xs bg-red-500/10 text-red-400 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors disabled:opacity-50"
      >
        Elimina
      </button>
    </div>
  );
}
