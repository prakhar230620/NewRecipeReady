"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { RecipeFilters } from "@/lib/types"
import FilterPanel from "./filter-panel"
import LoadingShimmer from "./loading-shimmer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, AlertCircle, Trash2, ChefHat, Settings } from "lucide-react"
import { useGroqRecipe } from "@/hooks/use-groq-recipe"
import { useRecipes } from "@/context/recipe-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import toast from "react-hot-toast"

export default function RecipeGenerator() {
  const router = useRouter()
  const [ingredients, setIngredients] = useState("")
  const [filters, setFilters] = useState<RecipeFilters>({
    servings: 2,
    dietary: "",
    cuisine: "",
    spiceLevel: "",
    mealType: "",
    cookTime: "",
    healthProfile: "",
    difficulty: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { generateRecipe, loading } = useGroqRecipe()
  const { addGeneratedRecipe, clearGeneratedRecipes, generatedRecipes, clearAllGeneratedRecipes } = useRecipes()

  const handleGenerate = async () => {
    if (!ingredients.trim()) {
      setError("Please tell me what you want to cook or what ingredients you have")
      return
    }

    setError(null)

    try {
      const recipe = await generateRecipe(ingredients, filters)
      if (recipe) {
        clearGeneratedRecipes()
        addGeneratedRecipe(recipe)
        router.push(`/recipe/${recipe.id}`)
        setIngredients("")
        toast.success("Perfect recipe created! 🍳✨")
      }
    } catch (error) {
      console.error("Error generating recipe:", error)
      setError("Couldn't create your recipe. Please try again!")
    }
  }

  const handleClearRecent = () => {
    clearAllGeneratedRecipes()
    toast.success("All recipes cleared! 🗑️")
  }

  const quickSuggestions = [
    "I have potatoes, make me something delicious",
    "Quick breakfast with eggs",
    "Healthy dinner for weight loss",
    "Spicy Indian curry recipe",
    "Easy pasta for 4 people",
    "Chocolate dessert recipe",
  ]

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-card rounded-3xl p-6 shadow-lg border-2 mobile-card">
        <div className="space-y-5">
          {error && (
            <Alert variant="destructive" className="rounded-2xl">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Tell me what you want to cook! Examples:
• I have chicken and rice, make me a recipe
• मुझे बिरयानी बनाना है (I want to make biryani)
• Quick breakfast ideas
• Healthy dinner for 4 people
• Something spicy with potatoes"
                value={ingredients}
                onChange={(e) => {
                  setIngredients(e.target.value)
                  if (error) setError(null)
                }}
                className="min-h-[100px] text-base rounded-2xl border-2 focus:border-primary resize-none"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleGenerate()
                  }
                }}
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                Press Enter to generate • Shift+Enter for new line
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">💡 Quick Ideas:</p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs rounded-full border-dashed hover:border-primary"
                    onClick={() => setIngredients(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                size="sm"
                className="flex-1 rounded-2xl h-12 border-2"
              >
                <Settings className="h-4 w-4 mr-2" />
                {showFilters ? "Hide Options" : "More Options"}
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={loading || !ingredients.trim()}
                size="sm"
                className="flex-2 rounded-2xl h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 min-w-[140px]"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Create Recipe
                  </>
                )}
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="pt-4 border-t-2 border-dashed">
              <FilterPanel filters={filters} onFiltersChange={setFilters} />
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          <div className="text-center py-6">
            <ChefHat className="h-10 w-10 text-primary mx-auto mb-3 animate-bounce" />
            <p className="text-base font-medium">Creating your perfect recipe... 👨‍🍳</p>
            <p className="text-sm text-muted-foreground mt-1">This might take a moment</p>
          </div>
          {[...Array(2)].map((_, i) => (
            <LoadingShimmer key={i} />
          ))}
        </div>
      )}

      {/* Recent Recipes */}
      {!loading && generatedRecipes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              📚 Your Recent Recipes
              <span className="text-sm font-normal text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {generatedRecipes.length}
              </span>
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearRecent}
              className="text-destructive hover:text-destructive rounded-full"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>

          <div className="grid gap-4">
            {generatedRecipes.slice(0, 5).map((recipe, index) => (
              <div
                key={recipe.id}
                onClick={() => router.push(`/recipe/${recipe.id}`)}
                className="bg-card rounded-2xl p-5 border-2 cursor-pointer hover:shadow-xl hover:border-primary/30 transition-all duration-300 active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    {recipe.image ? (
                      <img
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                          e.currentTarget.nextElementSibling!.style.display = "flex"
                        }}
                      />
                    ) : null}
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base truncate mb-1">{recipe.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{recipe.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                      <span className="flex items-center gap-1">👥 {recipe.servings}</span>
                      <span className="flex items-center gap-1">📊 {recipe.difficulty}</span>
                      {recipe.cuisine && recipe.cuisine !== "International" && (
                        <span className="flex items-center gap-1">🌍 {recipe.cuisine}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-muted-foreground">
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && generatedRecipes.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6">
            <ChefHat className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">Ready to cook something amazing? 👨‍🍳</h3>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Just tell me what you want to cook or what ingredients you have. I understand natural language in any
            language!
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            <p>💬 Try saying: "I have potatoes, make me something tasty"</p>
            <p>🌍 Or in Hindi: "मुझे बिरयानी बनाना है"</p>
          </div>
        </div>
      )}
    </div>
  )
}
