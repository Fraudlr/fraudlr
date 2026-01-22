/**
 * @fileoverview Cases API Route
 * 
 * GET /api/cases - List all cases for current user
 * POST /api/cases - Create a new case
 * 
 * All routes require authentication.
 */

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

/**
 * GET /api/cases
 * 
 * Returns all cases for the authenticated user.
 * Supports pagination and filtering.
 * 
 * Query Parameters:
 * - page: number (default: 1)
 * - limit: number (default: 10)
 * - status: string (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    // Build where clause
    const where: { userId: string; status?: string } = { userId: user.id }
    if (status) {
      where.status = status
    }

    // Get total count
    const total = await prisma.case.count({ where })

    // Get cases with pagination
    const cases = await prisma.case.findMany({
      where,
      include: {
        files: {
          select: {
            id: true,
            name: true,
            type: true,
            size: true,
          },
        },
        _count: {
          select: { files: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    })

    return NextResponse.json({
      cases,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get cases error:", error)
    return NextResponse.json(
      { error: "An error occurred while fetching cases" },
      { status: 500 }
    )
  }
}

/**
 * POST /api/cases
 * 
 * Creates a new fraud analysis case.
 * 
 * Request Body:
 * - title: string
 * - description: string (optional)
 * - message: string - Initial analysis prompt
 * - files: Array<{ name, type, size, url }> (optional)
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, message, files } = body

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      )
    }

    // Check case limits based on tier
    const currentMonth = new Date()
    currentMonth.setDate(1)
    currentMonth.setHours(0, 0, 0, 0)

    const caseCount = await prisma.case.count({
      where: {
        userId: user.id,
        createdAt: { gte: currentMonth },
      },
    })

    // Define tier limits
    const tierLimits: Record<string, number> = {
      free: 5,
      standard: 50,
      pro: Infinity,
    }

    const limit = tierLimits[user.tier] || 5

    if (caseCount >= limit) {
      return NextResponse.json(
        { 
          error: "Monthly case limit reached",
          message: `You have reached your ${limit} case limit for this month. Please upgrade your plan for more.`,
        },
        { status: 403 }
      )
    }

    // Create case with files
    const newCase = await prisma.case.create({
      data: {
        title,
        description: description || message,
        status: "pending",
        userId: user.id,
        files: files && files.length > 0 ? {
          create: files.map((file: { name: string; type: string; size: number; url: string }) => ({
            name: file.name,
            type: file.type,
            size: file.size,
            url: file.url,
          })),
        } : undefined,
      },
      include: {
        files: true,
      },
    })

    // In a real application, we would trigger the AI analysis here
    // For now, we'll simulate by updating status to processing
    await prisma.case.update({
      where: { id: newCase.id },
      data: { status: "processing" },
    })

    return NextResponse.json(
      {
        message: "Case created successfully",
        case: newCase,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create case error:", error)
    return NextResponse.json(
      { error: "An error occurred while creating the case" },
      { status: 500 }
    )
  }
}
