/**
 * @fileoverview Authentication Utilities
 * 
 * This file contains all authentication-related functions:
 * - Password hashing and verification
 * - JWT token creation and validation
 * - Session management via cookies
 * 
 * Security Considerations:
 * - Passwords are hashed using bcrypt (industry standard)
 * - JWTs are signed with HS256 algorithm
 * - Tokens are stored in HTTP-only cookies to prevent XSS attacks
 */

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

// The secret key for signing JWTs
// In production, this should be a long, random string stored in environment variables
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
)

// Token expiration time (7 days by default)
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

// Cookie name for storing the auth token
const AUTH_COOKIE_NAME = 'fraudlr-auth-token'

/**
 * User payload stored in JWT token
 * Contains only non-sensitive user information
 */
export interface UserPayload {
  id: string
  email: string
  name: string
  tier: string
}

// ============================================
// PASSWORD HASHING
// ============================================

/**
 * Hashes a plain text password using bcrypt
 * 
 * @param password - The plain text password to hash
 * @returns The hashed password string
 * 
 * How bcrypt works:
 * 1. Generates a random salt (10 rounds = 2^10 iterations)
 * 2. Combines password + salt and hashes repeatedly
 * 3. Stores salt with hash so verification works
 */
export async function hashPassword(password: string): Promise<string> {
  // 10 rounds provides good security while keeping hash time reasonable
  // Higher numbers = more secure but slower
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

/**
 * Verifies a password against a stored hash
 * 
 * @param password - The plain text password to check
 * @param hash - The stored hash to compare against
 * @returns True if password matches, false otherwise
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// ============================================
// JWT TOKEN MANAGEMENT
// ============================================

/**
 * Creates a signed JWT token for a user
 * 
 * @param payload - User data to encode in the token
 * @returns The signed JWT string
 * 
 * JWT Structure:
 * - Header: Algorithm (HS256) + Token Type (JWT)
 * - Payload: User data + Issued At + Expiration
 * - Signature: HMAC-SHA256(header + payload, secret)
 */
export async function createToken(payload: UserPayload): Promise<string> {
  const token = await new SignJWT({ ...payload })
    // Set the algorithm for signing
    .setProtectedHeader({ alg: 'HS256' })
    // Set when the token was issued
    .setIssuedAt()
    // Set when the token expires (parsed from string like "7d")
    .setExpirationTime(JWT_EXPIRES_IN)
    // Sign with our secret key
    .sign(JWT_SECRET)
  
  return token
}

/**
 * Verifies and decodes a JWT token
 * 
 * @param token - The JWT string to verify
 * @returns The decoded payload if valid, null otherwise
 */
export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    // jwtVerify checks signature and expiration
    const { payload } = await jwtVerify(token, JWT_SECRET)
    
    // Return the user payload from the token
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      tier: payload.tier as string,
    }
  } catch (error) {
    // Token is invalid, expired, or tampered with
    console.error('Token verification failed:', error)
    return null
  }
}

// ============================================
// SESSION MANAGEMENT
// ============================================

/**
 * Stores the auth token in an HTTP-only cookie
 * 
 * @param token - The JWT token to store
 * 
 * Cookie Settings:
 * - httpOnly: Prevents JavaScript access (XSS protection)
 * - secure: Only sent over HTTPS in production
 * - sameSite: Prevents CSRF attacks
 * - maxAge: Cookie expiration in seconds
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: '/',
  })
}

/**
 * Retrieves the auth token from cookies
 * 
 * @returns The token string if present, undefined otherwise
 */
export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(AUTH_COOKIE_NAME)
  return cookie?.value
}

/**
 * Clears the auth cookie (logout)
 */
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE_NAME)
}

/**
 * Gets the current authenticated user from the session
 * 
 * @returns The user payload if authenticated, null otherwise
 * 
 * This is the main function to use in API routes and pages
 * to check if a user is logged in and get their info
 */
export async function getCurrentUser(): Promise<UserPayload | null> {
  const token = await getAuthCookie()
  
  if (!token) {
    return null
  }
  
  return verifyToken(token)
}
