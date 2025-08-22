import React from 'react'
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/Badge'

describe('Badge Component', () => {
  it('renders with default props', () => {
    render(<Badge>Default Badge</Badge>)
    const badge = screen.getByText('Default Badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium')
  })

  it('renders with primary variant', () => {
    render(<Badge variant="primary">Primary Badge</Badge>)
    const badge = screen.getByText('Primary Badge')
    expect(badge).toHaveClass('bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200')
  })

  it('renders with secondary variant', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>)
    const badge = screen.getByText('Secondary Badge')
    expect(badge).toHaveClass('bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200')
  })

  it('renders with success variant', () => {
    render(<Badge variant="success">Success Badge</Badge>)
    const badge = screen.getByText('Success Badge')
    expect(badge).toHaveClass('bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200')
  })

  it('renders with warning variant', () => {
    render(<Badge variant="warning">Warning Badge</Badge>)
    const badge = screen.getByText('Warning Badge')
    expect(badge).toHaveClass('bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200')
  })

  it('renders with danger variant', () => {
    render(<Badge variant="danger">Danger Badge</Badge>)
    const badge = screen.getByText('Danger Badge')
    expect(badge).toHaveClass('bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Badge size="sm">Small Badge</Badge>)
    let badge = screen.getByText('Small Badge')
    expect(badge).toHaveClass('px-2 py-0.5 text-xs')
    
    rerender(<Badge size="md">Medium Badge</Badge>)
    badge = screen.getByText('Medium Badge')
    expect(badge).toHaveClass('px-2.5 py-0.5 text-sm')
    
    rerender(<Badge size="lg">Large Badge</Badge>)
    badge = screen.getByText('Large Badge')
    expect(badge).toHaveClass('px-3 py-1 text-base')
  })

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>)
    const badge = screen.getByText('Custom Badge')
    expect(badge).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<Badge ref={ref}>Ref Badge</Badge>)
    
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it('renders with icon', () => {
    render(<Badge leftIcon={<span data-testid="icon">🔴</span>}>Icon Badge</Badge>)
    const badge = screen.getByText('Icon Badge')
    const icon = screen.getByTestId('icon')
    
    expect(icon).toBeInTheDocument()
    expect(badge).toHaveClass('inline-flex items-center')
  })

  it('renders with right icon', () => {
    render(<Badge rightIcon={<span data-testid="right-icon">✓</span>}>Right Icon Badge</Badge>)
    const badge = screen.getByText('Right Icon Badge')
    const icon = screen.getByTestId('right-icon')
    
    expect(icon).toBeInTheDocument()
    expect(badge).toHaveClass('inline-flex items-center')
  })

  it('renders with both icons', () => {
    render(
      <Badge 
        leftIcon={<span data-testid="left-icon">🔴</span>}
        rightIcon={<span data-testid="right-icon">✓</span>}
      >
        Both Icons Badge
      </Badge>
    )
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('renders with rounded variant', () => {
    render(<Badge rounded>Rounded Badge</Badge>)
    const badge = screen.getByText('Rounded Badge')
    expect(badge).toHaveClass('rounded-full')
  })

  it('renders without rounded variant', () => {
    render(<Badge rounded={false}>Not Rounded Badge</Badge>)
    const badge = screen.getByText('Not Rounded Badge')
    expect(badge).toHaveClass('rounded')
  })

  it('renders with children content', () => {
    render(
      <Badge>
        <span>Content</span>
        <strong>Bold</strong>
      </Badge>
    )
    
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Bold')).toBeInTheDocument()
  })

  it('handles empty content', () => {
    render(<Badge></Badge>)
    const badge = screen.getByText('')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('inline-flex items-center')
  })

  it('renders with conditional content', () => {
    const showIcon = true
    render(
      <Badge leftIcon={showIcon ? <span data-testid="conditional-icon">🔴</span> : null}>
        Conditional Badge
      </Badge>
    )
    
    expect(screen.getByTestId('conditional-icon')).toBeInTheDocument()
  })

  it('combines multiple props correctly', () => {
    render(
      <Badge 
        variant="success" 
        size="lg" 
        rounded 
        className="custom-class"
        leftIcon={<span data-testid="icon">✓</span>}
      >
        Complex Badge
      </Badge>
    )
    
    const badge = screen.getByText('Complex Badge')
    expect(badge).toHaveClass('bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200')
    expect(badge).toHaveClass('px-3 py-1 text-base')
    expect(badge).toHaveClass('rounded-full')
    expect(badge).toHaveClass('custom-class')
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders with accessibility attributes', () => {
    render(
      <Badge role="status" aria-label="Status indicator">
        Accessible Badge
      </Badge>
    )
    
    const badge = screen.getByRole('status')
    expect(badge).toHaveAttribute('aria-label', 'Status indicator')
  })

  it('renders with data attributes', () => {
    render(
      <Badge data-testid="test-badge" data-cy="cy-badge">
        Data Badge
      </Badge>
    )
    
    const badge = screen.getByTestId('test-badge')
    expect(badge).toHaveAttribute('data-cy', 'cy-badge')
  })

  it('maintains proper spacing with icons', () => {
    render(
      <Badge leftIcon={<span data-testid="left">🔴</span>} rightIcon={<span data-testid="right">✓</span>}>
        Spaced Badge
      </Badge>
    )
    
    const badge = screen.getByText('Spaced Badge')
    expect(badge).toHaveClass('inline-flex items-center')
  })

  it('handles long text content', () => {
    const longText = 'This is a very long badge text that should still render properly'
    render(<Badge>{longText}</Badge>)
    
    expect(screen.getByText(longText)).toBeInTheDocument()
  })

  it('renders with numeric content', () => {
    render(<Badge>42</Badge>)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders with special characters', () => {
    render(<Badge>🚀 Special & Characters!</Badge>)
    expect(screen.getByText('🚀 Special & Characters!')).toBeInTheDocument()
  })
})
