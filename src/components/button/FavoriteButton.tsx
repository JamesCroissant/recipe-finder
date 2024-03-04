import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { useFavorite } from '@/hooks/useFavorite';
import { User } from '@prisma/client'
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";


export type favoriteButtonProps = {
  recipeId: number
  currentUser: User | null
}

const FavoriteButton: React.FC<favoriteButtonProps> = ({
  recipeId,
  currentUser
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    recipeId,
    currentUser
  });

  return (
    <>
      <form action="">
        <button
          className=""
          onClick={toggleFavorite}
        >
          {hasFavorited ? (
            <MdOutlineFavorite
              size={24}
              className="fill-rose-500 hover:opacity-80"
            />
          ) : (
            <MdOutlineFavoriteBorder
              size={24}
              className="fill-slate-500 hover:opacity-80"
            />
          )}
        </button>
      </form>
    </>
    
  )
}

export default FavoriteButton