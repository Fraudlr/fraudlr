/**
 * @fileoverview Sign Up Page
 * 
 * Registration page for new users to create an account.
 * Features:
 * - Name, email, and password fields
 * - Password confirmation
 * - Terms acceptance
 * - Automatic redirect to dashboard after signup
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
import { Loader2, Check } from "lucide-react"

/**
 * Signup Page Component
 * 
 * Provides a form for new users to create a Fraudlr account.
 * Creates a database entry and redirects to dashboard on success.
 */
export default function SignupPage() {
  // Router for navigation after signup
  const router = useRouter()
  
  // Form state
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  /**
   * Password validation checks
   */
  const passwordChecks = {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasLetter: /[a-zA-Z]/.test(password),
    matches: password === confirmPassword && password.length > 0,
  }

  /**
   * Handles form submission
   * Creates new user account and redirects to dashboard
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (!passwordChecks.minLength || !passwordChecks.hasNumber || !passwordChecks.hasLetter) {
      setError("Password does not meet requirements")
      setIsLoading(false)
      return
    }

    try {
      // Call signup API endpoint
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Signup successful - redirect to dashboard
        router.push("/dashboard")
        router.refresh()
      } else {
        // Show error message from API
        setError(data.error || "Failed to create account")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 hex-pattern opacity-30" />
      
      {/* Signup Card */}
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
            Create an account
          </CardTitle>
          <CardDescription className="text-[#D9D9D9]">
            Start detecting fraud with AI-powered analytics
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#F3F3F3]">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                disabled={isLoading}
                className="bg-background border-[#545454]/50 text-[#F3F3F3] placeholder:text-[#545454]"
              />
            </div>

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
              <Label htmlFor="password" className="text-[#F3F3F3]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                disabled={isLoading}
                className="bg-background border-[#545454]/50 text-[#F3F3F3] placeholder:text-[#545454]"
              />
              
              {/* Password Requirements */}
              {password.length > 0 && (
                <div className="space-y-1 pt-2">
                  <PasswordCheck 
                    passed={passwordChecks.minLength} 
                    text="At least 8 characters" 
                  />
                  <PasswordCheck 
                    passed={passwordChecks.hasLetter} 
                    text="Contains a letter" 
                  />
                  <PasswordCheck 
                    passed={passwordChecks.hasNumber} 
                    text="Contains a number" 
                  />
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#F3F3F3]">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                disabled={isLoading}
                className="bg-background border-[#545454]/50 text-[#F3F3F3] placeholder:text-[#545454]"
              />
              {confirmPassword.length > 0 && (
                <PasswordCheck 
                  passed={passwordChecks.matches} 
                  text="Passwords match" 
                />
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-md bg-[#FD4D53]/10 border border-[#FD4D53]/50">
                <p className="text-[#FD4D53] text-sm">{error}</p>
              </div>
            )}

            {/* Terms Notice */}
            <p className="text-xs text-[#545454]">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-[#FD4D53] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#FD4D53] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FD4D53] hover:bg-[#FD4D53]/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
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
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Button variant="outline" className="w-full border-[#545454]/50 text-[#D9D9D9]" asChild>
            <Link href="/login">Sign in instead</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

/**
 * Password Check Component
 * 
 * Displays a checkmark or cross for password requirements
 */
function PasswordCheck({ passed, text }: { passed: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
        passed ? "bg-green-500/20 text-green-500" : "bg-[#545454]/20 text-[#545454]"
      }`}>
        {passed && <Check className="w-3 h-3" />}
      </div>
      <span className={passed ? "text-green-500" : "text-[#545454]"}>
        {text}
      </span>
    </div>
  )
}
