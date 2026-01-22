/**
 * @fileoverview Landing Page
 * 
 * The main entry point for the Fraudlr website.
 * This is a one-page design with multiple sections:
 * 1. Hero - Main banner with value proposition
 * 2. Features - Platform capabilities
 * 3. Pricing - Subscription tiers
 * 4. Docs - API documentation
 * 5. Contact - Get in touch form
 * 
 * All sections are on a single page with smooth scroll navigation.
 */

import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Pricing } from "@/components/landing/pricing"
import { Docs } from "@/components/landing/docs"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"

/**
 * Home Page Component
 * 
 * Assembles all landing page sections into a single scrollable page.
 * The Header is fixed at the top for persistent navigation.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] smooth-scroll">
      {/* Fixed Navigation Header */}
      <Header />
      
      {/* Hero Section - Full viewport height */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* Pricing Section */}
      <Pricing />
      
      {/* API Documentation Section */}
      <Docs />
      
      {/* Contact Section */}
      <Contact />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
