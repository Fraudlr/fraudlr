/**
 * @fileoverview Card Components
 * 
 * A set of card components for organizing content into distinct sections.
 * Cards are commonly used for displaying grouped information, forms,
 * pricing plans, and feature highlights.
 * 
 * Components included:
 * - Card: Main container with border and shadow
 * - CardHeader: Top section for title and description
 * - CardTitle: Bold heading text
 * - CardDescription: Muted description text
 * - CardContent: Main content area
 * - CardFooter: Bottom section for actions
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Card Container
 * 
 * The main wrapper component that provides the card structure:
 * - Rounded corners
 * - Border styling
 * - Background color
 * - Shadow effect
 * 
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description here</CardDescription>
 *   </CardHeader>
 *   <CardContent>Main content</CardContent>
 *   <CardFooter>Actions</CardFooter>
 * </Card>
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * CardHeader Component
 * 
 * Contains the card's title and optional description.
 * Uses flexbox for vertical layout with spacing.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * CardTitle Component
 * 
 * The main heading for the card.
 * Uses semantic h3 styling for accessibility.
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * CardDescription Component
 * 
 * Secondary text that provides additional context.
 * Uses muted foreground color for visual hierarchy.
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * CardContent Component
 * 
 * The main content area of the card.
 * Has horizontal and bottom padding (header handles top padding).
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * CardFooter Component
 * 
 * Footer area typically used for action buttons.
 * Uses flexbox with center alignment.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
