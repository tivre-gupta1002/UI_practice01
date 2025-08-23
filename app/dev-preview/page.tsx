'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { EmailList } from '@/components/email/EmailList'
import { EmailDetail } from '@/components/email/EmailDetail'
import { PropertyDetails } from '@/components/property/PropertyDetails'
import { mockEmails } from '@/lib/data'

export default function DevPreview() {
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0])

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />
      <div className="px-[var(--space-24)] py-[var(--space-16)]">
        <div className="grid grid-cols-[var(--sidebar-w)_1fr_var(--panel-w)] gap-[var(--space-24)]">
          <div className="h-[72vh] shadow-sm overflow-hidden rounded-[var(--radius-md)]">
            <EmailList onEmailSelect={(e) => setSelectedEmail(e)} selectedEmailId={selectedEmail?.id} />
          </div>
          <div className="h-[72vh] shadow-sm overflow-hidden rounded-[var(--radius-md)]">
            <EmailDetail email={selectedEmail} />
          </div>
          <div className="h-[72vh] shadow-sm overflow-hidden rounded-[var(--radius-md)]">
            <PropertyDetails propertyId={undefined} />
          </div>
        </div>
      </div>
    </div>
  )
}
