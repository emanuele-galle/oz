'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const roles = [
  { value: 'CUSTOMER', label: 'Cliente' },
  { value: 'STAFF', label: 'Staff' },
  { value: 'ADMIN', label: 'Admin' },
];

export function RoleEditor({ userId, currentRole }: { userId: string; currentRole: string }) {
  const router = useRouter();
  const [role, setRole] = useState(currentRole);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (role === currentRole) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/customers/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        toast.success('Ruolo aggiornato');
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Errore nell\'aggiornamento');
      }
    } catch {
      toast.error('Errore di connessione');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
      <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">Gestione Ruolo</h3>
      <div className="space-y-3">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded text-white text-sm font-inter focus:outline-none focus:border-gold-500"
        >
          {roles.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
        <button
          onClick={handleSave}
          disabled={isSaving || role === currentRole}
          className="w-full py-2 bg-gold-500 text-stone-950 font-inter text-sm font-semibold rounded hover:bg-gold-400 transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Salvataggio...' : 'Salva Ruolo'}
        </button>
      </div>
    </div>
  );
}
