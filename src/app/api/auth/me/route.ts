/**
 * @fileoverview Current User API Route
 * 
 * GET /api/auth/me
 * Returns the currently authenticated user.
 * 
 * Response:
 * - 200: User data
 * - 401: Not authenticated
 * - 500: Server error
 */

import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tier: user.tier,
        currency: user.currency,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error("Get current user error:", error)
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    )
  }
}
