/**
 * @fileoverview Utility Functions
 * 
 * This file contains helper functions used throughout the application.
 * The main utility is the `cn` function which combines class names
 * intelligently, handling Tailwind CSS class conflicts.
 * 
 * Why we need this:
 * - Tailwind classes can conflict (e.g., "p-4" and "p-2")
 * - We want to merge classes from components and props
 * - We need to handle conditional classes cleanly
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names intelligently using clsx and tailwind-merge
 * 
 * @param inputs - Any number of class values (strings, objects, arrays)
 * @returns A single merged class string with conflicts resolved
 * 
 * @example
 * // Basic usage
 * cn("px-4 py-2", "px-6") // Returns "px-6 py-2"
 * 
 * @example
 * // Conditional classes
 * cn("base-class", isActive && "active-class", isDisabled && "disabled-class")
 * 
 * @example
 * // With objects
 * cn({ "bg-red-500": hasError, "bg-green-500": isSuccess })
 */
export function cn(...inputs: ClassValue[]) {
  // clsx: Combines all inputs into a single class string
  // twMerge: Resolves Tailwind class conflicts (later classes win)
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as currency
 * 
 * @param amount - The numeric amount to format
 * @param currency - Currency code ('USD' or 'ZAR')
 * @returns Formatted currency string
 * 
 * @example
 * formatCurrency(10, 'USD') // Returns "$10.00"
 * formatCurrency(10, 'ZAR') // Returns "R180.00" (with conversion)
 */
export function formatCurrency(amount: number, currency: 'USD' | 'ZAR' = 'USD'): string {
  // Approximate USD to ZAR conversion rate
  // In production, you'd fetch this from an API
  const ZAR_RATE = 18.5
  
  if (currency === 'ZAR') {
    const zarAmount = amount * ZAR_RATE
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(zarAmount)
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

/**
 * Truncates text to a specified length with ellipsis
 * 
 * @param text - The text to truncate
 * @param maxLength - Maximum number of characters
 * @returns Truncated string with "..." if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + "..."
}

/**
 * Generates initials from a name
 * 
 * @param name - Full name string
 * @returns Two-character initials
 * 
 * @example
 * getInitials("John Doe") // Returns "JD"
 * getInitials("Alice") // Returns "AL"
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Formats a date string for display
 * 
 * @param date - Date object or ISO string
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', options).format(dateObj)
}
