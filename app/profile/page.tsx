"use client"

import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User, LogOut, Lock, Settings, Moon, Sun, Info, Bell } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const { theme, setTheme } = useTheme()

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-xl font-bold mb-3">Sign In Required</h1>
        <p className="text-muted-foreground mb-6 text-center text-sm">Please sign in to view your profile.</p>
        <Button asChild className="rounded-full">
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="mobile-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center py-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
          </div>
          <div className="space-y-1 text-center">
            <p className="font-medium">{user.email}</p>
            <p className="text-xs text-muted-foreground">
              Member since {new Date(user.created_at || Date.now()).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={signOut} variant="outline" className="w-full rounded-full">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>

      <Card className="mobile-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {theme === "dark" ? <Moon className="h-4 w-4 text-accent" /> : <Sun className="h-4 w-4 text-accent" />}
              <Label htmlFor="theme-mode">Dark Mode</Label>
            </div>
            <Switch
              id="theme-mode"
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-accent" />
              <Label htmlFor="notifications">Notifications</Label>
            </div>
            <Switch id="notifications" />
          </div>
        </CardContent>
      </Card>

      <Card className="mobile-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>RecipeReady v1.0.0</p>
          <p className="text-muted-foreground">
            An AI-powered recipe generator that helps you create delicious meals with the ingredients you have.
          </p>
          <div className="pt-2 space-y-1">
            <Link href="#" className="text-primary block">
              Privacy Policy
            </Link>
            <Link href="#" className="text-primary block">
              Terms of Service
            </Link>
            <Link href="#" className="text-primary block">
              Contact Support
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
