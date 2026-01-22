/**
 * @fileoverview Hero Section Component
 * 
 * The main hero/banner section of the landing page.
 * This is the first thing visitors see and contains:
 * - Main headline and value proposition
 * - Call-to-action button
 * - Hero image (neon hex logo)
 * 
 * Design Notes:
 * - Full viewport height
 * - Gradient text effect for visual interest
 * - Responsive layout (stacked on mobile, side-by-side on desktop)
 */

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

/**
 * Hero Component
 * 
 * The main banner section with headline, description, and CTA.
 * Uses a two-column layout on desktop with the description on the left
 * and the hero image on the right.
 */
export function Hero() {
  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center pt-16 hex-pattern"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-8">
            {/* Main Headline - H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-[#F3F3F3]">AI powered </span>
              <span className="text-[#FD4D53]">fraud</span>
              <span className="text-[#F3F3F3]"> and </span>
              <span className="text-[#FD4D53]">anomaly detection</span>
              <span className="text-[#F3F3F3]"> platform.</span>
            </h1>
            
            {/* Subheadline/Description */}
            <p className="text-lg md:text-xl text-[#D9D9D9] max-w-xl">
              Assume fraud, proactively detect fraud in transactions and statements.
            </p>
            
            {/* Extended Value Proposition */}
            <p className="text-base text-[#545454] max-w-xl">
              Fraudlr aims to revolutionize financial security awareness by developing 
              cutting-edge AI capabilities that swiftly identifies and detects financial 
              fraud and discrepancies, ensuring a safe and trustworthy financial ecosystem.
            </p>
            
            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary CTA - Get Started */}
              <Button 
                size="lg" 
                className="bg-[#FD4D53] hover:bg-[#FD4D53]/90 text-white glow-effect text-lg px-8 py-6"
                asChild
              >
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              {/* Secondary CTA - Learn More */}
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#545454] text-[#D9D9D9] hover:bg-[#545454]/20 text-lg px-8 py-6"
                asChild
              >
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
          
          {/* Right Column: Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-[#FD4D53]/20 blur-3xl rounded-full scale-75" />
            
            {/* Hero Image - Neon Hex Logo */}
            <div className="relative">
              <Image
                src="/images/Logo Icon.png"
                alt="Fraudlr AI Detection Visualization"
                width={500}
                height={500}
                className="relative z-10 animate-pulse-glow"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#545454] rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#FD4D53] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
