/**
 * AnimatedCounter Component
 *
 * Animates a number from 0 (or a start value) to a target value.
 * Perfect for dashboard stats, counts, and metrics.
 * Respects reduced motion preferences.
 *
 * Usage:
 * ```tsx
 * <AnimatedCounter value={1234} />
 * <AnimatedCounter value={42} duration={2000} decimals={1} />
 * <AnimatedCounter from={100} to={200} prefix="$" />
 * ```
 */

"use client"

import * as React from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import { useReducedMotion } from "@workspace/ui/hooks/use-reduced-motion"
import { cn } from "@workspace/ui/lib/utils"

interface AnimatedCounterProps {
  value?: number
  from?: number
  to?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  separator?: string
}

export function AnimatedCounter({
  value,
  from = 0,
  to,
  duration = 1.5,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  separator = ",",
}: AnimatedCounterProps) {
  const prefersReducedMotion = useReducedMotion()
  const targetValue = to ?? value ?? 0

  // Create a spring animation
  const spring = useSpring(from, {
    stiffness: 100,
    damping: 30,
    duration: prefersReducedMotion ? 0 : duration * 1000,
  })

  // Transform the spring value to the target
  const display = useTransform(spring, (latest) => {
    const formatted = latest.toFixed(decimals)
    const [integer, decimal] = formatted.split(".")

    // Add thousand separators
    const withSeparators = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator)

    return decimal
      ? `${prefix}${withSeparators}.${decimal}${suffix}`
      : `${prefix}${withSeparators}${suffix}`
  })

  React.useEffect(() => {
    spring.set(targetValue)
  }, [spring, targetValue])

  // If reduced motion, show final value immediately
  if (prefersReducedMotion) {
    const formatted = targetValue.toFixed(decimals)
    const [integer, decimal] = formatted.split(".")
    const withSeparators = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    const finalValue = decimal
      ? `${prefix}${withSeparators}.${decimal}${suffix}`
      : `${prefix}${withSeparators}${suffix}`

    return <span className={cn("tabular-nums", className)}>{finalValue}</span>
  }

  return (
    <motion.span className={cn("tabular-nums", className)}>
      {display}
    </motion.span>
  )
}
