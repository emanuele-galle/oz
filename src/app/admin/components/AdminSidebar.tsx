'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Package, Star, BarChart3, Mail, Users, Activity, LogOut, Menu, X } from 'lucide-react';

interface AdminSidebarProps {
  user: { name: string | null; email: string; role: string };
  badges?: { orders: number; reviews: number };
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, badgeKey: null },
  { href: '/admin/orders', label: 'Ordini', icon: ShoppingBag, badgeKey: 'orders' as const },
  { href: '/admin/products', label: 'Prodotti', icon: Package, badgeKey: null },
  { href: '/admin/reviews', label: 'Recensioni', icon: Star, badgeKey: 'reviews' as const },
  { href: '/admin/customers', label: 'Clienti', icon: Users, badgeKey: null },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, badgeKey: null },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail, badgeKey: null },
  { href: '/admin/activity', label: 'Attività', icon: Activity, badgeKey: null },
];

export function AdminSidebar({ user, badges }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-stone-800">
        <Link href="/admin" className="block" onClick={() => setMobileOpen(false)}>
          <h1 className="font-cinzel text-xl text-gold-500">OZ Admin</h1>
          <p className="text-xs text-stone-500 font-inter mt-1">Pannello di Gestione</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          const badgeCount = item.badgeKey && badges ? badges[item.badgeKey] : 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-inter transition-colors ${
                isActive
                  ? 'bg-gold-500/10 text-gold-500 font-medium'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {badgeCount > 0 && (
                <span className="min-w-5 h-5 flex items-center justify-center px-1.5 text-xs font-semibold bg-red-500 text-white rounded-full">
                  {badgeCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User info + Logout */}
      <div className="p-4 border-t border-stone-800">
        <div className="mb-3 px-4">
          <p className="text-sm text-white font-inter truncate">{user.name || user.email}</p>
          <p className="text-xs text-stone-500 font-inter">{user.role}</p>
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 px-4 py-2 w-full text-sm text-stone-400 hover:text-red-400 transition-colors font-inter rounded-lg hover:bg-stone-800 disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" />
          {isLoggingOut ? 'Uscita...' : 'Esci'}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-stone-900 border border-stone-800 rounded-lg text-stone-400 hover:text-white"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-stone-900 border-r border-stone-800 flex-col z-40">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed left-0 top-0 h-screen w-64 bg-stone-900 border-r border-stone-800 flex flex-col z-50 md:hidden">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
