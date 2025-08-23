'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Sun, Moon, Monitor, Highlighter, Users, RefreshCw, Maximize2, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useTheme } from '@/components/providers/ThemeProvider'
import { mockTabs } from '@/lib/data'
import { Tab } from '@/types'
import { performAction } from '@/lib/api'

interface HeaderProps {
  onTabChange?: (tabId: string) => void
}

export function Header({ onTabChange }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [tabs, setTabs] = useState<Tab[]>(mockTabs)
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || '')

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  const addNewTab = async () => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      label: 'New Property',
      isActive: false,
      type: 'property',
      icon: '🏠',
      badge: 'New',
      isClosable: true,
      order: tabs.length + 1,
      lastAccessed: new Date().toISOString()
    }
    setTabs([...tabs, newTab])
    await performAction('create_tab', newTab)
  }

  const closeTab = async (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (tabs.length > 1) {
      const updatedTabs = tabs.filter(tab => tab.id !== tabId)
      setTabs(updatedTabs)
      
      // If closing active tab, switch to first available tab
      if (tabId === activeTab && updatedTabs.length > 0) {
        setActiveTab(updatedTabs[0].id)
        onTabChange?.(updatedTabs[0].id)
      }
      
      await performAction('close_tab', { tabId })
    }
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const handleHighlight = async () => {
    await performAction('highlight', { propertyId: activeTab })
  }

  const handleAudit = async () => {
    await performAction('audit', { propertyId: activeTab })
  }

  const handleRefresh = async () => {
    await performAction('refresh', { propertyId: activeTab })
  }

  const handleFullScreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else {
      await document.documentElement.requestFullscreen()
    }
    await performAction('toggle_fullscreen', { isFullscreen: !document.fullscreenElement })
  }

  return (
    <motion.header
      className="w-full h-[var(--nav-height)] bg-[var(--color-bg)] border-b border-[var(--color-border)] px-[var(--space-24)] flex flex-col justify-center shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between w-full gap-[var(--space-24)]">
        {/* Title and Search */}
        <div className="flex items-center gap-[var(--space-24)] min-w-0 flex-1">
          <motion.h1
            className="text-[var(--fs-20)] font-bold text-[var(--text)] tracking-tight select-none"
            whileHover={{ scale: 1.02 }}
            style={{ lineHeight: 'var(--lh-tight)' }}
          >
            entitled
          </motion.h1>
          <div className="flex-1 max-w-[420px]">
            <Input
              placeholder="Search property or person"
              leftIcon={<Search className="h-4 w-4 text-[var(--color-muted-500)]" />}
              variant="search"
              className="h-9 px-[var(--space-12)] text-[var(--fs-14)] border border-[var(--color-border)] rounded-[var(--radius-sm)] focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center gap-[var(--space-8)]">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHighlight}
            aria-label="Highlight property"
            className="p-2 hover:bg-[rgba(219,184,131,0.12)] hover:text-[var(--color-warn)] focus:ring-2 focus:ring-[var(--color-warn)]"
            title="Highlight property"
          >
            <Highlighter className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAudit}
            aria-label="Audit property"
            className="p-2 hover:bg-[rgba(56,124,232,0.12)] hover:text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
            title="Audit property"
          >
            <Users className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            aria-label="Refresh data"
            className="p-2 hover:bg-[rgba(26,187,123,0.12)] hover:text-[var(--color-success)] focus:ring-2 focus:ring-[var(--color-success)]"
            title="Refresh data"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFullScreen}
            aria-label="Toggle full screen"
            className="p-2 hover:bg-[rgba(99,136,214,0.12)] hover:text-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]"
            title="Toggle full screen"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2"
            title={`Current theme: ${theme}`}
          >
            {getThemeIcon()}
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex items-center gap-[var(--space-8)] mt-[var(--space-16)] overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            className="relative group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.button
              onClick={() => handleTabClick(tab.id)}
              className={`
                relative px-[var(--space-16)] py-[var(--space-8)] rounded-[var(--radius-md)] text-[var(--fs-14)] font-medium transition-all duration-200
                flex items-center gap-[var(--space-8)] pr-8
                ${tab.id === activeTab
                  ? 'text-[var(--color-primary)] bg-[rgba(56,124,232,0.08)] shadow-sm border-b-2 border-[var(--color-primary)]'
                  : 'text-[var(--color-muted-600)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-2)]'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={tab.id === activeTab ? { borderBottomWidth: 2 } : {}}
            >
              {tab.icon && <span className="text-base">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && (
                <Badge 
                  variant="secondary" 
                  size="sm" 
                  className="ml-1 text-xs"
                >
                  {tab.badge}
                </Badge>
              )}
            </motion.button>
            {/* Close Button */}
            {tab.isClosable && (
              <motion.button
                onClick={(e) => closeTab(tab.id, e)}
                className={`
                  absolute right-1 top-1/2 -translate-y-1/2
                  w-5 h-5 rounded-full flex items-center justify-center
                  text-[var(--color-muted-500)] hover:text-[var(--color-primary)]
                  hover:bg-[var(--color-surface-2)]
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  ${tab.id === activeTab ? 'opacity-100' : ''}
                `}
                aria-label={`Close ${tab.label} tab`}
                title={`Close ${tab.label} tab`}
              >
                <X className="h-3 w-3" />
              </motion.button>
            )}
          </motion.div>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={addNewTab}
          className="p-2 min-w-0 hover:bg-[rgba(26,187,123,0.12)] hover:text-[var(--color-success)]"
          aria-label="Add new tab"
          title="Add new property tab"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </motion.header>
  )
}
