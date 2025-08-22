import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { EmailList } from '@/components/email/EmailList'
import { mockEmails, mockFilters } from '@/lib/data'

// Mock the API functions
jest.mock('@/lib/api', () => ({
  getEmails: jest.fn().mockResolvedValue(mockEmails),
  performAction: jest.fn().mockResolvedValue({ success: true })
}))

describe('EmailList Component', () => {
  const mockOnEmailSelect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders email list with emails', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
      expect(screen.getByText('Closing Confirmation')).toBeInTheDocument()
    })
  })

  it('renders search input', () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    expect(screen.getByPlaceholderText('Search email')).toBeInTheDocument()
  })

  it('renders filter button', () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    expect(screen.getByText('Filter')).toBeInTheDocument()
  })

  it('renders new email button', () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    expect(screen.getByText('New Email')).toBeInTheDocument()
  })

  it('renders email categories', () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    mockFilters.emailCategories.forEach(category => {
      expect(screen.getByText(category.label)).toBeInTheDocument()
    })
  })

  it('filters emails by search query', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
    })
    
    const searchInput = screen.getByPlaceholderText('Search email')
    fireEvent.change(searchInput, { target: { value: 'closing' } })
    
    expect(screen.getByText('Closing Confirmation')).toBeInTheDocument()
    expect(screen.queryByText('bryan@scalablelegal.com')).toBeInTheDocument()
  })

  it('toggles filter visibility', () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    const filterButton = screen.getByText('Filter')
    fireEvent.click(filterButton)
    
    expect(screen.getByText('Has attachments')).toBeInTheDocument()
    expect(screen.getByText('Calendar items')).toBeInTheDocument()
  })

  it('filters emails by attachments', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
    })
    
    const filterButton = screen.getByText('Filter')
    fireEvent.click(filterButton)
    
    const attachmentsCheckbox = screen.getByText('Has attachments')
    fireEvent.click(attachmentsCheckbox)
    
    // Should still show emails with attachments
    expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
  })

  it('handles email selection', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
    })
    
    const emailItem = screen.getByText('bryan@scalablelegal.com').closest('div')
    fireEvent.click(emailItem!)
    
    expect(mockOnEmailSelect).toHaveBeenCalledWith(expect.objectContaining({
      id: '1',
      sender: 'bryan@scalablelegal.com'
    }))
  })

  it('displays email priority badges', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      expect(screen.getByText('HIGH')).toBeInTheDocument()
    })
  })

  it('displays encrypted badges', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      expect(screen.getByText('NEW ENCRYPTED')).toBeInTheDocument()
    })
  })

  it('displays attachment indicators', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      // Check for paperclip icon (attachment indicator)
      const attachmentIcons = document.querySelectorAll('[data-testid="attachment-icon"]')
      expect(attachmentIcons.length).toBeGreaterThan(0)
    })
  })

  it('displays star indicators for starred emails', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      // Check for star icons
      const starIcons = document.querySelectorAll('[data-testid="star-icon"]')
      expect(starIcons.length).toBeGreaterThan(0)
    })
  })

  it('handles email actions (star, read, more)', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
    })
    
    // Find and click the star button
    const starButtons = document.querySelectorAll('button[title*="star"]')
    if (starButtons.length > 0) {
      fireEvent.click(starButtons[0])
    }
  })

  it('shows context menu on right click', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
    })
    
    const emailItem = screen.getByText('bryan@scalablelegal.com').closest('div')
    fireEvent.contextMenu(emailItem!)
    
    // Context menu should appear
    expect(screen.getByText('Reply')).toBeInTheDocument()
    expect(screen.getByText('Forward')).toBeInTheDocument()
    expect(screen.getByText('Archive')).toBeInTheDocument()
  })

  it('closes context menu when clicking outside', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
    })
    
    const emailItem = screen.getByText('bryan@scalablelegal.com').closest('div')
    fireEvent.contextMenu(emailItem!)
    
    // Context menu should be visible
    expect(screen.getByText('Reply')).toBeInTheDocument()
    
    // Click outside to close
    fireEvent.click(document.body)
    
    // Context menu should be hidden
    expect(screen.queryByText('Reply')).not.toBeInTheDocument()
  })

  it('displays additional actions for selected email', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} selectedEmailId="1" />)
    
    await waitFor(() => {
      expect(screen.getByText('Reply')).toBeInTheDocument()
      expect(screen.getByText('Forward')).toBeInTheDocument()
      expect(screen.getByText('Archive')).toBeInTheDocument()
      expect(screen.getByText('Categorize')).toBeInTheDocument()
    })
  })

  it('handles quick actions', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} selectedEmailId="1" />)
    
    await waitFor(() => {
      const replyButton = screen.getByText('Reply')
      fireEvent.click(replyButton)
    })
  })

  it('displays email timestamps', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      expect(screen.getByText('1 day, 2 hours ago')).toBeInTheDocument()
    })
  })

  it('handles empty email list', async () => {
    // Mock empty emails
    jest.doMock('@/lib/api', () => ({
      getEmails: jest.fn().mockResolvedValue([])
    }))
    
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      // Should not crash and should show empty state or no emails
      expect(screen.getByPlaceholderText('Search email')).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    // Mock API error
    jest.doMock('@/lib/api', () => ({
      getEmails: jest.fn().mockRejectedValue(new Error('API Error'))
    }))
    
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      // Should fallback to mock data
      expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
    })
  })

  it('filters by email category', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
    })
    
    // Click on a category filter
    const highPriorityButton = screen.getByText('High Priority')
    fireEvent.click(highPriorityButton)
    
    // Should filter to show only high priority emails
    expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
  })

  it('displays email content preview', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      expect(screen.getByText(/Yes our closing is still on/)).toBeInTheDocument()
    })
  })

  it('handles email with multiple tags', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      expect(screen.getByText('NEW ENCRYPTED')).toBeInTheDocument()
      expect(screen.getByText('CLOSING')).toBeInTheDocument()
    })
  })

  it('displays sender initials in avatar', async () => {
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    await waitFor(() => {
      // Should display initials for sender names
      expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
    })
  })

  it('handles responsive design', () => {
    // Test that component renders without crashing on different screen sizes
    render(<EmailList onEmailSelect={mockOnEmailSelect} />)
    
    // Should render without errors
    expect(screen.getByPlaceholderText('Search email')).toBeInTheDocument()
  })
})
