/**
 * @fileoverview Accordion Component
 * 
 * An expandable accordion component for FAQ sections and collapsible content.
 * Built with Radix UI for accessibility and animations.
 * 
 * Features:
 * - Single or multiple items open at once
 * - Keyboard navigation
 * - Smooth expand/collapse animations
 * - Chevron indicator with rotation
 */

"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Accordion Root Component
 * 
 * Container for accordion items. Controls which items can be open.
 * 
 * @example
 * // Single item open at a time
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">...</AccordionItem>
 * </Accordion>
 * 
 * @example
 * // Multiple items can be open
 * <Accordion type="multiple">
 *   <AccordionItem value="item-1">...</AccordionItem>
 * </Accordion>
 */
const Accordion = AccordionPrimitive.Root

/**
 * AccordionItem Component
 * 
 * Individual collapsible section. Contains a trigger and content.
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

/**
 * AccordionTrigger Component
 * 
 * The clickable header that expands/collapses the content.
 * Includes an animated chevron indicator.
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        // Base styling
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
        // Chevron rotation when open
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

/**
 * AccordionContent Component
 * 
 * The collapsible content area.
 * Uses CSS animations for smooth expand/collapse.
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
