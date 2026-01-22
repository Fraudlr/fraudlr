/**
 * @fileoverview Dashboard Header Component
 * 
 * The top header bar for the dashboard.
 * Features:
 * - Upgrade to Standard button (for free tier users)
 * - Theme toggle (light/dark)
 * - Currency toggle (USD/ZAR)
 * - User menu
 * 
 * Positioned at the top right of the dashboard layout.
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, DollarSign, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { UserPayload } from "@/lib/auth"

/**
 * Dashboard Header Props
 */
interface DashboardHeaderProps {
  user: UserPayload
}

/**
 * Dashboard Header Component
 * 
 * Renders the top header with theme/currency controls and upgrade button.
 */
export function DashboardHeader({ user }: DashboardHeaderProps) {
  // Theme state from next-themes
  const { theme, setTheme } = useTheme()
  
  // Currency preference state (in production, this would be persisted)
  const [currency, setCurrency] = React.useState<"USD" | "ZAR">("USD")

  /**
   * Toggle theme between light and dark
   */
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  /**
   * Toggle currency between USD and ZAR
   */
  const toggleCurrency = () => {
    setCurrency(currency === "USD" ? "ZAR" : "USD")
    // In production, save this preference to user settings
  }

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b border-border bg-background">
      {/* Left side - can add breadcrumbs or search here */}
      <div className="flex items-center gap-4">
        {/* Placeholder for potential breadcrumbs */}
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center gap-4">
        {/* Upgrade Button - Only show for free tier users */}
        {user.tier === "free" && (
          <Button
            variant="outline"
            size="sm"
            className="border-[#FD4D53] text-[#FD4D53] hover:bg-[#FD4D53]/10"
            asChild
          >
            <Link href="/dashboard/settings?tab=billing">
              <Sparkles className="mr-2 h-4 w-4" />
              Upgrade to Standard
            </Link>
          </Button>
        )}

        {/* Currency Toggle */}
        <div className="flex items-center gap-2 border rounded-md px-3 py-1.5">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <Label
            htmlFor="currency-toggle"
            className={`text-xs cursor-pointer ${
              currency === "USD" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            USD
          </Label>
          <Switch
            id="currency-toggle"
            checked={currency === "ZAR"}
            onCheckedChange={toggleCurrency}
            className="scale-75"
          />
          <Label
            htmlFor="currency-toggle"
            className={`text-xs cursor-pointer ${
              currency === "ZAR" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            ZAR
          </Label>
        </div>

        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <span className="mr-2">💻</span>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
