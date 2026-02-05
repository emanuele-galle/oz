'use client';

import { usePathname } from 'next/navigation';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Header, Footer } from '@/components/layout';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </SmoothScroll>
  );
}
