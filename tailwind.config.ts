/**
 * @fileoverview Tailwind CSS Configuration
 * 
 * This file configures Tailwind CSS for the Fraudlr application.
 * We define custom colors, fonts, and extend the default theme to match
 * the Fraudlr brand guidelines.
 * 
 * Brand Colors:
 * - Primary Background: #0F0F0F (deep black)
 * - Accent Red: #FD4D53 (Fraudlr red)
 * - Text Gray: #545454 (muted text)
 * - Light Gray: #D9D9D9 (secondary text)
 * - Off White: #F3F3F3 (primary text)
 */

import type { Config } from "tailwindcss"

const config = {
  // Enable dark mode using class strategy
  // This allows toggling between light and dark themes
  darkMode: ["class"],
  
  // Define which files Tailwind should scan for class names
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  
  // Prefix for Tailwind classes (empty = no prefix)
  prefix: "",
  
  theme: {
    // Container configuration for responsive layouts
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    
    extend: {
      // Custom color palette based on Fraudlr brand guidelines
      colors: {
        // Shadcn/ui compatible color tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Primary colors - using Fraudlr red
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        
        // Secondary colors
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        
        // Destructive/error states
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        
        // Muted backgrounds and text
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        
        // Accent colors for highlights
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        
        // Popover/dropdown backgrounds
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        
        // Card backgrounds
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Sidebar colors for dashboard
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        
        // Fraudlr brand colors (direct access)
        fraudlr: {
          black: "#0F0F0F",
          red: "#FD4D53",
          gray: "#545454",
          silver: "#D9D9D9",
          white: "#F3F3F3",
        },
      },
      
      // Border radius tokens for consistent rounded corners
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      // Keyframe animations for UI interactions
      keyframes: {
        // Accordion animations
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Fade in animation
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        // Slide up animation
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        // Pulse glow effect for CTAs
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(253, 77, 83, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(253, 77, 83, 0.6)" },
        },
      },
      
      // Animation utility classes
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      
      // Custom font family using Geist
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  
  // Tailwind CSS plugins
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
