/**
 * @fileoverview The Solution Page
 *
 * A dedicated page that outlines:
 * 1. The Problem – Why fraud is hard to detect
 * 2. The Stats – Real-world fraud statistics (Africa & US/Europe)
 * 3. The Solution – How Fraudlr tackles fraud proactively
 */

"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ShieldAlert,
  TrendingUp,
  Lightbulb,
  AlertTriangle,
  BarChart3,
  BrainCircuit,
  Bell,
  Cloud,
  Eye,
  ChevronRight,
  X,
  Check,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const problems = [
  {
    icon: ShieldAlert,
    title: "Sophisticated Schemes",
    description:
      "Fraud schemes are becoming increasingly sophisticated, making them difficult to identify with traditional methods.",
  },
  {
    icon: Eye,
    title: "Lack of Visibility",
    description:
      "Hidden transactions and complex corporate structures reduce visibility into financial activities, complicating the detection of fraud.",
  },
  {
    icon: AlertTriangle,
    title: "Unethical Culture",
    description:
      "An unethical corporate culture and high-pressure environments can increase the likelihood of fraud and hinder detection efforts.",
  },
  {
    icon: BarChart3,
    title: "Sampling Risks",
    description:
      "Auditors may miss fraudulent activities due to sampling risks that leave gaps in coverage.",
  },
  {
    icon: TrendingUp,
    title: "Limited Resources",
    description:
      "Limited resources and budget constraints can impede thorough fraud investigations.",
  },
]

const challenges = [
  "Sophisticated Techniques",
  "Complex Corporate Structures",
  "Management Override",
  "Inadequate Tools",
  "Experience and Expertise",
  "Cost-Benefit Analysis",
]

const negatives = [
  "Resources and expertise to investigate, increasing the costs associated with detection.",
  "Lack of transparency prolongs the time needed to unravel fraudulent schemes, delaying corrective actions.",
  "If senior management is involved, internal controls may be overridden, and whistleblowers may be discouraged or punished.",
  "Organizations may prioritize short-term savings over long-term risk mitigation, increasing the likelihood of undetected fraud.",
]

const africaStats = [
  { value: "71%", label: "of internal frauds were perpetrated by senior management" },
  {
    value: "42%",
    label: (
      <>
        of <span className="font-bold text-[#FD4D53]">South Africa</span>{" "}
        respondents did not conduct an investigation of their most serious fraud
        incident
      </>
    ),
  },
  {
    value: "42%",
    label:
      "either don't have a third-party risk management programme or don't do any form of risk scoring as part of their programme",
  },
  {
    value: "49%",
    label: (
      <>
        of <span className="font-bold text-[#FD4D53]">South African</span>{" "}
        companies had seen an increase in fraud in the previous 12 months
      </>
    ),
  },
  {
    value: "22% → 34%",
    label: "Accounting / Financial statement fraud up from 22% in 2018 to 34% in 2020",
  },
]

const westernStats = [
  {
    value: "62%",
    label: "of internal frauds, globally, were perpetrated by C-suite respondents",
  },
  {
    value: "14%",
    label: (
      <>
        Fraud losses in the{" "}
        <span className="font-bold text-[#FD4D53]">U.S.</span> reached over $10
        billion in 2023, marking a 14% increase
      </>
    ),
  },
  {
    value: "86%",
    label: (
      <>
        Financial statement fraud, asset misappropriation, and corruption were
        the most common types of occupational fraud reported in the{" "}
        <span className="font-bold text-[#FD4D53]">U.S.</span>
      </>
    ),
  },
  {
    value: "70%",
    label: (
      <>
        Financial statement fraud, asset misappropriation, and corruption were
        the most common types of occupational fraud reported in{" "}
        <span className="font-bold text-[#FD4D53]">Europe</span>
      </>
    ),
  },
  {
    value: "€120b",
    label: (
      <>
        Fraud costs the{" "}
        <span className="font-bold text-[#FD4D53]">EU</span> economy an
        estimated €120 billion annually
      </>
    ),
  },
  {
    value: "60%",
    label: (
      <>
        of companies in{" "}
        <span className="font-bold text-[#FD4D53]">Europe</span> investing in
        advanced fraud prevention
      </>
    ),
  },
]

