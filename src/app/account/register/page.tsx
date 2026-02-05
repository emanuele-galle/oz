'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function RegisterPage() {
  const router = useRouter();
  const { user, register, isLoading, isInitialized, fetchUser } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isInitialized) fetchUser();
  }, [isInitialized, fetchUser]);

  useEffect(() => {
    if (isInitialized && user) {
      router.push('/account');
    }
  }, [isInitialized, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Le password non corrispondono');
      return;
    }

    if (password.length < 8) {
      setError('La password deve avere almeno 8 caratteri');
      return;
    }

    const result = await register(email, password, name);
    if (result.success) {
      router.push('/account');
    } else {
      setError(result.error || 'Errore durante la registrazione');
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFDFB] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-cinzel text-3xl text-stone-900 mb-2">Crea Account</h1>
          <p className="text-stone-500 text-sm font-inter">
            Unisciti al mondo OZ Extrait
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm text-center font-inter">
              {error}
            </div>
          )}

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

          <div>
            <label className="block text-sm font-inter text-stone-600 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-stone-200 text-stone-900 font-inter text-sm focus:outline-none focus:border-gold-500 transition-colors"
              placeholder="il-tuo@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-inter text-stone-600 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-stone-200 text-stone-900 font-inter text-sm focus:outline-none focus:border-gold-500 transition-colors"
              placeholder="Minimo 8 caratteri"
              required
              minLength={8}
            />
          </div>

          <div>
            <label className="block text-sm font-inter text-stone-600 mb-1.5">Conferma Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-stone-200 text-stone-900 font-inter text-sm focus:outline-none focus:border-gold-500 transition-colors"
              placeholder="Ripeti la password"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-stone-900 text-white font-inter text-sm font-medium uppercase tracking-wider hover:bg-stone-800 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Registrazione...' : 'Crea Account'}
          </button>
        </form>

        <p className="text-center mt-6 font-inter text-sm text-stone-500">
          Hai già un account?{' '}
          <Link href="/account/login" className="text-gold-600 hover:text-gold-500 font-medium">
            Accedi
          </Link>
        </p>
      </div>
    </div>
  );
}
