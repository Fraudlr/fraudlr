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

  /**
   * Handle Google OAuth login
   */
  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth - this will redirect to Google's OAuth consent page
    window.location.href = "/api/auth/google"
  }

  /**
   * Handle Microsoft OAuth login
   */
  const handleMicrosoftLogin = () => {
    // TODO: Implement Microsoft OAuth - this will redirect to Microsoft's OAuth consent page
    window.location.href = "/api/auth/microsoft"
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Side - Testimonial/Branding */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-[#0F0F0F]" />
        <div className="absolute inset-0 hex-pattern opacity-20" />
        <div className="relative z-20 flex flex-1 flex-col items-center justify-center text-center">
          <Link href="/">
            <Image
              src="/images/fraudlr-white-logo.png"
              alt="Fraudlr Logo"
              width={160}
              height={64}
              className="h-12 w-auto mb-8"
              priority
            />
          </Link>
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

            {/* Google OAuth */}
            <Button 
              variant="outline" 
              type="button" 
              onClick={handleGoogleLogin}
              className="w-full border-[#545454]/50 text-[#D9D9D9] hover:bg-[#1F1F1F]"
            >
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>

            {/* Microsoft OAuth */}
            <Button 
              variant="outline" 
              type="button" 
              onClick={handleMicrosoftLogin}
              className="w-full border-[#545454]/50 text-[#D9D9D9] hover:bg-[#1F1F1F]"
            >
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 23 23"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H12z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba08" d="M12 12h10v10H12z"/>
              </svg>
              Continue with Microsoft
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
