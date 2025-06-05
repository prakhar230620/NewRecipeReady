"use client"

import type { RecipeFilters } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cuisineFlags } from "@/lib/languages"

interface FilterPanelProps {
  filters: RecipeFilters
  onFiltersChange: (filters: RecipeFilters) => void
}

export default function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const updateFilter = (key: keyof RecipeFilters, value: string | number) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">👥 Servings</Label>
        <Input
          type="number"
          min="1"
          max="20"
          value={filters.servings}
          onChange={(e) => updateFilter("servings", Number.parseInt(e.target.value) || 2)}
          className="h-10 rounded-full text-center"
          placeholder="2"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">⏰ Cook Time</Label>
        <Select value={filters.cookTime} onValueChange={(value) => updateFilter("cookTime", value)}>
          <SelectTrigger className="h-10 rounded-full">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">⏰ Any Time</SelectItem>
            <SelectItem value="quick">⚡ Under 30 min</SelectItem>
            <SelectItem value="medium">🕐 30-60 min</SelectItem>
            <SelectItem value="long">🕰️ Over 1 hour</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">🥗 Dietary</Label>
        <Select value={filters.dietary} onValueChange={(value) => updateFilter("dietary", value)}>
          <SelectTrigger className="h-10 rounded-full">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">🍽️ Any</SelectItem>
            <SelectItem value="vegetarian">🥬 Vegetarian</SelectItem>
            <SelectItem value="vegan">🌱 Vegan</SelectItem>
            <SelectItem value="gluten-free">🌾 Gluten-Free</SelectItem>
            <SelectItem value="keto">🥑 Keto</SelectItem>
            <SelectItem value="paleo">🥩 Paleo</SelectItem>
            <SelectItem value="dairy-free">🥛 Dairy-Free</SelectItem>
            <SelectItem value="low-carb">🥒 Low-Carb</SelectItem>
            <SelectItem value="high-protein">💪 High-Protein</SelectItem>
            <SelectItem value="low-calorie">🏃‍♀️ Low-Calorie</SelectItem>
            <SelectItem value="sugar-free">🚫🍯 Sugar-Free</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">🌍 Cuisine</Label>
        <Select value={filters.cuisine} onValueChange={(value) => updateFilter("cuisine", value)}>
          <SelectTrigger className="h-10 rounded-full">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">🌐 Any Cuisine</SelectItem>
            <SelectItem value="italian">{cuisineFlags.italian} Italian</SelectItem>
            <SelectItem value="mexican">{cuisineFlags.mexican} Mexican</SelectItem>
            <SelectItem value="chinese">{cuisineFlags.chinese} Chinese</SelectItem>
            <SelectItem value="indian">{cuisineFlags.indian} Indian</SelectItem>
            <SelectItem value="thai">{cuisineFlags.thai} Thai</SelectItem>
            <SelectItem value="japanese">{cuisineFlags.japanese} Japanese</SelectItem>
            <SelectItem value="korean">{cuisineFlags.korean} Korean</SelectItem>
            <SelectItem value="french">{cuisineFlags.french} French</SelectItem>
            <SelectItem value="mediterranean">{cuisineFlags.mediterranean} Mediterranean</SelectItem>
            <SelectItem value="american">{cuisineFlags.american} American</SelectItem>
            <SelectItem value="spanish">{cuisineFlags.spanish} Spanish</SelectItem>
            <SelectItem value="german">{cuisineFlags.german} German</SelectItem>
            <SelectItem value="british">{cuisineFlags.british} British</SelectItem>
            <SelectItem value="turkish">{cuisineFlags.turkish} Turkish</SelectItem>
            <SelectItem value="lebanese">{cuisineFlags.lebanese} Lebanese</SelectItem>
            <SelectItem value="moroccan">{cuisineFlags.moroccan} Moroccan</SelectItem>
            <SelectItem value="brazilian">{cuisineFlags.brazilian} Brazilian</SelectItem>
            <SelectItem value="vietnamese">{cuisineFlags.vietnamese} Vietnamese</SelectItem>
            <SelectItem value="greek">{cuisineFlags.greek} Greek</SelectItem>
            <SelectItem value="russian">{cuisineFlags.russian} Russian</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">🌶️ Spice Level</Label>
        <Select value={filters.spiceLevel} onValueChange={(value) => updateFilter("spiceLevel", value)}>
          <SelectTrigger className="h-10 rounded-full">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">🍽️ Any Level</SelectItem>
            <SelectItem value="mild">😊 Mild</SelectItem>
            <SelectItem value="medium">🌶️ Medium</SelectItem>
            <SelectItem value="hot">🔥 Hot</SelectItem>
            <SelectItem value="very-hot">🌋 Very Hot</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">🍽️ Meal Type</Label>
        <Select value={filters.mealType} onValueChange={(value) => updateFilter("mealType", value)}>
          <SelectTrigger className="h-10 rounded-full">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">🍽️ Any Meal</SelectItem>
            <SelectItem value="breakfast">🌅 Breakfast</SelectItem>
            <SelectItem value="brunch">🥐 Brunch</SelectItem>
            <SelectItem value="lunch">☀️ Lunch</SelectItem>
            <SelectItem value="dinner">🌙 Dinner</SelectItem>
            <SelectItem value="snack">🍿 Snack</SelectItem>
            <SelectItem value="dessert">🍰 Dessert</SelectItem>
            <SelectItem value="appetizer">🥗 Appetizer</SelectItem>
            <SelectItem value="side-dish">🥙 Side Dish</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">🎯 Difficulty</Label>
        <Select value={filters.difficulty || "any"} onValueChange={(value) => updateFilter("difficulty", value)}>
          <SelectTrigger className="h-10 rounded-full">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">🎯 Any Level</SelectItem>
            <SelectItem value="easy">😊 Easy</SelectItem>
            <SelectItem value="medium">🤔 Medium</SelectItem>
            <SelectItem value="hard">😤 Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">🏃‍♀️ Health Focus</Label>
        <Select value={filters.healthProfile} onValueChange={(value) => updateFilter("healthProfile", value)}>
          <SelectTrigger className="h-10 rounded-full">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">🍽️ Any Focus</SelectItem>
            <SelectItem value="weight-loss">🏃‍♀️ Weight Loss</SelectItem>
            <SelectItem value="muscle-gain">💪 Muscle Gain</SelectItem>
            <SelectItem value="heart-healthy">❤️ Heart Healthy</SelectItem>
            <SelectItem value="diabetic-friendly">🩺 Diabetic Friendly</SelectItem>
            <SelectItem value="anti-inflammatory">🌿 Anti-Inflammatory</SelectItem>
            <SelectItem value="energy-boost">⚡ Energy Boost</SelectItem>
            <SelectItem value="immune-boost">🛡️ Immune Boost</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
