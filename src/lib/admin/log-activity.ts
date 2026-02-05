import { prisma } from '@/lib/prisma';

export async function logActivity(
  userId: string,
  action: string,
  target?: { type: string; id: string },
  details?: Record<string, any>
) {
  try {
    await prisma.activityLog.create({
      data: {
        userId,
        action,
        targetType: target?.type || null,
        targetId: target?.id || null,
        details: details ? JSON.stringify(details) : null,
      },
    });
  } catch (error) {
    // Non-blocking: log error but don't fail the parent operation
    console.error('Failed to log activity:', error);
  }
}
