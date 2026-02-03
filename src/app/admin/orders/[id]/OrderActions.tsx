'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderActionsProps {
  orderId: string;
  currentStatus: string;
  trackingNumber: string | null;
  carrier: string | null;
  adminNotes: string | null;
  statusLabels: Record<string, string>;
}

export function OrderActions({ orderId, currentStatus, trackingNumber, carrier, adminNotes, statusLabels }: OrderActionsProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [tracking, setTracking] = useState(trackingNumber || '');
  const [carrierInput, setCarrierInput] = useState(carrier || '');
  const [notes, setNotes] = useState(adminNotes || '');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          trackingNumber: tracking || null,
          carrier: carrierInput || null,
          adminNotes: notes || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error || 'Errore durante il salvataggio');
        return;
      }

      setMessage('Salvato con successo');
      router.refresh();
    } catch {
      setMessage('Errore di connessione');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
      <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">Azioni</h3>

      <div className="space-y-4">
        {/* Status */}
        <div>
          <label className="block text-stone-400 text-xs mb-1 font-inter">Stato</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded text-white text-sm font-inter focus:outline-none focus:border-gold-500"
          >
            {Object.entries(statusLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Tracking */}
        <div>
          <label className="block text-stone-400 text-xs mb-1 font-inter">Numero Tracking</label>
          <input
            type="text"
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded text-white text-sm font-inter focus:outline-none focus:border-gold-500"
            placeholder="AB123456789IT"
          />
        </div>

        {/* Carrier */}
        <div>
          <label className="block text-stone-400 text-xs mb-1 font-inter">Corriere</label>
          <input
            type="text"
            value={carrierInput}
            onChange={(e) => setCarrierInput(e.target.value)}
            className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded text-white text-sm font-inter focus:outline-none focus:border-gold-500"
            placeholder="Poste Italiane, BRT, GLS..."
          />
        </div>

        {/* Admin Notes */}
        <div>
          <label className="block text-stone-400 text-xs mb-1 font-inter">Note Interne</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded text-white text-sm font-inter focus:outline-none focus:border-gold-500 resize-none"
            placeholder="Note visibili solo agli admin..."
          />
        </div>

        {message && (
          <p className={`text-xs ${message.includes('successo') ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-2 bg-gold-500 text-stone-950 font-inter text-sm font-semibold rounded hover:bg-gold-400 transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Salvataggio...' : 'Salva Modifiche'}
        </button>
      </div>
    </div>
  );
}
