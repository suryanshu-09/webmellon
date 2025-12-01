"use server";

import { prisma } from "@/lib/db";
import { User } from "@/lib/generated/prisma";

// Type for user without preferences (for auth session)
type UserLike = {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
};

export async function fetchEverything(user: UserLike) {
  const everything = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      catalogues: {
        include: {
          websites: true,
        },
      },
      wp: true,
      yt: true,
      news: true,
    },
  });

  if (!everything) {
    throw new Error(`Data not found`);
  }
  return everything.catalogues;
}

export async function fetchAllCatalogues(user: UserLike) {
  const catalogues = await prisma.user.findMany({
    where: {
      id: user.id,
    },
    include: {
      catalogues: true,
    },
  });

  if (!catalogues) {
    throw new Error(`Catalogues not found`);
  }

  return catalogues;
}

export async function fetchCatalogueAll(id: number) {
  const catalogue = await prisma.catalogue.findUnique({
    where: {
      id,
    },
    include: {
      websites: true,
    },
  });

  if (!catalogue) {
    throw new Error(`Catalogue with ID ${id} not found`);
  }

  return catalogue;
}

export async function fetchCatalogue(id: number) {
  const catalogue = await prisma.catalogue.findUnique({
    where: {
      id,
    },
  });

  if (!catalogue) {
    throw new Error(`Catalogue with ID ${id} not found`);
  }

  return catalogue;
}

export async function fetchAllWebsites(user: UserLike) {
  const [websites] = await prisma.user.findMany({
    where: {
      id: user.id,
    },
    include: {
      websites: true,
    },
  });

  if (!websites) {
    throw new Error(`Websites not found`);
  }

  return websites;
}

export async function fetchWebsite(id: number) {
  const website = await prisma.website.findUnique({
    where: {
      id,
    },
  });

  if (!website) {
    throw new Error(`Website with ID ${id} not found`);
  }

  return website;
}

export async function fetchYTFeed(user: UserLike) {
  const ytFeed = await prisma.ytRSS.findMany({
    where: {
      userId: user.id,
    },
  });

  if (!ytFeed) {
    throw new Error(`ytFeed not found`);
  }

  return ytFeed;
}

export async function fetchWPFeed(user: UserLike) {
  const wpFeed = await prisma.wpRSS.findMany({
    where: {
      userId: user.id,
    },
  });

  if (!wpFeed) {
    throw new Error(`wpFeed not found`);
  }

  return wpFeed;
}

export async function fetchNewsFeed(user: UserLike) {
  const newsFeed = await prisma.newsRSS.findMany({
    where: {
      userId: user.id,
    },
  });

  if (!newsFeed) {
    throw new Error(`newsFeed not found`);
  }

  return newsFeed;
}

/**
 * Options for paginating database queries
 */
export interface PaginationOptions {
  /** Page number (1-indexed) */
  page?: number;
  /** Number of items per page */
  limit?: number;
  /** Field to sort by */
  sortBy?: "name" | "createdAt" | "updatedAt";
  /** Sort direction */
  sortOrder?: "asc" | "desc";
  /** Search query for filtering by name (case-insensitive) */
  searchQuery?: string;
}

/**
 * Pagination metadata returned from paginated queries
 */
export interface PaginationInfo {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items across all pages */
  totalItems: number;
  /** Number of items per page */
  itemsPerPage: number;
  /** Whether there is a next page */
  hasNextPage: boolean;
  /** Whether there is a previous page */
  hasPrevPage: boolean;
}

/**
 * Result type for paginated catalogue queries
 */
export interface PaginatedCataloguesResult {
  /** Array of catalogues for the current page */
  catalogues: Awaited<ReturnType<typeof prisma.catalogue.findMany>>;
  /** Pagination metadata */
  pagination: PaginationInfo;
}

/**
 * Fetch catalogues with server-side pagination, sorting, and search
 * 
 * This function implements efficient database pagination using Prisma's skip/take.
 * Each catalogue includes up to 20 websites to prevent over-fetching.
 * 
 * @param user - User object (must have id property)
 * @param options - Pagination options
 * @param options.page - Page number (default: 1)
 * @param options.limit - Items per page (default: 10)
 * @param options.sortBy - Sort field (default: "name")
 * @param options.sortOrder - Sort direction (default: "asc")
 * @param options.searchQuery - Filter catalogues by name (case-insensitive)
 * 
 * @returns Promise resolving to catalogues and pagination metadata
 * 
 * @example
 * ```typescript
 * const result = await fetchCataloguesPaginated(user, {
 *   page: 2,
 *   limit: 20,
 *   sortBy: "createdAt",
 *   sortOrder: "desc",
 *   searchQuery: "work"
 * });
 * console.log(result.catalogues); // Array of catalogues
 * console.log(result.pagination.totalPages); // Total pages
 * ```
 */
export async function fetchCataloguesPaginated(
  user: UserLike,
  options: PaginationOptions = {}
): Promise<PaginatedCataloguesResult> {
  const {
    page = 1,
    limit = 10,
    sortBy = "name",
    sortOrder = "asc",
    searchQuery,
  } = options;
  const skip = (page - 1) * limit;

  const whereClause = {
    userId: user.id,
    ...(searchQuery && {
      name: { contains: searchQuery, mode: "insensitive" as const },
    }),
  };

  const [catalogues, totalCount] = await Promise.all([
    prisma.catalogue.findMany({
      where: whereClause,
      include: {
        websites: {
          take: 20, // Limit websites per catalogue
          orderBy: { name: "asc" },
        },
      },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.catalogue.count({ where: whereClause }),
  ]);

  return {
    catalogues,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalItems: totalCount,
      itemsPerPage: limit,
      hasNextPage: page < Math.ceil(totalCount / limit),
      hasPrevPage: page > 1,
    },
  };
}

/**
 * Fetch websites for a specific catalogue with pagination
 * 
 * Used for "Load More" functionality when expanding a catalogue
 * that has more than 20 websites.
 * 
 * @param catalogueId - ID of the catalogue to fetch websites from
 * @param options - Pagination options
 * @param options.page - Page number (default: 1)
 * @param options.limit - Items per page (default: 20)
 * 
 * @returns Promise resolving to websites and pagination metadata
 * 
 * @example
 * ```typescript
 * const result = await fetchWebsitesPaginated(123, { page: 2, limit: 20 });
 * console.log(result.websites); // Array of websites
 * console.log(result.pagination.hasNextPage); // true if more pages exist
 * ```
 */
export async function fetchWebsitesPaginated(
  catalogueId: number,
  options: { page?: number; limit?: number } = {}
) {
  const { page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;

  const [websites, totalCount] = await Promise.all([
    prisma.website.findMany({
      where: { catalogueId },
      skip,
      take: limit,
      orderBy: { name: "asc" },
    }),
    prisma.website.count({ where: { catalogueId } }),
  ]);

  return {
    websites,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalItems: totalCount,
      itemsPerPage: limit,
      hasNextPage: page < Math.ceil(totalCount / limit),
      hasPrevPage: page > 1,
    },
  };
}
