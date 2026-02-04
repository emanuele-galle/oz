import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getAdminUser } from '@/lib/admin/auth';
import { AdminSidebar } from './components/AdminSidebar';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isLoginPage = pathname === '/admin/login';

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

  return (
    <div className="min-h-screen bg-stone-950 flex">
      <AdminSidebar user={{ name: user.name, email: user.email, role: user.role }} />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
