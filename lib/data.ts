import { Email, Property, Contact, Requirement, Tab, Document } from '../types'

export const mockEmails: Email[] = [
  {
    id: '1',
    sender: 'bryan@scalablelegal.com',
    recipient: 'r.primero@scalablelegal.com',
    subject: 'Closing Confirmation',
    content: 'Yes our closing is still on, I think $5000 for the repairs is fine. Please call me tomorrow to finalize the other details.',
    timestamp: '1 day, 2 hours ago',
    isRead: true,
    hasAttachments: true,
    isEncrypted: true,
    cc: ['r.primero@scalablelegal.com'],
    tags: ['NEW ENCRYPTED', 'CLOSING'],
    priority: 'high',
    category: 'Transaction',
    status: 'pending',
    isStarred: true,
    attachments: [
      { id: '1', name: '$500 Invoice332.pdf', type: 'pdf', size: '245KB', url: '#', mimeType: 'application/pdf' },
      { id: '2', name: 'image.png', type: 'image', size: '1.2MB', url: '#', mimeType: 'image/png' }
    ]
  },
  {
    id: '2',
    sender: 'Alex Tsibulski',
    recipient: 'user@example.com',
    subject: 'Property Update - 123 Main Street',
    content: 'Alex read 30 minutes ago. The property inspection has been completed and all requirements have been met.',
    timestamp: '1 day, 2 hours ago',
    isRead: true,
    hasAttachments: false,
    tags: ['PROPERTY', 'INSPECTION'],
    priority: 'medium',
    category: 'Property',
    status: 'completed'
  },
  {
    id: '3',
    sender: 'Kristin Watson',
    recipient: 'user@example.com',
    subject: 'Document Review Required',
    content: 'Please review the attached documents for the property transaction. There are several items that need your attention.',
    timestamp: '2 days ago',
    isRead: false,
    hasAttachments: true,
    tags: ['DOCUMENT', 'REVIEW'],
    priority: 'high',
    category: 'Document',
    status: 'pending',
    attachments: [
      { id: '3', name: 'Property_Review.pdf', type: 'pdf', size: '1.8MB', url: '#', mimeType: 'application/pdf' }
    ]
  },
  {
    id: '4',
    sender: 'Annette Black',
    recipient: 'user@example.com',
    subject: 'Meeting Schedule - Property Discussion',
    content: 'Let\'s schedule a meeting to discuss the property details and next steps. I have some concerns about the timeline.',
    timestamp: '3 days ago',
    isRead: false,
    hasAttachments: false,
    tags: ['MEETING', 'SCHEDULE'],
    priority: 'medium',
    category: 'Meeting',
    status: 'pending'
  },
  {
    id: '5',
    sender: 'Richard Primero',
    recipient: 'user@example.com',
    subject: 'Tax Assessment Update',
    content: 'The tax assessment for 123 Main Street has been completed. The new assessment value is $485,000.',
    timestamp: '4 days ago',
    isRead: true,
    hasAttachments: true,
    tags: ['TAX', 'ASSESSMENT'],
    priority: 'low',
    category: 'Tax',
    status: 'completed',
    attachments: [
      { id: '5', name: 'Tax_Assessment_2024.pdf', type: 'pdf', size: '2.1MB', url: '#', mimeType: 'application/pdf' }
    ]
  }
]

