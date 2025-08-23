import React from 'react'

interface TooltipProps {
  children: React.ReactNode
  text: string
}

export function Tooltip({ children, text }: TooltipProps) {
  return (
    <span className="relative inline-block">
      {children}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[rgba(17,24,39,0.92)] text-[var(--text-inverse)] text-[var(--fs-12)] px-2 py-1 rounded-[var(--radius-sm)] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-[var(--dur-med)]">
        {text}
      </span>
    </span>
  )
}
