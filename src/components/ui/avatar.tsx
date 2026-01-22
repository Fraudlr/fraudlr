/**
 * @fileoverview Avatar Component
 * 
 * A user avatar component built with Radix UI primitives.
 * Supports images with fallback to initials or placeholder.
 * Used extensively in the dashboard sidebar and user menus.
 * 
 * Features:
 * - Automatic image loading and error handling
 * - Fallback content when image fails
 * - Consistent circular styling
 * - Multiple size support via className
 */

"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * Avatar Container Component
 * 
 * The outer wrapper that provides the circular shape
 * and contains the image or fallback.
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      // Base circular styling
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

/**
 * AvatarImage Component
 * 
 * The actual image element within the avatar.
 * Uses aspect-ratio to maintain circular shape.
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * AvatarFallback Component
 * 
 * Displayed when the image is loading or fails to load.
 * Typically shows user initials or a placeholder icon.
 * 
 * @example
 * <Avatar>
 *   <AvatarImage src={user.image} alt={user.name} />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      // Centered content with muted background
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
