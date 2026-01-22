/**
 * @fileoverview Contact Form API Route
 * 
 * POST /api/contact
 * Submits a contact form message.
 * 
 * Request Body:
 * - name: string
 * - email: string
 * - company: string (optional)
 * - message: string
 * 
 * Response:
 * - 201: Message submitted successfully
 * - 400: Validation error
 * - 500: Server error
 */

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long" },
        { status: 400 }
      )
    }

    // Save contact submission
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email: email.toLowerCase(),
        company: company || null,
        message,
      },
    })

    // In a real application, you would also:
    // 1. Send an email notification to the admin
    // 2. Send a confirmation email to the user
    // 3. Integrate with a CRM or ticketing system

    return NextResponse.json(
      {
        message: "Thank you for your message! We'll get back to you soon.",
        id: submission.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Contact submission error:", error)
    return NextResponse.json(
      { error: "An error occurred while submitting your message" },
      { status: 500 }
    )
  }
}

/**
 * GET /api/contact
 * 
 * Returns all contact submissions.
 * This would typically be an admin-only route.
 */
export async function GET() {
  try {
    // In a real application, this would be protected by admin authentication
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    })

    return NextResponse.json({ submissions })
  } catch (error) {
    console.error("Get contact submissions error:", error)
    return NextResponse.json(
      { error: "An error occurred while fetching submissions" },
      { status: 500 }
    )
  }
}
