export interface Email {
  id: string
  sender: string
  recipient: string
  subject: string
  content: string
  timestamp: string
  isRead: boolean
  hasAttachments: boolean
  attachments?: Attachment[]
  isEncrypted?: boolean
  cc?: string[]
  tags?: string[]
  priority?: 'low' | 'medium' | 'high'
  category?: string
  status?: 'pending' | 'completed' | 'archived'
  assignedTo?: string
  dueDate?: string
  isStarred?: boolean
  isFlagged?: boolean
  threadId?: string
  replyTo?: string
  bcc?: string[]
  metadata?: Record<string, any>
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: string
  url: string
  thumbnailUrl?: string
  isDownloaded?: boolean
  downloadProgress?: number
  mimeType?: string
  lastModified?: string
}

export interface Property {
  id: string
  address: string
  city: string
  state: string
  zip: string
  salePrice?: number
  mortgageAmount?: number
  ownersInsurance?: number
  lenders?: string
  loan?: string
  policy?: string
  propertyType?: 'residential' | 'commercial' | 'land'
  squareFootage?: number
  bedrooms?: number
  bathrooms?: number
  yearBuilt?: number
  lotSize?: number
  zoning?: string
  taxAssessedValue?: number
  lastSoldDate?: string
  lastSoldPrice?: number
  status?: 'active' | 'pending' | 'sold' | 'off-market'
  photos?: string[]
  documents?: Document[]
  coordinates?: { lat: number; lng: number }
  neighborhood?: string
  schoolDistrict?: string
  utilities?: string[]
  features?: string[]
  notes?: string
  createdAt?: string
  updatedAt?: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  role: string
  isPrimary: boolean
  notes?: string
  company?: string
  title?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  website?: string
  socialMedia?: Record<string, string>
  tags?: string[]
  status?: 'active' | 'inactive' | 'prospect'
  source?: string
  lastContactDate?: string
  nextFollowUpDate?: string
  preferences?: Record<string, any>
  avatar?: string
  isVerified?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Requirement {
  id: string
  property: string
  number: string
  details: string
  code: string
  instrument: string
  olLp: string
  status?: 'pending' | 'completed' | 'waived' | 'deleted'
  priority?: 'low' | 'medium' | 'high' | 'critical'
  assignedTo?: string
  dueDate?: string
  completedDate?: string
  notes?: string
  documents?: Document[]
  category?: string
  isBoilerplate?: boolean
  isCustom?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Document {
  id: string
  name: string
  type: string
  size: string
  url: string
  category?: string
  tags?: string[]
  uploadedBy?: string
  uploadedAt?: string
  lastModified?: string
  version?: string
  isSigned?: boolean
  signatureDate?: string
  status?: 'draft' | 'review' | 'approved' | 'archived'
  metadata?: Record<string, any>
}

export interface Tab {
  id: string
  label: string
  isActive: boolean
  propertyId?: string
  type?: 'property' | 'email' | 'contact' | 'document'
  icon?: string
  badge?: string | number
  isClosable?: boolean
  order?: number
  lastAccessed?: string
}

export interface FilterOption {
  id: string
  label: string
  isSelected: boolean
  count?: number
  value?: string | number | boolean
  group?: string
  icon?: string
  color?: string
}

export interface EmailFilter {
  hasAttachments: boolean
  calendarItems: boolean
  timeRange: string
  contacts: string[]
  categories?: string[]
  status?: string[]
  priority?: string[]
  assignedTo?: string[]
  dateFrom?: string
  dateTo?: string
  isRead?: boolean
  isStarred?: boolean
  isFlagged?: boolean
  tags?: string[]
}

export interface PropertyFilter {
  propertyType?: string[]
  status?: string[]
  priceRange?: { min: number; max: number }
  location?: string[]
  features?: string[]
  bedrooms?: number
  bathrooms?: number
  squareFootage?: { min: number; max: number }
  yearBuilt?: { min: number; max: number }
  tags?: string[]
}

export interface SearchResult {
  id: string
  type: 'email' | 'property' | 'contact' | 'document'
  title: string
  subtitle: string
  description?: string
  url: string
  relevance: number
  metadata?: Record<string, any>
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  isRead: boolean
  createdAt: string
  expiresAt?: string
  actionUrl?: string
  priority: 'low' | 'medium' | 'high'
  category?: string
  metadata?: Record<string, any>
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'viewer'
  permissions: string[]
  preferences: Record<string, any>
  lastLogin?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AuditLog {
  id: string
  userId: string
  action: string
  resourceType: string
  resourceId: string
  details: Record<string, any>
  ipAddress?: string
  userAgent?: string
  timestamp: string
}

export interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    error: string
    warning: string
    success: string
    info: string
  }
  isDefault: boolean
  isCustom: boolean
  createdAt: string
  updatedAt: string
}
