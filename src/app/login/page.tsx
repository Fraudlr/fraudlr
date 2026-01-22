/**
 * @fileoverview Login Page
 * 
 * The login page for returning users to authenticate.
 * Features:
 * - Email and password form
 * - "Remember me" option
 * - Link to signup for new users
 * - Server-side form submission
 * 
 * Design follows shadcn/ui authentication example pattern.
 */

"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

/**
 * Login Page Component
 * 
 * Provides a form for users to log in to their Fraudlr account.
 * Uses the shadcn/ui authentication example layout.
 */
export default function LoginPage() {
  // Router for navigation after login
  const router = useRouter()
  
  // Form state
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  /**
   * Handles form submission
   * Sends credentials to API and redirects on success
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Call login API endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Login successful - redirect to dashboard
        router.push("/dashboard")
        router.refresh()
      } else {
        // Show error message from API
        setError(data.error || "Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 hex-pattern opacity-30" />
      
      {/* Login Card */}
      <Card className="relative w-full max-w-md bg-[#0F0F0F] border-[#545454]/30">
        <CardHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/images/FraudlrWhite (500 x 200 px) Main Logo.png"
                alt="Fraudlr Logo"
                width={160}
                height={64}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>
          
          <CardTitle className="text-2xl text-[#F3F3F3]">
            Welcome back
          </CardTitle>
          <CardDescription className="text-[#D9D9D9]">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#F3F3F3]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                disabled={isLoading}
                className="bg-background border-[#545454]/50 text-[#F3F3F3] placeholder:text-[#545454]"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#F3F3F3]">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#FD4D53] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="bg-background border-[#545454]/50 text-[#F3F3F3] placeholder:text-[#545454]"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-md bg-[#FD4D53]/10 border border-[#FD4D53]/50">
                <p className="text-[#FD4D53] text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FD4D53] hover:bg-[#FD4D53]/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          {/* Divider */}
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#545454]/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0F0F0F] px-2 text-[#545454]">
                New to Fraudlr?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Button variant="outline" className="w-full border-[#545454]/50 text-[#D9D9D9]" asChild>
            <Link href="/signup">Create an account</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
