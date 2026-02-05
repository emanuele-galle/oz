import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getAdminUser } from '@/lib/admin/auth';
import { prisma } from '@/lib/prisma';
import { AdminSidebar } from './components/AdminSidebar';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isLoginPage = pathname === '/admin/login' || pathname === '';

  const user = await getAdminUser();

  if (!user && !isLoginPage) {
    redirect('/admin/login');
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-950">
        {children}
      </div>
    );
  }

  // Fetch badge counts
  const [pendingOrders, pendingReviews] = await Promise.all([
    prisma.order.count({ where: { status: 'PENDING' } }),
    prisma.review.count({ where: { approved: false } }),
  ]);

  return (
    <div className="min-h-screen bg-stone-950 flex">
      <AdminSidebar
        user={{ name: user.name, email: user.email, role: user.role }}
        badges={{ orders: pendingOrders, reviews: pendingReviews }}
      />
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
