/**
 * @fileoverview Dashboard Sidebar Component
 * 
 * The left navigation sidebar for the dashboard.
 * Features:
 * - Main navigation links (Overview, New Case, Case History, Integration)
 * - Bottom section with Settings and Profile
 * - User avatar and info
 * - Collapsible on mobile
 * 
 * Layout inspired by ChatGPT-style dashboard navigation.
 */

"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  PlusCircle,
  History,
  Plug,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn, getInitials } from "@/lib/utils"
import type { UserPayload } from "@/lib/auth"

/**
 * Navigation items for the main section
 */
const mainNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "New Case",
    href: "/dashboard/new-case",
    icon: PlusCircle,
  },
  {
    title: "Case History",
    href: "/dashboard/cases",
    icon: History,
  },
  {
    title: "Integration",
    href: "/dashboard/integration",
    icon: Plug,
  },
]

/**
 * Navigation items for the bottom section
 */
const bottomNavItems = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
]

/**
 * Sidebar Props
 */
interface DashboardSidebarProps {
  user: UserPayload
}

/**
 * Dashboard Sidebar Component
 * 
 * Renders the left navigation sidebar with collapsible functionality.
 */
export function DashboardSidebar({ user }: DashboardSidebarProps) {
  // Current route for active state
  const pathname = usePathname()
  
  // Sidebar collapsed state
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  /**
   * Handles user logout
   */
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/login"
  }

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/images/fraudlr-white-logo.png"
              alt="Fraudlr"
              width={120}
              height={48}
              className="h-8 w-auto"
            />
          </Link>
        )}
        
        {/* Collapse Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Main Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {mainNavItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={item.title}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom Section */}
      <div className="mt-auto">
        <Separator className="bg-sidebar-border" />
        
        {/* Bottom Nav Items */}
        <nav className="py-4 px-2 space-y-1">
          {bottomNavItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={item.title}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        <Separator className="bg-sidebar-border" />

        {/* User Section */}
        <div className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={undefined} alt={user.name} />
                  <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium truncate max-w-[140px]">
                      {user.name}
                    </span>
                    <span className="text-xs text-sidebar-foreground/70 truncate max-w-[140px]">
                      {user.email}
                    </span>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  )
}

/**
 * Navigation Item Component
 * 
 * Individual navigation link with icon and active state.
 */
interface NavItemProps {
  href: string
  icon: React.ElementType
  title: string
  isActive: boolean
  isCollapsed: boolean
}

function NavItem({ href, icon: Icon, title, isActive, isCollapsed }: NavItemProps) {
  const linkContent = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isCollapsed && "justify-center px-2"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!isCollapsed && <span>{title}</span>}
    </Link>
  )

  // Wrap in tooltip when collapsed
  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {title}
        </TooltipContent>
      </Tooltip>
    )
  }

  return linkContent
}
