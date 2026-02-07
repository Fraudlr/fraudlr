/**
 * @fileoverview Pricing Page
 * 
 * A dedicated pricing page with:
 * - Pricing tier cards with currency & billing toggles
 * - Full feature comparison table with checkmarks
 * - Clear breakdown of what each tier includes
 */

"use client"

import * as React from "react"
import { Check, X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

/**
 * Pricing tier data
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
 * Feature comparison rows for the comparison table.
 * Each row has a category, feature name, and availability per tier.
 */
const comparisonFeatures = [
  {
    category: "Data & Uploads",
    features: [
      { name: "CSV file uploads", free: "2 / month", standard: "10 / month", pro: "Unlimited" },
      { name: "Case naming with AI", free: true, standard: true, pro: true },
      { name: "Historical data retention", free: "30 days", standard: "12 months", pro: "Unlimited" },
      { name: "External data links (API/SQL)", free: false, standard: "1 connection", pro: "Unlimited" },
      { name: "Real-time data ingestion", free: false, standard: false, pro: true },
      { name: "Scheduled data processing", free: false, standard: false, pro: true },
    ],
  },
  {
    category: "Analysis & Detection",
    features: [
      { name: "Benford's Law analysis", free: true, standard: true, pro: true },
      { name: "M-Score analysis", free: true, standard: true, pro: true },
      { name: "Visual explanations & insights", free: true, standard: true, pro: true },
      { name: "Follow-up AI prompting", free: true, standard: true, pro: true },
      { name: "Advanced analytics & visuals", free: false, standard: true, pro: true },
      { name: "Historical comparison", free: false, standard: true, pro: true },
      { name: "Trend analysis", free: false, standard: true, pro: true },
      { name: "Risk scoring", free: false, standard: true, pro: true },
    ],
  },
  {
    category: "Reporting & Export",
    features: [
      { name: "Basic dashboard reporting", free: true, standard: true, pro: true },
      { name: "Export to PDF", free: false, standard: true, pro: true },
      { name: "Export to Excel", free: false, standard: true, pro: true },
      { name: "Custom report templates", free: false, standard: false, pro: true },
      { name: "White-label reports", free: false, standard: false, pro: true },
    ],
  },
  {
    category: "Integrations",
    features: [
      { name: "REST API access", free: false, standard: false, pro: true },
      { name: "SQL database connections", free: false, standard: false, pro: true },
      { name: "Webhook notifications", free: false, standard: false, pro: true },
      { name: "Custom branding & white-label", free: false, standard: false, pro: true },
    ],
  },
  {
    category: "Team & Support",
    features: [
      { name: "Self-service knowledge base", free: true, standard: true, pro: true },
      { name: "Email support", free: false, standard: "48hr response", pro: "Priority" },
      { name: "Chat / phone support", free: false, standard: false, pro: true },
      { name: "Multi-user team access", free: false, standard: false, pro: true },
      { name: "Dedicated account manager", free: false, standard: false, pro: true },
    ],
  },
]

/**
 * Renders a comparison cell value as a check, cross, or text string.
 */
function ComparisonCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="h-5 w-5 text-[#FD4D53] mx-auto" />
  }
  if (value === false) {
    return <X className="h-5 w-5 text-[#545454] mx-auto" />
  }
  return <span className="text-sm text-[#D9D9D9]">{value}</span>
}

export default function PricingPage() {
  const [currency, setCurrency] = React.useState<"USD" | "ZAR">("USD")
  const [isAnnual, setIsAnnual] = React.useState(false)

  const formatPrice = (usd: number, zar: number): string => {
    const price = currency === "USD" ? usd : zar
    const discountedPrice = isAnnual ? price * 0.9 : price
    if (price === 0) return "Free"
    if (currency === "USD") return `$${discountedPrice.toFixed(0)}`
    return `R${discountedPrice.toFixed(0)}`
  }

  return (
    <main className="min-h-screen bg-[#0F0F0F]">
      <Header />

      {/* Pricing Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-background/95 to-background">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#D9D9D9] hover:text-[#F3F3F3] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#F3F3F3] mb-4">
              Simple, Transparent{" "}
              <span className="text-[#FD4D53]">Pricing</span>
            </h1>
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

          {/* Pricing Cards */}
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
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#FD4D53] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl text-[#F3F3F3]">
                    {tier.name}
                  </CardTitle>
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
                  <CardDescription className="text-[#D9D9D9] mt-4">
                    {tier.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
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

      {/* Feature Comparison Table */}
      <section className="py-24 bg-[#0F0F0F]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F3F3F3] mb-4">
              Detailed Feature{" "}
              <span className="text-[#FD4D53]">Comparison</span>
            </h2>
            <p className="text-[#D9D9D9] max-w-xl mx-auto">
              See exactly what&apos;s included in each plan so you can pick the
              right fit for your needs.
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-[#545454]/30">
                  <th className="text-left py-4 px-4 text-[#F3F3F3] font-medium w-[40%]">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 text-[#F3F3F3] font-medium w-[20%]">
                    Free
                  </th>
                  <th className="text-center py-4 px-4 font-medium w-[20%]">
                    <span className="text-[#FD4D53]">Standard</span>
                  </th>
                  <th className="text-center py-4 px-4 text-[#F3F3F3] font-medium w-[20%]">
                    Pro
                  </th>
                </tr>
              </thead>

              <tbody>
                {comparisonFeatures.map((group) => (
                  <React.Fragment key={group.category}>
                    {/* Category Header Row */}
                    <tr>
                      <td
                        colSpan={4}
                        className="pt-8 pb-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#FD4D53]"
                      >
                        {group.category}
                      </td>
                    </tr>

                    {/* Feature Rows */}
                    {group.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-b border-[#545454]/15 hover:bg-[#1A1A1A] transition-colors"
                      >
                        <td className="py-3 px-4 text-sm text-[#D9D9D9]">
                          {feature.name}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <ComparisonCell value={feature.free} />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <ComparisonCell value={feature.standard} />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <ComparisonCell value={feature.pro} />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-[#D9D9D9] mb-6">
              Not sure which plan is right for you?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                className="bg-[#FD4D53] hover:bg-[#FD4D53]/90"
                asChild
              >
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button
                variant="outline"
                className="border-[#545454] text-[#D9D9D9] hover:bg-[#545454]/30"
                asChild
              >
                <Link href="/#contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
