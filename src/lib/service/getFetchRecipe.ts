"use server"

export const fetchRecipe = async (prevState: string, formData: FormData) => {   // prevStateはuseFormStateのinitialValue
  const ingredient = formData.get("ingredient")
  if (!ingredient) return
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=20&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data  = await response.json()
    const formattedData = data.map((recipe: any) => ({
      ...recipe,
      recipeId: recipe.id,
    }))
    
    return formattedData
  } catch (error) {
    console.error('Fetch error:', error)
  }
}