/**
 * @fileoverview Prisma Client Singleton
 * 
 * This file sets up a single Prisma Client instance for the entire application.
 * In development, Next.js hot-reloading can create multiple Prisma instances,
 * which exhausts database connections. We prevent this by storing the client
 * on the global object.
 * 
 * Why use a singleton?
 * - Prevents "too many connections" errors in development
 * - Ensures consistent database state across the app
 * - Enables connection pooling efficiency
 */

import { PrismaClient } from "@prisma/client"

// Declare a global type for the Prisma client
// This allows TypeScript to recognize our global variable
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

/**
 * Prisma Client instance
 * 
 * Uses the global instance if available (development)
 * Otherwise creates a new instance (production)
 */
export const prisma = globalThis.prisma ?? new PrismaClient({
  // Log database queries in development for debugging
  log: process.env.NODE_ENV === "development" 
    ? ["query", "error", "warn"] 
    : ["error"],
})

// In development, store the client on the global object
// This survives hot-reloading without creating new connections
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma
}

/**
 * Helper function to handle Prisma errors gracefully
 * 
 * @param error - The error thrown by Prisma
 * @returns A user-friendly error message
 */
export function handlePrismaError(error: unknown): string {
  // Check if it's a Prisma error by looking at the code
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as { code: string; meta?: { target?: string[] } }
    
    switch (prismaError.code) {
      case 'P2002':
        // Unique constraint violation
        const field = prismaError.meta?.target?.[0] || 'field'
        return `A record with this ${field} already exists.`
      
      case 'P2025':
        // Record not found
        return 'The requested record was not found.'
      
      case 'P2003':
        // Foreign key constraint failed
        return 'This operation would break data relationships.'
      
      default:
        return 'A database error occurred. Please try again.'
    }
  }
  
  return 'An unexpected error occurred.'
}
