'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function QuickStockUpdate({ sizeId, currentStock }: { sizeId: string; currentStock: number }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(String(currentStock));
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const qty = parseInt(value);
    if (isNaN(qty) || qty < 0) return;
    if (qty === currentStock) {
      setEditing(false);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/products/stock', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sizeId, stockQuantity: qty }),
      });
      if (res.ok) {
        setEditing(false);
        toast.success('Stock aggiornato');
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
          if (e.key === 'Escape') { setValue(String(currentStock)); setEditing(false); }
        }}
        autoFocus
        disabled={saving}
        className="w-12 px-1 py-0.5 text-xs font-mono text-center bg-stone-700 border border-gold-500 rounded text-white focus:outline-none"
      />
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className={`text-xs font-mono cursor-pointer hover:underline ${currentStock <= 5 ? 'text-yellow-400' : 'text-stone-400'}`}
      title="Clicca per modificare stock"
    >
      {currentStock} pz
    </button>
  );
}
