'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const presets = [
  { label: '7 giorni', days: 7 },
  { label: '30 giorni', days: 30 },
  { label: '90 giorni', days: 90 },
];

export function DateRangePicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  const setRange = (fromDate: string, toDate: string) => {
    const params = new URLSearchParams();
    if (fromDate) params.set('from', fromDate);
    if (toDate) params.set('to', toDate);
    const qs = params.toString();
    router.push(`/admin/analytics${qs ? `?${qs}` : ''}`);
  };

  const handlePreset = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    setRange(start.toISOString().slice(0, 10), end.toISOString().slice(0, 10));
  };

  const isPresetActive = (days: number) => {
    if (!from || !to) return days === 30; // default
    const start = new Date(from);
    const end = new Date(to);
    const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff === days;
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Presets */}
      {presets.map((p) => (
        <button
          key={p.days}
          onClick={() => handlePreset(p.days)}
          className={`px-3 py-1.5 text-xs font-inter rounded-full border transition-colors ${
            isPresetActive(p.days)
              ? 'border-gold-500 bg-gold-500/10 text-gold-500'
              : 'border-stone-700 text-stone-400 hover:text-white hover:border-stone-500'
          }`}
        >
          {p.label}
        </button>
      ))}

      {/* Custom dates */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={from}
          onChange={(e) => setRange(e.target.value, to || new Date().toISOString().slice(0, 10))}
          className="px-2 py-1.5 bg-stone-800 border border-stone-700 rounded text-white text-xs font-inter focus:outline-none focus:border-gold-500"
        />
        <span className="text-stone-500 text-xs">—</span>
        <input
          type="date"
          value={to}
          onChange={(e) => setRange(from || new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10), e.target.value)}
          className="px-2 py-1.5 bg-stone-800 border border-stone-700 rounded text-white text-xs font-inter focus:outline-none focus:border-gold-500"
        />
      </div>
    </div>
  );
}
