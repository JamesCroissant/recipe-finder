import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { User } from '@prisma/client'
import { useLoginModal } from './useLoginModal'
import { getCurrentUser } from '@/app/actions/getCurrentUser'

type IUseFavorite = {
  recipeId: number;
  currentUser?: User | null
}

export const useFavorite = ({
  recipeId,
  currentUser
}: IUseFavorite) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favorites || [];

    return list.includes(recipeId)
  }, [currentUser, recipeId])

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
  
    if (!currentUser) {
      return loginModal.onOpen();
    }
  
    try {
      let response;
  
      if (hasFavorited) {
        response = await fetch(`/api/favorites/${recipeId}`, { method: 'DELETE' });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        router.refresh();
        toast.success('Successfully deleted to favorites!');
      } else {
        response = await fetch(`/api/favorites/${recipeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ key: 'value' })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        router.refresh();
        toast.success('Successfully added to favorites!');
      }

    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  }, [
    currentUser,
    hasFavorited,
    recipeId,
    loginModal,
    router,
  ]);
  
  return {
    hasFavorited,
    toggleFavorite
  }
}

