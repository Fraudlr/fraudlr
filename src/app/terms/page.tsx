/**
 * @fileoverview Terms and Conditions Page
 * 
 * GDPR and POPI compliant terms of service for Fraudlr.
 * Jurisdiction: South Africa
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Terms and Conditions | Fraudlr",
  description: "Terms and Conditions for Fraudlr - GDPR and POPI compliant",
}

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-[#F3F3F3] mb-4">Terms and Conditions</h1>
          <p className="text-[#545454] mb-8">Last Updated: January 28, 2026</p>

          <div className="space-y-8 text-[#F3F3F3]">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">1. Introduction and Acceptance</h2>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                Welcome to Fraudlr. These Terms and Conditions ("Terms", "Agreement") govern your access to and use of the Fraudlr platform, website, and services (collectively, the "Services") operated by Fraudlr ("we", "us", or "our").
              </p>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access our Services.
              </p>
              <p className="text-[#D4D4D4] leading-relaxed">
                <strong>Jurisdiction:</strong> These Terms are governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the South African courts.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Definitions */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">2. Definitions</h2>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                <li><strong>"Services"</strong> refers to the Fraudlr platform, including all features, tools, and functionalities</li>
                <li><strong>"User", "You"</strong> refers to the individual or entity accessing or using our Services</li>
                <li><strong>"Account"</strong> refers to your registered user account on our platform</li>
                <li><strong>"Content"</strong> refers to text, data, information, software, graphics, or other materials</li>
                <li><strong>"Personal Information"</strong> has the meaning assigned to it in the Protection of Personal Information Act 4 of 2013 (POPIA)</li>
              </ul>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Account Registration */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">3. Account Registration and Use</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">3.1 Registration Requirements</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                To use certain features of our Services, you must register for an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4] mb-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">3.2 Account Eligibility</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                You must be at least 18 years old and have the legal capacity to enter into contracts to use our Services. By creating an account, you represent and warrant that you meet these requirements.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">3.3 Business Accounts</h3>
              <p className="text-[#D4D4D4] leading-relaxed">
                If you are registering on behalf of a business or organization, you represent that you have the authority to bind that entity to these Terms.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Acceptable Use */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">4. Acceptable Use Policy</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">4.1 Permitted Use</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                You may use our Services only for lawful purposes and in accordance with these Terms. Our Services are intended for fraud detection and prevention within legitimate business operations.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">4.2 Prohibited Activities</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                <li>Use the Services for any illegal or unauthorized purpose</li>
                <li>Violate any laws, regulations, or third-party rights</li>
                <li>Upload malicious code, viruses, or harmful materials</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Interfere with or disrupt the Services or servers</li>
                <li>Use automated systems to access the Services without permission</li>
                <li>Reverse engineer, decompile, or disassemble any part of the Services</li>
                <li>Remove or alter any proprietary notices or labels</li>
                <li>Use the Services to harass, abuse, or harm others</li>
                <li>Collect or store personal information of other users without consent</li>
                <li>Resell or commercially exploit the Services without authorization</li>
              </ul>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Service Description */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">5. Service Description and Availability</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">5.1 Service Features</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                Fraudlr provides AI-powered fraud detection and anomaly detection services for financial ecosystems. Our platform analyzes transaction data to identify potential fraudulent activities and patterns.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">5.2 Service Availability</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                While we strive to maintain continuous availability, we do not guarantee uninterrupted access to our Services. We reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4] mb-4">
                <li>Modify, suspend, or discontinue any aspect of the Services</li>
                <li>Perform scheduled and emergency maintenance</li>
                <li>Update features and functionality</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">5.3 Service Limitations</h3>
              <p className="text-[#D4D4D4] leading-relaxed">
                Our fraud detection services provide analytical insights and recommendations. Final decisions regarding transactions and fraud prevention remain your responsibility. We do not guarantee the detection of all fraudulent activities.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Data and Privacy */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">6. Data Processing and Privacy</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">6.1 Privacy Policy</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                Our collection and use of personal information is governed by our Privacy Policy, which complies with POPIA and GDPR. By using our Services, you consent to our Privacy Policy.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">6.2 Data Controller and Processor</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                When you use our Services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4] mb-4">
                <li>You remain the data controller of your transaction data</li>
                <li>We act as a data processor, processing data on your behalf</li>
                <li>You warrant that you have the legal right to share data with us</li>
                <li>You are responsible for obtaining necessary consents from data subjects</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">6.3 Data Security</h3>
              <p className="text-[#D4D4D4] leading-relaxed">
                We implement appropriate security measures to protect your data. However, you acknowledge that no system is completely secure, and you use the Services at your own risk.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">7. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">7.1 Our Intellectual Property</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                The Services, including all software, algorithms, designs, text, graphics, logos, and other content, are owned by Fraudlr and protected by South African and international intellectual property laws. All rights not expressly granted are reserved.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">7.2 Your Content</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                You retain ownership of all data and content you upload to our Services. By uploading content, you grant us a limited, non-exclusive license to use, process, and analyze your content solely to provide the Services.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">7.3 Feedback</h3>
              <p className="text-[#D4D4D4] leading-relaxed">
                Any feedback, suggestions, or ideas you provide about our Services become our property, and we may use them without obligation to you.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">8. Payment Terms and Subscriptions</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">8.1 Fees</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                Access to certain features requires payment of fees. All fees are:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4] mb-4">
                <li>Stated in South African Rand (ZAR) unless otherwise specified</li>
                <li>Exclusive of applicable taxes (VAT will be added where required)</li>
                <li>Non-refundable unless otherwise stated</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">8.2 Billing and Renewals</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                Subscriptions automatically renew unless you cancel before the renewal date. We will charge your payment method on file for renewal fees.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">8.3 Payment Methods</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                You must provide valid payment information. You authorize us to charge your payment method for all fees incurred.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">8.4 Late Payments</h3>
              <p className="text-[#D4D4D4] leading-relaxed">
                Failure to pay may result in suspension or termination of your account. Outstanding balances may accrue interest at the maximum rate permitted by South African law.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Warranties and Disclaimers */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">9. Warranties and Disclaimers</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">9.1 Service Provided "As Is"</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">9.2 No Guarantee of Results</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                We do not warrant that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                <li>The Services will meet your specific requirements</li>
                <li>The Services will be uninterrupted, timely, or error-free</li>
                <li>Results obtained from the Services will be accurate or reliable</li>
                <li>All fraud will be detected or prevented</li>
                <li>Any defects will be corrected</li>
              </ul>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">10. Limitation of Liability</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">10.1 Exclusion of Damages</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY SOUTH AFRICAN LAW, FRAUDLR SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4] mb-4">
                <li>Loss of profits or revenue</li>
                <li>Loss of data</li>
                <li>Loss of business opportunities</li>
                <li>Business interruption</li>
                <li>Undetected fraudulent transactions</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">10.2 Liability Cap</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                Our total liability to you for all claims arising from or related to the Services shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">10.3 Consumer Protection</h3>
              <p className="text-[#D4D4D4] leading-relaxed">
                Nothing in these Terms excludes or limits our liability for fraud, gross negligence, or any liability that cannot be excluded or limited under South African law, including the Consumer Protection Act 68 of 2008.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">11. Indemnification</h2>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                You agree to indemnify, defend, and hold harmless Fraudlr, its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or related to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                <li>Your use or misuse of the Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Your violation of applicable laws or regulations</li>
                <li>Your content or data uploaded to the Services</li>
              </ul>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">12. Termination</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">12.1 Termination by You</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                You may terminate your account at any time by contacting us or using account closure features. Termination does not relieve you of payment obligations for services already provided.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">12.2 Termination by Us</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                We may suspend or terminate your access to the Services immediately, without prior notice, if:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#D4D4D4] mb-4">
                <li>You breach these Terms</li>
                <li>We suspect fraudulent or illegal activity</li>
                <li>Required by law or regulatory authorities</li>
                <li>You fail to pay applicable fees</li>
                <li>We decide to discontinue the Services</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">12.3 Effect of Termination</h3>
              <p className="text-[#D4D4D4] leading-relaxed">
                Upon termination, your right to use the Services immediately ceases. We may delete your account and data after a reasonable retention period, subject to legal obligations and our Privacy Policy.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">13. Dispute Resolution</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">13.1 Governing Law</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                These Terms are governed by the laws of the Republic of South Africa, without regard to conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">13.2 Jurisdiction</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of South Africa.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">13.3 Informal Resolution</h3>
              <p className="text-[#D4D4D4] leading-relaxed">
                Before initiating formal proceedings, we encourage you to contact us to seek informal resolution of any disputes.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* General Provisions */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">14. General Provisions</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">14.1 Entire Agreement</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Fraudlr regarding the Services.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">14.2 Amendments</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of material changes by posting updated Terms on our website. Your continued use of the Services after changes constitutes acceptance of the modified Terms.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">14.3 Severability</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">14.4 Waiver</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">14.5 Assignment</h3>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                You may not assign or transfer these Terms without our prior written consent. We may assign our rights and obligations without restriction.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[#F3F3F3]">14.6 Force Majeure</h3>
              <p className="text-[#D4D4D4] leading-relaxed">
                We shall not be liable for any failure to perform due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, or accidents.
              </p>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">15. Contact Information</h2>
              <p className="text-[#D4D4D4] leading-relaxed mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="bg-[#0F0F0F] p-6 rounded-lg border border-[#545454]/30">
                <p className="text-[#D4D4D4] mb-2"><strong>Fraudlr Legal Department</strong></p>
                <p className="text-[#D4D4D4]">Email: legal@fraudlr.com</p>
                <p className="text-[#D4D4D4]">Support: support@fraudlr.com</p>
                <p className="text-[#D4D4D4]">Address: South Africa</p>
              </div>
            </section>

            <Separator className="bg-[#545454]/30" />

            {/* Acknowledgment */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#FD4D53]">16. Acknowledgment</h2>
              <p className="text-[#D4D4D4] leading-relaxed">
                BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS AND CONDITIONS, UNDERSTAND THEM, AND AGREE TO BE BOUND BY THEM. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST NOT USE OUR SERVICES.
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
