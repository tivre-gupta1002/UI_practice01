'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Paperclip, Download, Star, List, Send, MoreHorizontal, User, Clock, Mail, Reply, Forward, Archive, Trash2, Tag, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Email, Attachment } from '@/types'
import { performAction } from '@/lib/api'

interface EmailDetailProps {
  email: Email | null
  onClose?: () => void
}

export function EmailDetail({ email, onClose }: EmailDetailProps) {
  const [showActions, setShowActions] = useState(false)
  const [isStarred, setIsStarred] = useState(email?.isStarred || false)
  const [isRead, setIsRead] = useState(email?.isRead || false)

  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Select an email to view details</p>
        </div>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const handleAttachmentDownload = async (attachment: Attachment) => {
    await performAction('download_attachment', { attachmentId: attachment.id, fileName: attachment.name })
    console.log('Downloading:', attachment.name)
  }

  const handleEmailAction = async (action: string) => {
    await performAction(action, { emailId: email.id, action })
    
    switch (action) {
      case 'star':
        setIsStarred(!isStarred)
        break
      case 'read':
        setIsRead(!isRead)
        break
    }
  }

  const quickActions = [
    { label: 'Yes', variant: 'primary' as const, action: 'confirm' },
    { label: 'No', variant: 'outline' as const, action: 'deny' },
    { label: 'Please follow up.', variant: 'outline' as const, action: 'follow_up' },
    { label: 'Show more...', variant: 'ghost' as const, action: 'show_more' }
  ]

  const handleQuickAction = async (action: string) => {
    await performAction('quick_action', { emailId: email.id, action })
  }

  // Parse email content for highlighted text (e.g., amounts, dates)
  const parseContent = (content: string) => {
    // Highlight amounts (e.g., $5000)
    const amountRegex = /\$(\d+(?:,\d{3})*(?:\.\d{2})?)/g
    const amountMatches = content.match(amountRegex) || []
    
    // Highlight dates (e.g., tomorrow)
    const dateRegex = /\b(tomorrow|today|yesterday|next week|next month)\b/gi
    const dateMatches = content.match(dateRegex) || []
    
    let parsedContent = content
    
    // Replace amounts with highlighted versions
    amountMatches.forEach(match => {
      parsedContent = parsedContent.replace(
        match,
        `<span class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-1 py-0.5 rounded underline">${match}</span>`
      )
    })
    
    // Replace dates with highlighted versions
    dateMatches.forEach(match => {
      parsedContent = parsedContent.replace(
        new RegExp(match, 'gi'),
        `<span class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-1 py-0.5 rounded underline">${match}</span>`
      )
    })
    
    return parsedContent
  }

  return (
    <motion.div
      className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        {/* Email Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 text-lg font-medium">
                {getInitials(email.sender)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {email.sender}
                  </h2>
                  {email.isEncrypted && (
                    <Badge variant="primary" size="sm">NEW ENCRYPTED</Badge>
                  )}
                  {email.priority === 'high' && (
                    <Badge variant="danger" size="sm">HIGH PRIORITY</Badge>
                  )}
                  {email.isStarred && (
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  To: {email.recipient}
                </p>
                {email.cc && email.cc.length > 0 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    CC: {email.cc.join(', ')}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-500">
                  <Clock className="h-3 w-3" />
                  {email.timestamp}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEmailAction('star')}
                className={`p-2 ${isStarred ? 'text-yellow-500' : 'text-gray-400'}`}
                title={isStarred ? 'Remove star' : 'Star email'}
              >
                <Star className={`h-4 w-4 ${isStarred ? 'fill-current' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEmailAction('read')}
                className="p-2 text-gray-400"
                title={isRead ? 'Mark as unread' : 'Mark as read'}
              >
                {isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowActions(!showActions)}
                className="p-2"
                title="More actions"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              
              {onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2"
                  title="Close email detail"
                >
                  ×
                </Button>
              )}
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {email.subject}
          </h3>
        </div>

        {/* Email Content */}
        <div className="mb-6">
          <div className="prose dark:prose-invert max-w-none">
            <div 
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: parseContent(email.content) }}
            />
          </div>
        </div>

        {/* Attachments */}
        {email.attachments && email.attachments.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Attachments ({email.attachments.length})
            </h4>
            <div className="space-y-2">
              {email.attachments.map((attachment) => (
                <motion.div
                  key={attachment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <Paperclip className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {attachment.size} • {attachment.mimeType || attachment.type}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAttachmentDownload(attachment)}
                    className="px-3"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Quick Actions
          </h4>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant={action.variant}
                  size="sm"
                  className="px-4"
                  onClick={() => handleQuickAction(action.action)}
                >
                  {action.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Email Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Send className="h-4 w-4" />}
            onClick={() => handleEmailAction('send')}
          >
            Send
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Send className="h-4 w-4" />}
            onClick={() => handleEmailAction('send_archive')}
          >
            Send & Archive
          </Button>
          
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              title="Reply"
              onClick={() => handleEmailAction('reply')}
            >
              <Reply className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              title="Forward"
              onClick={() => handleEmailAction('forward')}
            >
              <Forward className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              title="Archive"
              onClick={() => handleEmailAction('archive')}
            >
              <Archive className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              title="Categorize"
              onClick={() => handleEmailAction('categorize')}
            >
              <Tag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Context Menu Actions */}
        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-6 top-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-medium p-2 min-w-48 z-10"
            >
              <div className="space-y-1">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  This Email &gt;
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  Full Email Thread &gt;
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  Searches
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  Commitment
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  Payoffs & Invoices
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  Policy
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  Other
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
