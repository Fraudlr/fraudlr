/**
 * @fileoverview Tooltip Component
 * 
 * A tooltip component for displaying additional information on hover.
 * Built with Radix UI for accessibility and proper positioning.
 * 
 * Features:
 * - Keyboard accessible (shows on focus)
 * - Smart positioning to avoid viewport overflow
 * - Smooth enter/exit animations
 * - Customizable delay
 */

"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

// Provider component - wrap your app with this to enable tooltips
const TooltipProvider = TooltipPrimitive.Provider

// Root tooltip container
const Tooltip = TooltipPrimitive.Root

// The element that triggers the tooltip on hover
const TooltipTrigger = TooltipPrimitive.Trigger

/**
 * TooltipContent Component
 * 
 * The actual tooltip popup that appears on hover.
 * Renders in a portal to avoid z-index and overflow issues.
 * 
 * @example
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>
 *       <p>Helpful information here</p>
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      // Base styling
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
      // Animation classes
      "animate-in fade-in-0 zoom-in-95",
      // Exit animation
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      // Slide animations based on position
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
