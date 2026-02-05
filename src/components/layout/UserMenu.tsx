'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

interface UserMenuProps {
  iconClass: string;
  hoverClass: string;
}

export function UserMenu({ iconClass, hoverClass }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isInitialized, fetchUser, logout } = useAuthStore();

  // Fetch user on mount
  useEffect(() => {
    if (!isInitialized) {
      fetchUser();
    }
  }, [isInitialized, fetchUser]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    window.location.href = '/';
  };

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'STAFF';

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative p-2"
        aria-label={user ? 'Account' : 'Accedi'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cn("h-5 w-5 transition-colors duration-300", iconClass, hoverClass)}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        {/* Logged in indicator */}
        {user && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-gold-500 rounded-full" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute right-0 top-full mt-3 w-64 bg-white border border-stone-100 shadow-xl shadow-black/5 overflow-hidden z-50"
          >
            {user ? (
              <>
                {/* User info */}
                <div className="px-5 py-4 border-b border-stone-100 bg-cream-50">
                  <p className="font-inter text-sm font-medium text-stone-800 truncate">
                    {user.name || 'Il mio account'}
                  </p>
                  <p className="font-inter text-xs text-stone-400 truncate mt-0.5">
                    {user.email}
                  </p>
                </div>

                <div className="py-2">
                  <Link
                    href="/account"
                    className="flex items-center gap-3 px-5 py-2.5 font-inter text-sm text-stone-600 hover:text-gold-600 hover:bg-cream-50 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    Il Mio Profilo
                  </Link>
                  <Link
                    href="/account/orders"
                    className="flex items-center gap-3 px-5 py-2.5 font-inter text-sm text-stone-600 hover:text-gold-600 hover:bg-cream-50 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    I Miei Ordini
                  </Link>

                  {isAdmin && (
                    <>
                      <div className="mx-4 my-1 h-px bg-stone-100" />
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-5 py-2.5 font-inter text-sm text-gold-600 hover:bg-cream-50 transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Pannello Admin
                      </Link>
                    </>
                  )}

                  <div className="mx-4 my-1 h-px bg-stone-100" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-5 py-2.5 font-inter text-sm text-stone-500 hover:text-red-600 hover:bg-red-50/50 transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    Esci
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="px-5 py-4 border-b border-stone-100 bg-cream-50">
                  <p className="font-inter text-sm font-medium text-stone-700">
                    Benvenuto in OZ
                  </p>
                  <p className="font-inter text-xs text-stone-400 mt-0.5">
                    Accedi o crea un account
                  </p>
                </div>

                <div className="p-4 space-y-2.5">
                  <Link
                    href="/account/login"
                    className="block w-full py-2.5 bg-stone-900 text-white text-center font-inter text-sm font-medium tracking-wide hover:bg-stone-800 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Accedi
                  </Link>
                  <Link
                    href="/account/register"
                    className="block w-full py-2.5 border border-stone-200 text-stone-700 text-center font-inter text-sm font-medium tracking-wide hover:border-gold-500 hover:text-gold-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Crea Account
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
