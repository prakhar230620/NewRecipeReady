export default function Footer() {
  return (
    <footer className="border-t bg-background no-print mt-8">
      <div className="container py-6">
        <div className="text-center space-y-4">
          <div>
            <h3 className="font-semibold mb-2">RecipeReady</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Create delicious recipes with the power of artificial intelligence.
            </p>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>&copy; 2024 RecipeReady. Made with ❤️ for food lovers.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
