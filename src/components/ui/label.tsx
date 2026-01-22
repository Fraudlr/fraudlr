/**
 * @fileoverview Label Component
 * 
 * An accessible label component built with Radix UI primitives.
 * Labels are essential for form accessibility - they connect text
 * descriptions to form inputs for screen readers.
 * 
 * Features:
 * - Automatic association with form controls
 * - Consistent typography styling
 * - Disabled state support
 */

"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Label style variants
 * Currently only defines base styles, but can be extended
 * to support different label sizes or styles
 */
const labelVariants = cva(
  // Base styles for all labels
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

/**
 * Label Component
 * 
 * Wraps Radix UI's Label primitive with custom styling.
 * The `peer-disabled` classes allow the label to react to
 * the disabled state of associated form controls.
 * 
 * @example
 * // Basic usage with input
 * <div>
 *   <Label htmlFor="email">Email address</Label>
 *   <Input id="email" type="email" />
 * </div>
 * 
 * @example
 * // With required indicator
 * <Label htmlFor="name">
 *   Name <span className="text-destructive">*</span>
 * </Label>
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
