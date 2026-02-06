/**
 * @fileoverview Reset Password API Route
 * 
 * POST /api/auth/reset-password
 * Validates the reset token and updates the user's password.
 * 
 * Request Body:
 * - token: string (the reset token)
 * - password: string (new password)
 * 
 * Response:
 * - 200: Password reset successful
 * - 400: Missing fields or password too weak
 * - 401: Invalid or expired token
 * - 500: Server error
 */

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword, verifyPassword } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = body

    // Validate required fields
    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      )
    }

    // Validate password strength (minimum 8 characters)
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    // Find all users with non-expired reset tokens
    const users = await prisma.user.findMany({
      where: {
        resetToken: { not: null },
        resetTokenExpiry: { not: null, gt: new Date() },
      },
    })

    // Find the user whose hashed token matches the provided token
    let matchedUser = null
    for (const user of users) {
      if (user.resetToken) {
        const isValidToken = await verifyPassword(token, user.resetToken)
        if (isValidToken) {
          matchedUser = user
          break
        }
      }
    }

    if (!matchedUser) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 401 }
      )
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password)

    // Update user password and clear reset token
    await prisma.user.update({
      where: { id: matchedUser.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(
      {
        message: "Password reset successful. You can now log in with your new password.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json(
      { error: "An error occurred while resetting your password" },
      { status: 500 }
    )
  }
}
