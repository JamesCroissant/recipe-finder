import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export const getUserFavorites = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return null
    }

    // get login user
    const response = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        favorites: true,
      },
    })

    if (!response) {
      return null
    }

    return response.favorites;
    
  } catch (error) {
    return null
  };
};
