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

"use client"

import { useState } from "react"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
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
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

// TODO: Replace with real data from API/database
// Sample data for the anomalies chart - showing monthly aggregated anomaly counts
// This is placeholder data for demonstration purposes and should be replaced
// with actual anomaly detection results from your fraud detection system
const chartData = [
  { date: "2025-03-01", anomalies: 145 },
  { date: "2025-04-01", anomalies: 189 },
  { date: "2025-05-01", anomalies: 167 },
  { date: "2025-06-01", anomalies: 212 },
  { date: "2025-07-01", anomalies: 198 },
  { date: "2025-08-01", anomalies: 234 },
  { date: "2025-09-01", anomalies: 221 },
  { date: "2025-10-01", anomalies: 256 },
  { date: "2025-11-01", anomalies: 243 },
  { date: "2025-12-01", anomalies: 278 },
  { date: "2026-01-01", anomalies: 265 },
]

const chartConfig = {
  anomalies: {
    label: "Anomalies",
    color: "hsl(var(--chart-1))",
  },
}

/**
 * Dashboard Page Component
 * 
 * Server component that fetches user data and displays overview.
 */
export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("6m")
  
  // For demo purposes - in a real app, this would come from an API
  const user = {
    id: "1",
    name: "John Doe",
    tier: "free"
  }

  // Fetch user statistics from database
  const stats = {
    totalCases: 12,
    pendingCases: 3,
    processingCases: 2,
    completedCases: 6,
    failedCases: 1,
  }

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let monthsToSubtract = 6

    if (timeRange === "3m") {
      monthsToSubtract = 3
    } else if (timeRange === "6m") {
      monthsToSubtract = 6
    } else if (timeRange === "12m") {
      monthsToSubtract = 12
    }

    const startDate = new Date(now)
    startDate.setMonth(startDate.getMonth() - monthsToSubtract)
    return date >= startDate
  })

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

      {/* Anomalies Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Overall anomalies</CardTitle>
            <CardDescription>
              Showing anomaly alerts over time
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-[160px] rounded-lg"
              aria-label="Select a time range"
            >
              <SelectValue placeholder="Last 6 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="3m" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="6m" className="rounded-lg">
                Last 6 months
              </SelectItem>
              <SelectItem value="12m" className="rounded-lg">
                Last 12 months
              </SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart
              accessibilityLayer
              data={filteredData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="anomalies"
                type="natural"
                fill="hsl(280 100% 70% / 0.4)"
                fillOpacity={0.4}
                stroke="hsl(280 100% 70%)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

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