export const mockProperties: Property[] = [
  {
    id: '1',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    salePrice: 500000,
    mortgageAmount: 450000,
    ownersInsurance: 350000,
    lenders: 'Fidelity',
    loan: 'Conventional',
    policy: 'Standard',
    propertyType: 'residential',
    squareFootage: 2500,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 1985,
    lotSize: 0.25,
    zoning: 'R-2',
    taxAssessedValue: 485000,
    status: 'active',
    neighborhood: 'Downtown',
    schoolDistrict: 'NYC District 2',
    utilities: ['Electric', 'Water', 'Gas', 'Sewer'],
    features: ['Hardwood Floors', 'Central AC', 'Garage', 'Fireplace'],
    notes: 'Prime location with excellent potential for appreciation',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    address: '42 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    propertyType: 'residential',
    squareFootage: 1800,
    bedrooms: 2,
    bathrooms: 1,
    yearBuilt: 1990,
    status: 'pending',
    neighborhood: 'Midtown',
    schoolDistrict: 'NYC District 2'
  },
  {
    id: '3',
    address: '46 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    propertyType: 'commercial',
    squareFootage: 5000,
    yearBuilt: 1975,
    status: 'off-market',
    neighborhood: 'Business District',
    zoning: 'C-1'
  }
]

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Matt Blaine',
    email: 'matt@blaine.com',
    phone: '(555) 123-4567',
    role: 'Attorney',
    isPrimary: true,
    notes: 'Primary attorney for all property transactions',
    company: 'Blaine & Associates Law',
    title: 'Senior Partner',
    address: '123 Legal Street, New York, NY 10001',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA',
    website: 'www.blainelaw.com',
    status: 'active',
    source: 'Referral',
    lastContactDate: '2024-01-20',
    nextFollowUpDate: '2024-01-27',
    tags: ['Attorney', 'Primary', 'Property Law'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@smith.com',
    phone: '(333) 333-4423',
    role: 'Realtor',
    isPrimary: true,
    notes: 'Usually easier to reach John through his secretary.',
    company: 'Smith Real Estate',
    title: 'Licensed Realtor',
    address: '456 Real Estate Ave, New York, NY 10001',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA',
    status: 'active',
    source: 'Direct',
    lastContactDate: '2024-01-19',
    nextFollowUpDate: '2024-01-26',
    tags: ['Realtor', 'Primary', 'Sales'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-19'
  },
  {
    id: '3',
    name: 'John Surveyor',
    email: 'john@surveyor.com',
    phone: '(555) 987-6543',
    role: 'Surveyor',
    isPrimary: false,
    notes: 'Professional land surveyor with 15+ years experience',
    company: 'Precision Surveying Co.',
    title: 'Senior Surveyor',
    address: '789 Survey Lane, New York, NY 10001',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA',
    status: 'active',
    source: 'Professional Directory',
    lastContactDate: '2024-01-18',
    tags: ['Surveyor', 'Technical', 'Land Survey'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-18'
  },
  {
    id: '4',
    name: 'Cody Fisher',
    email: 'cody@fisher.com',
    phone: '(555) 456-7890',
    role: 'Assistant',
    isPrimary: false,
    notes: 'John Smith\'s personal assistant',
    company: 'Smith Real Estate',
    title: 'Executive Assistant',
    status: 'active',
    source: 'Internal',
    lastContactDate: '2024-01-20',
    tags: ['Assistant', 'Support', 'Internal'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-20'
  }
]

export const mockRequirements: Requirement[] = [
  {
    id: '1',
    property: '1',
    number: '10',
    details: 'This is a requirement or exception that needs to be addressed before closing can proceed.',
    code: 'R1234',
    instrument: '+Add',
    olLp: 'OP',
    status: 'pending',
    priority: 'high',
    assignedTo: 'Matt Blaine',
    dueDate: '2024-02-01',
    category: 'Title',
    isBoilerplate: false,
    isCustom: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    property: '1',
    number: '11',
    details: 'Property survey must be completed and approved by all parties.',
    code: 'R1235',
    instrument: '+Add',
    olLp: 'OP',
    status: 'completed',
    priority: 'medium',
    assignedTo: 'John Surveyor',
    dueDate: '2024-01-25',
    completedDate: '2024-01-20',
    category: 'Survey',
    isBoilerplate: true,
    isCustom: false,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '3',
    property: '1',
    number: '12',
    details: 'Home inspection report must be reviewed and any issues addressed.',
    code: 'R1236',
    instrument: '+Add',
    olLp: 'LP',
    status: 'pending',
    priority: 'high',
    assignedTo: 'John Smith',
    dueDate: '2024-01-30',
    category: 'Inspection',
    isBoilerplate: false,
    isCustom: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  }
]

export const mockTabs: Tab[] = [
  {
    id: '1',
    label: '123 Main Street',
    isActive: true,
    propertyId: '1',
    type: 'property',
    icon: '🏠',
    badge: 'Active',
    isClosable: true,
    order: 1,
    lastAccessed: '2024-01-20T10:30:00Z'
  },
  {
    id: '2',
    label: '42 Main Street',
    isActive: false,
    propertyId: '2',
    type: 'property',
    icon: '🏢',
    badge: 'Pending',
    isClosable: true,
    order: 2,
    lastAccessed: '2024-01-19T15:45:00Z'
  }
]

export const mockFilters: { [key: string]: any } = {
  emailCategories: [
    { id: '1', label: 'All Emails', isSelected: true, count: 21, value: 'all' },
    { id: '2', label: 'Unsorted', isSelected: false, count: 21, value: 'unsorted' },
    { id: '3', label: 'High Priority', isSelected: false, count: 5, value: 'high', color: 'red' },
    { id: '4', label: 'With Attachments', isSelected: false, count: 12, value: 'attachments', icon: '📎' }
  ],
  timeRanges: [
    { id: '1', label: 'Past Year', isSelected: true, value: 'past-year' },
    { id: '2', label: 'Past Month', isSelected: false, value: 'past-month' },
    { id: '3', label: 'Past Week', isSelected: false, value: 'past-week' },
    { id: '4', label: 'Today', isSelected: false, value: 'today' }
  ],
  emailStatus: [
    { id: '1', label: 'All', isSelected: true, value: 'all' },
    { id: '2', label: 'Unread', isSelected: false, value: 'unread' },
    { id: '3', label: 'Read', isSelected: false, value: 'read' },
    { id: '4', label: 'Starred', isSelected: false, value: 'starred' }
  ]
}

export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Property_Deed.pdf',
    type: 'pdf',
    size: '2.5MB',
    url: '#',
    category: 'Legal',
    tags: ['Deed', 'Legal', 'Property'],
    uploadedBy: 'Matt Blaine',
    uploadedAt: '2024-01-15',
    lastModified: '2024-01-15',
    version: '1.0',
    status: 'approved'
  },
  {
    id: '2',
    name: 'Survey_Report.pdf',
    type: 'pdf',
    size: '1.8MB',
    url: '#',
    category: 'Survey',
    tags: ['Survey', 'Technical', 'Property'],
    uploadedBy: 'John Surveyor',
    uploadedAt: '2024-01-18',
    lastModified: '2024-01-18',
    version: '1.0',
    status: 'approved'
  },
  {
    id: '3',
    name: 'Inspection_Report.pdf',
    type: 'pdf',
    size: '3.2MB',
    url: '#',
    category: 'Inspection',
    tags: ['Inspection', 'Property', 'Condition'],
    uploadedBy: 'Alex Tsibulski',
    uploadedAt: '2024-01-19',
    lastModified: '2024-01-19',
    version: '1.0',
    status: 'review'
  }
]

export const mockNotifications: any[] = [
  {
    id: '1',
    type: 'info',
    title: 'New Email Received',
    message: 'You have received a new encrypted email from bryan@scalablelegal.com',
    isRead: false,
    createdAt: '2024-01-20T10:30:00Z',
    priority: 'medium',
    category: 'Email'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Document Review Required',
    message: 'Property inspection report requires your review before proceeding',
    isRead: false,
    createdAt: '2024-01-20T09:15:00Z',
    priority: 'high',
    category: 'Document'
  }
]
