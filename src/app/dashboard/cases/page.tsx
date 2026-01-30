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
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CasesClient } from "./cases-client"

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

  return <CasesClient cases={cases} />
}
