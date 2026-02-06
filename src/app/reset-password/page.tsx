/**
 * @fileoverview Reset Password Page
 * 
 * Allows users to set a new password using their reset token.
 */

"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [token, setToken] = React.useState(searchParams.get("token") || "")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [success, setSuccess] = React.useState(false)

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Validate password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      } else {
        setError(data.error || "Failed to reset password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Side - Branding */}
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
              &ldquo;Choose a strong password to keep your account secure.&rdquo;
            </p>
            <footer className="text-sm text-[#D9D9D9]">Fraudlr Security Team</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Side - Reset Password Form */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
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
              Reset your password
            </h1>
            <p className="text-sm text-[#D9D9D9]">
              Enter your reset token and choose a new password
            </p>
          </div>

          {!success ? (
            <div className="grid gap-6">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  {/* Reset Token Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="token" className="text-[#F3F3F3]">
                      Reset Token
                    </Label>
                    <Input
                      id="token"
                      type="text"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="Enter your reset token"
                      required
                      disabled={isLoading}
                      className="bg-background border-[#545454]/50 text-[#F3F3F3] placeholder:text-[#545454] font-mono text-sm"
                    />
                    <p className="text-xs text-[#545454]">
                      Paste the token you received from the forgot password page
                    </p>
                  </div>

                  {/* New Password Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-[#F3F3F3]">
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        disabled={isLoading}
                        className="bg-background border-[#545454]/50 text-[#F3F3F3] placeholder:text-[#545454] pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#545454] hover:text-[#D9D9D9]"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-[#545454]">
                      Must be at least 8 characters
                    </p>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword" className="text-[#F3F3F3]">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        disabled={isLoading}
                        className="bg-background border-[#545454]/50 text-[#F3F3F3] placeholder:text-[#545454] pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#545454] hover:text-[#D9D9D9]"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
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
                        Resetting password...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </div>
              </form>

              {/* Back to Login */}
              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-[#D9D9D9] hover:text-[#FD4D53] underline underline-offset-4"
                >
                  Back to login
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {/* Success Message */}
              <div className="p-4 rounded-md bg-green-500/10 border border-green-500/50">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-green-500 font-semibold mb-2">Password Reset Successful!</p>
                    <p className="text-[#D9D9D9] text-sm">
                      Your password has been successfully reset. You can now log in with your new password.
                    </p>
                    <p className="text-[#D9D9D9] text-sm mt-2">
                      Redirecting to login page in 3 seconds...
                    </p>
                  </div>
                </div>
              </div>

              {/* Manual Redirect */}
              <div className="text-center">
                <Link href="/login">
                  <Button className="bg-[#FD4D53] hover:bg-[#FD4D53]/90">
                    Go to Login Now
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
