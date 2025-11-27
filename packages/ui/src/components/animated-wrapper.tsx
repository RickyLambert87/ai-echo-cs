/**
 * AnimatedWrapper Component
 *
 * Reusable Framer Motion wrapper with automatic reduced motion support.
 * Accepts custom variants or uses built-in presets.
 *
 * Usage:
 * ```tsx
 * <AnimatedWrapper variant="fadeIn" delay={0.2}>
 *   <YourContent />
 * </AnimatedWrapper>
 * ```
 */

"use client"

import { motion, Variants } from "framer-motion"
import { useReducedMotion } from "../hooks/use-reduced-motion"
import {
  fadeVariants,
  slideUpVariants,
  slideDownVariants,
  slideLeftVariants,
  slideRightVariants,
  scaleVariants,
  popVariants,
  DURATIONS,
} from "../lib/animations"

type VariantPreset =
  | "fadeIn"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "pop"

interface AnimatedWrapperProps {
  children: React.ReactNode
  variant?: VariantPreset | Variants
  delay?: number
  duration?: number
  className?: string
  as?: keyof typeof motion
}

const variantPresets: Record<VariantPreset, Variants> = {
  fadeIn: fadeVariants,
  slideUp: slideUpVariants,
  slideDown: slideDownVariants,
  slideLeft: slideLeftVariants,
  slideRight: slideRightVariants,
  scale: scaleVariants,
  pop: popVariants,
}

export function AnimatedWrapper({
  children,
  variant = "fadeIn",
  delay = 0,
  duration,
  className,
  as = "div",
}: AnimatedWrapperProps) {
  const prefersReducedMotion = useReducedMotion()

  // Get the variant object
  const variants =
    typeof variant === "string" ? variantPresets[variant] : variant

  // Create motion component
  const MotionComponent = motion[as]

  // If reduced motion is preferred, render without animation
  if (prefersReducedMotion) {
    return <MotionComponent className={className}>{children}</MotionComponent>
  }

  // Apply custom duration if provided
  const customVariants = duration
    ? {
        ...variants,
        animate: {
          ...variants.animate,
          transition: {
            ...(typeof variants.animate === "object" &&
            "transition" in variants.animate
              ? variants.animate.transition
              : {}),
            duration: duration / 1000, // Convert ms to seconds
          },
        },
      }
    : variants

  return (
    <MotionComponent
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={customVariants}
      transition={{
        delay,
      }}
    >
      {children}
    </MotionComponent>
  )
}
