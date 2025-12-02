import { describe, it, expect, vi, beforeEach } from 'vitest'
import { prisma } from '@/lib/db'
import {
  putCatalogue,
  putWebsite,
  putYT,
  putWP,
  putNews,
  batchCreateCatalogues,
  batchCreateWebsites,
  batchCreateYT,
  batchCreateWP,
  batchCreateNews,
} from '@/actions/put'

// Mock the prisma module
vi.mock('@/lib/db', () => ({
  prisma: {
    catalogue: {
      create: vi.fn(),
      createMany: vi.fn(),
    },
    website: {
      create: vi.fn(),
      createMany: vi.fn(),
    },
    ytRSS: {
      create: vi.fn(),
      createMany: vi.fn(),
    },
    wpRSS: {
      create: vi.fn(),
      createMany: vi.fn(),
    },
    newsRSS: {
      create: vi.fn(),
      createMany: vi.fn(),
    },
  },
}))

describe('Server Actions - PUT (Create)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('putCatalogue', () => {
    it('should create a catalogue with valid input', async () => {
      const mockCatalogue = {
        id: 1,
        name: 'Test Catalogue',
        userId: 'user123',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }

      vi.mocked(prisma.catalogue.create).mockResolvedValue(mockCatalogue)

      const result = await putCatalogue({
        name: 'Test Catalogue',
        userId: 'user123',
      })

      expect(result).toEqual(mockCatalogue)
      expect(prisma.catalogue.create).toHaveBeenCalledWith({
        data: {
          name: 'Test Catalogue',
          userId: 'user123',
        },
      })
    })

    it('should throw error for missing name', async () => {
      await expect(
        putCatalogue({
          name: '',
          userId: 'user123',
        })
      ).rejects.toThrow('Invalid input: Name is required')
    })

    it('should throw error for missing userId', async () => {
      await expect(
        putCatalogue({
          name: 'Test',
          userId: '',
        })
      ).rejects.toThrow('Invalid input: User ID is required')
    })

    it('should throw error for name exceeding max length', async () => {
      const longName = 'a'.repeat(101)
      await expect(
        putCatalogue({
          name: longName,
          userId: 'user123',
        })
      ).rejects.toThrow('Invalid input: Name must be 100 characters or less')
    })
  })

  describe('putWebsite', () => {
    it('should create a website with valid input', async () => {
      const mockWebsite = {
        id: 1,
        name: 'Test Website',
        url: 'https://example.com',
        favicon: 'https://www.google.com/s2/favicons?sz=64&domain=example.com',
        userId: 'user123',
        catalogueId: 1,
        deletedAt: null,
      }

      vi.mocked(prisma.website.create).mockResolvedValue(mockWebsite)

      const result = await putWebsite({
        name: 'Test Website',
        url: 'https://example.com',
        userId: 'user123',
        catalogueId: 1,
      })

      expect(result).toEqual(mockWebsite)
      expect(prisma.website.create).toHaveBeenCalledWith({
        data: {
          name: 'Test Website',
          url: 'https://example.com',
          favicon: 'https://www.google.com/s2/favicons?sz=64&domain=example.com',
          userId: 'user123',
          catalogueId: 1,
        },
      })
    })

    it('should throw error for invalid URL format', async () => {
      await expect(
        putWebsite({
          name: 'Test Website',
          url: 'not-a-url',
          userId: 'user123',
          catalogueId: 1,
        })
      ).rejects.toThrow('Invalid input: Invalid URL format')
    })

    it('should throw error for invalid catalogueId', async () => {
      await expect(
        putWebsite({
          name: 'Test Website',
          url: 'https://example.com',
          userId: 'user123',
          catalogueId: -1,
        })
      ).rejects.toThrow('Invalid input: Catalogue ID must be a positive integer')
    })
  })

  describe('putYT', () => {
    it('should create a YouTube RSS feed with valid input', async () => {
      const mockYT = {
        id: 1,
        channelId: 'UC123456789',
        userId: 'user123',
      }

      vi.mocked(prisma.ytRSS.create).mockResolvedValue(mockYT)

      const result = await putYT({
        userId: 'user123',
        channelId: 'UC123456789',
      })

      expect(result).toEqual(mockYT)
      expect(prisma.ytRSS.create).toHaveBeenCalledWith({
        data: {
          channelId: 'UC123456789',
          userId: 'user123',
        },
      })
    })

    it('should throw error for empty channelId', async () => {
      await expect(
        putYT({
          userId: 'user123',
          channelId: '',
        })
      ).rejects.toThrow('Invalid input: Channel ID is required')
    })
  })

  describe('putWP', () => {
    it('should create a WordPress RSS feed with valid input', async () => {
      const mockWP = {
        id: 1,
        url: 'https://example.wordpress.com/feed',
        image: 5,
        userId: 'user123',
      }

      vi.mocked(prisma.wpRSS.create).mockResolvedValue(mockWP)

      const result = await putWP({
        userId: 'user123',
        url: 'https://example.wordpress.com/feed',
        image: 5,
      })

      expect(result).toEqual(mockWP)
      expect(prisma.wpRSS.create).toHaveBeenCalledWith({
        data: {
          url: 'https://example.wordpress.com/feed',
          image: 5,
          userId: 'user123',
        },
      })
    })

    it('should throw error for invalid image value', async () => {
      await expect(
        putWP({
          userId: 'user123',
          url: 'https://example.com/feed',
          image: 11,
        })
      ).rejects.toThrow('Invalid input: Image must be between 0 and 10')
    })
  })

  describe('putNews', () => {
    it('should create a News RSS feed with valid input', async () => {
      const mockNews = {
        id: 1,
        url: 'https://news.example.com/rss',
        userId: 'user123',
      }

      vi.mocked(prisma.newsRSS.create).mockResolvedValue(mockNews)

      const result = await putNews({
        userId: 'user123',
        url: 'https://news.example.com/rss',
      })

      expect(result).toEqual(mockNews)
      expect(prisma.newsRSS.create).toHaveBeenCalledWith({
        data: {
          url: 'https://news.example.com/rss',
          userId: 'user123',
        },
      })
    })

    it('should throw error for invalid URL', async () => {
      await expect(
        putNews({
          userId: 'user123',
          url: 'invalid-url',
        })
      ).rejects.toThrow('Invalid input: Invalid URL format')
    })
  })

  // Batch Create Tests
  describe('batchCreateCatalogues', () => {
    it('should create multiple catalogues', async () => {
      vi.mocked(prisma.catalogue.createMany).mockResolvedValue({ count: 3 })

      const result = await batchCreateCatalogues({
        names: ['Cat1', 'Cat2', 'Cat3'],
        userId: 'user123',
      })

      expect(result).toEqual({
        count: 3,
        message: 'Successfully created 3 catalogue(s)',
      })
    })

    it('should return empty result for empty names array', async () => {
      const result = await batchCreateCatalogues({
        names: [],
        userId: 'user123',
      })

      expect(result).toEqual({
        count: 0,
        message: 'No catalogues to create',
      })
    })

    it('should throw error when exceeding max batch size', async () => {
      const tooManyNames = Array(51).fill('Catalogue')
      await expect(
        batchCreateCatalogues({
          names: tooManyNames,
          userId: 'user123',
        })
      ).rejects.toThrow('Invalid input: Cannot create more than 50 catalogues at once')
    })
  })

  describe('batchCreateWebsites', () => {
    it('should create multiple websites', async () => {
      vi.mocked(prisma.website.createMany).mockResolvedValue({ count: 2 })

      const result = await batchCreateWebsites({
        websites: [
          { name: 'Site1', url: 'https://site1.com', catalogueId: 1 },
          { name: 'Site2', url: 'https://site2.com', catalogueId: 1 },
        ],
        userId: 'user123',
      })

      expect(result).toEqual({
        count: 2,
        message: 'Successfully created 2 website(s)',
      })
    })

    it('should return empty result for empty websites array', async () => {
      const result = await batchCreateWebsites({
        websites: [],
        userId: 'user123',
      })

      expect(result).toEqual({
        count: 0,
        message: 'No websites to create',
      })
    })
  })

  describe('batchCreateYT', () => {
    it('should create multiple YouTube feeds', async () => {
      vi.mocked(prisma.ytRSS.createMany).mockResolvedValue({ count: 2 })

      const result = await batchCreateYT({
        channelIds: ['UC123', 'UC456'],
        userId: 'user123',
      })

      expect(result).toEqual({
        count: 2,
        message: 'Successfully created 2 YouTube feed(s)',
      })
    })
  })

  describe('batchCreateWP', () => {
    it('should create multiple WordPress feeds', async () => {
      vi.mocked(prisma.wpRSS.createMany).mockResolvedValue({ count: 2 })

      const result = await batchCreateWP({
        feeds: [
          { url: 'https://blog1.com/feed', image: 1 },
          { url: 'https://blog2.com/feed', image: 2 },
        ],
        userId: 'user123',
      })

      expect(result).toEqual({
        count: 2,
        message: 'Successfully created 2 WordPress feed(s)',
      })
    })
  })

  describe('batchCreateNews', () => {
    it('should create multiple News feeds', async () => {
      vi.mocked(prisma.newsRSS.createMany).mockResolvedValue({ count: 2 })

      const result = await batchCreateNews({
        urls: ['https://news1.com/feed', 'https://news2.com/feed'],
        userId: 'user123',
      })

      expect(result).toEqual({
        count: 2,
        message: 'Successfully created 2 News feed(s)',
      })
    })
  })
})
