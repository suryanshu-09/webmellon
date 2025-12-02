import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from '@/app/api/catalogues/route'

// Mock the auth and fetch functions
vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/actions/fetch', () => ({
  fetchCataloguesPaginated: vi.fn(),
}))

// Import after mocking
import { auth } from '@/lib/auth'
import { fetchCataloguesPaginated } from '@/actions/fetch'

describe('API Routes - /api/catalogues', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/catalogues', () => {
    it('should return 401 if not authenticated', async () => {
      vi.mocked(auth).mockResolvedValue(null as any)

      const request = new Request('http://localhost:3000/api/catalogues')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data).toEqual({ error: 'Unauthorized' })
    })

    it('should return catalogues with default pagination', async () => {
      const mockSession = {
        user: { id: 'user123', email: 'test@test.com' },
        expires: '2099-01-01',
      }
      const mockResult = {
        catalogues: [
          { id: 1, name: 'Catalogue 1', userId: 'user123' },
          { id: 2, name: 'Catalogue 2', userId: 'user123' },
        ],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 2,
          itemsPerPage: 10,
          hasNextPage: false,
          hasPrevPage: false,
        },
      }

      vi.mocked(auth).mockResolvedValue(mockSession as any)
      vi.mocked(fetchCataloguesPaginated).mockResolvedValue(mockResult as any)

      const request = new Request('http://localhost:3000/api/catalogues')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockResult)
      expect(fetchCataloguesPaginated).toHaveBeenCalledWith(mockSession.user, {
        page: 1,
        limit: 10,
        sortBy: 'name',
        sortOrder: 'asc',
        searchQuery: undefined,
      })
    })

    it('should respect pagination parameters', async () => {
      const mockSession = {
        user: { id: 'user123', email: 'test@test.com' },
        expires: '2099-01-01',
      }
      const mockResult = {
        catalogues: [{ id: 3, name: 'Catalogue 3', userId: 'user123' }],
        pagination: {
          currentPage: 2,
          totalPages: 3,
          totalItems: 25,
          itemsPerPage: 10,
          hasNextPage: true,
          hasPrevPage: true,
        },
      }

      vi.mocked(auth).mockResolvedValue(mockSession as any)
      vi.mocked(fetchCataloguesPaginated).mockResolvedValue(mockResult as any)

      const request = new Request('http://localhost:3000/api/catalogues?page=2&limit=10')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockResult)
      expect(fetchCataloguesPaginated).toHaveBeenCalledWith(mockSession.user, {
        page: 2,
        limit: 10,
        sortBy: 'name',
        sortOrder: 'asc',
        searchQuery: undefined,
      })
    })

    it('should support sorting parameters', async () => {
      const mockSession = {
        user: { id: 'user123', email: 'test@test.com' },
        expires: '2099-01-01',
      }
      const mockResult = {
        catalogues: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: 10,
          hasNextPage: false,
          hasPrevPage: false,
        },
      }

      vi.mocked(auth).mockResolvedValue(mockSession as any)
      vi.mocked(fetchCataloguesPaginated).mockResolvedValue(mockResult as any)

      const request = new Request(
        'http://localhost:3000/api/catalogues?sortBy=createdAt&sortOrder=desc'
      )
      const response = await GET(request)

      expect(response.status).toBe(200)
      expect(fetchCataloguesPaginated).toHaveBeenCalledWith(mockSession.user, {
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
        searchQuery: undefined,
      })
    })

    it('should support search parameter', async () => {
      const mockSession = {
        user: { id: 'user123', email: 'test@test.com' },
        expires: '2099-01-01',
      }
      const mockResult = {
        catalogues: [{ id: 1, name: 'Work Links', userId: 'user123' }],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 1,
          itemsPerPage: 10,
          hasNextPage: false,
          hasPrevPage: false,
        },
      }

      vi.mocked(auth).mockResolvedValue(mockSession as any)
      vi.mocked(fetchCataloguesPaginated).mockResolvedValue(mockResult as any)

      const request = new Request('http://localhost:3000/api/catalogues?search=work')
      const response = await GET(request)

      expect(response.status).toBe(200)
      expect(fetchCataloguesPaginated).toHaveBeenCalledWith(mockSession.user, {
        page: 1,
        limit: 10,
        sortBy: 'name',
        sortOrder: 'asc',
        searchQuery: 'work',
      })
    })

    it('should return 400 for invalid page parameter', async () => {
      const mockSession = {
        user: { id: 'user123', email: 'test@test.com' },
        expires: '2099-01-01',
      }

      vi.mocked(auth).mockResolvedValue(mockSession as any)

      const request = new Request('http://localhost:3000/api/catalogues?page=0')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toEqual({ error: 'Invalid pagination parameters' })
    })

    it('should return 400 for limit exceeding maximum', async () => {
      const mockSession = {
        user: { id: 'user123', email: 'test@test.com' },
        expires: '2099-01-01',
      }

      vi.mocked(auth).mockResolvedValue(mockSession as any)

      const request = new Request('http://localhost:3000/api/catalogues?limit=101')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toEqual({ error: 'Invalid pagination parameters' })
    })

    it('should return 400 for invalid sortBy parameter', async () => {
      const mockSession = {
        user: { id: 'user123', email: 'test@test.com' },
        expires: '2099-01-01',
      }

      vi.mocked(auth).mockResolvedValue(mockSession as any)

      const request = new Request('http://localhost:3000/api/catalogues?sortBy=invalid')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toEqual({ error: 'Invalid sortBy parameter' })
    })

    it('should return 400 for invalid sortOrder parameter', async () => {
      const mockSession = {
        user: { id: 'user123', email: 'test@test.com' },
        expires: '2099-01-01',
      }

      vi.mocked(auth).mockResolvedValue(mockSession as any)

      const request = new Request('http://localhost:3000/api/catalogues?sortOrder=invalid')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toEqual({ error: 'Invalid sortOrder parameter' })
    })

    it('should return 500 on internal error', async () => {
      const mockSession = {
        user: { id: 'user123', email: 'test@test.com' },
        expires: '2099-01-01',
      }

      vi.mocked(auth).mockResolvedValue(mockSession as any)
      vi.mocked(fetchCataloguesPaginated).mockRejectedValue(new Error('Database error'))

      const request = new Request('http://localhost:3000/api/catalogues')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toEqual({ error: 'Failed to fetch catalogues' })
    })

    it('should include cache headers in response', async () => {
      const mockSession = {
        user: { id: 'user123', email: 'test@test.com' },
        expires: '2099-01-01',
      }
      const mockResult = {
        catalogues: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: 10,
          hasNextPage: false,
          hasPrevPage: false,
        },
      }

      vi.mocked(auth).mockResolvedValue(mockSession as any)
      vi.mocked(fetchCataloguesPaginated).mockResolvedValue(mockResult as any)

      const request = new Request('http://localhost:3000/api/catalogues')
      const response = await GET(request)

      expect(response.status).toBe(200)
      expect(response.headers.get('Cache-Control')).toBe(
        'private, s-maxage=60, stale-while-revalidate=300'
      )
    })
  })
})
