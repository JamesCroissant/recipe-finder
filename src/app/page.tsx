'use client'

import { useState } from 'react'

import { Recipe } from '@/types/recipeType'
import { RecipeDetail } from '@/types/recipeType'

import { RecipeList } from '@/components/card/RecipeList'
import { RecipeSearch }  from '@/components/card/RecipeSearch'
import { RecipeDetailModal } from '@/components/card/RecipeDetailModal'

import NotFound from '@/app/not-found'
import Loading  from '@/app/loading'


export default function Home() {
  const [open, setOpen] = useState<boolean>(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState<RecipeDetail | null>(null)


  const fetchRecipes = async (ingredient: string) => {
    if (!ingredient) return
    try {
      setLoading(true)
      setHasSearched(true)
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=20&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data  = await response.json()
      const formattedData = data.map((recipe: any) => ({
        ...recipe,
        recipeId: recipe.id,
      }))
      setRecipes(formattedData)
      setLoading(false)

    } catch (error) {
      console.error('Fetch error:', error)
      setLoading(false)
    }
  }

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
          onSearch={fetchRecipes}
        />

        {loading ? (
          <Loading />
        ) : hasSearched && recipes.length > 0 ? (
          <RecipeList
            recipes={recipes}
            onRecipeSelect={fetchRecipeDetail}
          />
        ) : hasSearched && recipes?.length === 0 ? (
          <NotFound />
        ) : null}

        <RecipeDetailModal 
          recipeDetail={selectedRecipeDetail} 
          open={open} 
          onClose={handleClose} 
        />

      </main>
    </>
  )
}