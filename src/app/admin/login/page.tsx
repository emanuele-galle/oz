'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Errore di autenticazione');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Errore di connessione');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-cinzel text-3xl text-gold-500 mb-2">OZ Extrait</h1>
          <p className="text-stone-400 text-sm font-inter">Pannello Amministrazione</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-inter text-stone-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded text-white font-inter text-sm focus:outline-none focus:border-gold-500 transition-colors"
              placeholder="admin@oz.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-inter text-stone-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded text-white font-inter text-sm focus:outline-none focus:border-gold-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gold-500 text-stone-950 font-inter text-sm font-semibold uppercase tracking-wide rounded hover:bg-gold-400 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>
      </div>
    </div>
  );
}
