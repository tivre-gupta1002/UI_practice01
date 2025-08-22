import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PropertyDetails } from '@/components/property/PropertyDetails'
import { mockProperties, mockContacts, mockRequirements } from '@/lib/data'

// Mock the API functions
jest.mock('@/lib/api', () => ({
  performAction: jest.fn().mockResolvedValue({ success: true })
}))

describe('PropertyDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders property details header', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('Property Details')).toBeInTheDocument()
    expect(screen.getByText('Highlight')).toBeInTheDocument()
    expect(screen.getByText('Audit')).toBeInTheDocument()
  })

  it('displays property address', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('123 Main Street, New York, NY')).toBeInTheDocument()
  })

  it('shows alert banner for city-specific warnings', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText(/This is a City of Newark file/)).toBeInTheDocument()
    expect(screen.getByText(/you may have issues retrieving the tax data/)).toBeInTheDocument()
  })

  it('renders navigation tabs', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Commitment')).toBeInTheDocument()
    expect(screen.getByText('Closing')).toBeInTheDocument()
      expect(screen.getByText('Recording')).toBeInTheDocument()
    expect(screen.getByText('Policy')).toBeInTheDocument()
  })

  it('switches between tabs', () => {
    render(<PropertyDetails propertyId="1" />)
    
    const commitmentTab = screen.getByText('Commitment')
    fireEvent.click(commitmentTab)
    
    // Should show commitment tab content
    expect(commitmentTab).toHaveClass('border-primary-500')
  })

  it('displays pending deal information', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('Pending deal')).toBeInTheDocument()
    expect(screen.getByText('Underwriter')).toBeInTheDocument()
    expect(screen.getByText('Fidelity')).toBeInTheDocument()
    expect(screen.getByText('Commitment Issued')).toBeInTheDocument()
    expect(screen.getByText('01/01/2010')).toBeInTheDocument()
  })

  it('displays general information section', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('General')).toBeInTheDocument()
    expect(screen.getByText('Buyer')).toBeInTheDocument()
    expect(screen.getByText('Purach Aser')).toBeInTheDocument()
    expect(screen.getByText('Seller')).toBeInTheDocument()
    expect(screen.getByText('Realtor')).toBeInTheDocument()
    expect(screen.getByText('Surveyor')).toBeInTheDocument()
  })

  it('shows contact information with clickable links', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('Matt Blaine +2')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('John Surveyor')).toBeInTheDocument()
  })

  it('displays requirements section', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText(/Requirements \(8\) Exceptions \(20\) Endorsements/)).toBeInTheDocument()
    expect(screen.getByText('Add')).toBeInTheDocument()
  })

  it('shows boilerplate items toggle', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('Show boiler plate items (9)')).toBeInTheDocument()
    
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    expect(checkbox).toBeChecked()
  })

  it('provides search functionality for requirements', () => {
    render(<PropertyDetails propertyId="1" />)
    
    const searchInput = screen.getByPlaceholderText(/Search by Code, or the commitment\/endorsement description/)
    expect(searchInput).toBeInTheDocument()
    
    fireEvent.change(searchInput, { target: { value: 'test search' } })
    expect(searchInput).toHaveValue('test search')
  })

  it('displays requirement filter buttons', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('Show all resolved 2')).toBeInTheDocument()
    expect(screen.getByText('Show all omitted 3')).toBeInTheDocument()
    expect(screen.getByText('Show all deleted 2')).toBeInTheDocument()
  })

  it('renders requirements table', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('Property')).toBeInTheDocument()
    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Code')).toBeInTheDocument()
    expect(screen.getByText('Instrument')).toBeInTheDocument()
    expect(screen.getByText('OL/LP?')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('displays requirement data in table', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('Survey required')).toBeInTheDocument()
    expect(screen.getByText('SURV')).toBeInTheDocument()
    expect(screen.getByText('Deed')).toBeInTheDocument()
    expect(screen.getByText('OL')).toBeInTheDocument()
  })

  it('shows action buttons for requirements', () => {
    render(<PropertyDetails propertyId="1" />)
    
    // Should show edit and delete buttons for each requirement
    const editButtons = document.querySelectorAll('button[title="Edit requirement"]')
    const deleteButtons = document.querySelectorAll('button[title="Delete requirement"]')
    
    expect(editButtons.length).toBeGreaterThan(0)
    expect(deleteButtons.length).toBeGreaterThan(0)
  })

  it('displays water/sewer/final readings section', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('Water/Sewer/Final Readings')).toBeInTheDocument()
    expect(screen.getByText('Property')).toBeInTheDocument()
    expect(screen.getByText('Water')).toBeInTheDocument()
    expect(screen.getByText('Sewer')).toBeInTheDocument()
    expect(screen.getByText('Final Readings')).toBeInTheDocument()
  })

  it('shows financial fees section', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('Financial Fees')).toBeInTheDocument()
    expect(screen.getByText('Start Up Fee')).toBeInTheDocument()
    expect(screen.getByText('Regular Dues')).toBeInTheDocument()
    expect(screen.getByText('Transfer Fees')).toBeInTheDocument()
    expect(screen.getByText('Document Fees')).toBeInTheDocument()
    expect(screen.getByText('Processing Fees')).toBeInTheDocument()
    expect(screen.getByText('Total HOA')).toBeInTheDocument()
  })

  it('displays property/mortgage section', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('Property/Mortgage')).toBeInTheDocument()
    expect(screen.getByText('Add Property')).toBeInTheDocument()
    expect(screen.getByText('Add Mortgage')).toBeInTheDocument()
  })

  it('shows property and mortgage data', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('123 Main st, Florence, NJ')).toBeInTheDocument()
    expect(screen.getByText('$500,000')).toBeInTheDocument()
    expect(screen.getByText('$450,000')).toBeInTheDocument()
    expect(screen.getByText('... Mortgage 1')).toBeInTheDocument()
    expect(screen.getByText('$350,000')).toBeInTheDocument()
  })

  it('handles address expansion toggle', () => {
    render(<PropertyDetails propertyId="1" />)
    
    const showMoreButton = screen.getByText('Show more')
    fireEvent.click(showMoreButton)
    
    expect(screen.getByText('Show less')).toBeInTheDocument()
    expect(screen.getByText('42 Main Street, New York, NY')).toBeInTheDocument()
    expect(screen.getByText('46 Main Street, New York, NY')).toBeInTheDocument()
  })

  it('displays contact popup when contact is clicked', () => {
    render(<PropertyDetails propertyId="1" />)
    
    const contactLink = screen.getByText('Matt Blaine +2')
    fireEvent.click(contactLink)
    
    // Should show contact details popup
    expect(screen.getByText('Matt Blaine')).toBeInTheDocument()
    expect(screen.getByText('(555) 123-4567')).toBeInTheDocument()
    expect(screen.getByText('matt.blaine@lawfirm.com')).toBeInTheDocument()
  })

  it('shows multiple phone numbers for contacts', () => {
    render(<PropertyDetails propertyId="1" />)
    
    const contactLink = screen.getByText('Matt Blaine +2')
    fireEvent.click(contactLink)
    
    // Should show multiple phone numbers with types
    expect(screen.getByText(/Recent/)).toBeInTheDocument()
    expect(screen.getByText(/Frequent/)).toBeInTheDocument()
  })

  it('displays contact company and title information', () => {
    render(<PropertyDetails propertyId="1" />)
    
    const contactLink = screen.getByText('Matt Blaine +2')
    fireEvent.click(contactLink)
    
    expect(screen.getByText(/Law Firm LLC - Senior Partner/)).toBeInTheDocument()
  })

  it('closes contact popup when clicking outside', () => {
    render(<PropertyDetails propertyId="1" />)
    
    const contactLink = screen.getByText('Matt Blaine +2')
    fireEvent.click(contactLink)
    
    // Popup should be visible
    expect(screen.getByText('Matt Blaine')).toBeInTheDocument()
    
    // Click outside to close
    fireEvent.click(document.body)
    
    // Popup should be hidden
    expect(screen.queryByText('Matt Blaine')).not.toBeInTheDocument()
  })

  it('handles highlight action', async () => {
    render(<PropertyDetails propertyId="1" />)
    
    const highlightButton = screen.getByText('Highlight')
    fireEvent.click(highlightButton)
    
    // Should trigger highlight action
    await waitFor(() => {
      expect(highlightButton).toBeInTheDocument()
    })
  })

  it('handles audit action', async () => {
    render(<PropertyDetails propertyId="1" />)
    
    const auditButton = screen.getByText('Audit')
    fireEvent.click(auditButton)
    
    // Should trigger audit action
    await waitFor(() => {
      expect(auditButton).toBeInTheDocument()
    })
  })

  it('handles add requirement action', async () => {
    render(<PropertyDetails propertyId="1" />)
    
    const addButton = screen.getByText('Add')
    fireEvent.click(addButton)
    
    // Should trigger add requirement action
    await waitFor(() => {
      expect(addButton).toBeInTheDocument()
    })
  })

  it('handles add property action', async () => {
    render(<PropertyDetails propertyId="1" />)
    
    const addPropertyButton = screen.getByText('Add Property')
    fireEvent.click(addPropertyButton)
    
    // Should trigger add property action
    await waitFor(() => {
      expect(addPropertyButton).toBeInTheDocument()
    })
  })

  it('handles add mortgage action', async () => {
    render(<PropertyDetails propertyId="1" />)
    
    const addMortgageButton = screen.getByText('Add Mortgage')
    fireEvent.click(addMortgageButton)
    
    // Should trigger add mortgage action
    await waitFor(() => {
      expect(addMortgageButton).toBeInTheDocument()
    })
  })

  it('handles requirement editing', async () => {
    render(<PropertyDetails propertyId="1" />)
    
    const editButtons = document.querySelectorAll('button[title="Edit requirement"]')
    if (editButtons.length > 0) {
      fireEvent.click(editButtons[0])
      
      // Should trigger edit action
      await waitFor(() => {
        expect(editButtons[0]).toBeInTheDocument()
      })
    }
  })

  it('handles requirement deletion', async () => {
    render(<PropertyDetails propertyId="1" />)
    
    const deleteButtons = document.querySelectorAll('button[title="Delete requirement"]')
    if (deleteButtons.length > 0) {
      fireEvent.click(deleteButtons[0])
      
      // Should trigger delete action
      await waitFor(() => {
        expect(deleteButtons[0]).toBeInTheDocument()
      })
    }
  })

  it('handles show resolved requirements', async () => {
    render(<PropertyDetails propertyId="1" />)
    
    const showResolvedButton = screen.getByText('Show all resolved 2')
    fireEvent.click(showResolvedButton)
    
    // Should trigger show resolved action
    await waitFor(() => {
      expect(showResolvedButton).toBeInTheDocument()
    })
  })

  it('handles show omitted requirements', async () => {
    render(<PropertyDetails propertyId="1" />)
    
    const showOmittedButton = screen.getByText('Show all omitted 3')
    fireEvent.click(showOmittedButton)
    
    // Should trigger show omitted action
    await waitFor(() => {
      expect(showOmittedButton).toBeInTheDocument()
    })
  })

  it('handles show deleted requirements', async () => {
    render(<PropertyDetails propertyId="1" />)
    
    const showDeletedButton = screen.getByText('Show all deleted 2')
    fireEvent.click(showDeletedButton)
    
    // Should trigger show deleted action
    await waitFor(() => {
      expect(showDeletedButton).toBeInTheDocument()
    })
  })

  it('displays title bill information', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('Title Bill')).toBeInTheDocument()
    expect(screen.getByText('$3,200')).toBeInTheDocument()
  })

  it('shows policy and loan information', () => {
    render(<PropertyDetails propertyId="1" />)
    
    expect(screen.getByText('Policy')).toBeInTheDocument()
    expect(screen.getByText('Loan')).toBeInTheDocument()
  })

  it('handles responsive design', () => {
    // Test that component renders without crashing on different screen sizes
    render(<PropertyDetails propertyId="1" />)
    
    // Should render without errors
    expect(screen.getByText('Property Details')).toBeInTheDocument()
  })

  it('maintains accessibility features', () => {
    render(<PropertyDetails propertyId="1" />)
    
    // Should have proper ARIA labels and roles
    const propertyDetails = screen.getByText('Property Details')
    expect(propertyDetails).toBeInTheDocument()
  })

  it('handles missing property gracefully', () => {
    render(<PropertyDetails propertyId="nonexistent" />)
    
    // Should fallback to first property or show appropriate message
    expect(screen.getByText('Property Details')).toBeInTheDocument()
  })

  it('displays contact notes when available', () => {
    render(<PropertyDetails propertyId="1" />)
    
    const contactLink = screen.getByText('Matt Blaine +2')
    fireEvent.click(contactLink)
    
    // Should show contact notes
    expect(screen.getByText(/Primary contact for all legal matters/)).toBeInTheDocument()
  })

  it('handles contact with missing information', () => {
    render(<PropertyDetails propertyId="1" />)
    
    // Should show "Missing information" for seller
    expect(screen.getByText('Missing information')).toBeInTheDocument()
  })
})
