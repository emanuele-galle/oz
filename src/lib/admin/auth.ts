import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const SESSION_COOKIE = 'oz_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create admin session - stores session token as httpOnly cookie
 */
export async function createAdminSession(userId: string): Promise<string> {
  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + SESSION_MAX_AGE * 1000);

  await prisma.session.create({
    data: {
      sessionToken: token,
      userId,
      expires,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });

  return token;
}

/**
 * Get current admin user from session cookie
 * Returns null if not authenticated or not admin/staff
 */
export async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { sessionToken: token },
    include: { user: true },
  });

  if (!session || session.expires < new Date()) {
    // Clean up expired session
    if (session) {
      await prisma.session.delete({ where: { sessionToken: token } }).catch(() => {});
    }
    return null;
  }

  // Only ADMIN and STAFF roles can access admin panel
  if (session.user.role !== 'ADMIN' && session.user.role !== 'STAFF') {
    return null;
  }

  return session.user;
}

/**
 * Destroy admin session
 */
export async function destroyAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await prisma.session.delete({ where: { sessionToken: token } }).catch(() => {});
    cookieStore.delete(SESSION_COOKIE);
  }
}
