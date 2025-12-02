import { describe, it, expect, vi, beforeEach } from 'vitest'
import { prisma } from '@/lib/db'
import {
  updateUser,
  updateCatalogue,
  updateWebsite,
} from '@/actions/update'

// Mock the prisma module
vi.mock('@/lib/db', () => ({
  prisma: {
    user: {
      update: vi.fn(),
    },
    catalogue: {
      update: vi.fn(),
    },
    website: {
      update: vi.fn(),
    },
  },
}))

describe('Server Actions - UPDATE', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('updateUser', () => {
    it('should update a user with valid input', async () => {
      const mockUser = {
        id: 'user123',
        email: 'updated@test.com',
        name: 'Updated Name',
        image: 'https://example.com/avatar.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: null,
        emailVerified: null,
      }

      vi.mocked(prisma.user.update).mockResolvedValue(mockUser)

      const result = await updateUser({
        id: 'user123',
        email: 'updated@test.com',
        name: 'Updated Name',
        image: 'https://example.com/avatar.jpg',
      })

      expect(result).toEqual(mockUser)
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user123' },
        data: {
          email: 'updated@test.com',
          name: 'Updated Name',
          image: 'https://example.com/avatar.jpg',
        },
      })
    })

    it('should throw error for invalid email', async () => {
      await expect(
        updateUser({
          id: 'user123',
          email: 'invalid-email',
          name: 'Test',
        })
      ).rejects.toThrow('Invalid input: Invalid email format')
    })

    it('should throw error for missing user ID', async () => {
      await expect(
        updateUser({
          id: '',
          email: 'test@test.com',
          name: 'Test',
        })
      ).rejects.toThrow('Invalid input: User ID is required')
    })

    it('should throw error for invalid image URL', async () => {
      await expect(
        updateUser({
          id: 'user123',
          email: 'test@test.com',
          name: 'Test',
          image: 'not-a-url',
        })
      ).rejects.toThrow('Invalid input: Invalid image URL')
    })

    it('should allow null name and image', async () => {
      const mockUser = {
        id: 'user123',
        email: 'test@test.com',
        name: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: null,
        emailVerified: null,
      }

      vi.mocked(prisma.user.update).mockResolvedValue(mockUser)

      const result = await updateUser({
        id: 'user123',
        email: 'test@test.com',
        name: null,
        image: null,
      })

      expect(result).toEqual(mockUser)
    })
  })

  describe('updateCatalogue', () => {
    it('should update a catalogue with valid input', async () => {
      const mockCatalogue = {
        id: 1,
        name: 'Updated Catalogue',
        userId: 'user123',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }

      vi.mocked(prisma.catalogue.update).mockResolvedValue(mockCatalogue)

      const result = await updateCatalogue({
        id: 1,
        name: 'Updated Catalogue',
      })

      expect(result).toEqual(mockCatalogue)
      expect(prisma.catalogue.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: 'Updated Catalogue' },
      })
    })

    it('should throw error for empty name', async () => {
      await expect(
        updateCatalogue({
          id: 1,
          name: '',
        })
      ).rejects.toThrow('Invalid input: Name is required')
    })

    it('should throw error for name exceeding max length', async () => {
      const longName = 'a'.repeat(101)
      await expect(
        updateCatalogue({
          id: 1,
          name: longName,
        })
      ).rejects.toThrow('Invalid input: Name must be 100 characters or less')
    })

    it('should throw error for invalid catalogue ID', async () => {
      await expect(
        updateCatalogue({
          id: -1,
          name: 'Test',
        })
      ).rejects.toThrow('Invalid input: Catalogue ID must be a positive integer')
    })
  })

  describe('updateWebsite', () => {
    it('should update a website with valid input', async () => {
      const mockWebsite = {
        id: 1,
        name: 'Updated Website',
        url: 'https://updated.com',
        favicon: 'https://updated.com/favicon.ico',
        userId: 'user123',
        catalogueId: 1,
        deletedAt: null,
      }

      vi.mocked(prisma.website.update).mockResolvedValue(mockWebsite)

      const result = await updateWebsite({
        id: 1,
        name: 'Updated Website',
        url: 'https://updated.com',
        favicon: 'https://updated.com/favicon.ico',
      })

      expect(result).toEqual(mockWebsite)
      expect(prisma.website.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          name: 'Updated Website',
          url: 'https://updated.com',
          favicon: 'https://updated.com/favicon.ico',
        },
      })
    })

    it('should throw error for invalid URL', async () => {
      await expect(
        updateWebsite({
          id: 1,
          name: 'Test',
          url: 'not-a-url',
          favicon: 'https://example.com/favicon.ico',
        })
      ).rejects.toThrow('Invalid input: Invalid URL format')
    })

    it('should throw error for invalid favicon URL', async () => {
      await expect(
        updateWebsite({
          id: 1,
          name: 'Test',
          url: 'https://example.com',
          favicon: 'not-a-url',
        })
      ).rejects.toThrow('Invalid input: Invalid favicon URL')
    })

    it('should throw error for empty name', async () => {
      await expect(
        updateWebsite({
          id: 1,
          name: '',
          url: 'https://example.com',
          favicon: 'https://example.com/favicon.ico',
        })
      ).rejects.toThrow('Invalid input: Name is required')
    })
  })
})
