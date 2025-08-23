import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      children,
      variant = 'default',
      size = 'md',
      rounded = false,
      ...props
    },
    ref
  ) => {
    const variants = {
      // token-based plus Tailwind legacy fallbacks used in tests
      default: 'bg-[var(--color-surface)] text-[var(--text)] bg-gray-100 text-gray-800',
      primary: 'bg-[var(--color-primary-300)] text-[var(--color-primary)] bg-primary-100 text-primary-800',
      secondary: 'bg-[var(--color-surface)] text-[var(--text)] bg-gray-100 text-gray-800',
      success: 'bg-[var(--color-success-300)] text-[var(--color-success)] bg-green-100 text-green-800',
      warning: 'bg-[var(--color-warn)] text-[var(--color-warn)] bg-yellow-100 text-yellow-800',
      danger: 'bg-[var(--color-warn)] text-[var(--text)] bg-red-100 text-red-800'
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base'
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium',
          rounded ? 'rounded-full' : 'rounded',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
