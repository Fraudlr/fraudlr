/**
 * @fileoverview Privacy Policy Page
 * 
 * GDPR and POPI compliant privacy policy for Fraudlr.
 * Jurisdiction: South Africa
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Privacy Policy | Fraudlr",
  description: "Privacy Policy for Fraudlr - GDPR and POPI compliant",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Header */}
      <header className="border-b border-[#545454]/30">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="text-[#F3F3F3] hover:text-[#FD4D53]">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-[#1A1A1A] rounded-lg p-8 md:p-12 border border-[#545454]/30">
          <h1 className="text-4xl font-bold text-[#F3F3F3] mb-4">Privacy Policy</h1>
          <p className="text-[#545454] mb-8">Last Updated: January 28, 2026</p>

          <div className="space-y-8 text-[#F3F3F3]">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">1. Introduction</h2>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                Fraudlr ("we", "our", or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our fraud detection platform and services.
              </p>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                This policy complies with the Protection of Personal Information Act 4 of 2013 (POPIA) of South Africa and the General Data Protection Regulation (GDPR) where applicable.
              </p>
              <p className="text-[#D4D4D4] leading-relaxed">
                <strong>Jurisdiction:</strong> This Privacy Policy is governed by the laws of the Republic of South Africa. Our operations are based in South Africa, and any disputes arising from this policy shall be subject to the exclusive jurisdiction of South African courts.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">2.1 Personal Information</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4] mb-4">
                <li>Register for an account</li>
                <li>Use our services</li>
                <li>Contact us for support</li>
                <li>Subscribe to our newsletter</li>
              </ul>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                This information may include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4] mb-4">
                <li>Name and contact information (email address, phone number)</li>
                <li>Company information</li>
                <li>Login credentials</li>
                <li>Payment information</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">2.2 Automatically Collected Information</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                When you access our platform, we automatically collect certain information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                <li>Log and usage data (IP address, browser type, operating system)</li>
                <li>Device information</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Usage patterns and preferences</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3] mt-4">2.3 Transaction Data</h3>
              <p className="text-[#D4D4D4] leading-relaxed">
                For fraud detection purposes, we process transaction data that you upload or integrate into our platform. This may include financial transaction details, customer behavior patterns, and other data necessary for fraud analysis.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">3. How We Use Your Information</h2>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                We process your personal information for the following purposes, in accordance with POPIA's lawful processing conditions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                <li><strong>Service Delivery:</strong> To provide, maintain, and improve our fraud detection services</li>
                <li><strong>Account Management:</strong> To create and manage your account</li>
                <li><strong>Communication:</strong> To send you technical notices, updates, security alerts, and support messages</li>
                <li><strong>Analytics:</strong> To understand how our services are used and improve user experience</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                <li><strong>Fraud Prevention:</strong> To detect, prevent, and address fraud and security issues</li>
                <li><strong>Marketing:</strong> With your consent, to send promotional communications (you may opt-out at any time)</li>
              </ul>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Legal Basis for Processing */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">4. Legal Basis for Processing</h2>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                Under POPIA and GDPR, we process your personal information based on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                <li><strong>Consent:</strong> You have given clear consent for us to process your personal information for specific purposes</li>
                <li><strong>Contract:</strong> Processing is necessary for the performance of a contract with you</li>
                <li><strong>Legal Obligation:</strong> Processing is necessary to comply with the law</li>
                <li><strong>Legitimate Interests:</strong> Processing is necessary for our legitimate interests or those of a third party, provided your rights do not override these interests</li>
              </ul>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Data Sharing and Disclosure */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">5. Data Sharing and Disclosure</h2>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4] mb-4">
                <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf (e.g., hosting, analytics, payment processing)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to respond to legal processes</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
                <li><strong>With Your Consent:</strong> When you have given explicit consent to share your information</li>
              </ul>
              <p className="text-[#D4D4D4] leading-relaxed">
                We ensure that all third parties are contractually bound to protect your personal information in accordance with POPIA and GDPR standards.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* International Data Transfers */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">6. International Data Transfers</h2>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                Your information may be transferred to and processed in countries other than South Africa. When we transfer personal information internationally, we ensure appropriate safeguards are in place, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                <li>Standard contractual clauses approved by the South African Information Regulator</li>
                <li>Adequacy decisions by relevant authorities</li>
                <li>Binding corporate rules</li>
                <li>Your explicit consent where required</li>
              </ul>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">7. Your Rights Under POPIA and GDPR</h2>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4] mb-4">
                <li><strong>Right to Access:</strong> Request access to your personal information</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation of how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured, commonly used format</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or for direct marketing</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time (without affecting prior lawful processing)</li>
                <li><strong>Right to Lodge a Complaint:</strong> File a complaint with the Information Regulator of South Africa</li>
              </ul>
              <p className="text-[#D4D4D4] leading-relaxed">
                To exercise any of these rights, please contact us using the details provided in Section 12.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">8. Data Security</h2>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4] mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
                <li>Incident response and breach notification procedures</li>
              </ul>
              <p className="text-[#D4D4D4] leading-relaxed">
                While we strive to protect your personal information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but will notify you and relevant authorities of any data breaches as required by POPIA.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">9. Data Retention</h2>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Retention periods vary based on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4] mb-4">
                <li>The nature of the data</li>
                <li>Legal and regulatory requirements</li>
                <li>Contractual obligations</li>
                <li>Legitimate business purposes</li>
              </ul>
              <p className="text-[#D4D4D4] leading-relaxed">
                When personal information is no longer needed, we will securely delete or anonymize it in accordance with POPIA requirements.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">10. Cookies and Tracking Technologies</h2>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your browser settings. Our cookie usage includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                <li><strong>Essential Cookies:</strong> Necessary for the platform to function</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors use our platform</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences and choices</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
              </ul>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">11. Children's Privacy</h2>
              <p className="text-[#D4D4D4] leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately, and we will take steps to delete such information.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">12. Contact Information</h2>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="bg-[#0F0F0F] p-6 rounded-lg border border-[#545454]/30">
                <p className="text-[#D4D4D4] mb-2"><strong>Data Protection Officer</strong></p>
                <p className="text-[#D4D4D4]">Email: privacy@fraudlr.com</p>
                <p className="text-[#D4D4D4]">Address: South Africa</p>
              </div>
              <p className="text-[#D4D4D4] leading-relaxed mt-4">
                <strong>Information Regulator (South Africa):</strong>
              </p>
              <p className="text-[#D4D4D4] leading-relaxed">
                If you are not satisfied with our response, you may lodge a complaint with the Information Regulator at:
              </p>
              <div className="bg-[#0F0F0F] p-6 rounded-lg border border-[#545454]/30 mt-4">
                <p className="text-[#D4D4D4]">Email: inforeg@justice.gov.za</p>
                <p className="text-[#D4D4D4]">Website: www.justice.gov.za/inforeg</p>
              </div>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">13. Changes to This Privacy Policy</h2>
              <p className="text-[#D4D4D4] leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Acceptance */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">14. Acceptance of This Policy</h2>
              <p className="text-[#D4D4D4] leading-relaxed">
                By using our services, you acknowledge that you have read and understood this Privacy Policy and agree to be bound by its terms. If you do not agree with this policy, please do not use our services.
              </p>
            </section>
          </div>

          {/* Back to Home Button */}
          <div className="mt-12 pt-8 border-t border-[#545454]/30">
            <Link href="/">
              <Button className="bg-[#FD4D53] hover:bg-[#FD4D53]/90 text-white">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#545454]/30 py-6">
        <div className="container mx-auto px-4 text-center text-[#545454] text-sm">
          <p>&copy; 2026 Fraudlr. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
