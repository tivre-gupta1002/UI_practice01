'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Mail, Star, List, Paperclip, Eye, EyeOff, MoreHorizontal, Reply, Forward, Archive, Trash2, Tag, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { mockEmails, mockFilters } from '@/lib/data'
import { Email, EmailFilter } from '@/types'
import { getEmails, performAction } from '@/lib/api'

interface EmailListProps {
  onEmailSelect?: (email: Email) => void
  selectedEmailId?: string
}

export function EmailList({ onEmailSelect, selectedEmailId }: EmailListProps) {
  const [emails, setEmails] = useState<Email[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<EmailFilter>({
    hasAttachments: false,
    calendarItems: false,
    timeRange: 'Past Year',
    contacts: []
  })
  const [showFilters, setShowFilters] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All Emails')
  const [showContextMenu, setShowContextMenu] = useState<string | null>(null)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    loadEmails()
  }, [filters])

  const loadEmails = async () => {
    try {
      const emailData = await getEmails(filters)
      setEmails(emailData)
    } catch (error) {
      console.error('Failed to load emails:', error)
      setEmails(mockEmails) // Fallback to mock data
    }
  }

  const filteredEmails = emails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAttachments = !filters.hasAttachments || email.hasAttachments
    const matchesCategory = activeCategory === 'All Emails' || 
                           (activeCategory === 'High Priority' && email.priority === 'high') ||
                           (activeCategory === 'With Attachments' && email.hasAttachments)
    
    return matchesSearch && matchesAttachments && matchesCategory
  })

  const handleEmailClick = (email: Email) => {
    onEmailSelect?.(email)
  }

  const toggleFilter = (filterKey: keyof EmailFilter) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }))
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const handleContextMenu = (e: React.MouseEvent, emailId: string) => {
    e.preventDefault()
    setContextMenuPosition({ x: e.clientX, y: e.clientY })
    setShowContextMenu(emailId)
  }

  const closeContextMenu = () => {
    setShowContextMenu(null)
  }

  const handleEmailAction = async (action: string, email: Email) => {
    closeContextMenu()
    await performAction(action, { emailId: email.id, action })
    
    // Update local state based on action
    switch (action) {
      case 'star':
        setEmails(prev => prev.map(e => 
          e.id === email.id ? { ...e, isStarred: !e.isStarred } : e
        ))
        break
      case 'read':
        setEmails(prev => prev.map(e => 
          e.id === email.id ? { ...e, isRead: !e.isRead } : e
        ))
        break
      case 'archive':
        setEmails(prev => prev.filter(e => e.id !== email.id))
        break
      case 'delete':
        setEmails(prev => prev.filter(e => e.id !== email.id))
        break
    }
  }

  const handleQuickAction = async (action: string, email: Email) => {
    await performAction(action, { emailId: email.id, action })
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {mockFilters.emailCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.label)}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                  flex items-center gap-2
                  ${activeCategory === category.label
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                  }
                `}
              >
                {category.icon && <span>{category.icon}</span>}
                {category.label}
                {category.count && (
                  <span className="ml-2 text-xs opacity-75">{category.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Search email"
            leftIcon={<Search className="h-4 w-4" />}
            variant="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="px-3"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <Button size="sm" className="px-3">
            <Mail className="h-4 w-4 mr-1" />
            New Email
          </Button>
        </div>

        {/* Filter Options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 pt-2"
            >
              <div className="flex items-center gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.hasAttachments}
                    onChange={() => toggleFilter('hasAttachments')}
                    className="rounded"
                  />
                  Has attachments
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.calendarItems}
                    onChange={() => toggleFilter('calendarItems')}
                    className="rounded"
                  />
                  Calendar items
                </label>
                <select
                  value={filters.timeRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value }))}
                  className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700"
                >
                  <option>Past Year</option>
                  <option>Past Month</option>
                  <option>Past Week</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {filteredEmails.map((email, index) => (
            <motion.div
              key={email.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              <div
                onClick={() => handleEmailClick(email)}
                onContextMenu={(e) => handleContextMenu(e, email.id)}
                className={`
                  p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors
                  hover:bg-gray-50 dark:hover:bg-gray-700
                  ${selectedEmailId === email.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''}
                `}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 text-sm font-medium flex-shrink-0">
                    {getInitials(email.sender)}
                  </div>

                  {/* Email Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white truncate">
                        {email.sender}
                      </span>
                      {email.isEncrypted && (
                        <Badge variant="primary" size="sm">NEW ENCRYPTED</Badge>
                      )}
                      {email.priority === 'high' && (
                        <Badge variant="danger" size="sm">HIGH</Badge>
                      )}
                      {email.isStarred && (
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      )}
                      {email.hasAttachments && (
                        <Paperclip className="h-3 w-3 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">
                      {email.subject}
                    </div>
                    
                    <div className="text-xs text-gray-500 dark:text-gray-500 mb-2 line-clamp-2">
                      {email.content}
                    </div>

                    {/* Email Actions */}
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEmailAction('star', email)
                        }}
                        title={email.isStarred ? 'Remove star' : 'Star email'}
                      >
                        <Star className={`h-3 w-3 ${email.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                      </button>
                      <button 
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEmailAction('read', email)
                        }}
                        title={email.isRead ? 'Mark as unread' : 'Mark as read'}
                      >
                        {email.isRead ? <EyeOff className="h-3 w-3 text-gray-400" /> : <Eye className="h-3 w-3 text-gray-400" />}
                      </button>
                      <button 
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowContextMenu(email.id)
                        }}
                        title="More actions"
                      >
                        <MoreHorizontal className="h-3 w-3 text-gray-400" />
                      </button>
                      <span className="text-xs text-gray-400 ml-auto">
                        {email.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Actions for Selected Email */}
              {selectedEmailId === email.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
                >
                  <div className="p-3 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction('reply', email)}
                      className="text-xs px-2 py-1"
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction('forward', email)}
                      className="text-xs px-2 py-1"
                    >
                      <Forward className="h-3 w-3 mr-1" />
                      Forward
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction('archive', email)}
                      className="text-xs px-2 py-1"
                    >
                      <Archive className="h-3 w-3 mr-1" />
                      Archive
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction('categorize', email)}
                      className="text-xs px-2 py-1"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      Categorize
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {showContextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-1 min-w-48"
            style={{
              left: contextMenuPosition.x,
              top: contextMenuPosition.y
            }}
          >
            <div className="space-y-1">
              <button 
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2"
                onClick={() => handleEmailAction('reply', emails.find(e => e.id === showContextMenu)!)}
              >
                <Reply className="h-4 w-4" />
                Reply
              </button>
              <button 
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2"
                onClick={() => handleEmailAction('forward', emails.find(e => e.id === showContextMenu)!)}
              >
                <Forward className="h-4 w-4" />
                Forward
              </button>
              <button 
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2"
                onClick={() => handleEmailAction('archive', emails.find(e => e.id === showContextMenu)!)}
              >
                <Archive className="h-4 w-4" />
                Archive
              </button>
              <button 
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2"
                onClick={() => handleEmailAction('categorize', emails.find(e => e.id === showContextMenu)!)}
              >
                <Tag className="h-4 w-4" />
                Categorize
              </button>
              <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
              <button 
                className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded flex items-center gap-2"
                onClick={() => handleEmailAction('delete', emails.find(e => e.id === showContextMenu)!)}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close context menu */}
      {showContextMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeContextMenu}
        />
      )}
    </div>
  )
}
