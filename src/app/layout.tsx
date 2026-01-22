/**
 * @fileoverview Root Layout
 * 
 * This is the root layout component for the Next.js application.
 * It wraps all pages and provides:
 * - Geist font loading
 * - Theme provider for dark/light mode
 * - Global HTML structure
 * 
 * In Next.js App Router, layouts are special components that:
 * - Persist across page navigations
 * - Don't re-render on route changes
 * - Can fetch data server-side
 */

import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/providers/theme-provider"
import "./globals.css"

/**
 * Metadata Configuration
 * 
 * This object defines SEO metadata for the application.
 * Next.js uses this to generate <head> tags automatically.
 */
export const metadata: Metadata = {
  // Page title configuration
  title: {
    default: "Fraudlr - AI Powered Fraud Detection",
    template: "%s | Fraudlr",
  },
  // Page description for search engines
  description: "AI powered fraud and anomaly detection platform. Proactively detect fraud in transactions and statements.",
  // Keywords for SEO
  keywords: [
    "fraud detection",
    "AI",
    "anomaly detection",
    "financial security",
    "fintech",
    "machine learning",
    "transaction monitoring",
  ],
  // Author information
  authors: [{ name: "Fraudlr" }],
  // Open Graph metadata for social sharing
  openGraph: {
    title: "Fraudlr - AI Powered Fraud Detection",
    description: "Proactively detect fraud in transactions and statements with cutting-edge AI.",
    url: "https://fraudlr.com",
    siteName: "Fraudlr",
    locale: "en_US",
    type: "website",
  },
  // Twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: "Fraudlr - AI Powered Fraud Detection",
    description: "Proactively detect fraud in transactions and statements with cutting-edge AI.",
  },
  // Favicon and icons
  icons: {
    icon: "/favicon.ico",
  },
}

/**
 * Root Layout Component
 * 
 * @param children - Page content to render inside the layout
 * 
 * This layout:
 * 1. Sets the HTML language to English
 * 2. Applies Geist font CSS variables
 * 3. Suppresses hydration warnings (for theme flicker prevention)
 * 4. Wraps everything in ThemeProvider for dark mode support
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      // suppressHydrationWarning prevents warnings from next-themes
      // which modifies the HTML element on the client
      suppressHydrationWarning
    >
      <body 
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        {/* 
          ThemeProvider enables dark/light mode switching
          - attribute: Where to store theme (class on html element)
          - defaultTheme: Start with dark theme (Fraudlr brand)
          - enableSystem: Allow system preference detection
          - disableTransitionOnChange: Prevent flash during theme switch
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
