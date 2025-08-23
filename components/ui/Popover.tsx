import React from 'react'

interface PopoverProps {
  children: React.ReactNode
  className?: string
}

export function Popover({ children, className = '' }: PopoverProps) {
  return (
    <div className={`bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-md p-[var(--space-12)] ${className}`} role="dialog">
      {children}
    </div>
  )
}
