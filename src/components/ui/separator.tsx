/**
 * @fileoverview Separator Component
 * 
 * A visual separator for dividing content sections.
 * Can be horizontal (default) or vertical.
 * Built with Radix UI for accessibility.
 */

"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * Separator Component
 * 
 * Creates a horizontal or vertical line to separate content.
 * Uses proper ARIA attributes for accessibility.
 * 
 * @example
 * // Horizontal separator (default)
 * <Separator className="my-4" />
 * 
 * @example
 * // Vertical separator
 * <div className="flex items-center">
 *   <span>Item 1</span>
 *   <Separator orientation="vertical" className="mx-2 h-4" />
 *   <span>Item 2</span>
 * </div>
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        // Base styling
        "shrink-0 bg-border",
        // Orientation-specific sizing
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
