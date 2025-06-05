import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "@/context/auth-context"
import { RecipeProvider } from "@/context/recipe-context"
import Header from "@/components/header"
import MobileNav from "@/components/mobile-nav"
import PwaInstallPrompt from "@/components/pwa-install-prompt"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RecipeReady - AI Recipe Generator",
  description: "Generate delicious recipes with AI",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RecipeReady",
  },
  formatDetection: {
    telephone: false,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <RecipeProvider>
              <Header />
              <div className="mobile-container">
                <div className="mobile-page-container">{children}</div>
              </div>
              <MobileNav />
              <PwaInstallPrompt />
              <Toaster position="top-center" />
            </RecipeProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
