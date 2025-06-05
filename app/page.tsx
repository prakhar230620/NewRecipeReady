import RecipeGenerator from "@/components/recipe-generator"

export default function Home() {
  return (
    <div className="space-y-6">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🍳 RecipeReady
          </h1>
          <p className="text-sm text-muted-foreground">Transform ingredients into delicious recipes with AI</p>
        </div>
        <RecipeGenerator />
      </main>
    </div>
  )
}
