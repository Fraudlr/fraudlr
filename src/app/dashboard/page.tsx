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
import {
  PlusCircle,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowRight,
  Upload,
} from "lucide-react"

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

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user.name.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's an overview of your fraud detection activity.
        </p>
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

        {/* Current Tier */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{user.tier}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {user.tier === "free" ? "2 uploads/month" : "Unlimited uploads"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Start Card */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>
              Get started with fraud detection in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* New Case Action */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <PlusCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Create New Case</h4>
                  <p className="text-sm text-muted-foreground">
                    Start a new fraud analysis
                  </p>
                </div>
              </div>
              <Button asChild>
                <Link href="/dashboard/new-case">
                  Start
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Upload CSV Action */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Upload CSV</h4>
                  <p className="text-sm text-muted-foreground">
                    Analyze transaction data
                  </p>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/dashboard/new-case">
                  Upload
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Capabilities Card */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>AI Analysis Modules</CardTitle>
            <CardDescription>
              Powered by advanced fraud detection algorithms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Benford's Law */}
            <div className="flex items-start gap-4 p-4 rounded-lg border border-border">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <span className="text-blue-500 font-mono font-bold text-sm">B</span>
              </div>
              <div>
                <h4 className="font-medium">Benford's Law Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Detects anomalies in first-digit distribution patterns that 
                  may indicate fraudulent data manipulation.
                </p>
              </div>
            </div>

            {/* M-Score */}
            <div className="flex items-start gap-4 p-4 rounded-lg border border-border">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <span className="text-purple-500 font-mono font-bold text-sm">M</span>
              </div>
              <div>
                <h4 className="font-medium">M-Score Detection</h4>
                <p className="text-sm text-muted-foreground">
                  Beneish M-Score model to identify potential earnings 
                  manipulation and financial statement fraud.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
