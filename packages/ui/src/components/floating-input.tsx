/**
 * FloatingInput Component
 *
 * Input with Material Design-style floating label animation.
 * Label moves up when input is focused or has value.
 *
 * Usage:
 * ```tsx
 * <FloatingInput label="Email" type="email" />
 * <FloatingInput label="Password" type="password" required />
 * ```
 */

"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@workspace/ui/lib/utils"
import { useReducedMotion } from "@workspace/ui/hooks/use-reduced-motion"

interface FloatingInputProps extends React.ComponentProps<"input"> {
  label: string
  error?: string
}

export function FloatingInput({
  className,
  label,
  error,
  type,
  value: controlledValue,
  onChange,
  ...props
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(false)
  const prefersReducedMotion = useReducedMotion()

  const isFloating = isFocused || hasValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0)
    onChange?.(e)
  }

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setHasValue(String(controlledValue).length > 0)
    }
  }, [controlledValue])

  const labelVariants = {
    normal: {
      top: "50%",
      y: "-50%",
      scale: 1,
      color: "var(--muted-foreground)",
    },
    floating: {
      top: "-0.625rem",
      y: 0,
      scale: 0.85,
      color: isFocused ? "var(--primary)" : "var(--muted-foreground)",
    },
  }

  return (
    <div className="relative w-full">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-transparent selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input peer flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          error
            ? "border-destructive ring-destructive/20 dark:ring-destructive/40"
            : "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        value={controlledValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-invalid={!!error}
        {...props}
      />

      {prefersReducedMotion ? (
        <label
          className={cn(
            "pointer-events-none absolute left-3 px-1 text-sm transition-all duration-200 origin-left bg-background",
            isFloating
              ? "top-0 -translate-y-1/2 scale-85 text-primary"
              : "top-1/2 -translate-y-1/2 text-muted-foreground"
          )}
        >
          {label}
          {props.required && <span className="text-destructive ml-0.5">*</span>}
        </label>
      ) : (
        <motion.label
          className="pointer-events-none absolute left-3 px-1 origin-left bg-background"
          variants={labelVariants}
          initial={false}
          animate={isFloating ? "floating" : "normal"}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="text-sm">
            {label}
            {props.required && <span className="text-destructive ml-0.5">*</span>}
          </span>
        </motion.label>
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="mt-1.5 text-sm text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
