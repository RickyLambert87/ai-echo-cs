/**
 * StaggerWrapper Component
 *
 * Animates children with a staggered delay for list/grid animations.
 * Automatically handles reduced motion preferences.
 *
 * Usage:
 * ```tsx
 * <StaggerWrapper staggerDelay={0.05}>
 *   <StaggerItem>Item 1</StaggerItem>
 *   <StaggerItem>Item 2</StaggerItem>
 *   <StaggerItem>Item 3</StaggerItem>
 * </StaggerWrapper>
 * ```
 */

"use client"

import { motion, Variants } from "framer-motion"
import { useReducedMotion } from "../hooks/use-reduced-motion"
import {
  staggerContainerVariants,
  staggerItemVariants,
  createStaggerVariants,
} from "../lib/animations"

interface StaggerWrapperProps {
  children: React.ReactNode
  staggerDelay?: number
  itemDelay?: number
  className?: string
  as?: keyof typeof motion
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  as?: keyof typeof motion
}

/**
 * Container component for staggered animations
 */
export function StaggerWrapper({
  children,
  staggerDelay = 0.05,
  itemDelay = 0,
  className,
  as = "div",
}: StaggerWrapperProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionComponent = motion[as]

  // If reduced motion is preferred, render without animation
  if (prefersReducedMotion) {
    return <MotionComponent className={className}>{children}</MotionComponent>
  }

  // Create custom stagger variants if delay is different from default
  const variants =
    staggerDelay !== 0.05 || itemDelay !== 0
      ? createStaggerVariants(staggerDelay, itemDelay).container
      : staggerContainerVariants

  return (
    <MotionComponent
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children}
    </MotionComponent>
  )
}

/**
 * Item component to be used as children of StaggerWrapper
 */
export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionComponent = motion[as]

  // If reduced motion is preferred, render without animation
  if (prefersReducedMotion) {
    return <MotionComponent className={className}>{children}</MotionComponent>
  }

  return (
    <MotionComponent
      className={className}
      variants={staggerItemVariants}
    >
      {children}
    </MotionComponent>
  )
}
