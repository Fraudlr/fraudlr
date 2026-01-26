/**
 * @fileoverview Single Case API Route
 * 
 * GET /api/cases/[id] - Get a single case
 * PATCH /api/cases/[id] - Update a case
 * DELETE /api/cases/[id] - Delete a case
 * 
 * All routes require authentication and ownership.
 */

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

type RouteContext = {
  params: Promise<{ id: string }>
}

/**
 * GET /api/cases/[id]
 * 
 * Returns a single case by ID.
 */
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const user = await getCurrentUser()
    const { id } = await context.params

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const caseData = await prisma.case.findUnique({
      where: { id },
      include: {
        files: true,
      },
    })

    if (!caseData) {
      return NextResponse.json(
        { error: "Case not found" },
        { status: 404 }
      )
    }

    // Check ownership
    if (caseData.userId !== user.id) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      )
    }

    return NextResponse.json({ case: caseData })
  } catch (error) {
    console.error("Get case error:", error)
    return NextResponse.json(
      { error: "An error occurred while fetching the case" },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/cases/[id]
 * 
 * Updates a case.
 * 
 * Request Body:
 * - title: string (optional)
 * - description: string (optional)
 * - status: string (optional)
 * - result: JSON (optional)
 */
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const user = await getCurrentUser()
    const { id } = await context.params

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    // Check if case exists and user owns it
    const existingCase = await prisma.case.findUnique({
      where: { id },
    })

    if (!existingCase) {
      return NextResponse.json(
        { error: "Case not found" },
        { status: 404 }
      )
    }

    if (existingCase.userId !== user.id) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, description, status, result } = body

    // Build update data
    const updateData: {
      title?: string
      description?: string
      status?: string
      result?: object
    } = {}

    if (title) updateData.title = title
    if (description) updateData.description = description
    if (status) updateData.status = status
    if (result) updateData.result = result

    const updatedCase = await prisma.case.update({
      where: { id },
      data: updateData,
      include: {
        files: true,
      },
    })

    return NextResponse.json({
      message: "Case updated successfully",
      case: updatedCase,
    })
  } catch (error) {
    console.error("Update case error:", error)
    return NextResponse.json(
      { error: "An error occurred while updating the case" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/cases/[id]
 * 
 * Deletes a case and its associated files.
 */
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const user = await getCurrentUser()
    const { id } = await context.params

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    // Check if case exists and user owns it
    const existingCase = await prisma.case.findUnique({
      where: { id },
    })

    if (!existingCase) {
      return NextResponse.json(
        { error: "Case not found" },
        { status: 404 }
      )
    }

    if (existingCase.userId !== user.id) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      )
    }

    // Delete associated files first
    await prisma.caseFile.deleteMany({
      where: { caseId: id },
    })

    // Delete the case
    await prisma.case.delete({
      where: { id },
    })

    return NextResponse.json({
      message: "Case deleted successfully",
    })
  } catch (error) {
    console.error("Delete case error:", error)
    return NextResponse.json(
      { error: "An error occurred while deleting the case" },
      { status: 500 }
    )
  }
}
