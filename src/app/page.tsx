'use client'

import { useState } from 'react'
import { Suspense } from 'react'
import { useFormState } from 'react-dom'

import { fetchRecipe } from '@/lib/service/getFetchRecipe'
import { Recipe } from '@/types/recipeType'
import { RecipeDetail } from '@/types/recipeType'

import { RecipeList } from '@/components/card/RecipeList'
import { RecipeSearch }  from '@/components/card/RecipeSearch'
import { RecipeDetailModal } from '@/components/card/RecipeDetailModal'

import NotFound from '@/app/not-found'
import Loading  from '@/app/loading'

export default function Home() {
  const [open, setOpen] = useState<boolean>(false)
  const [recipeState, dispatch] = useFormState(fetchRecipe, [])
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState<RecipeDetail | null>(null)

  const fetchRecipeDetail = async (recipeId: number) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setSelectedRecipeDetail({
        recipeId: recipeId,
        title: data.title,
        summary: data.summary,
        instructions: data.instructions,
        sourceUrl: data.sourceUrl,
      });
      setOpen(true);
    } catch (error) {
      console.error('Fetch error:', error)
      return null
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <main className="mx-auto px-1 py-5">
        <RecipeSearch
          onSearch={dispatch}
        />

        <Suspense fallback={<Loading />}>
          <RecipeList
            recipes={recipeState}
            onRecipeSelect={fetchRecipeDetail}
          />
        </Suspense>

        <RecipeDetailModal 
          recipeDetail={selectedRecipeDetail} 
          open={open} 
          onClose={handleClose} 
        />

      </main>
    </>
  )
}