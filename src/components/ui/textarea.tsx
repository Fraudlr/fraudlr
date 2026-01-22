/**
 * @fileoverview Textarea Component
 * 
 * A multi-line text input component with consistent styling.
 * Used for longer text inputs like messages and descriptions.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Textarea Props - extends native textarea attributes
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Textarea Component
 * 
 * A styled multi-line text input that matches the Input component styling.
 * 
 * @example
 * <Textarea 
 *   placeholder="Enter your message..." 
 *   rows={4}
 * />
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styling matching Input component
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          // Ring focus styles
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // Placeholder styling
          "placeholder:text-muted-foreground",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
