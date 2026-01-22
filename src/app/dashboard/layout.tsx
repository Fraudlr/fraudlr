/**
 * @fileoverview Dashboard Layout
 * 
 * The main layout for the authenticated dashboard area.
 * Features:
 * - Left sidebar with navigation
 * - Main content area
 * - Top header with user info and controls
 * 
 * This layout wraps all dashboard pages and provides
 * consistent navigation and styling.
 */

import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { TooltipProvider } from "@/components/ui/tooltip"

/**
 * Dashboard Layout Props
 */
interface DashboardLayoutProps {
  children: React.ReactNode
}

/**
 * Dashboard Layout Component
 * 
 * Server component that:
 * 1. Checks if user is authenticated
 * 2. Redirects to login if not authenticated
 * 3. Renders sidebar and main content area
 */
export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  // Check authentication status
  const user = await getCurrentUser()
  
  // Redirect to login if not authenticated
  if (!user) {
    redirect("/login")
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background">
        {/* Left Sidebar Navigation */}
        <DashboardSidebar user={user} />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <DashboardHeader user={user} />
          
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
