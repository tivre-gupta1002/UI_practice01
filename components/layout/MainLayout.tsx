'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from './Header'
import { EmailList } from '@/components/email/EmailList'
import { EmailDetail } from '@/components/email/EmailDetail'
import { PropertyDetails } from '@/components/property/PropertyDetails'
import { Email } from '@/types'
import { performAction } from '@/lib/api'

export function MainLayout() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [activePropertyId, setActivePropertyId] = useState<string>('1')
  const [showEmailDetail, setShowEmailDetail] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email)
    setShowEmailDetail(true)
    
    // Log email selection for analytics
    performAction('email_selected', { emailId: email.id, timestamp: new Date().toISOString() })
  }

  const handleTabChange = (tabId: string) => {
    setActivePropertyId(tabId)
    setShowEmailDetail(false)
    setSelectedEmail(null)
    
    // Log tab change for analytics
    performAction('tab_changed', { tabId, timestamp: new Date().toISOString() })
  }

  const handleCloseEmailDetail = () => {
    setShowEmailDetail(false)
    setSelectedEmail(null)
  }

  const handleBackToEmails = () => {
    setShowEmailDetail(false)
    setSelectedEmail(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onTabChange={handleTabChange} />
      
      <div className="flex h-[calc(100vh-120px)]">
        {/* Email List - Left Panel */}
        <div className={`${showEmailDetail && isMobile ? 'hidden' : 'w-full lg:w-1/3 xl:w-1/4'} border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}>
          <EmailList
            onEmailSelect={handleEmailSelect}
            selectedEmailId={selectedEmail?.id}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Email Detail - Middle Panel (when email is selected) */}
          {showEmailDetail && selectedEmail && (
            <motion.div
              className={`${isMobile ? 'fixed inset-0 z-50' : 'w-full lg:w-1/2 xl:w-2/5'} border-r border-gray-200 dark:border-gray-700`}
              initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isMobile ? 0 : -20 }}
              transition={{ duration: 0.3 }}
            >
              {isMobile && (
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleBackToEmails}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      aria-label="Back to emails"
                    >
                      ←
                    </button>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {selectedEmail.subject}
                    </h2>
                  </div>
                </div>
              )}
              
              <EmailDetail
                email={selectedEmail}
                onClose={isMobile ? handleCloseEmailDetail : undefined}
              />
            </motion.div>
          )}

          {/* Property Details - Right Panel */}
          <div className={`${showEmailDetail ? 'hidden xl:block' : ''} flex-1 transition-all duration-300`}>
            <PropertyDetails propertyId={activePropertyId} />
          </div>
        </div>
      </div>

      {/* Mobile Email Detail Overlay */}
      {showEmailDetail && selectedEmail && isMobile && (
        <motion.div
          className="fixed inset-0 bg-white dark:bg-gray-800 z-50 lg:hidden"
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-full">
            <EmailDetail
              email={selectedEmail}
              onClose={handleCloseEmailDetail}
            />
          </div>
        </motion.div>
      )}

      {/* Mobile Navigation Hint */}
      {isMobile && !showEmailDetail && (
        <motion.div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-2 rounded-full shadow-lg z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm">Select an email to view details</p>
        </motion.div>
      )}
    </div>
  )
}
