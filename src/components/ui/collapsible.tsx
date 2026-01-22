/**
 * @fileoverview Collapsible Component
 * 
 * A component for showing/hiding content with a trigger.
 * Used in sidebar navigation for collapsible menu sections.
 */

"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

// Re-export Radix UI components with simpler names
const Collapsible = CollapsiblePrimitive.Root
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
