'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function ReviewActions({ reviewId, approved }: { reviewId: string; approved: boolean }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: 'approve' | 'reject' | 'delete') => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: action === 'delete' ? 'DELETE' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (res.ok) {
        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        onClick={() => handleAction('delete')}
        disabled={isLoading}
        className="px-3 py-1 text-xs bg-red-500/10 text-red-400 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors disabled:opacity-50"
      >
        Elimina
      </button>
    </div>
  );
}
