/**
 * @fileoverview Logout API Route
 * 
 * POST /api/auth/logout
 * Clears the authentication session.
 * 
 * Response:
 * - 200: Logout successful
 */

import { NextResponse } from "next/server"
import { clearAuthCookie } from "@/lib/auth"

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout successful" },
    { status: 200 }
  )

  // Clear the auth cookie
  clearAuthCookie()

  return response
}
