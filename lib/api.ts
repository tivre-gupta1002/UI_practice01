import { Email, Property, Contact, Requirement, Tab, EmailFilter, PropertyFilter } from '../types'
import { mockEmails, mockProperties, mockContacts, mockRequirements, mockTabs, mockFilters } from './data'

// API Service Layer - Can be easily replaced with real API calls
export class ApiService {
  // Email Operations
  static async getEmails(filters?: EmailFilter): Promise<Email[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    let filteredEmails = [...mockEmails]
    
    if (filters) {
      if (filters.hasAttachments) {
        filteredEmails = filteredEmails.filter(email => email.hasAttachments)
      }
      if (filters.calendarItems) {
        filteredEmails = filteredEmails.filter(email => email.tags?.includes('CALENDAR'))
      }
      if (filters.contacts.length > 0) {
        filteredEmails = filteredEmails.filter(email => 
          filters.contacts.some(contact => 
            email.sender.toLowerCase().includes(contact.toLowerCase()) ||
            email.recipient.toLowerCase().includes(contact.toLowerCase())
          )
        )
      }
    }
    
    return filteredEmails
  }

  static async getEmailById(id: string): Promise<Email | null> {
    await new Promise(resolve => setTimeout(resolve, 50))
    return mockEmails.find(email => email.id === id) || null
  }

  static async updateEmail(id: string, updates: Partial<Email>): Promise<Email> {
    await new Promise(resolve => setTimeout(resolve, 200))
    console.log(`Updating email ${id}:`, updates)
    return { ...mockEmails.find(email => email.id === id)!, ...updates }
  }

  // Property Operations
  static async getProperties(filters?: PropertyFilter): Promise<Property[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return [...mockProperties]
  }

  static async getPropertyById(id: string): Promise<Property | null> {
    await new Promise(resolve => setTimeout(resolve, 50))
    return mockProperties.find(property => property.id === id) || null
  }

  static async updateProperty(id: string, updates: Partial<Property>): Promise<Property> {
    await new Promise(resolve => setTimeout(resolve, 200))
    console.log(`Updating property ${id}:`, updates)
    return { ...mockProperties.find(property => property.id === id)!, ...updates }
  }

  // Contact Operations
  static async getContacts(): Promise<Contact[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return [...mockContacts]
  }

  static async getContactById(id: string): Promise<Contact | null> {
    await new Promise(resolve => setTimeout(resolve, 50))
    return mockContacts.find(contact => contact.id === id) || null
  }

  // Requirement Operations
  static async getRequirements(propertyId?: string): Promise<Requirement[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    let requirements = [...mockRequirements]
    
    if (propertyId) {
      requirements = requirements.filter(req => req.property === propertyId)
    }
    
    return requirements
  }

  // Tab Operations
  static async getTabs(): Promise<Tab[]> {
    await new Promise(resolve => setTimeout(resolve, 50))
    return [...mockTabs]
  }

  static async createTab(tab: Omit<Tab, 'id'>): Promise<Tab> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const newTab: Tab = {
      ...tab,
      id: `tab-${Date.now()}`
    }
    console.log('Creating new tab:', newTab)
    return newTab
  }

  static async updateTab(id: string, updates: Partial<Tab>): Promise<Tab> {
    await new Promise(resolve => setTimeout(resolve, 200))
    console.log(`Updating tab ${id}:`, updates)
    return { ...mockTabs.find(tab => tab.id === id)!, ...updates }
  }

  // Filter Operations
  static async getFilters(): Promise<typeof mockFilters> {
    await new Promise(resolve => setTimeout(resolve, 50))
    return mockFilters
  }

  // Search Operations
  static async search(query: string, type: 'email' | 'property' | 'contact'): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 150))
    const searchTerm = query.toLowerCase()
    
    switch (type) {
      case 'email':
        return mockEmails.filter(email => 
          email.subject.toLowerCase().includes(searchTerm) ||
          email.sender.toLowerCase().includes(searchTerm) ||
          email.content.toLowerCase().includes(searchTerm)
        )
      case 'property':
        return mockProperties.filter(property => 
          property.address.toLowerCase().includes(searchTerm) ||
          property.city.toLowerCase().includes(searchTerm)
        )
      case 'contact':
        return mockContacts.filter(contact => 
          contact.name.toLowerCase().includes(searchTerm) ||
          contact.email.toLowerCase().includes(searchTerm)
        )
      default:
        return []
    }
  }

  // Action Handlers (placeholder for real implementations)
  static async performAction(action: string, data: any): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    console.log(`Performing action: ${action}`, data)
  }
}


// Export individual functions for easier use
export const {
  getEmails,
  getEmailById,
  updateEmail,
  getProperties,
  getPropertyById,
  updateProperty,
  getContacts,
  getContactById,
  getRequirements,
  getTabs,
  createTab,
  updateTab,
  getFilters,
  search,
  performAction
} = ApiService
