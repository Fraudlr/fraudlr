"use client"

/**
 * @fileoverview StatusBadge Component
 * 
 * A selectable status badge component that allows users to change case status
 * with auto-save functionality.
 */

import { useState } from "react"
import {
  Clock,
  CheckCircle2,
  XCircle,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

/**
 * Status configuration with icons and colors
 */
const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  },
  processing: {
    label: "Processing",
    icon: Clock,
    className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  },
}

type CaseStatus = keyof typeof statusConfig

interface StatusBadgeProps {
  caseId: string
  currentStatus: CaseStatus
}

/**
 * StatusBadge Component
 * 
 * Displays a clickable status badge that opens a dropdown menu
 * to select a new status. Auto-saves on selection.
 */
export function StatusBadge({ caseId, currentStatus }: StatusBadgeProps) {
  const [status, setStatus] = useState<CaseStatus>(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  
  const currentConfig = statusConfig[status]
  const StatusIcon = currentConfig.icon

  /**
   * Handle status change
   */
  const handleStatusChange = async (newStatus: CaseStatus) => {
    if (newStatus === status) return
    
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/cases/${caseId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update status")
      }

      setStatus(newStatus)
      // Refresh the page data
      router.refresh()
    } catch (error) {
      console.error("Error updating status:", error)
      // Optionally show an error toast here
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${currentConfig.className} ${
            isUpdating ? "opacity-50 cursor-wait" : "cursor-pointer"
          }`}
          disabled={isUpdating}
        >
          <StatusIcon className="h-4 w-4" />
          <span className="text-sm font-medium">{currentConfig.label}</span>
          <ChevronDown className="h-3 w-3 ml-1" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {(Object.keys(statusConfig) as CaseStatus[]).map((statusKey) => {
          const config = statusConfig[statusKey]
          const Icon = config.icon
          
          return (
            <DropdownMenuItem
              key={statusKey}
              onClick={() => handleStatusChange(statusKey)}
              className={`flex items-center gap-2 ${
                statusKey === status ? "bg-accent" : ""
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{config.label}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
