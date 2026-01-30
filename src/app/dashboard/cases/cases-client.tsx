"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  FileSpreadsheet,
  ArrowRight,
  Globe,
  Database,
  Search,
} from "lucide-react"
import { StatusBadge } from "@/components/cases/status-badge"

interface CasesClientProps {
  cases: any[]
}

export function CasesClient({ cases }: CasesClientProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter cases based on search query
  const filteredCases = useMemo(() => {
    if (!searchQuery.trim()) {
      return cases
    }

    const query = searchQuery.toLowerCase()
    return cases.filter((caseItem) => {
      return (
        caseItem.name?.toLowerCase().includes(query) ||
        caseItem.description?.toLowerCase().includes(query) ||
        caseItem.status?.toLowerCase().includes(query) ||
        caseItem.dataPointName?.toLowerCase().includes(query) ||
        caseItem.dataPointType?.toLowerCase().includes(query)
      )
    })
  }, [cases, searchQuery])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Case History</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your fraud analysis cases
          </p>
        </div>
      </div>

      {/* Search Bar */}
      {cases.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search cases by name, description, status, or data point..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {/* Cases List */}
      {cases.length === 0 ? (
        /* Empty State */
        <Card className="bg-card border-border">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="p-4 rounded-full bg-muted mb-4">
              <FileSpreadsheet className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No cases yet</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Create your first fraud analysis case by uploading a CSV file 
              containing your transaction data.
            </p>
          </CardContent>
        </Card>
      ) : filteredCases.length === 0 ? (
        /* No Search Results */
        <Card className="bg-card border-border">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No cases found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              No cases match your search criteria. Try a different search term.
            </p>
          </CardContent>
        </Card>
      ) : (
        /* Cases Grid */
        <div className="grid gap-4">
          {filteredCases.map((caseItem) => {
            return (
              <Card key={caseItem.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Case Icon */}
                      <div className="p-3 rounded-lg bg-primary/10">
                        <FileSpreadsheet className="h-6 w-6 text-primary" />
                      </div>
                      
                      {/* Case Info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{caseItem.name}</h3>
                          {/* Data Point Badge */}
                          {caseItem.dataPointType && (
                            <Badge 
                              variant="secondary" 
                              className={`text-[10px] px-1.5 py-0.5 flex items-center gap-1 ${
                                caseItem.dataPointType === "api" 
                                  ? "bg-blue-500/10 text-blue-500" 
                                  : "bg-purple-500/10 text-purple-500"
                              }`}
                            >
                              {caseItem.dataPointType === "api" ? (
                                <Globe className="h-3 w-3" />
                              ) : (
                                <Database className="h-3 w-3" />
                              )}
                              {caseItem.dataPointType.toUpperCase()} Data Point
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {caseItem.description || "No description"}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Created: {formatDate(caseItem.createdAt)}</span>
                          <span>•</span>
                          <span>{caseItem._count.files} file(s)</span>
                          {caseItem.dataPointName && (
                            <>
                              <span>•</span>
                              <span className={caseItem.dataPointType === "api" ? "text-blue-500" : "text-purple-500"}>
                                {caseItem.dataPointName}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Status Badge */}
                      <StatusBadge 
                        caseId={caseItem.id} 
                        currentStatus={caseItem.status as any}
                      />

                      {/* View Button */}
                      <Button variant="outline" asChild>
                        <Link href={`/dashboard/cases/${caseItem.id}`}>
                          View
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
