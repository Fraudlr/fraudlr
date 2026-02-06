"use client"

/**
 * @fileoverview Case Detail Client Component
 *
 * Renders the full case detail view with:
 * - Back button + case name header
 * - Status badge (editable)
 * - Risk Score card (colour-coded)
 * - Case info card (description, dates, data point)
 * - Uploaded files list
 */

import Link from "next/link"
import { formatDate } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  FileSpreadsheet,
  Globe,
  Database,
  ShieldAlert,
  CalendarDays,
  Info,
  FileText,
  Copy,
  PenLine,
  Coins,
  CalendarX2,
  AlertTriangle,
  BarChart3,
} from "lucide-react"
import { StatusBadge } from "@/components/cases/status-badge"

interface CaseDetailClientProps {
  caseData: any
}

/**
 * Determine risk level label + colour from score
 */
function riskMeta(score: number) {
  if (score >= 6)
    return { level: "Highest", color: "red", bg: "bg-red-500/10 border-red-500/30", text: "text-red-500", bar: "bg-red-500" }
  if (score >= 3)
    return { level: "High", color: "orange", bg: "bg-orange-500/10 border-orange-500/30", text: "text-orange-500", bar: "bg-orange-500" }
  return { level: "Medium", color: "yellow", bg: "bg-yellow-500/10 border-yellow-500/30", text: "text-yellow-500", bar: "bg-yellow-500" }
}

export function CaseDetailClient({ caseData }: CaseDetailClientProps) {
  const hasRiskScore = caseData.riskScore != null
  const risk = hasRiskScore ? riskMeta(caseData.riskScore) : null

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/cases">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">
                {caseData.name}
              </h1>
              {/* Data-point badge */}
              {caseData.dataPointType && (
                <Badge
                  variant="secondary"
                  className={`text-[10px] px-1.5 py-0.5 flex items-center gap-1 ${
                    caseData.dataPointType === "api"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-purple-500/10 text-purple-500"
                  }`}
                >
                  {caseData.dataPointType === "api" ? (
                    <Globe className="h-3 w-3" />
                  ) : (
                    <Database className="h-3 w-3" />
                  )}
                  {caseData.dataPointType.toUpperCase()} Data Point
                </Badge>
              )}
              {/* Risk Score badge */}
              {hasRiskScore && risk && (
                <Badge
                  variant="secondary"
                  className={`text-[10px] px-1.5 py-0.5 flex items-center gap-1 ${
                    risk.bg
                  } ${risk.text}`}
                >
                  <ShieldAlert className="h-3 w-3" />
                  Risk Score: {caseData.riskScore} — {risk.level}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1">
              {caseData.description || "No description provided"}
            </p>
          </div>
        </div>

        {/* Status badge (editable dropdown) */}
        <StatusBadge
          caseId={caseData.id}
          currentStatus={caseData.status as any}
        />
      </div>

      {/* ── Fraud Indicator Analysis ── */}
      {caseData.results?.indicators && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Fraud Indicator Analysis
            </CardTitle>
            <CardDescription>
              {caseData.results.totalRows} rows analysed • {caseData.results.totalIndicators} total indicators found
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* KPI Indicator Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {caseData.results.indicators.map((ind: any, i: number) => {
                const icons = [Copy, PenLine, Coins, CalendarX2, FileText]
                const colors = [
                  "text-blue-500 bg-blue-500/10",
                  "text-purple-500 bg-purple-500/10",
                  "text-amber-500 bg-amber-500/10",
                  "text-rose-500 bg-rose-500/10",
                  "text-teal-500 bg-teal-500/10",
                ]
                const Icon = icons[i] ?? AlertTriangle
                const color = colors[i] ?? "text-muted-foreground bg-muted"
                return (
                  <div
                    key={ind.label}
                    className="rounded-xl border border-border bg-card p-4 flex flex-col gap-2"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-muted-foreground">{ind.label}</span>
                    <span className="text-2xl font-bold">{ind.count}</span>
                    <span className="text-[10px] text-muted-foreground">Weight: {ind.weight}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Risk Score Card ── */}
      {hasRiskScore && risk && (
        <Card className={`border ${risk.bg}`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldAlert className={`h-5 w-5 ${risk.text}`} />
              Fraud Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-extrabold tracking-tight">
                {caseData.riskScore}
              </span>
              <span className="text-lg text-muted-foreground mb-1">/ 10</span>
              <Badge
                className={`ml-auto text-sm font-bold px-4 py-1 ${
                  risk.color === "red"
                    ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                    : risk.color === "orange"
                    ? "bg-orange-500/20 text-orange-500 hover:bg-orange-500/30"
                    : "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                }`}
              >
                {risk.level} Flag
              </Badge>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${risk.bar}`}
                style={{
                  width: `${(caseData.riskScore / 10) * 100}%`,
                }}
              />
            </div>

            {/* Scale legend */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span className="text-yellow-500">Medium (0-3)</span>
              <span className="text-orange-500">High (3-6)</span>
              <span className="text-red-500">Highest (6-10)</span>
              <span>10</span>
            </div>

            {/* Calculation Breakdown */}
            {caseData.results?.indicators && (() => {
              const activeIndicators = caseData.results.indicators.filter((i: any) => i.count > 0)
              const avgWeight = activeIndicators.length > 0
                ? activeIndicators.reduce((s: number, i: any) => s + i.weight, 0) / activeIndicators.length
                : 0
              
              return (
                <div className="mt-4 p-4 rounded-lg bg-muted/50 space-y-2">
                  <p className="text-xs font-semibold text-foreground">Risk Score Calculation:</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>
                      <span className="font-mono">Active Indicators</span> = {activeIndicators.length} (only indicators with findings)
                    </p>
                    <p>
                      <span className="font-mono">Average Weight</span> ={" "}
                      ({activeIndicators.map((i: any) => i.weight).join(" + ")}) / {activeIndicators.length}
                      {" "}= <span className="font-semibold">{avgWeight.toFixed(2)}</span>
                    </p>
                    <p>
                      <span className="font-mono">Total Indicators</span> ={" "}
                      {caseData.results.indicators.map((i: any) => `${i.count}`).join(" + ")}
                      {" "}= <span className="font-semibold">{caseData.results.totalIndicators}</span>
                    </p>
                    <p className="pt-1 border-t border-border">
                      <span className="font-mono">Risk Score</span> ={" "}
                      {avgWeight.toFixed(2)}
                      {" "}× {caseData.results.totalIndicators}
                      {" "}= <span className="font-bold text-foreground">{caseData.riskScore}</span>
                    </p>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}

      {/* ── Case Information ── */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Info card */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-primary" />
              Case Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Case ID</span>
              <span className="font-mono text-xs">{caseData.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="capitalize">{caseData.status}</span>
            </div>
            {caseData.dataPointName && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Point</span>
                <span>{caseData.dataPointName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(caseData.createdAt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(caseData.updatedAt)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Files card */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-primary" />
              Uploaded Files
            </CardTitle>
            <CardDescription>
              {caseData.files?.length ?? 0} file(s) attached to this case
            </CardDescription>
          </CardHeader>
          <CardContent>
            {caseData.files && caseData.files.length > 0 ? (
              <ul className="space-y-3">
                {caseData.files.map((f: any) => (
                  <li
                    key={f.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileSpreadsheet className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {f.filename}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(f.size / 1024).toFixed(1)} KB &bull; {f.mimetype}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">
                No files uploaded yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
