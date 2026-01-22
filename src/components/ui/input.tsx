/**
 * @fileoverview Input Component
 * 
 * A styled input component that follows the shadcn/ui design system.
 * Provides consistent styling across all form inputs in the application.
 * 
 * Features:
 * - Consistent focus states with ring styling
 * - Proper placeholder styling
 * - Disabled state handling
 * - File input support
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Input component props - extends standard HTML input attributes
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input Component
 * 
 * A styled wrapper around the native HTML input element.
 * Uses forwardRef to allow parent components to access the input DOM node.
 * 
 * @example
 * // Basic text input
 * <Input type="text" placeholder="Enter your name" />
 * 
 * @example
 * // Email input with validation
 * <Input type="email" required placeholder="you@example.com" />
 * 
 * @example
 * // Password input
 * <Input type="password" placeholder="••••••••" />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          // Ring focus styles for accessibility
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // File input specific styles
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          // Placeholder styling
          "placeholder:text-muted-foreground",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Allow custom classes to override defaults
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
