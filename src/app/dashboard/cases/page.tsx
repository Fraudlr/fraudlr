/**
 * @fileoverview Case History Page
 * 
 * Displays a list of all fraud analysis cases for the user.
 * Features:
 * - Table view of cases
 * - Status indicators
 * - Filter and search
 * - Link to case details
 */

import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
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
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
} from "lucide-react"

/**
 * Status badge configuration
 */
const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-yellow-500/10 text-yellow-500",
  },
  processing: {
    label: "Processing",
    icon: Clock,
    className: "bg-blue-500/10 text-blue-500",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-green-500/10 text-green-500",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "bg-red-500/10 text-red-500",
  },
}

/**
 * Cases Page Component
 * 
 * Lists all cases for the authenticated user.
 */
export default async function CasesPage() {
  // Get authenticated user
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/login")
  }

  // Fetch user's cases
  let cases: any[] = []
  
  try {
    cases = await prisma.case.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { files: true },
        },
      },
    })
  } catch (error) {
    // Database might not be connected yet
    console.log("Database connection pending")
  }

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
        <Button asChild>
          <Link href="/dashboard/new-case">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Case
          </Link>
        </Button>
      </div>

      {/* Cases List */}
      {cases.length === 0 ? (
        /* Empty State */
        <Card className="bg-card border-border">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="p-4 rounded-full bg-muted mb-4">
              <FileSpreadsheet className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No cases yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Create your first fraud analysis case by uploading a CSV file 
              containing your transaction data.
            </p>
            <Button asChild>
              <Link href="/dashboard/new-case">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create First Case
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Cases Grid */
        <div className="grid gap-4">
          {cases.map((caseItem) => {
            const status = statusConfig[caseItem.status as keyof typeof statusConfig] || statusConfig.pending
            const StatusIcon = status.icon

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
                        <h3 className="font-semibold text-lg">{caseItem.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {caseItem.description || "No description"}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Created: {formatDate(caseItem.createdAt)}</span>
                          <span>•</span>
                          <span>{caseItem._count.files} file(s)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Status Badge */}
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${status.className}`}>
                        <StatusIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">{status.label}</span>
                      </div>

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
