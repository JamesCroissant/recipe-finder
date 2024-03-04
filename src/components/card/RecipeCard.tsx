'use client';

import Image from 'next/image';
import FavoriteButton from '@/components/button/FavoriteButton';
import { User } from '@prisma/client';
import { Recipe } from '@/types/recipeType';
import { getCurrentUser } from '@/app/actions/getCurrentUser';


type RecipeCardProps = {
  recipe: Recipe;
  onSelect: (recipeId: number) => void;
  currentUser: User | null;
};

export const RecipeCard = ({recipe, onSelect, currentUser }: RecipeCardProps) => {
  return (
    <>
      <div className="flex justify-center items-center relative">
        <div 
          key={recipe.id}
          className="max-w-xs space-y-3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 transition-transform duration-300 transform hover:scale-100"
          onClick={() => onSelect(recipe.id)}
        >
          <Image 
            src={recipe.image} 
            alt={recipe.title}
            width={500}  
            height={300}
            className="rounded-xl"
          />
          <h3>{recipe.title}</h3>
        </div>
        <div className="absolute bottom-10 right-8">
          <FavoriteButton 
            recipeId={recipe.id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}