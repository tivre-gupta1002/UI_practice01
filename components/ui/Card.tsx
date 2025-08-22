import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      children,
      variant = 'default',
      padding = 'md',
      hover = false,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
      elevated: 'bg-white dark:bg-gray-800 shadow-medium border-0',
      outlined: 'bg-transparent border-2 border-gray-200 dark:border-gray-700'
    }

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6'
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-lg transition-all duration-200',
          variants[variant],
          paddings[padding],
          hover && 'hover:shadow-medium hover:-translate-y-1',
          className
        )}
        whileHover={hover ? { y: -4 } : {}}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
