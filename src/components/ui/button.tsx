/**
 * @fileoverview Button Component
 * 
 * A versatile button component built with Radix UI and styled with Tailwind CSS.
 * This component follows the shadcn/ui pattern and provides multiple variants
 * for different use cases (primary, secondary, destructive, etc.).
 * 
 * Features:
 * - Multiple visual variants (default, destructive, outline, etc.)
 * - Multiple size options (sm, md, lg, icon)
 * - Supports the Slot pattern for custom elements
 * - Full accessibility support
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button variants configuration using class-variance-authority (CVA)
 * 
 * CVA allows us to define a set of base styles and variant combinations
 * that generate the appropriate class names based on props.
 */
const buttonVariants = cva(
  // Base styles applied to all buttons
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      // Visual style variants
      variant: {
        // Primary action button with brand colors
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        
        // Destructive/danger actions (delete, remove, etc.)
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        
        // Outlined button for secondary actions
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        
        // Subtle button for tertiary actions
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        
        // Ghost button - minimal styling
        ghost: "hover:bg-accent hover:text-accent-foreground",
        
        // Link-style button
        link: "text-primary underline-offset-4 hover:underline",
        
        // Fraudlr branded button with red accent
        fraudlr: "bg-fraudlr-red text-white hover:bg-fraudlr-red/90 shadow-lg",
      },
      
      // Size variants
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    // Default values when no variant/size is specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Button component props interface
 * Extends HTML button attributes and CVA variant props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * When true, the button renders as a Slot component,
   * allowing you to use a custom element (like a Link) as the button
   */
  asChild?: boolean
}

/**
 * Button Component
 * 
 * @example
 * // Default button
 * <Button>Click me</Button>
 * 
 * @example
 * // Destructive variant
 * <Button variant="destructive">Delete</Button>
 * 
 * @example
 * // As a link (using Next.js Link)
 * <Button asChild>
 *   <Link href="/dashboard">Go to Dashboard</Link>
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // If asChild is true, use Slot to merge props with child element
    // Otherwise, render a standard button
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
