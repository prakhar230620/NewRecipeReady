"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Recipe } from "@/lib/types"
import { supabase } from "@/lib/supabase"
import { useAuth } from "./auth-context"
import toast from "react-hot-toast"

interface RecipeContextType {
  favoriteRecipes: Recipe[]
  generatedRecipes: Recipe[]
  addToFavorites: (recipe: Recipe) => Promise<void>
  removeFromFavorites: (recipeId: string) => Promise<void>
  isFavorite: (recipeId: string) => boolean
  addGeneratedRecipe: (recipe: Recipe) => void
  clearGeneratedRecipes: () => void
  clearAllGeneratedRecipes: () => void
  loading: boolean
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([])
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchFavoriteRecipes()
    } else {
      setFavoriteRecipes([])
    }
  }, [user])

  useEffect(() => {
    // Load generated recipes from localStorage
    const storedRecipes = localStorage.getItem("generated-recipes")
    if (storedRecipes) {
      try {
        const recipes = JSON.parse(storedRecipes)
        setGeneratedRecipes(recipes)
      } catch (error) {
        console.error("Error loading stored recipes:", error)
      }
    }
  }, [])

  const fetchFavoriteRecipes = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase.from("favorite_recipes").select("*").eq("user_id", user.id)

      if (error) throw error

      const recipes = data?.map((item) => item.recipe_data) || []
      setFavoriteRecipes(recipes)
    } catch (error) {
      console.error("Error fetching favorite recipes:", error)
      toast.error("Failed to load favorite recipes")
    } finally {
      setLoading(false)
    }
  }

  const addToFavorites = async (recipe: Recipe) => {
    if (!user) {
      toast.error("Please sign in to save favorites")
      return
    }

    try {
      const { error } = await supabase.from("favorite_recipes").insert({
        user_id: user.id,
        recipe_data: recipe,
      })

      if (error) throw error

      setFavoriteRecipes((prev) => [...prev, recipe])
      toast.success("Recipe added to favorites! ❤️")
    } catch (error) {
      console.error("Error adding to favorites:", error)
      toast.error("Failed to add to favorites")
    }
  }

  const removeFromFavorites = async (recipeId: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from("favorite_recipes")
        .delete()
        .eq("user_id", user.id)
        .eq("recipe_data->>id", recipeId)

      if (error) throw error

      setFavoriteRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId))
      toast.success("Recipe removed from favorites! 💔")
    } catch (error) {
      console.error("Error removing from favorites:", error)
      toast.error("Failed to remove from favorites")
    }
  }

  const isFavorite = (recipeId: string) => {
    return favoriteRecipes.some((recipe) => recipe.id === recipeId)
  }

  const addGeneratedRecipe = (recipe: Recipe) => {
    const updatedRecipes = [recipe, ...generatedRecipes]
    setGeneratedRecipes(updatedRecipes)

    // Store in localStorage
    try {
      localStorage.setItem("generated-recipes", JSON.stringify(updatedRecipes))
    } catch (error) {
      console.error("Error storing recipe:", error)
    }
  }

  const clearGeneratedRecipes = () => {
    // Only clear recipes that are not favorited
    const favoritedIds = favoriteRecipes.map((r) => r.id)
    const filteredRecipes = generatedRecipes.filter((recipe) => favoritedIds.includes(recipe.id))

    setGeneratedRecipes(filteredRecipes)

    try {
      localStorage.setItem("generated-recipes", JSON.stringify(filteredRecipes))
    } catch (error) {
      console.error("Error clearing recipes:", error)
    }
  }

  const clearAllGeneratedRecipes = () => {
    // Clear all generated recipes regardless of favorite status
    setGeneratedRecipes([])

    try {
      localStorage.removeItem("generated-recipes")
    } catch (error) {
      console.error("Error clearing all recipes:", error)
    }
  }

  return (
    <RecipeContext.Provider
      value={{
        favoriteRecipes,
        generatedRecipes,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        addGeneratedRecipe,
        clearGeneratedRecipes,
        clearAllGeneratedRecipes,
        loading,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}

export function useRecipes() {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    throw new Error("useRecipes must be used within a RecipeProvider")
  }
  return context
}
