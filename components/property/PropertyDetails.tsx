'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, ChevronDown, ChevronUp, Plus, Search, Eye, EyeOff, Phone, Mail, MoreHorizontal, Download, Edit, Trash2, Calendar, DollarSign, MapPin, Building, User, FileText } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { mockProperties, mockContacts, mockRequirements, mockDocuments } from '../../lib/data'
import { Property, Contact, Requirement, Document } from '../../types'
import { formatCurrency } from '../../lib/utils'
import { performAction } from '../../lib/api'

interface PropertyDetailsProps {
  propertyId?: string
}

export function PropertyDetails({ propertyId }: PropertyDetailsProps) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [showAddresses, setShowAddresses] = useState(false)
  const [showBoilerplate, setShowBoilerplate] = useState(false)
  const [showContactDetails, setShowContactDetails] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    // Load requirements and documents for the property
    setRequirements(mockRequirements.filter(req => req.property === propertyId))
    setDocuments(mockDocuments)
  }, [propertyId])

  const property = mockProperties.find(p => p.id === propertyId) || mockProperties[0]
  const contacts = mockContacts

  const tabs = ['Overview', 'Commitment', 'Closing', 'Recording', 'Policy']

  const handleContactClick = (contactId: string) => {
    setShowContactDetails(showContactDetails === contactId ? null : contactId)
  }

  const filteredRequirements = requirements.filter(req =>
    req.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.details.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAction = async (action: string, data: any) => {
    await performAction(action, data)
  }

  const getContactPhoneNumbers = (contact: Contact) => {
    // Simulate multiple phone numbers for contacts
    return [
      { number: contact.phone, type: 'Recent', isPrimary: contact.isPrimary },
      { number: contact.phone.replace('(', '').replace(')', '').replace('-', ''), type: 'Frequent', isPrimary: false }
    ]
  }

  return (
    <div className="flex-1 bg-[var(--color-bg)] overflow-y-auto">
      <div className="p-[var(--space-24)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[var(--fs-20)] font-semibold text-[var(--text)]">
            Property Details
          </h2>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleAction('highlight', { propertyId })}
            >
              <Eye className="h-4 w-4 mr-1" />
              Highlight
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleAction('audit', { propertyId })}
            >
              <FileText className="h-4 w-4 mr-1" />
              Audit
            </Button>
          </div>
        </div>

        {/* Property Address */}
        <Card className="mb-[var(--space-24)]">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-[var(--text)] text-[var(--fs-16)]">
                  {property.address}, {property.city}, {property.state}
                </h3>
                {showAddresses && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 space-y-1"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      42 Main Street, New York, NY
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      46 Main Street, New York, NY
                    </p>
                  </motion.div>
                )}
              </div>
              <button
                onClick={() => setShowAddresses(!showAddresses)}
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-500)] text-[var(--fs-14)] font-medium"
              >
                {showAddresses ? 'Show less' : 'Show more'}
              </button>
            </div>
          </div>
        </Card>

        {/* Alert Banner */}
        <motion.div
          className="bg-[rgba(219,184,131,0.12)] border border-[var(--color-warn)] rounded-[var(--radius-md)] p-[var(--space-16)] mb-[var(--space-24)]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-[var(--color-warn)] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[var(--fs-14)] text-[var(--color-warn)] font-medium">
                This is a City of Newark file, you may have issues retrieving the tax data in a timely manner.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 mb-[var(--space-24)] border-b border-[var(--color-border)]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-[var(--space-16)] py-[var(--space-8)] text-[var(--fs-14)] font-medium transition-colors border-b-2
                ${activeTab === tab
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-[var(--color-muted-600)] hover:text-[var(--text)]'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'Overview' && (
              <div className="space-y-6">
                {/* Pending Deal */}
                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Pending deal
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Underwriter</p>
                      <p className="font-medium text-gray-900 dark:text-white">{property.lenders || 'Fidelity'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Commitment Issued</p>
                      <p className="font-medium text-gray-900 dark:text-white">01/01/2010</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Policy Issued</p>
                      <p className="font-medium text-gray-900 dark:text-white">02/03/2010</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Remitted</p>
                      <p className="font-medium text-gray-900 dark:text-white">02/03/2010</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Title Bill</p>
                      <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(3200)}</p>
                    </div>
                  </div>
                </Card>

                {/* General Information */}
                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    General
                  </h3>
                  <div className="space-y-4">
                    {/* Buyer */}
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Buyer</p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">Purach Aser</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Attorney:</span>
                          <button
                            onClick={() => handleContactClick('1')}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Matt Blaine +2
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Seller */}
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Seller</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Missing information</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Attorney:</span>
                          <button
                            onClick={() => handleContactClick('1')}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Matt Blaine +2
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Realtor */}
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Realtor</p>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleContactClick('2')}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          John Smith
                        </button>
                      </div>
                    </div>

                    {/* Surveyor */}
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Surveyor</p>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleContactClick('3')}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          John Surveyor
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Requirements */}
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Requirements (8) Exceptions (20) Endorsements
                    </h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      leftIcon={<Plus className="h-4 w-4" />}
                      onClick={() => handleAction('add_requirement', { propertyId })}
                    >
                      Add
                    </Button>
                  </div>
                  
                  <div className="mb-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={showBoilerplate}
                        onChange={(e) => setShowBoilerplate(e.target.checked)}
                        className="rounded"
                      />
                      Show boiler plate items (9)
                    </label>
                  </div>

                  <div className="mb-4">
                    <Input
                      placeholder="Search by Code, or the commitment/endorsement description"
                      leftIcon={<Search className="h-4 w-4" />}
                      variant="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Button variant="outline" size="sm" onClick={() => handleAction('show_resolved', { propertyId })}>
                      Show all resolved 2
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleAction('show_omitted', { propertyId })}>
                      Show all omitted 3
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleAction('show_deleted', { propertyId })}>
                      Show all deleted 2
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Property</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">#</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Details</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Code</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Instrument</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">OL/LP?</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRequirements.map((req) => (
                          <tr key={req.id} className="border-b border-gray-100 dark:border-gray-700">
                            <td className="py-2 text-gray-900 dark:text-white">{req.property}</td>
                            <td className="py-2 text-gray-900 dark:text-white">{req.number}</td>
                            <td className="py-2 text-gray-600 dark:text-gray-400">{req.details}</td>
                            <td className="py-2 text-gray-900 dark:text-white">{req.code}</td>
                            <td className="py-2 text-gray-900 dark:text-white">{req.instrument}</td>
                            <td className="py-2 text-gray-900 dark:text-white">{req.olLp}</td>
                            <td className="py-2">
                              <div className="flex items-center gap-1">
                                <button 
                                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                                  onClick={() => handleAction('edit_requirement', { requirementId: req.id })}
                                  title="Edit requirement"
                                >
                                  <Edit className="h-3 w-3 text-gray-400" />
                                </button>
                                <button 
                                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                                  onClick={() => handleAction('delete_requirement', { requirementId: req.id })}
                                  title="Delete requirement"
                                >
                                  <Trash2 className="h-3 w-3 text-gray-400" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Water/Sewer/Final Readings */}
                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Water/Sewer/Final Readings
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Property</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Water</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Sewer</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Final Readings</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">F/R Party</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">F/R Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-2 text-gray-900 dark:text-white">One</td>
                          <td className="py-2">
                            <select className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700">
                              <option>Select</option>
                            </select>
                          </td>
                          <td className="py-2">
                            <select className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700">
                              <option>Select</option>
                            </select>
                          </td>
                          <td className="py-2">
                            <select className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700">
                              <option>Select</option>
                            </select>
                          </td>
                          <td className="py-2">
                            <select className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700">
                              <option>Select</option>
                            </select>
                          </td>
                          <td className="py-2 text-gray-900 dark:text-white">11/09/2020</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Financial Fees */}
                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Financial Fees
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Property</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Start Up Fee</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Regular Dues</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Transfer Fees</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Document Fees</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Processing Fees</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Total HOA</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-2 text-gray-900 dark:text-white">One</td>
                          <td className="py-2">
                            <input type="number" className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700" placeholder="0" />
                          </td>
                          <td className="py-2">
                            <input type="number" className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700" placeholder="0" />
                          </td>
                          <td className="py-2">
                            <input type="number" className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700" placeholder="0" />
                          </td>
                          <td className="py-2">
                            <input type="number" className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700" placeholder="0" />
                          </td>
                          <td className="py-2">
                            <input type="number" className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700" placeholder="0" />
                          </td>
                          <td className="py-2 text-gray-900 dark:text-white">0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Property/Mortgage */}
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Property/Mortgage
                    </h3>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        leftIcon={<Plus className="h-4 w-4" />}
                        onClick={() => handleAction('add_property', { propertyId })}
                      >
                        Add Property
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        leftIcon={<Plus className="h-4 w-4" />}
                        onClick={() => handleAction('add_mortgage', { propertyId })}
                      >
                        Add Mortgage
                      </Button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Property/Mortgage</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Sale Price/Mortgage</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Owners Insurance/Lenders</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Loan</th>
                          <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Policy</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-2 text-gray-900 dark:text-white">123 Main st, Florence, NJ</td>
                          <td className="py-2 text-gray-900 dark:text-white">{formatCurrency(500000)}</td>
                          <td className="py-2 text-gray-900 dark:text-white">{formatCurrency(450000)}</td>
                          <td className="py-2 text-gray-900 dark:text-white">#</td>
                          <td className="py-2 text-gray-900 dark:text-white">#</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-2 text-gray-900 dark:text-white">... Mortgage 1</td>
                          <td className="py-2 text-gray-900 dark:text-white">{formatCurrency(350000)}</td>
                          <td className="py-2 text-gray-900 dark:text-white">{formatCurrency(350000)}</td>
                          <td className="py-2 text-gray-900 dark:text-white">#</td>
                          <td className="py-2 text-gray-900 dark:text-white">#</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Contact Details Popup */}
        <AnimatePresence>
          {showContactDetails && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setShowContactDetails(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-medium p-6 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const contact = contacts.find(c => c.id === showContactDetails)
                  if (!contact) return null
                  
                  const phoneNumbers = getContactPhoneNumbers(contact)
                  
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {contact.name}
                        </h3>
                        <button
                          onClick={() => setShowContactDetails(null)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {phoneNumbers.map((phone, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {phone.number} {phone.type} {phone.isPrimary && '(Primary)'}
                            </span>
                          </div>
                        ))}
                        
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {contact.email}
                          </span>
                        </div>
                        
                        {contact.company && (
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {contact.company} - {contact.title}
                            </span>
                          </div>
                        )}
                        
                        {contact.notes && (
                          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {contact.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
