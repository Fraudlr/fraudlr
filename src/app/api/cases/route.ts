/**
 * @fileoverview Cases API Route
 * 
 * GET /api/cases - List all cases for current user
 * POST /api/cases - Create a new case
 * 
 * All routes require authentication.
 */

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
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
 * Request Body (FormData):
 * - name: string - Case name
 * - description: string (optional)
 * - file: File - CSV file to analyze
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

    console.log('Authenticated user:', user) // Debug log

    // Parse FormData
    const formData = await request.formData()
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const file = formData.get("file") as File

    console.log('Received form data:', { name, description, fileName: file?.name }) // Debug log

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Case name is required" },
        { status: 400 }
      )
    }

    // Validate file type if file is provided
    if (file && !file.name.endsWith('.csv')) {
      return NextResponse.json(
        { error: "Only CSV files are supported" },
        { status: 400 }
      )
    }

    // Check case limits based on tier
    const currentMonth = new Date()
    currentMonth.setDate(1)
    currentMonth.setHours(0, 0, 0, 0)

    // Ensure user.id exists before proceeding
    if (!user.id) {
      return NextResponse.json(
        { error: "Invalid user session" },
        { status: 401 }
      )
    }

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

    // Create case with optional file metadata
    const newCase = await prisma.case.create({
      data: {
        name: name,
        description: description || "",
        status: "pending",
        userId: user.id,
        files: file ? {
          create: {
            filename: file.name,
            filepath: `/uploads/${user.id}/${Date.now()}-${file.name}`, // Placeholder URL
            mimetype: file.type,
            size: file.size,
          },
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
        id: newCase.id,
        case: newCase,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create case error:", error)
    return NextResponse.json(
      { 
        error: "An error occurred while creating the case",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
