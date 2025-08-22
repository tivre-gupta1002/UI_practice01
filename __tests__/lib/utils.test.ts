import { formatCurrency, formatDate, formatRelativeTime, truncateText } from '@/lib/utils'

describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('formats positive numbers correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
      expect(formatCurrency(1000000)).toBe('$1,000,000.00')
      expect(formatCurrency(0)).toBe('$0.00')
    })

    it('formats negative numbers correctly', () => {
      expect(formatCurrency(-1234.56)).toBe('-$1,234.56')
    })
  })

  describe('formatDate', () => {
    it('formats date strings correctly', () => {
      const date = new Date('2023-12-25')
      expect(formatDate(date)).toBe('12/25/2023')
    })

    it('formats date strings correctly', () => {
      expect(formatDate('2023-12-25')).toBe('12/25/2023')
    })
  })

  describe('formatRelativeTime', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new Date('2023-12-25T12:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('formats recent times correctly', () => {
      const oneHourAgo = new Date('2023-12-25T11:00:00Z')
      expect(formatRelativeTime(oneHourAgo)).toBe('1 hour ago')

      const twoHoursAgo = new Date('2023-12-25T10:00:00Z')
      expect(formatRelativeTime(twoHoursAgo)).toBe('2 hours ago')
    })

    it('formats days ago correctly', () => {
      const oneDayAgo = new Date('2023-12-24T12:00:00Z')
      expect(formatRelativeTime(oneDayAgo)).toBe('1 day ago')

      const twoDaysAgo = new Date('2023-12-23T12:00:00Z')
      expect(formatRelativeTime(twoDaysAgo)).toBe('2 days ago')
    })

    it('handles just now', () => {
      const now = new Date('2023-12-25T12:00:00Z')
      expect(formatRelativeTime(now)).toBe('Just now')
    })
  })

  describe('truncateText', () => {
    it('truncates long text', () => {
      const longText = 'This is a very long text that should be truncated'
      expect(truncateText(longText, 20)).toBe('This is a very long...')
    })

    it('does not truncate short text', () => {
      const shortText = 'Short text'
      expect(truncateText(shortText, 20)).toBe('Short text')
    })

    it('handles exact length', () => {
      const text = 'Exactly twenty chars'
      expect(truncateText(text, 20)).toBe('Exactly twenty chars')
    })
  })
})