const solutionPillars = [
  {
    icon: BrainCircuit,
    title: "Revolutionized Detection",
    items: [
      {
        heading: "Anomaly Detection",
        text: "Our advanced algorithms identify unusual patterns in transactions, instantly flagging potential fraud for further investigation.",
      },
      {
        heading: "Predictive Analytics",
        text: "We leverage AI to anticipate and prevent fraudulent activities by analysing historical data and predicting future threats.",
      },
    ],
  },
  {
    icon: BarChart3,
    title: "Streamlined Reporting & Insights",
    items: [
      {
        heading: "Financial Monitoring",
        text: "Continuous surveillance of financial activities ensures real-time protection, keeping your transactions secure around the clock.",
      },
      {
        heading: "Customizable Alerts",
        text: "Tailored notifications allow you to set specific triggers, ensuring you're instantly informed of suspicious activities that matter most to your business.",
      },
    ],
  },
  {
    icon: Cloud,
    title: "Tailored SaaS",
    items: [
      {
        heading: "Built for Your Business",
        text: "Our flexible Software-as-a-Service model allows you to customize and scale our fraud detection solutions to meet your specific business needs, ensuring seamless integration and maximum efficiency.",
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SolutionPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F]">
      <Header />

      {/* ───────────────── Hero ───────────────── */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background/95 to-background">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#D9D9D9] hover:text-[#F3F3F3] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[#F3F3F3] mb-6">
              The <span className="text-[#FD4D53]">Solution</span>
            </h1>
            <p className="text-lg text-[#D9D9D9]">
              Fraud is evolving faster than ever. Understand the landscape, see
              the numbers, and discover how Fraudlr helps you stay ahead.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── The Problem ───────────────── */}
      <section id="problem" className="py-24 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F3F3F3] mb-4">
              The <span className="text-[#FD4D53]">Problem</span>
            </h2>
            <p className="text-[#D9D9D9] max-w-2xl mx-auto">
              Detecting fraud remains one of the most complex challenges facing
              organisations today — spanning technical, procedural, and
              human-related issues.
            </p>
          </div>

          {/* Problem cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {problems.map((p) => (
              <Card
                key={p.title}
                className="bg-[#0F0F0F] border-[#545454]/30 hover:border-[#FD4D53]/40 transition-colors"
              >
                <CardHeader className="flex flex-row items-start gap-4 pb-2">
                  <div className="rounded-lg bg-[#FD4D53]/10 p-2.5 shrink-0">
                    <p.icon className="h-5 w-5 text-[#FD4D53]" />
                  </div>
                  <CardTitle className="text-lg text-[#F3F3F3]">
                    {p.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#D9D9D9] leading-relaxed">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Challenges & Negatives side-by-side */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Challenges */}
            <div className="rounded-xl border border-[#545454]/30 bg-[#0F0F0F] p-8">
              <h3 className="text-xl font-semibold text-[#F3F3F3] mb-6 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[#FD4D53]" />
                Key Challenges
              </h3>
              <ul className="space-y-3">
                {challenges.map((c) => (
                  <li key={c} className="flex items-center gap-3">
                    <ChevronRight className="h-4 w-4 text-[#FD4D53] shrink-0" />
                    <span className="text-sm text-[#D9D9D9]">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Negatives */}
            <div className="rounded-xl border border-[#545454]/30 bg-[#0F0F0F] p-8">
              <h3 className="text-xl font-semibold text-[#F3F3F3] mb-6 flex items-center gap-2">
                <X className="h-5 w-5 text-[#FD4D53]" />
                The Consequences
              </h3>
              <ul className="space-y-4">
                {negatives.map((n, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#FD4D53] shrink-0" />
                    <span className="text-sm text-[#D9D9D9] leading-relaxed">
                      {n}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── The Stats ───────────────── */}
      <section id="stats" className="py-24 bg-[#0F0F0F]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F3F3F3] mb-4">
              The <span className="text-[#FD4D53]">Stats</span>
            </h2>
            <p className="text-[#D9D9D9] max-w-2xl mx-auto">
              The numbers paint a stark picture — fraud is on the rise across
              every continent.
            </p>
          </div>

          {/* Africa */}
          <div className="max-w-6xl mx-auto mb-20">
            <h3 className="text-xl font-semibold text-[#F3F3F3] mb-2">
              🌍 Africa
            </h3>
            <p className="text-sm text-[#545454] mb-8">
              Statistics based on African countries
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {africaStats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[#545454]/30 bg-[#0A0A0A] p-6 hover:border-[#FD4D53]/40 transition-colors"
                >
                  <span className="block text-3xl md:text-4xl font-bold text-[#FD4D53] mb-3">
                    {s.value}
                  </span>
                  <p className="text-sm text-[#D9D9D9] leading-relaxed">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* US / Europe */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-semibold text-[#F3F3F3] mb-2">
              🌎 <span className="font-bold">USA</span> &amp;{" "}
              <span className="font-bold">Europe</span>
            </h3>
            <p className="text-sm text-[#545454] mb-8">
              Statistics based on{" "}
              <span className="font-bold text-[#FD4D53]">US</span> /{" "}
              <span className="font-bold text-[#FD4D53]">Europe</span>{" "}
              countries
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {westernStats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[#545454]/30 bg-[#0A0A0A] p-6 hover:border-[#FD4D53]/40 transition-colors"
                >
                  <span className="block text-3xl md:text-4xl font-bold text-[#FD4D53] mb-3">
                    {s.value}
                  </span>
                  <p className="text-sm text-[#D9D9D9] leading-relaxed">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── The Solution ───────────────── */}
      <section id="solution" className="py-24 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F3F3F3] mb-4">
              The <span className="text-[#FD4D53]">Solution</span>
            </h2>
            <p className="text-lg text-[#D9D9D9] leading-relaxed">
              If you assume fraud, then approach proactively — it is possible
              today to action proactive measures on addressing financial fraud
              before matters get out of hand in your company.{" "}
              <span className="text-[#F3F3F3] font-medium">
                If it&apos;s difficult to prevent, then detect it.
              </span>
            </p>
            <p className="mt-4 text-lg text-[#D9D9D9]">
              <span className="text-[#FD4D53] font-bold">Fraudlr</span> detects
              fraud with a holistic approach:
            </p>
          </div>

          {/* Pillar cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {solutionPillars.map((pillar) => (
              <Card
                key={pillar.title}
                className="bg-[#0F0F0F] border-[#545454]/30 hover:border-[#FD4D53]/40 transition-colors flex flex-col"
              >
                <CardHeader className="pb-4">
                  <div className="rounded-lg bg-[#FD4D53]/10 p-3 w-fit mb-4">
                    <pillar.icon className="h-6 w-6 text-[#FD4D53]" />
                  </div>
                  <CardTitle className="text-xl text-[#F3F3F3]">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-6">
                  {pillar.items.map((item) => (
                    <div key={item.heading}>
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="h-4 w-4 text-[#FD4D53] shrink-0" />
                        <h4 className="text-sm font-semibold text-[#F3F3F3]">
                          {item.heading}
                        </h4>
                      </div>
                      <p className="text-sm text-[#D9D9D9] leading-relaxed pl-6">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <p className="text-[#D9D9D9] mb-6 text-lg">
              Ready to take a proactive stance against fraud?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                className="bg-[#FD4D53] hover:bg-[#FD4D53]/90 px-8"
                asChild
              >
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button
                variant="outline"
                className="border-[#545454] text-[#D9D9D9] hover:bg-[#545454]/30"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
