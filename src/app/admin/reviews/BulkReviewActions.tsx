'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function BulkReviewActions({ reviewIds }: { reviewIds: string[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === reviewIds.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(reviewIds));
    }
  };

  const handleBulkAction = async (action: 'approve' | 'delete') => {
    if (selected.size === 0) return;
    if (action === 'delete' && !confirm(`Eliminare ${selected.size} recensioni? L'azione è irreversibile.`)) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/reviews/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selected), action }),
      });
      if (res.ok) {
        setSelected(new Set());
        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selected,
    toggleSelect,
    toggleAll,
    isLoading,
    handleBulkAction,
    hasSelection: selected.size > 0,
  };
}

// Wrapper component for the bulk action bar
export function BulkActionBar({
  selectedCount,
  onApprove,
  onDelete,
  isLoading,
}: {
  selectedCount: number;
  onApprove: () => void;
  onDelete: () => void;
  isLoading: boolean;
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-800 border border-stone-700 rounded-lg shadow-xl px-6 py-3 flex items-center gap-4">
      <span className="text-white text-sm font-inter">{selectedCount} selezionate</span>
      <button
        onClick={onApprove}
        disabled={isLoading}
        className="px-4 py-2 text-xs bg-green-500/10 text-green-400 border border-green-500/30 rounded hover:bg-green-500/20 transition-colors disabled:opacity-50"
      >
        Approva Selezionate
      </button>
      <button
        onClick={onDelete}
        disabled={isLoading}
        className="px-4 py-2 text-xs bg-red-500/10 text-red-400 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors disabled:opacity-50"
      >
        Elimina Selezionate
      </button>
    </div>
  );
}

// Checkbox component
export function ReviewCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 rounded border-stone-600 bg-stone-800 text-gold-500 focus:ring-gold-500 focus:ring-offset-stone-900 cursor-pointer"
    />
  );
}
