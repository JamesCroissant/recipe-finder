'use client'

import { Recipe } from '@/types/recipeType'
import { RecipeCard } from './RecipeCard'

import { getCurrentUser } from '@/app/actions/getCurrentUser'


export type RecipeListProps = {
  recipes: Recipe[];
  onRecipeSelect: (recipeId: number) => void;
}

export const RecipeList = async ({ recipes, onRecipeSelect }: RecipeListProps) => {
  const currentUser = await getCurrentUser()
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:grid-cols-4 items-center justify-center mt-6 mx-6">
        {recipes.map((recipe) => (
          <RecipeCard
            recipe={recipe}
            onSelect={onRecipeSelect}
            currentUser={currentUser}
          />
        ))}
      </div>
    </>
  )
}