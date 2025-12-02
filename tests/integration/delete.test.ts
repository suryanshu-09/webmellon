import { describe, it, expect, vi, beforeEach } from 'vitest'
import { prisma } from '@/lib/db'
import {
  deleteUser,
  deleteCatalogue,
  deleteWebsite,
  deleteYT,
  deleteWP,
  deleteNews,
  batchDeleteCatalogues,
  batchDeleteWebsites,
  batchDeleteYT,
  batchDeleteWP,
  batchDeleteNews,
  softDeleteCatalogue,
  restoreCatalogue,
  softDeleteWebsite,
  restoreWebsite,
  purgeDeletedCatalogues,
} from '@/actions/delete'

// Mock the prisma module
vi.mock('@/lib/db', () => ({
  prisma: {
    user: {
      delete: vi.fn(),
    },
    catalogue: {
      delete: vi.fn(),
      deleteMany: vi.fn(),
      update: vi.fn(),
    },
    website: {
      delete: vi.fn(),
      deleteMany: vi.fn(),
      update: vi.fn(),
    },
    ytRSS: {
      delete: vi.fn(),
      deleteMany: vi.fn(),
    },
    wpRSS: {
      delete: vi.fn(),
      deleteMany: vi.fn(),
    },
    newsRSS: {
      delete: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}))

describe('Server Actions - DELETE', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('deleteUser', () => {
    it('should delete a user with valid input', async () => {
      const mockUser = { id: 'user123', name: 'Test User', email: 'test@test.com' }
      vi.mocked(prisma.user.delete).mockResolvedValue(mockUser as any)

      const result = await deleteUser({ id: 'user123', name: 'Test User' })

      expect(result).toEqual({ message: 'User: Test User successfully deleted' })
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: 'user123' },
      })
    })

    it('should throw error for missing user ID', async () => {
      await expect(
        deleteUser({ id: '', name: 'Test' })
      ).rejects.toThrow('Invalid input: User ID is required')
    })
  })

  describe('deleteCatalogue', () => {
    it('should delete a catalogue with valid input', async () => {
      const mockCatalogue = { id: 1, name: 'Test Cat', userId: 'user123' }
      vi.mocked(prisma.catalogue.delete).mockResolvedValue(mockCatalogue as any)

      const result = await deleteCatalogue({ id: 1, name: 'Test Cat' })

      expect(result).toEqual({ message: 'Catalogue: Test Cat successfully deleted' })
      expect(prisma.catalogue.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      })
    })

    it('should throw error for invalid catalogue ID', async () => {
      await expect(
        deleteCatalogue({ id: -1, name: 'Test' })
      ).rejects.toThrow('Invalid input: Catalogue ID must be a positive integer')
    })

    it('should throw error for non-integer catalogue ID', async () => {
      await expect(
        deleteCatalogue({ id: 1.5, name: 'Test' })
      ).rejects.toThrow('Invalid input')
    })
  })

  describe('deleteWebsite', () => {
    it('should delete a website with valid input', async () => {
      const mockWebsite = { id: 1, name: 'Test Site', url: 'https://test.com' }
      vi.mocked(prisma.website.delete).mockResolvedValue(mockWebsite as any)

      const result = await deleteWebsite({ id: 1, name: 'Test Site' })

      expect(result).toEqual({ message: 'Website: Test Site successfully deleted' })
    })

    it('should throw error for invalid website ID', async () => {
      await expect(
        deleteWebsite({ id: 0, name: 'Test' })
      ).rejects.toThrow('Invalid input: Website ID must be a positive integer')
    })
  })

  describe('deleteYT', () => {
    it('should delete a YouTube feed with valid input', async () => {
      const mockYT = { id: 1, channelId: 'UC123', userId: 'user123' }
      vi.mocked(prisma.ytRSS.delete).mockResolvedValue(mockYT)

      const result = await deleteYT({ channelId: 'UC123', userId: 'user123' })

      expect(result).toEqual({ message: 'Youtube Channel: UC123 successfully deleted' })
      expect(prisma.ytRSS.delete).toHaveBeenCalledWith({
        where: {
          user_ytrss_channelId_unique: { userId: 'user123', channelId: 'UC123' },
        },
      })
    })

    it('should throw error for missing channelId', async () => {
      await expect(
        deleteYT({ channelId: '', userId: 'user123' })
      ).rejects.toThrow('Invalid input: Channel ID is required')
    })
  })

  describe('deleteWP', () => {
    it('should delete a WordPress feed with valid input', async () => {
      const mockWP = { id: 1, url: 'https://blog.com/feed', userId: 'user123', image: 1 }
      vi.mocked(prisma.wpRSS.delete).mockResolvedValue(mockWP)

      const result = await deleteWP({ url: 'https://blog.com/feed', userId: 'user123' })

      expect(result).toEqual({ message: 'WordPress: https://blog.com/feed successfully deleted' })
    })

    it('should throw error for invalid URL', async () => {
      await expect(
        deleteWP({ url: 'invalid-url', userId: 'user123' })
      ).rejects.toThrow('Invalid input: Invalid URL format')
    })
  })

  describe('deleteNews', () => {
    it('should delete a News feed with valid input', async () => {
      const mockNews = { id: 1, url: 'https://news.com/rss', userId: 'user123' }
      vi.mocked(prisma.newsRSS.delete).mockResolvedValue(mockNews)

      const result = await deleteNews({ url: 'https://news.com/rss', userId: 'user123' })

      expect(result).toEqual({ message: 'News: https://news.com/rss successfully deleted' })
    })
  })

  // Batch Delete Tests
  describe('batchDeleteCatalogues', () => {
    it('should delete multiple catalogues', async () => {
      vi.mocked(prisma.catalogue.deleteMany).mockResolvedValue({ count: 3 })

      const result = await batchDeleteCatalogues({
        ids: [1, 2, 3],
        userId: 'user123',
      })

      expect(result).toEqual({
        count: 3,
        message: 'Successfully deleted 3 catalogue(s)',
      })
      expect(prisma.catalogue.deleteMany).toHaveBeenCalledWith({
        where: {
          id: { in: [1, 2, 3] },
          userId: 'user123',
        },
      })
    })

    it('should return empty result for empty ids array', async () => {
      const result = await batchDeleteCatalogues({
        ids: [],
        userId: 'user123',
      })

      expect(result).toEqual({
        count: 0,
        message: 'No catalogues to delete',
      })
    })

    it('should throw error when exceeding max batch size', async () => {
      const tooManyIds = Array(101).fill(1).map((_, i) => i + 1)
      await expect(
        batchDeleteCatalogues({
          ids: tooManyIds,
          userId: 'user123',
        })
      ).rejects.toThrow('Invalid input: Cannot delete more than 100 items at once')
    })
  })

  describe('batchDeleteWebsites', () => {
    it('should delete multiple websites', async () => {
      vi.mocked(prisma.website.deleteMany).mockResolvedValue({ count: 2 })

      const result = await batchDeleteWebsites({
        ids: [1, 2],
        userId: 'user123',
      })

      expect(result).toEqual({
        count: 2,
        message: 'Successfully deleted 2 website(s)',
      })
    })
  })

  describe('batchDeleteYT', () => {
    it('should delete multiple YouTube feeds', async () => {
      vi.mocked(prisma.ytRSS.deleteMany).mockResolvedValue({ count: 2 })

      const result = await batchDeleteYT({
        channelIds: ['UC123', 'UC456'],
        userId: 'user123',
      })

      expect(result).toEqual({
        count: 2,
        message: 'Successfully deleted 2 YouTube feed(s)',
      })
    })
  })

  describe('batchDeleteWP', () => {
    it('should delete multiple WordPress feeds', async () => {
      vi.mocked(prisma.wpRSS.deleteMany).mockResolvedValue({ count: 2 })

      const result = await batchDeleteWP({
        urls: ['https://blog1.com/feed', 'https://blog2.com/feed'],
        userId: 'user123',
      })

      expect(result).toEqual({
        count: 2,
        message: 'Successfully deleted 2 WordPress feed(s)',
      })
    })
  })

  describe('batchDeleteNews', () => {
    it('should delete multiple News feeds', async () => {
      vi.mocked(prisma.newsRSS.deleteMany).mockResolvedValue({ count: 2 })

      const result = await batchDeleteNews({
        urls: ['https://news1.com/rss', 'https://news2.com/rss'],
        userId: 'user123',
      })

      expect(result).toEqual({
        count: 2,
        message: 'Successfully deleted 2 News feed(s)',
      })
    })
  })

  // Soft Delete Tests
  describe('softDeleteCatalogue', () => {
    it('should soft delete a catalogue', async () => {
      const mockCatalogue = {
        id: 1,
        name: 'Test Cat',
        userId: 'user123',
        deletedAt: new Date(),
      }
      vi.mocked(prisma.catalogue.update).mockResolvedValue(mockCatalogue as any)

      const result = await softDeleteCatalogue({
        catalogueId: 1,
        userId: 'user123',
      })

      expect(result).toEqual({ message: 'Catalogue: Test Cat successfully archived' })
      expect(prisma.catalogue.update).toHaveBeenCalledWith({
        where: { id: 1, userId: 'user123' },
        data: { deletedAt: expect.any(Date) },
      })
    })

    it('should throw error for invalid catalogueId', async () => {
      await expect(
        softDeleteCatalogue({ catalogueId: -1, userId: 'user123' })
      ).rejects.toThrow('Invalid input: Catalogue ID must be a positive integer')
    })
  })

  describe('restoreCatalogue', () => {
    it('should restore a soft-deleted catalogue', async () => {
      const mockCatalogue = {
        id: 1,
        name: 'Test Cat',
        userId: 'user123',
        deletedAt: null,
      }
      vi.mocked(prisma.catalogue.update).mockResolvedValue(mockCatalogue as any)

      const result = await restoreCatalogue({
        catalogueId: 1,
        userId: 'user123',
      })

      expect(result).toEqual({ message: 'Catalogue: Test Cat successfully restored' })
      expect(prisma.catalogue.update).toHaveBeenCalledWith({
        where: { id: 1, userId: 'user123' },
        data: { deletedAt: null },
      })
    })
  })

  describe('softDeleteWebsite', () => {
    it('should soft delete a website', async () => {
      const mockWebsite = {
        id: 1,
        name: 'Test Site',
        userId: 'user123',
        deletedAt: new Date(),
      }
      vi.mocked(prisma.website.update).mockResolvedValue(mockWebsite as any)

      const result = await softDeleteWebsite({
        websiteId: 1,
        userId: 'user123',
      })

      expect(result).toEqual({ message: 'Website: Test Site successfully archived' })
    })
  })

  describe('restoreWebsite', () => {
    it('should restore a soft-deleted website', async () => {
      const mockWebsite = {
        id: 1,
        name: 'Test Site',
        userId: 'user123',
        deletedAt: null,
      }
      vi.mocked(prisma.website.update).mockResolvedValue(mockWebsite as any)

      const result = await restoreWebsite({
        websiteId: 1,
        userId: 'user123',
      })

      expect(result).toEqual({ message: 'Website: Test Site successfully restored' })
    })
  })

  describe('purgeDeletedCatalogues', () => {
    it('should permanently delete all soft-deleted catalogues', async () => {
      vi.mocked(prisma.catalogue.deleteMany).mockResolvedValue({ count: 5 })

      const result = await purgeDeletedCatalogues('user123')

      expect(result).toEqual({
        count: 5,
        message: 'Permanently deleted 5 archived catalogue(s)',
      })
      expect(prisma.catalogue.deleteMany).toHaveBeenCalledWith({
        where: {
          userId: 'user123',
          deletedAt: { not: null },
        },
      })
    })

    it('should throw error for empty userId', async () => {
      await expect(purgeDeletedCatalogues('')).rejects.toThrow('Invalid input')
    })
  })
})
