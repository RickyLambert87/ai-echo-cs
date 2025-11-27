"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

import { cn } from "@workspace/ui/lib/utils"
import { useReducedMotion } from "@workspace/ui/hooks/use-reduced-motion"

interface CardProps extends React.ComponentProps<"div"> {
  tilt?: boolean
  glass?: boolean
  hover?: boolean
}

function Card({ className, tilt = false, glass = false, hover = true, ...props }: CardProps) {
  const prefersReducedMotion = useReducedMotion()
  const cardRef = React.useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || prefersReducedMotion || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const baseClasses = "text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
  const glassClasses = glass ? "glass" : "bg-card"
  const hoverClasses = hover && !prefersReducedMotion ? "transition-shadow hover:shadow-md" : ""

  if (!tilt || prefersReducedMotion) {
    return (
      <div
        data-slot="card"
        className={cn(baseClasses, glassClasses, hoverClasses, className)}
        {...props}
      />
    )
  }

  return (
    <motion.div
      ref={cardRef}
      data-slot="card"
      className={cn(baseClasses, glassClasses, hoverClasses, className)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
