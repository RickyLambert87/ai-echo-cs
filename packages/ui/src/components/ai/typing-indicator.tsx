/**
 * TypingIndicator Component
 *
 * Three bouncing dots animation to indicate typing/loading state in chat interfaces.
 * Respects reduced motion preferences.
 *
 * Usage:
 * ```tsx
 * <TypingIndicator />
 * <TypingIndicator size="lg" />
 * ```
 */

"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useReducedMotion } from "@workspace/ui/hooks/use-reduced-motion"
import { typingDotVariants } from "@workspace/ui/lib/animations"
import { cn } from "@workspace/ui/lib/utils"

interface TypingIndicatorProps {
  className?: string
  size?: "sm" | "md" | "lg"
  dotClassName?: string
}

export function TypingIndicator({
  className,
  size = "md",
  dotClassName,
}: TypingIndicatorProps) {
  const prefersReducedMotion = useReducedMotion()

  const sizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  }

  const containerClasses = {
    sm: "gap-1",
    md: "gap-1.5",
    lg: "gap-2",
  }

  // If reduced motion, show static dots
  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "inline-flex items-center",
          containerClasses[size],
          className
        )}
        role="status"
        aria-label="Loading"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "rounded-full bg-muted-foreground/60",
              sizeClasses[size],
              dotClassName
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "inline-flex items-center",
        containerClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={cn(
            "rounded-full bg-muted-foreground/60",
            sizeClasses[size],
            dotClassName
          )}
          variants={typingDotVariants(i * 0.15)} // Stagger delay: 0ms, 150ms, 300ms
          initial="initial"
          animate="animate"
        />
      ))}
    </div>
  )
}
