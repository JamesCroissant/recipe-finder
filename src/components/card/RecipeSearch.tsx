'use client'

import { FormEvent, useState } from 'react'

type RecipeSearchProps = {
  onSearch: (query: string) => void;
}

export const RecipeSearch = ({ onSearch }: RecipeSearchProps) => {
  const [ingredient, setIngredient] = useState<string>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    onSearch(ingredient)
  }

  return (
    <>
      <div className="flex flex-col items-center pt-4">
        <h2 className="text-lg md:text-xl font-medium">input the ingredient for searching recipe </h2>
        <form 
          className="flex flex-col items-center space-y-3 shadow-md rounded px-8 pt-6 pb-8 my-6" 
          onSubmit={handleSubmit}
        >
          <input 
            type="text"
            name="ingredient" 
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Enter ingredient"
            className="border-1 border-green-500 shadow appearance-none border rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button 
            className="border-1 border-black bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded focus:outline-none focus:shadow-outline" 
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}