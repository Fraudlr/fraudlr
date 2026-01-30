/**
 * @fileoverview Dashboard Overview Page
 * 
 * The main dashboard page users see after logging in.
 * Features:
 * - Welcome message
 * - Quick stats cards
 * - Recent activity
 * - Quick action buttons
 * 
 * Layout inspired by ChatGPT-style dashboard with shadcn/ui components.
 */

import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  PlusCircle,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowRight,
  Upload,
  Crown,
  Sparkles,
} from "lucide-react"
import { AnomaliesChart } from "@/components/dashboard/anomalies-chart"

/**
 * Dashboard Page Component
 * 
 * Server component that fetches user data and displays overview.
 */
export default async function DashboardPage() {
  // Get authenticated user
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/login")
  }

  // Fetch user statistics from database
  let stats = {
    totalCases: 0,
    pendingCases: 0,
    processingCases: 0,
    completedCases: 0,
    failedCases: 0,
  }

  try {
    // Count total cases for user
    stats.totalCases = await prisma.case.count({
      where: { userId: user.id },
    })

    // Count pending cases
    stats.pendingCases = await prisma.case.count({
      where: { userId: user.id, status: "pending" },
    })

    // Count processing cases
    stats.processingCases = await prisma.case.count({
      where: { userId: user.id, status: "processing" },
    })

    // Count completed cases
    stats.completedCases = await prisma.case.count({
      where: { userId: user.id, status: "completed" },
    })

    // Count failed cases
    stats.failedCases = await prisma.case.count({
      where: { userId: user.id, status: "failed" },
    })
  } catch (error) {
    // Database might not be connected yet - use defaults
    console.log("Database connection pending")
  }

  // Determine plan badge styling
  const planBadgeVariant = user.tier === "free" ? "outline" : "default"

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user.name.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's an overview of your fraud detection activity.
          </p>
        </div>
        <Badge 
          variant={planBadgeVariant}
          className="capitalize text-sm px-3 py-1.5 gap-1.5 self-start"
        >
          {user.tier === "free" ? (
            <Sparkles className="h-3.5 w-3.5" />
          ) : (
            <Crown className="h-3.5 w-3.5" />
          )}
          {user.tier} plan
        </Badge>
      </div>

      {/* Quick Action Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Cases */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Cases
            </CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCases}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All time analysis cases
            </p>
          </CardContent>
        </Card>

        {/* Pending Cases */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingCases}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting analysis
            </p>
          </CardContent>
        </Card>

        {/* Processing Cases */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Processing
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.processingCases}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently analyzing
            </p>
          </CardContent>
        </Card>

        {/* Completed Cases */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCases}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Analysis completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Second Row of Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Failed Cases */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Failed
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.failedCases}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Analysis failed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Anomalies Chart */}
      <AnomaliesChart />

      {/* Getting Started Guide */}
      {stats.totalCases === 0 && (
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  🚀 Ready to detect your first fraud?
                </h3>
                <p className="text-muted-foreground">
                  Upload a CSV file containing transaction data and our AI will 
                  analyze it for potential fraud patterns and anomalies.
                </p>
              </div>
              <Button size="lg" className="shrink-0" asChild>
                <Link href="/dashboard/new-case">
                  Create Your First Case
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
