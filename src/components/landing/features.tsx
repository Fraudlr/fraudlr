/**
 * @fileoverview Features Section Component
 * 
 * Displays the key features of the Fraudlr platform.
 * Features are displayed in a responsive grid layout.
 * 
 * Feature Categories:
 * 1. Revolutionized Detection - Anomaly detection capabilities
 * 2. Streamlined Reporting - Financial monitoring and alerts
 * 3. Tailored SaaS - Flexible platform customization
 */

import { 
  Shield, 
  LineChart, 
  Bell, 
  Layers,
  Zap,
  Lock
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Feature data structure
 * Each feature has an icon, title, and description
 */
const features = [
  {
    icon: Shield,
    title: "Anomaly Detection",
    description: "Our advanced algorithms identify unusual patterns in transactions, instantly flagging potential fraud for further investigation.",
    category: "Revolutionized Detection"
  },
  {
    icon: LineChart,
    title: "Financial Monitoring",
    description: "Continuous surveillance of financial activities ensures real-time protection, keeping your transactions secure around the clock.",
    category: "Streamlined Reporting"
  },
  {
    icon: Bell,
    title: "Customizable Alerts",
    description: "Tailored notifications allow you to set specific triggers, ensuring you're instantly informed of suspicious activities that matter most to your business.",
    category: "Streamlined Reporting"
  },
  {
    icon: Layers,
    title: "Tailored SaaS",
    description: "Our flexible Software-as-a-Service model allows you to customize and scale our fraud detection solutions to meet your specific business needs, ensuring seamless integration and maximum efficiency.",
    category: "Flexible Platform"
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Process and analyze transactions in real-time, ensuring immediate detection and response to potential threats before they escalate.",
    category: "Performance"
  },
  {
    icon: Lock,
    title: "Secure Infrastructure",
    description: "Enterprise-grade security with end-to-end encryption, ensuring your sensitive financial data is protected at every stage.",
    category: "Security"
  },
]

/**
 * Features Component
 * 
 * Displays a grid of feature cards highlighting Fraudlr's capabilities.
 * Uses a 3-column grid on desktop, 2 on tablet, and 1 on mobile.
 */
export function Features() {
  return (
    <section 
      id="features" 
      className="py-24 bg-gradient-to-b from-background to-background/95"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F3F3F3] mb-4">
            Powerful Features for{" "}
            <span className="text-[#FD4D53]">Modern Security</span>
          </h2>
          <p className="text-lg text-[#D9D9D9] max-w-2xl mx-auto">
            Discover how Fraudlr's cutting-edge AI technology can protect 
            your business from financial threats.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-[#0F0F0F] border-[#545454]/30 hover:border-[#FD4D53]/50 transition-all duration-300 group"
            >
              <CardHeader>
                {/* Feature Icon */}
                <div className="w-12 h-12 rounded-lg bg-[#FD4D53]/10 flex items-center justify-center mb-4 group-hover:bg-[#FD4D53]/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-[#FD4D53]" />
                </div>
                
                {/* Category Badge */}
                <span className="text-xs font-medium text-[#545454] uppercase tracking-wider">
                  {feature.category}
                </span>
                
                {/* Feature Title */}
                <CardTitle className="text-xl text-[#F3F3F3] group-hover:text-[#FD4D53] transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {/* Feature Description */}
                <CardDescription className="text-[#D9D9D9] text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
