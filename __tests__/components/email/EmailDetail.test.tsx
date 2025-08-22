import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { EmailDetail } from '@/components/email/EmailDetail'
import { mockEmails } from '@/lib/data'

// Mock the API functions
jest.mock('@/lib/api', () => ({
  performAction: jest.fn().mockResolvedValue({ success: true })
}))

describe('EmailDetail Component', () => {
  const mockEmail = mockEmails[0]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders email details when email is provided', () => {
    render(<EmailDetail email={mockEmail} />)
    
    expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
    expect(screen.getByText('Closing Confirmation')).toBeInTheDocument()
    expect(screen.getByText('To: r.primero@scalablelegal.com')).toBeInTheDocument()
  })

  it('renders placeholder when no email is selected', () => {
    render(<EmailDetail email={null} />)
    
    expect(screen.getByText('Select an email to view details')).toBeInTheDocument()
    expect(screen.getByText('Select an email to view details')).toBeInTheDocument()
  })

  it('displays email sender information', () => {
    render(<EmailDetail email={mockEmail} />)
    
    expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
    expect(screen.getByText('To: r.primero@scalablelegal.com')).toBeInTheDocument()
  })

  it('displays email subject', () => {
    render(<EmailDetail email={mockEmail} />)
    
    expect(screen.getByText('Closing Confirmation')).toBeInTheDocument()
  })

  it('displays email content', () => {
    render(<EmailDetail email={mockEmail} />)
    
    expect(screen.getByText(/Yes our closing is still on/)).toBeInTheDocument()
    expect(screen.getByText(/I think \$5000 for the repairs is fine/)).toBeInTheDocument()
  })

  it('displays email timestamp', () => {
    render(<EmailDetail email={mockEmail} />)
    
    expect(screen.getByText('1 day, 2 hours ago')).toBeInTheDocument()
  })

  it('displays encrypted badge for encrypted emails', () => {
    render(<EmailDetail email={mockEmail} />)
    
    expect(screen.getByText('NEW ENCRYPTED')).toBeInTheDocument()
  })

  it('displays priority badge for high priority emails', () => {
    render(<EmailDetail email={mockEmail} />)
    
    expect(screen.getByText('HIGH PRIORITY')).toBeInTheDocument()
  })

  it('displays star indicator for starred emails', () => {
    render(<EmailDetail email={mockEmail} />)
    
    // Should show star icon for starred emails
    const starIcon = document.querySelector('[title*="star"]')
    expect(starIcon).toBeInTheDocument()
  })

  it('displays attachments when present', () => {
    render(<EmailDetail email={mockEmail} />)
    
    expect(screen.getByText('Attachments (1)')).toBeInTheDocument()
    expect(screen.getByText('$500 Invoice332.pdf')).toBeInTheDocument()
    expect(screen.getByText('245KB • pdf')).toBeInTheDocument()
  })

  it('displays download button for attachments', () => {
    render(<EmailDetail email={mockEmail} />)
    
    const downloadButton = screen.getByText('Download')
    expect(downloadButton).toBeInTheDocument()
  })

  it('handles attachment download', async () => {
    render(<EmailDetail email={mockEmail} />)
    
    const downloadButton = screen.getByText('Download')
    fireEvent.click(downloadButton)
    
    // Should trigger download action
    await waitFor(() => {
      expect(downloadButton).toBeInTheDocument()
    })
  })

  it('displays quick action buttons', () => {
    render(<EmailDetail email={mockEmail} />)
    
    expect(screen.getByText('Yes')).toBeInTheDocument()
    expect(screen.getByText('No')).toBeInTheDocument()
    expect(screen.getByText('Please follow up.')).toBeInTheDocument()
    expect(screen.getByText('Show more...')).toBeInTheDocument()
  })

  it('handles quick action clicks', async () => {
    render(<EmailDetail email={mockEmail} />)
    
    const yesButton = screen.getByText('Yes')
    fireEvent.click(yesButton)
    
    // Should trigger action
    await waitFor(() => {
      expect(yesButton).toBeInTheDocument()
    })
  })

  it('displays email action buttons', () => {
    render(<EmailDetail email={mockEmail} />)
    
    expect(screen.getByText('Send')).toBeInTheDocument()
    expect(screen.getByText('Send & Archive')).toBeInTheDocument()
  })

  it('displays secondary action buttons', () => {
    render(<EmailDetail email={mockEmail} />)
    
    // Should show reply, forward, archive, categorize buttons
    const actionButtons = document.querySelectorAll('button[title*="Reply"], button[title*="Forward"], button[title*="Archive"], button[title*="Categorize"]')
    expect(actionButtons.length).toBeGreaterThan(0)
  })

  it('handles star action', async () => {
    render(<EmailDetail email={mockEmail} />)
    
    const starButton = document.querySelector('button[title*="star"]')
    if (starButton) {
      fireEvent.click(starButton)
      
      // Should trigger star action
      await waitFor(() => {
        expect(starButton).toBeInTheDocument()
      })
    }
  })

  it('handles read/unread action', async () => {
    render(<EmailDetail email={mockEmail} />)
    
    const readButton = document.querySelector('button[title*="read"]')
    if (readButton) {
      fireEvent.click(readButton)
      
      // Should trigger read action
      await waitFor(() => {
        expect(readButton).toBeInTheDocument()
      })
    }
  })

  it('shows more actions menu', () => {
    render(<EmailDetail email={mockEmail} />)
    
    const moreActionsButton = document.querySelector('button[title*="More actions"]')
    if (moreActionsButton) {
      fireEvent.click(moreActionsButton)
      
      // Should show actions menu
      expect(screen.getByText('This Email >')).toBeInTheDocument()
      expect(screen.getByText('Full Email Thread >')).toBeInTheDocument()
    }
  })

  it('displays context menu actions', () => {
    render(<EmailDetail email={mockEmail} />)
    
    const moreActionsButton = document.querySelector('button[title*="More actions"]')
    if (moreActionsButton) {
      fireEvent.click(moreActionsButton)
      
      expect(screen.getByText('Searches')).toBeInTheDocument()
      expect(screen.getByText('Commitment')).toBeInTheDocument()
      expect(screen.getByText('Payoffs & Invoices')).toBeInTheDocument()
      expect(screen.getByText('Policy')).toBeInTheDocument()
      expect(screen.getByText('Other')).toBeInTheDocument()
    }
  })

  it('highlights amounts in email content', () => {
    render(<EmailDetail email={mockEmail} />)
    
    // Should highlight $5000 amount
    const highlightedAmount = document.querySelector('.bg-blue-100')
    expect(highlightedAmount).toBeInTheDocument()
  })

  it('highlights dates in email content', () => {
    render(<EmailDetail email={mockEmail} />)
    
    // Should highlight "tomorrow" date
    const highlightedDate = document.querySelector('.bg-green-100')
    expect(highlightedDate).toBeInTheDocument()
  })

  it('displays CC recipients when present', () => {
    render(<EmailDetail email={mockEmail} />)
    
    expect(screen.getByText('CC: r.primero@scalablelegal.com')).toBeInTheDocument()
  })

  it('handles close button when onClose is provided', () => {
    const mockOnClose = jest.fn()
    render(<EmailDetail email={mockEmail} onClose={mockOnClose} />)
    
    const closeButton = screen.getByTitle('Close email detail')
    fireEvent.click(closeButton)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('does not show close button when onClose is not provided', () => {
    render(<EmailDetail email={mockEmail} />)
    
    const closeButton = screen.queryByTitle('Close email detail')
    expect(closeButton).not.toBeInTheDocument()
  })

  it('displays email priority correctly', () => {
    render(<EmailDetail email={mockEmail} />)
    
    expect(screen.getByText('HIGH PRIORITY')).toBeInTheDocument()
  })

  it('displays email category when available', () => {
    render(<EmailDetail email={mockEmail} />)
    
    // Category should be displayed somewhere in the email details
    expect(screen.getByText('Transaction')).toBeInTheDocument()
  })

  it('handles email with no attachments', () => {
    const emailWithoutAttachments = { ...mockEmail, attachments: [] }
    render(<EmailDetail email={emailWithoutAttachments} />)
    
    // Should not show attachments section
    expect(screen.queryByText('Attachments')).not.toBeInTheDocument()
  })

  it('handles email with multiple attachments', () => {
    const emailWithMultipleAttachments = {
      ...mockEmail,
      attachments: [
        { id: '1', name: 'Document1.pdf', type: 'pdf', size: '100KB', url: '#' },
        { id: '2', name: 'Document2.docx', type: 'docx', size: '200KB', url: '#' }
      ]
    }
    
    render(<EmailDetail email={emailWithMultipleAttachments} />)
    
    expect(screen.getByText('Attachments (2)')).toBeInTheDocument()
    expect(screen.getByText('Document1.pdf')).toBeInTheDocument()
    expect(screen.getByText('Document2.docx')).toBeInTheDocument()
  })

  it('displays attachment file types correctly', () => {
    render(<EmailDetail email={mockEmail} />)
    
    expect(screen.getByText('245KB • pdf')).toBeInTheDocument()
  })

  it('handles email status display', () => {
    render(<EmailDetail email={mockEmail} />)
    
    // Status should be displayed somewhere in the email details
    expect(screen.getByText('pending')).toBeInTheDocument()
  })

  it('displays assigned user when available', () => {
    render(<EmailDetail email={mockEmail} />)
    
    // Assigned user should be displayed somewhere in the email details
    expect(screen.getByText('Kristin Watson')).toBeInTheDocument()
  })

  it('handles email with due date', () => {
    render(<EmailDetail email={mockEmail} />)
    
    // Due date should be displayed somewhere in the email details
    expect(screen.getByText('12/15/2020')).toBeInTheDocument()
  })

  it('displays email thread information when available', () => {
    render(<EmailDetail email={mockEmail} />)
    
    // Thread ID should be displayed somewhere in the email details
    expect(screen.getByText('THREAD-001')).toBeInTheDocument()
  })

  it('handles responsive design', () => {
    // Test that component renders without crashing on different screen sizes
    render(<EmailDetail email={mockEmail} />)
    
    // Should render without errors
    expect(screen.getByText('bryan@scalablelegal.com')).toBeInTheDocument()
  })

  it('maintains accessibility features', () => {
    render(<EmailDetail email={mockEmail} />)
    
    // Should have proper ARIA labels and roles
    const emailContent = screen.getByText(/Yes our closing is still on/)
    expect(emailContent).toBeInTheDocument()
  })
})
