/**
 * @fileoverview Forgot Password Page
 * 
 * Allows users to request a password reset token.
 * In development, the token is displayed on screen.
 * In production, it would be sent via email.
 */

"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [resetToken, setResetToken] = React.useState("")
  const [expiresAt, setExpiresAt] = React.useState("")

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setResetToken("")

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.token) {
        setResetToken(data.token)
        setExpiresAt(new Date(data.expiresAt).toLocaleString())
      } else if (response.ok) {
        // Generic success message (security best practice - don't reveal if email exists)
        setError("")
        setResetToken("success-no-token")
      } else {
        setError(data.error || "An error occurred")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Copy token to clipboard
   */
  const copyToken = () => {
    navigator.clipboard.writeText(resetToken)
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
              &ldquo;Security is our top priority. Reset your password securely.&rdquo;
            </p>
            <footer className="text-sm text-[#D9D9D9]">Fraudlr Security Team</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
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
              Forgot your password?
            </h1>
            <p className="text-sm text-[#D9D9D9]">
              Enter your email address and we&apos;ll generate a reset token
            </p>
          </div>

          {!resetToken ? (
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
                        Generating token...
                      </>
                    ) : (
                      "Request Reset Token"
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
                    <p className="text-green-500 font-semibold mb-2">Reset Token Generated!</p>
                    <p className="text-[#D9D9D9] text-sm mb-3">
                      Your password reset token has been generated. Copy it and use it on the reset password page.
                    </p>
                    
                    {/* Token Display */}
                    <div className="bg-background border border-[#545454]/50 rounded-md p-3 mb-3">
                      <Label className="text-[#F3F3F3] text-xs mb-1 block">Your Reset Token:</Label>
                      <code className="text-[#FD4D53] text-sm break-all">{resetToken}</code>
                    </div>
                    
                    <p className="text-[#D9D9D9] text-xs mb-2">
                      Token expires at: {expiresAt}
                    </p>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={copyToken}
                        variant="outline"
                        size="sm"
                        className="border-[#545454]/50 text-[#D9D9D9] hover:bg-[#1F1F1F]"
                      >
                        Copy Token
                      </Button>
                      <Link href={`/reset-password?token=${resetToken}`}>
                        <Button
                          size="sm"
                          className="bg-[#FD4D53] hover:bg-[#FD4D53]/90"
                        >
                          Go to Reset Password
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning Note */}
              <div className="p-3 rounded-md bg-yellow-500/10 border border-yellow-500/50">
                <p className="text-yellow-500 text-xs">
                  <strong>Note:</strong> In production, this token would be sent to your email instead of being displayed here.
                </p>
              </div>

              {/* Request Another */}
              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setResetToken("")
                    setEmail("")
                  }}
                  className="text-[#D9D9D9] hover:text-[#FD4D53]"
                >
                  Request another token
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
