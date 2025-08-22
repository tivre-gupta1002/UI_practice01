import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/ui/Input'

describe('Input Component', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('w-full px-3 py-2 border border-gray-300')
  })

  it('renders with label', () => {
    render(<Input label="Email Address" placeholder="Enter email" />)
    expect(screen.getByText('Email Address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('renders with left icon', () => {
    render(<Input leftIcon={<span data-testid="left-icon">🔍</span>} placeholder="Search" />)
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  it('renders with right icon', () => {
    render(<Input rightIcon={<span data-testid="right-icon">✓</span>} placeholder="Input" />)
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('renders search variant', () => {
    render(<Input variant="search" placeholder="Search..." />)
    const input = screen.getByPlaceholderText('Search...')
    expect(input).toHaveClass('pl-10')
  })

  it('renders with error message', () => {
    render(<Input error="This field is required" placeholder="Input" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByText('This field is required')).toHaveClass('text-red-600')
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} placeholder="Input" />)
    
    const input = screen.getByPlaceholderText('Input')
    fireEvent.change(input, { target: { value: 'test value' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'test value' })
    }))
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} placeholder="Input" />)
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Input" />)
    const input = screen.getByPlaceholderText('Input')
    expect(input).toHaveClass('custom-class')
  })

  it('renders with disabled state', () => {
    render(<Input disabled placeholder="Input" />)
    const input = screen.getByPlaceholderText('Input')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('opacity-50 cursor-not-allowed')
  })

  it('renders with required attribute', () => {
    render(<Input required placeholder="Input" />)
    const input = screen.getByPlaceholderText('Input')
    expect(input).toBeRequired()
  })

  it('renders with aria-label for accessibility', () => {
    render(<Input aria-label="Search input" placeholder="Search" />)
    const input = screen.getByLabelText('Search input')
    expect(input).toBeInTheDocument()
  })

  it('renders with id and htmlFor for label association', () => {
    render(<Input id="email-input" label="Email" placeholder="Enter email" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('id', 'email-input')
  })

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    
    render(<Input onFocus={handleFocus} onBlur={handleBlur} placeholder="Input" />)
    const input = screen.getByPlaceholderText('Input')
    
    fireEvent.focus(input)
    expect(handleFocus).toHaveBeenCalledTimes(1)
    
    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Input size="sm" placeholder="Small input" />)
    let input = screen.getByPlaceholderText('Small input')
    expect(input).toHaveClass('px-2 py-1 text-sm')
    
    rerender(<Input size="lg" placeholder="Large input" />)
    input = screen.getByPlaceholderText('Large input')
    expect(input).toHaveClass('px-4 py-3 text-lg')
  })

  it('renders with different types', () => {
    render(<Input type="email" placeholder="Email input" />)
    const input = screen.getByPlaceholderText('Email input')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('renders with placeholder text', () => {
    render(<Input placeholder="Enter your name" />)
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
  })

  it('renders with value prop', () => {
    render(<Input value="Initial value" onChange={() => {}} />)
    const input = screen.getByDisplayValue('Initial value')
    expect(input).toBeInTheDocument()
  })
})
