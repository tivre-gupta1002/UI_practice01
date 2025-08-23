import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      // include both token-driven classes and legacy Tailwind utility fallbacks
      primary:
        'bg-[var(--color-primary)] hover:bg-[var(--color-primary-500)] text-[var(--text-inverse)] focus:ring-[var(--color-primary-300)] bg-primary-600',
      secondary:
        'bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] text-[var(--text)] focus:ring-[var(--color-muted-500)] bg-gray-200 text-gray-800',
      outline:
        'border border-[var(--color-border)] hover:bg-[var(--color-surface)] text-[var(--text)] focus:ring-[var(--color-muted-500)] border',
      ghost:
        'hover:bg-[var(--color-surface-2)] text-[var(--text)] focus:ring-[var(--color-muted-500)] bg-transparent',
      danger:
        'bg-[var(--color-success)] hover:bg-[var(--color-success-300)] text-[var(--text-inverse)] focus:ring-[var(--color-success-300)] bg-red-600'
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    }

    return (
      <button
        ref={ref as any}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          'transform-gpu hover:scale-105 active:scale-95',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <motion.div
            className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
  </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
