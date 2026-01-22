/**
 * @fileoverview Pricing Section Component
 * 
 * Displays the pricing tiers for Fraudlr:
 * - Free Tier: Basic features for sampling
 * - Standard Tier: For small to medium users
 * - Pro Tier: For organizations and integrations
 * 
 * Features:
 * - Currency toggle (USD/ZAR)
 * - Annual billing discount display
 * - Feature comparison lists
 */

"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"

/**
 * Pricing tier data structure
 * Contains all information about each pricing plan
 */
const pricingTiers = [
  {
    name: "Free",
    description: "Allows users to sample Fraudlr core features and understand its value.",
    priceUSD: 0,
    priceZAR: 0,
    period: "month",
    features: [
      "Upload up to 2 CSV files per month",
      "Use case naming with AI modules",
      "Benford Law & M-Score analysis",
      "Visual explanations & insights",
      "Follow-up prompting for details",
      "Basic dashboard reporting",
      "Self-service (no direct support)",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Standard",
    description: "Designed for small to medium users needing regular fraud analysis.",
    priceUSD: 10,
    priceZAR: 185,
    period: "month",
    features: [
      "Up to 10 CSV uploads per month",
      "All Free Tier features",
      "Advanced visuals & analytics",
      "Historical comparison",
      "Trend analysis",
      "Export to PDF or Excel",
      "Email support (48hr response)",
      "One external data link (API/SQL)",
    ],
    cta: "Upgrade to Standard",
    highlighted: true,
  },
  {
    name: "Pro",
    description: "Targeted at organisations integrating Fraudlr into workflows or automating data analysis.",
    priceUSD: 25,
    priceZAR: 462.50,
    period: "month",
    features: [
      "Unlimited CSV uploads",
      "All Standard Tier features",
      "Multiple external data links",
      "API and SQL integrations",
      "Real-time data ingestion",
      "Scheduled data processing",
      "Priority chat/phone support",
      "Custom branding & white-label",
      "Multi-user team access",
    ],
    cta: "Go Pro",
    highlighted: false,
  },
]

/**
 * Pricing Component
 * 
 * Displays pricing tiers in a responsive grid with currency toggle.
 */
export function Pricing() {
  // State for currency selection (USD or ZAR)
  const [currency, setCurrency] = React.useState<"USD" | "ZAR">("USD")
  
  // State for annual/monthly billing toggle
  const [isAnnual, setIsAnnual] = React.useState(false)
  
  /**
   * Formats price based on selected currency
   */
  const formatPrice = (usd: number, zar: number): string => {
    const price = currency === "USD" ? usd : zar
    // Apply 10% discount for annual billing
    const discountedPrice = isAnnual ? price * 0.9 : price
    
    if (price === 0) return "Free"
    
    if (currency === "USD") {
      return `$${discountedPrice.toFixed(0)}`
    }
    return `R${discountedPrice.toFixed(0)}`
  }

  return (
    <section 
      id="pricing" 
      className="py-24 bg-gradient-to-b from-background/95 to-background"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F3F3F3] mb-4">
            Simple, Transparent{" "}
            <span className="text-[#FD4D53]">Pricing</span>
          </h2>
          <p className="text-lg text-[#D9D9D9] max-w-2xl mx-auto mb-8">
            Choose the plan that best fits your needs. All plans include core 
            AI-powered fraud detection features.
          </p>
          
          {/* Billing Toggle Controls */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {/* Currency Toggle */}
            <div className="flex items-center gap-3">
              <Label 
                htmlFor="currency" 
                className={currency === "USD" ? "text-[#F3F3F3]" : "text-[#545454]"}
              >
                USD
              </Label>
              <Switch
                id="currency"
                checked={currency === "ZAR"}
                onCheckedChange={(checked) => setCurrency(checked ? "ZAR" : "USD")}
              />
              <Label 
                htmlFor="currency" 
                className={currency === "ZAR" ? "text-[#F3F3F3]" : "text-[#545454]"}
              >
                ZAR
              </Label>
            </div>
            
            {/* Billing Period Toggle */}
            <div className="flex items-center gap-3">
              <Label 
                htmlFor="billing" 
                className={!isAnnual ? "text-[#F3F3F3]" : "text-[#545454]"}
              >
                Monthly
              </Label>
              <Switch
                id="billing"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <Label 
                htmlFor="billing" 
                className={isAnnual ? "text-[#F3F3F3]" : "text-[#545454]"}
              >
                Annual
                <span className="ml-2 text-xs text-[#FD4D53] font-medium">
                  Save 10%
                </span>
              </Label>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.name}
              className={`relative bg-[#0F0F0F] border-[#545454]/30 ${
                tier.highlighted 
                  ? "border-[#FD4D53] shadow-lg shadow-[#FD4D53]/20" 
                  : ""
              }`}
            >
              {/* Popular Badge */}
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FD4D53] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                {/* Tier Name */}
                <CardTitle className="text-2xl text-[#F3F3F3]">
                  {tier.name}
                </CardTitle>
                
                {/* Price Display */}
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[#F3F3F3]">
                    {formatPrice(tier.priceUSD, tier.priceZAR)}
                  </span>
                  {tier.priceUSD > 0 && (
                    <span className="text-[#545454]">
                      /{isAnnual ? "mo (billed annually)" : tier.period}
                    </span>
                  )}
                </div>
                
                {/* Tier Description */}
                <CardDescription className="text-[#D9D9D9] mt-4">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                {/* Features List */}
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FD4D53] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#D9D9D9]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                {/* CTA Button */}
                <Button 
                  className={`w-full ${
                    tier.highlighted 
                      ? "bg-[#FD4D53] hover:bg-[#FD4D53]/90" 
                      : "bg-[#545454]/50 hover:bg-[#545454]"
                  }`}
                  asChild
                >
                  <Link href="/signup">{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
