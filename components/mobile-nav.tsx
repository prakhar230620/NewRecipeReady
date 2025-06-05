"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Heart, Search, User } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Explore",
      href: "/explore",
      icon: Search,
    },
    {
      name: "Favorites",
      href: "/favorites",
      icon: Heart,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <nav className="mobile-bottom-nav no-print">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href === "/" && pathname.startsWith("/recipe/"))
        return (
          <Link key={item.name} href={item.href} className={cn("mobile-nav-item", isActive && "active")}>
            <item.icon className={cn("h-6 w-6", isActive ? "text-primary" : "text-muted-foreground")} />
            <span className={cn("text-xs", isActive ? "font-medium text-primary" : "text-muted-foreground")}>
              {item.name}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
