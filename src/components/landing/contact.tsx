/**
 * @fileoverview Contact Section Component
 * 
 * Provides contact information and a "Get in Touch" form.
 * Features:
 * - Contact details (email, WhatsApp)
 * - Contact form with validation
 * - Form submission to API endpoint
 */

"use client"

import * as React from "react"
import { Mail, Phone, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

/**
 * Contact information data
 */
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@fraudlr.com",
    href: "mailto:info@fraudlr.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+27 79 944 5825",
    href: "https://wa.me/27799445825",
  },
]

/**
 * Contact Component
 * 
 * Displays contact information and a form for getting in touch.
 * Uses a two-column layout on desktop.
 */
export function Contact() {
  // Form state management
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle")

  /**
   * Handles form input changes
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Submit to API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        // Reset form on success
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      id="contact" 
      className="py-24 bg-gradient-to-b from-background/95 to-background"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F3F3F3] mb-4">
            Get in{" "}
            <span className="text-[#FD4D53]">Touch</span>
          </h2>
          <p className="text-lg text-[#D9D9D9] max-w-2xl mx-auto">
            Have questions about Fraudlr? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#F3F3F3] mb-6">
                Contact Information
              </h3>
              <p className="text-[#D9D9D9] mb-8">
                Reach out to us through any of these channels. Our team is 
                available to assist you with any inquiries about our platform.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="bg-[#0F0F0F] border-[#545454]/30 hover:border-[#FD4D53]/50 transition-all duration-300">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-12 h-12 rounded-lg bg-[#FD4D53]/10 flex items-center justify-center">
                        <contact.icon className="h-6 w-6 text-[#FD4D53]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#545454]">{contact.label}</p>
                        <p className="text-[#F3F3F3] font-medium">{contact.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>

            {/* Additional Info */}
            <div className="pt-8">
              <h4 className="text-lg font-semibold text-[#F3F3F3] mb-4">
                Business Hours
              </h4>
              <p className="text-[#D9D9D9]">
                Monday - Friday: 9:00 AM - 6:00 PM (SAST)<br />
                Saturday - Sunday: Closed
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-[#0F0F0F] border-[#545454]/30">
            <CardHeader>
              <CardTitle className="text-[#F3F3F3]">Send us a Message</CardTitle>
              <CardDescription className="text-[#D9D9D9]">
                Fill out the form below and we'll get back to you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#F3F3F3]">
                    Name <span className="text-[#FD4D53]">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-background border-[#545454]/50 text-[#F3F3F3] placeholder:text-[#545454]"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#F3F3F3]">
                    Email <span className="text-[#FD4D53]">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="bg-background border-[#545454]/50 text-[#F3F3F3] placeholder:text-[#545454]"
                  />
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-[#F3F3F3]">
                    Subject <span className="text-[#FD4D53]">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="bg-background border-[#545454]/50 text-[#F3F3F3] placeholder:text-[#545454]"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#F3F3F3]">
                    Message <span className="text-[#FD4D53]">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                    className="bg-background border-[#545454]/50 text-[#F3F3F3] placeholder:text-[#545454] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FD4D53] hover:bg-[#FD4D53]/90"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <p className="text-green-500 text-sm text-center">
                    Thank you! Your message has been sent successfully.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-[#FD4D53] text-sm text-center">
                    Something went wrong. Please try again later.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
