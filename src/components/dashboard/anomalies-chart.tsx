"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

export function AnomaliesChart() {
  const [timeRange, setTimeRange] = useState("6m")

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
  )
}
