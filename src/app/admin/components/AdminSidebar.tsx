'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Package, Star, BarChart3, Mail, LogOut } from 'lucide-react';

interface AdminSidebarProps {
  user: { name: string | null; email: string; role: string };
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Ordini', icon: ShoppingBag },
  { href: '/admin/products', label: 'Prodotti', icon: Package },
  { href: '/admin/reviews', label: 'Recensioni', icon: Star },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
];

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-stone-900 border-r border-stone-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-stone-800">
        <Link href="/admin" className="block">
          <h1 className="font-cinzel text-xl text-gold-500">OZ Admin</h1>
          <p className="text-xs text-stone-500 font-inter mt-1">Pannello di Gestione</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-inter transition-colors ${
                isActive
                  ? 'bg-gold-500/10 text-gold-500 font-medium'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
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
          className="flex items-center gap-3 px-4 py-2 w-full text-sm text-stone-400 hover:text-red-400 transition-colors font-inter rounded-lg hover:bg-stone-800"
        >
          <LogOut className="w-4 h-4" />
          Esci
        </button>
      </div>
    </aside>
  );
}
