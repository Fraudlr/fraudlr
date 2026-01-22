/**
 * @fileoverview Footer Component
 * 
 * The footer section of the landing page.
 * Contains:
 * - Fraudlr logo
 * - Quick navigation links
 * - Social media links
 * - Copyright notice
 */

import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

/**
 * Footer link groups
 */
const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Documentation", href: "#docs" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "Careers", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
}

/**
 * Footer Component
 * 
 * Displays the site footer with links and branding.
 */
export function Footer() {
  return (
    <footer className="bg-[#0F0F0F] border-t border-[#545454]/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Image
              src="/images/FraudlrWhite (500 x 200 px) Main Logo.png"
              alt="Fraudlr Logo"
              width={120}
              height={48}
              className="h-8 w-auto"
            />
            <p className="text-[#545454] text-sm">
              AI-powered fraud and anomaly detection platform. 
              Protecting your financial ecosystem.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-[#F3F3F3] font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#545454] hover:text-[#FD4D53] text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[#F3F3F3] font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#545454] hover:text-[#FD4D53] text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-[#F3F3F3] font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#545454] hover:text-[#FD4D53] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-[#545454]/30" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#545454] text-sm">
            © {new Date().getFullYear()} Fraudlr. All rights reserved.
          </p>
          <p className="text-[#545454] text-sm">
            Built with ❤️ for financial security
          </p>
        </div>
      </div>
    </footer>
  )
}
