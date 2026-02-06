/**
 * @fileoverview Case Detail Page
 *
 * Displays a single fraud analysis case with:
 * - Case metadata (name, description, status, dates)
 * - Uploaded files
 * - Risk Score card (when available)
 * - Analysis results
 */

import { redirect, notFound } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CaseDetailClient } from "./case-detail-client"

interface CaseDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const { id } = await params

  let caseData: any = null

  try {
    caseData = await prisma.case.findUnique({
      where: { id },
      include: {
        files: true,
        _count: { select: { files: true } },
      },
    })
  } catch (error) {
    console.error("Failed to fetch case:", error)
  }

  if (!caseData || caseData.userId !== user.id) {
    notFound()
  }

  return <CaseDetailClient caseData={caseData} />
}
