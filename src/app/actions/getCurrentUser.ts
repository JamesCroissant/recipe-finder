import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return null
    }

    // get login user
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null
    }

    const { hashedPassword, ...rest } = currentUser;
    return {
      ...rest,
      createdAt: currentUser.createdAt?.toISOString(),
      updatedAt: currentUser.updatedAt?.toISOString() || null,
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    }
  } catch (error) {
    return null
  }
}