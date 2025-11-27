"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { useReducedMotion } from "@workspace/ui/hooks/use-reduced-motion"
import { buttonVariants as motionButtonVariants, rippleVariants } from "@workspace/ui/lib/animations"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        transparent: "bg-transparent text-primary-foreground hover:bg-transparent hover:text-primary-foreground/80",
        tertiary: "bg-gradient-to-b from-[#3FB62F] to-[#318d25] text-white hover:to-[#318d25]/90",
        warning: "bg-gradient-to-b from-yellow-500 to-[#be8b00] text-white hover:to-[#be8b00]/90",
        glow: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 glow-on-hover",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface RippleType {
  x: number
  y: number
  key: number
}

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  enableRipple?: boolean
  enableAnimations?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  enableRipple = true,
  enableAnimations = true,
  children,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const [ripples, setRipples] = React.useState<RippleType[]>([])
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading || !enableRipple || prefersReducedMotion) {
      onClick?.(e)
      return
    }

    // Create ripple effect
    if (buttonRef.current && !asChild) {
      const button = buttonRef.current
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newRipple: RippleType = {
        x,
        y,
        key: Date.now(),
      }

      setRipples((prev) => [...prev, newRipple])

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.key !== newRipple.key))
      }, 600)
    }

    onClick?.(e)
  }

  // If asChild, return simple Slot without animations
  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Slot>
    )
  }

  const buttonContent = (
    <>
      {loading && <Loader2 className="animate-spin" />}
      {children}
      {/* Ripple effect */}
      {enableRipple && !prefersReducedMotion && (
        <span className="absolute inset-0 overflow-hidden rounded-md pointer-events-none">
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.key}
              className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current"
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
              initial="initial"
              animate="animate"
              variants={rippleVariants}
            />
          ))}
        </span>
      )}
    </>
  )

  // If animations disabled or reduced motion preferred, use regular button
  if (!enableAnimations || prefersReducedMotion) {
    return (
      <button
        ref={buttonRef}
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size, className }),
          "relative"
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {buttonContent}
      </button>
    )
  }

  // Return animated button with motion
  const { onDrag, onDragStart, onDragEnd, ...restProps } = props as any

  return (
    <motion.button
      ref={buttonRef}
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        "relative"
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={motionButtonVariants}
      {...restProps}
    >
      {buttonContent}
    </motion.button>
  )
}

export { Button, buttonVariants }
