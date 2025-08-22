import React from 'react'
import { render, screen } from '@testing-library/react'
import { Card } from '@/components/ui/Card'

describe('Card Component', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>)
    const card = screen.getByText('Card content')
    expect(card).toBeInTheDocument()
    expect(card.parentElement).toHaveClass('bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-soft')
  })

  it('renders with elevated variant', () => {
    render(<Card variant="elevated">Elevated card</Card>)
    const card = screen.getByText('Elevated card')
    expect(card.parentElement).toHaveClass('shadow-medium hover:shadow-strong')
  })

  it('renders with outlined variant', () => {
    render(<Card variant="outlined">Outlined card</Card>)
    const card = screen.getByText('Outlined card')
    expect(card.parentElement).toHaveClass('bg-transparent border-2')
  })

  it('renders with different padding options', () => {
    const { rerender } = render(<Card padding="none">No padding</Card>)
    let card = screen.getByText('No padding').parentElement
    expect(card).toHaveClass('p-0')
    
    rerender(<Card padding="sm">Small padding</Card>)
    card = screen.getByText('Small padding').parentElement
    expect(card).toHaveClass('p-2')
    
    rerender(<Card padding="md">Medium padding</Card>)
    card = screen.getByText('Medium padding').parentElement
    expect(card).toHaveClass('p-4')
    
    rerender(<Card padding="lg">Large padding</Card>)
    card = screen.getByText('Large padding').parentElement
    expect(card).toHaveClass('p-6')
  })

  it('applies custom className', () => {
    render(<Card className="custom-class">Custom card</Card>)
    const card = screen.getByText('Custom card').parentElement
    expect(card).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Card ref={ref}>Ref card</Card>)
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('renders with children content', () => {
    render(
      <Card>
        <h2>Card Title</h2>
        <p>Card description</p>
      </Card>
    )
    
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card description')).toBeInTheDocument()
  })

  it('renders with complex nested content', () => {
    render(
      <Card>
        <div className="header">
          <h3>Header</h3>
        </div>
        <div className="body">
          <p>Body content</p>
        </div>
        <div className="footer">
          <button>Action</button>
        </div>
      </Card>
    )
    
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('applies hover effects for elevated variant', () => {
    render(<Card variant="elevated">Hover card</Card>)
    const card = screen.getByText('Hover card').parentElement
    expect(card).toHaveClass('transition-shadow duration-200')
  })

  it('renders with different content types', () => {
    render(
      <Card>
        <div data-testid="content-div">Div content</div>
        <span data-testid="content-span">Span content</span>
        <button data-testid="content-button">Button content</button>
      </Card>
    )
    
    expect(screen.getByTestId('content-div')).toBeInTheDocument()
    expect(screen.getByTestId('content-span')).toBeInTheDocument()
    expect(screen.getByTestId('content-button')).toBeInTheDocument()
  })

  it('maintains proper structure with empty content', () => {
    render(<Card></Card>)
    const card = screen.getByText('').parentElement
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('bg-white dark:bg-gray-800')
  })

  it('renders with conditional content', () => {
    const showContent = true
    render(
      <Card>
        {showContent && <div>Conditional content</div>}
        <div>Always visible</div>
      </Card>
    )
    
    expect(screen.getByText('Conditional content')).toBeInTheDocument()
    expect(screen.getByText('Always visible')).toBeInTheDocument()
  })

  it('handles multiple variants correctly', () => {
    render(
      <Card variant="elevated" padding="lg" className="custom-class">
        Multi-variant card
      </Card>
    )
    
    const card = screen.getByText('Multi-variant card').parentElement
    expect(card).toHaveClass('shadow-medium hover:shadow-strong')
    expect(card).toHaveClass('p-6')
    expect(card).toHaveClass('custom-class')
  })

  it('renders with accessibility attributes', () => {
    render(
      <Card role="article" aria-label="Information card">
        Accessible card
      </Card>
    )
    
    const card = screen.getByRole('article')
    expect(card).toHaveAttribute('aria-label', 'Information card')
  })

  it('renders with data attributes', () => {
    render(
      <Card data-testid="test-card" data-cy="cy-card">
        Data card
      </Card>
    )
    
    const card = screen.getByTestId('test-card')
    expect(card).toHaveAttribute('data-cy', 'cy-card')
  })
})
