/**
 * @fileoverview Switch Component
 * 
 * A toggle switch component for binary on/off states.
 * Built with Radix UI for accessibility.
 * Used for theme toggle, settings, and preferences.
 * 
 * Features:
 * - Keyboard accessible (Space to toggle)
 * - ARIA attributes for screen readers
 * - Smooth transition animations
 * - Focus ring for visibility
 */

"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/**
 * Switch Component
 * 
 * A toggle switch that can be checked or unchecked.
 * Semantically equivalent to a checkbox but with different visuals.
 * 
 * @example
 * // Controlled usage
 * const [enabled, setEnabled] = useState(false)
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 * 
 * @example
 * // With label
 * <div className="flex items-center gap-2">
 *   <Switch id="dark-mode" />
 *   <Label htmlFor="dark-mode">Dark Mode</Label>
 * </div>
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      // Base track styling
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
      // Focus ring for accessibility
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      // Disabled state
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Checked/unchecked background colors
      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    {/* The sliding thumb */}
    <SwitchPrimitives.Thumb
      className={cn(
        // Base thumb styling
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
        // Position based on checked state
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
