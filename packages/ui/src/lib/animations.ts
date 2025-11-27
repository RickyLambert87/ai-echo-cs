/**
 * Animation Utilities for AI Echo Platform
 *
 * Centralized animation configuration using Framer Motion.
 * Provides consistent timing, easing, and variants across the application.
 */

import { Variants, Transition } from "framer-motion"

/**
 * Duration Tokens
 * Use these for consistent animation timing throughout the app
 */
export const DURATIONS = {
  instant: 0,
  fast: 0.15,      // 150ms - Quick transitions, hovers
  normal: 0.25,    // 250ms - Default animations
  slow: 0.4,       // 400ms - Complex animations
  slower: 0.6,     // 600ms - Page transitions
} as const

/**
 * Easing Functions
 * Predefined easing curves for smooth animations
 */
export const EASINGS = {
  // Standard easings
  easeInOut: [0.4, 0, 0.2, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,

  // Custom easings
  spring: [0.34, 1.56, 0.64, 1] as const,  // Bouncy spring
  smooth: [0.25, 0.46, 0.45, 0.94] as const,  // Very smooth
} as const

/**
 * Spring Configurations
 * Physics-based animations for natural motion
 */
export const SPRING_CONFIGS = {
  default: {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
  },
  gentle: {
    type: "spring" as const,
    stiffness: 120,
    damping: 14,
  },
  bouncy: {
    type: "spring" as const,
    stiffness: 300,
    damping: 10,
  },
  snappy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
  },
} as const

/**
 * Fade Variants
 */
export const fadeVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeIn,
    },
  },
}

/**
 * Slide Up Variants
 */
export const slideUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeIn,
    },
  },
}

/**
 * Slide Down Variants
 */
export const slideDownVariants: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeIn,
    },
  },
}

/**
 * Slide In From Left Variants
 */
export const slideLeftVariants: Variants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeIn,
    },
  },
}

/**
 * Slide In From Right Variants
 */
export const slideRightVariants: Variants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeIn,
    },
  },
}

/**
 * Scale Variants
 */
export const scaleVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeIn,
    },
  },
}

/**
 * Pop Variants (with spring)
 */
export const popVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: SPRING_CONFIGS.bouncy,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeIn,
    },
  },
}

/**
 * Stagger Container Variants
 * Use with staggerChildren for list animations
 */
export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,  // 50ms stagger
      delayChildren: 0,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
}

/**
 * Stagger Item Variants
 * Use as child of staggerContainer
 */
export const staggerItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeIn,
    },
  },
}

/**
 * Button Interaction Variants
 */
export const buttonVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeOut,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeOut,
    },
  },
}

/**
 * Ripple Variants (for click feedback)
 */
export const rippleVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0.5,
  },
  animate: {
    scale: 4,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: EASINGS.easeOut,
    },
  },
}

/**
 * Shake Variants (for errors)
 */
export const shakeVariants: Variants = {
  shake: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
      ease: EASINGS.easeInOut,
    },
  },
}

/**
 * Pulse Variants (for emphasis)
 */
export const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: EASINGS.easeInOut,
    },
  },
}

/**
 * Bounce Variants
 */
export const bounceVariants: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-8, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: EASINGS.easeInOut,
    },
  },
}

/**
 * Rotate Variants
 */
export const rotateVariants: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 180,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeInOut,
    },
  },
}

/**
 * Collapse Variants (for accordions, dropdowns)
 */
export const collapseVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeInOut,
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeInOut,
    },
  },
}

/**
 * Modal Overlay Variants
 */
export const overlayVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeIn,
    },
  },
}

/**
 * Modal Content Variants
 */
export const modalContentVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeIn,
    },
  },
}

/**
 * Shimmer Animation (for loading states)
 */
export const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
}

/**
 * Typing Indicator Dot Variants
 */
export const typingDotVariants = (delay: number): Variants => ({
  initial: {
    y: 0,
  },
  animate: {
    y: [-8, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: EASINGS.easeInOut,
      delay,
    },
  },
})

/**
 * Message Bubble Variants (for chat)
 */
export const messageBubbleVariants = (isUser: boolean): Variants => ({
  initial: {
    opacity: 0,
    x: isUser ? 20 : -20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: SPRING_CONFIGS.default,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeIn,
    },
  },
})

/**
 * Card Hover Variants (for 3D tilt effect)
 */
export const cardTiltVariants: Variants = {
  rest: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeOut,
    },
  },
}

/**
 * Utility function to get transition with reduced motion support
 */
export function getTransition(
  duration: number = DURATIONS.normal,
  ease: readonly number[] = EASINGS.easeOut,
  prefersReducedMotion: boolean = false
): Transition {
  return prefersReducedMotion
    ? { duration: 0 }
    : { duration, ease }
}

/**
 * Utility function to create custom stagger variants
 */
export function createStaggerVariants(
  staggerDelay: number = 0.05,
  itemDelay: number = 0
): {
  container: Variants
  item: Variants
} {
  return {
    container: {
      initial: {},
      animate: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: itemDelay,
        },
      },
    },
    item: {
      initial: {
        opacity: 0,
        y: 10,
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: DURATIONS.normal,
          ease: EASINGS.easeOut,
        },
      },
    },
  }
}

/**
 * Utility function to create slide variants with custom direction
 */
export function createSlideVariants(
  direction: "up" | "down" | "left" | "right",
  distance: number = 20
): Variants {
  const axis = direction === "up" || direction === "down" ? "y" : "x"
  const initialValue =
    direction === "up" || direction === "left" ? distance : -distance

  return {
    initial: {
      opacity: 0,
      [axis]: initialValue,
    },
    animate: {
      opacity: 1,
      [axis]: 0,
      transition: {
        duration: DURATIONS.normal,
        ease: EASINGS.easeOut,
      },
    },
    exit: {
      opacity: 0,
      [axis]: -initialValue,
      transition: {
        duration: DURATIONS.fast,
        ease: EASINGS.easeIn,
      },
    },
  }
}
