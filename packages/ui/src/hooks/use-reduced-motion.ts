/**
 * use-reduced-motion Hook
 *
 * Respects the user's prefers-reduced-motion system preference.
 * Returns true if the user prefers reduced motion for accessibility.
 *
 * Usage:
 * ```tsx
 * const prefersReducedMotion = useReducedMotion()
 * const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }
 * ```
 */

"use client"

import { useState, useEffect } from "react"

export function useReducedMotion(): boolean {
  // Default to false (animations enabled) for SSR
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === "undefined") {
      return
    }

    // Create media query
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)

    // Create handler for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Listen for changes
    // Safari < 14 uses addListener, modern browsers use addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
    } else {
      // Fallback for older Safari
      mediaQuery.addListener(handleChange)
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange)
      } else {
        // Fallback for older Safari
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [])

  return prefersReducedMotion
}
