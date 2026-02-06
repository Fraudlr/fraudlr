/**
 * @fileoverview Forgot Password API Route
 * 
 * POST /api/auth/forgot-password
 * Generates a password reset token for the user.
 * 
 * Request Body:
 * - email: string
 * 
 * Response:
 * - 200: Reset token generated (displayed to user for now, not emailed)
 * - 400: Missing email
 * - 404: User not found
 * - 500: Server error
 */

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/auth"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
      return NextResponse.json(
        { error: "If this email exists in our system, a reset token has been generated." },
        { status: 200 }
      )
    }

    // Generate a random reset token (32 bytes = 64 hex characters)
    const resetToken = crypto.randomBytes(32).toString('hex')
    
    // Hash the token before storing (security best practice)
    const hashedToken = await hashPassword(resetToken)
    
    // Set token expiry to 1 hour from now
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Update user with reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: resetTokenExpiry,
      },
    })

    // In production, you would send an email here with a link like:
    // https://fraudlr.com/reset-password?token=${resetToken}
    // For now, we'll return the token in the response
    console.log(`Password reset token for ${email}: ${resetToken}`)
    console.log(`Reset token expires at: ${resetTokenExpiry}`)

    return NextResponse.json(
      {
        message: "Reset token generated successfully",
        token: resetToken, // WARNING: Remove this in production!
        expiresAt: resetTokenExpiry,
        note: "In production, this token would be sent via email instead of displayed here."
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    )
  }
}
