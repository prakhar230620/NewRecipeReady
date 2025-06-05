"use client"

import { useAuth } from "@/context/auth-context"
import ThemeToggle from "./theme-toggle"
import LanguageSelector from "./language-selector"
import { ChefHat, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const { user } = useAuth()
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <header className="mobile-header no-print">
      <div className="flex h-16 items-center justify-between px-4">
        {isHomePage ? (
          <Link href="/" className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">RecipeReady</span>
          </Link>
        ) : (
          <div className="flex items-center space-x-2">
            <Link href="/" className="p-2 -ml-2">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-semibold text-lg">
              {pathname === "/favorites"
                ? "Favorites"
                : pathname === "/profile"
                  ? "Profile"
                  : pathname === "/explore"
                    ? "Explore"
                    : pathname.startsWith("/recipe/")
                      ? "Recipe"
                      : "RecipeReady"}
            </h1>
          </div>
        )}

        <div className="flex items-center gap-2">
          {isHomePage && <LanguageSelector />}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
