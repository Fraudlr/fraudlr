/**
 * @fileoverview Scroll Area Component
 * 
 * A custom scrollable area with styled scrollbars.
 * Uses Radix UI for cross-browser consistency and accessibility.
 * 
 * Features:
 * - Custom scrollbar styling
 * - Works on all browsers consistently
 * - Supports both vertical and horizontal scrolling
 * - Maintains native scroll behavior
 */

"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

/**
 * ScrollArea Component
 * 
 * Creates a scrollable container with custom-styled scrollbars.
 * Useful for sidebars, lists, and any content that needs scrolling.
 * 
 * @example
 * <ScrollArea className="h-[300px]">
 *   <div className="p-4">
 *     Long content that needs scrolling...
 *   </div>
 * </ScrollArea>
 */
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    {/* Viewport contains the scrollable content */}
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    
    {/* Custom scrollbar */}
    <ScrollBar />
    
    {/* Corner piece where scrollbars meet */}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

/**
 * ScrollBar Component
 * 
 * The scrollbar track and thumb styling.
 * Supports both vertical and horizontal orientations.
 */
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      // Base styling
      "flex touch-none select-none transition-colors",
      // Vertical scrollbar positioning
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      // Horizontal scrollbar positioning
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    {/* The draggable thumb */}
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
