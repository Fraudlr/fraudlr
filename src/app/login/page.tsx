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
 * Design follows shadcn/ui authentication example pattern with split-screen layout.
 */

"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Side - Testimonial/Branding */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-[#0F0F0F]" />
        <div className="absolute inset-0 hex-pattern opacity-20" />
        
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">
            <Image
              src="/images/fraudlr-white-logo.png"
              alt="Fraudlr Logo"
              width={160}
              height={64}
              className="h-12 w-auto"
              priority
            />
          </Link>
        </div>
        
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-[#F3F3F3]">
              &ldquo;Fraudlr has revolutionized how we detect fraud. The AI-powered analytics provide insights we never thought possible.&rdquo;
            </p>
            <footer className="text-sm text-[#D9D9D9]">Graham Jansen, Founder</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {/* Mobile Logo */}
          <div className="flex justify-center lg:hidden mb-6">
            <Link href="/">
              <Image
                src="/images/fraudlr-white-logo.png"
                alt="Fraudlr Logo"
                width={160}
                height={64}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-[#F3F3F3]">
              Welcome back
            </h1>
            <p className="text-sm text-[#D9D9D9]">
              Enter your email below to sign in to your account
            </p>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                {/* Email Field */}
                <div className="grid gap-2">
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
                <div className="grid gap-2">
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
              </div>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#545454]/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-[#545454]">
                  Or continue with
                </span>
              </div>
            </div>

            {/* GitHub OAuth Placeholder */}
            <Button variant="outline" type="button" disabled className="border-[#545454]/50 text-[#D9D9D9]">
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="github"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path
                  fill="currentColor"
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                />
              </svg>
              GitHub
            </Button>
          </div>

          {/* Terms and Signup Link */}
          <p className="px-8 text-center text-sm text-[#545454]">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-[#FD4D53]"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-[#FD4D53]"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <p className="text-center text-sm text-[#D9D9D9]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="underline underline-offset-4 hover:text-[#FD4D53]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
