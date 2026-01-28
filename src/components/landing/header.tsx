/**
 * @fileoverview Navigation Header Component
 * 
 * The main navigation bar for the Fraudlr landing page.
 * Features:
 * - Fraudlr logo (links to home)
 * - Navigation menu with smooth scroll to sections
 * - Login and Sign Up buttons
 * - Mobile responsive hamburger menu
 * 
 * Design Notes:
 * - Uses NavigationMenu from shadcn/ui for accessibility
 * - Fixed position for persistent navigation
 * - Backdrop blur effect for modern look
 */

"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

/**
 * Navigation link data structure
 * Each link has a label (display text) and href (section ID or page URL)
 */
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Developers", href: "/developers" },
  { label: "Contact", href: "#contact" },
]

/**
 * Header Component
 * 
 * The main navigation header that appears at the top of the landing page.
 * It's fixed to the top and has a transparent background with blur effect.
 */
export function Header() {
  // State for controlling mobile menu open/close
  const [isOpen, setIsOpen] = React.useState(false)
  
  // State for detecting scroll position (for header background change)
  const [isScrolled, setIsScrolled] = React.useState(false)
  
  // Effect to detect scroll and update header background
  React.useEffect(() => {
    const handleScroll = () => {
      // Add background when scrolled more than 50px
      setIsScrolled(window.scrollY > 50)
    }
    
    // Add scroll listener
    window.addEventListener("scroll", handleScroll)
    
    // Cleanup listener on unmount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  /**
   * Handles smooth scrolling to page sections
   * Closes mobile menu after navigation
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle anchor links (starting with #)
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        // Smooth scroll to the element
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    // Close mobile menu if open
    setIsOpen(false)
  }

  return (
    <header
      className={cn(
        // Fixed positioning and full width
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        // Conditional background based on scroll position
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - links to home */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/fraudlr-white-logo.png"
              alt="Fraudlr Logo"
              width={140}
              height={56}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-[#FD4D53] hover:bg-[#FD4D53]/90" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            
            {/* Mobile Menu Content */}
            <SheetContent side="right" className="w-[300px] bg-background">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
                
                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button className="bg-[#FD4D53] hover:bg-[#FD4D53]/90" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
