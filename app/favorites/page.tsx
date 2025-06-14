"use client"

import { useAuth } from "@/context/auth-context"
import { useRecipes } from "@/context/recipe-context"
import RecipeCard from "@/components/recipe-card"
import LoadingShimmer from "@/components/loading-shimmer"
import { Heart, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FavoritesPage() {
  const { user } = useAuth()
  const { favoriteRecipes, loading } = useRecipes()

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-xl font-bold mb-3">Sign In Required</h1>
        <p className="text-muted-foreground mb-6 text-center text-sm">Please sign in to view your favorite recipes.</p>
        <Button asChild className="rounded-full">
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <LoadingShimmer key={i} />
          ))}
        </div>
      ) : favoriteRecipes.length > 0 ? (
        <div className="space-y-4">
          <div className="space-y-4">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">No favorites yet</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Start generating recipes and save your favorites to see them here.
          </p>
          <Button asChild className="rounded-full">
            <Link href="/">Generate Recipes</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
