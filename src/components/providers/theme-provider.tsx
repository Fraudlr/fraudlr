/**
 * @fileoverview Theme Provider Component
 * 
 * This component wraps the application to enable dark/light mode switching.
 * It uses the next-themes library which handles:
 * - System preference detection
 * - Persisting theme choice in localStorage
 * - Preventing flash of wrong theme on page load
 * 
 * We wrap next-themes' provider to add the "use client" directive
 * since theme switching requires client-side JavaScript.
 */

"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

/**
 * ThemeProvider Component
 * 
 * A client-side wrapper around next-themes' ThemeProvider.
 * Must be used as a client component because theme detection
 * requires access to browser APIs (localStorage, matchMedia).
 * 
 * @example
 * // In your root layout
 * <ThemeProvider attribute="class" defaultTheme="dark">
 *   {children}
 * </ThemeProvider>
 * 
 * @param attribute - Where to apply theme ("class" adds class to html element)
 * @param defaultTheme - Initial theme before client-side detection
 * @param enableSystem - Whether to detect system preference
 * @param children - Application content
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
