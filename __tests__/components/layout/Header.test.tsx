import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '@/components/layout/Header'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

// Mock the data
jest.mock('@/lib/data', () => ({
  mockTabs: [
    { id: '1', label: '123 Main Street', isActive: true, propertyId: '1' },
    { id: '2', label: '123 Main Street', isActive: false, propertyId: '2' }
  ]
}))

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  )
}

describe('Header', () => {
  it('renders the title', () => {
    renderWithTheme(<Header />)
    expect(screen.getByText('entitled')).toBeInTheDocument()
  })

  it('renders search input', () => {
    renderWithTheme(<Header />)
    expect(screen.getByPlaceholderText('Search property or person')).toBeInTheDocument()
  })

  it('renders tabs', () => {
    renderWithTheme(<Header />)
    expect(screen.getByText('123 Main Street')).toBeInTheDocument()
  })

  it('renders add tab button', () => {
    renderWithTheme(<Header />)
    expect(screen.getByLabelText('Add new tab')).toBeInTheDocument()
  })

  it('calls onTabChange when tab is clicked', () => {
    const mockOnTabChange = jest.fn()
    renderWithTheme(<Header onTabChange={mockOnTabChange} />)
    
    const firstTab = screen.getByText('123 Main Street')
    fireEvent.click(firstTab)
    
    expect(mockOnTabChange).toHaveBeenCalledWith('1')
  })

  it('adds new tab when add button is clicked', () => {
    renderWithTheme(<Header />)
    
    const addButton = screen.getByLabelText('Add new tab')
    fireEvent.click(addButton)
    
    // Should have 3 tabs now (2 original + 1 new)
    expect(screen.getAllByText(/123 Main Street|New Property/)).toHaveLength(3)
  })
})
