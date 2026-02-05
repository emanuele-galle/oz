'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AccountPage() {
  const router = useRouter();
  const { user, isInitialized, fetchUser, logout } = useAuthStore();
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isInitialized) fetchUser();
  }, [isInitialized, fetchUser]);

  useEffect(() => {
    if (isInitialized && !user) {
      router.push('/account/login');
    }
    if (user) {
      setName(user.name || '');
    }
  }, [isInitialized, user, router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    setError('');

    try {
      const body: Record<string, string> = { name };
      if (newPassword) {
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
      }

      const res = await fetch('/api/account/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Errore durante il salvataggio');
        return;
      }

      setMessage('Profilo aggiornato con successo');
      setCurrentPassword('');
      setNewPassword('');
      // Refresh user data
      await fetchUser();
    } catch {
      setError('Errore di connessione');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (!isInitialized || !user) {
    return (
      <div className="min-h-screen bg-[#FEFDFB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cinzel text-4xl text-gold-500/60 animate-pulse">OZ</h1>
        </div>
      </div>
    );
  }

  const isAdmin = user.role === 'ADMIN' || user.role === 'STAFF';

  return (
    <div className="min-h-screen bg-[#FEFDFB] py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-cinzel text-3xl md:text-4xl text-stone-900 mb-2">Il Mio Account</h1>
          <p className="font-inter text-sm text-stone-500">
            Benvenuto, {user.name || user.email}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mb-10 pb-6 border-b border-stone-200/60">
          <Link
            href="/account"
            className="font-inter text-sm font-medium text-gold-600 border-b-2 border-gold-500 pb-2"
          >
            Profilo
          </Link>
          <Link
            href="/account/orders"
            className="font-inter text-sm text-stone-500 hover:text-stone-700 transition-colors pb-2"
          >
            Ordini
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="font-inter text-sm text-stone-500 hover:text-gold-600 transition-colors pb-2"
            >
              Pannello Admin
            </Link>
          )}
        </div>

        {/* Profile Form */}
        <div className="bg-white border border-stone-200/60 p-6 md:p-8">
          <h2 className="font-cinzel text-lg text-stone-800 mb-6">Informazioni Personali</h2>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            {message && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm font-inter">
                {message}
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm font-inter">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-inter text-stone-600 mb-1.5">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 text-stone-400 font-inter text-sm cursor-not-allowed"
              />
              <p className="text-xs text-stone-400 mt-1 font-inter">L&apos;email non può essere modificata</p>
            </div>

            <div>
              <label className="block text-sm font-inter text-stone-600 mb-1.5">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-stone-200 text-stone-900 font-inter text-sm focus:outline-none focus:border-gold-500 transition-colors"
                placeholder="Il tuo nome"
              />
            </div>

            <div className="pt-4 border-t border-stone-100">
              <h3 className="font-inter text-sm font-medium text-stone-700 mb-4">Cambia Password</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-inter text-stone-600 mb-1.5">Password Attuale</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-stone-200 text-stone-900 font-inter text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="Lascia vuoto per non cambiarla"
                  />
                </div>

                <div>
                  <label className="block text-sm font-inter text-stone-600 mb-1.5">Nuova Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-stone-200 text-stone-900 font-inter text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="Minimo 8 caratteri"
                    minLength={8}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 sm:px-8 py-3 bg-stone-900 text-white font-inter text-base sm:text-sm font-medium uppercase tracking-wider hover:bg-stone-800 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Salvataggio...' : 'Salva Modifiche'}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="font-inter text-sm text-stone-400 hover:text-red-600 transition-colors"
              >
                Esci dall&apos;account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
