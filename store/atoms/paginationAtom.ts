import { atom } from "jotai";

/**
 * Base pagination state interface
 * Used across all feed types (News, WordPress, YouTube)
 */
export interface PaginationState {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Number of items to display per page */
  itemsPerPage: number;
  /** Total number of items across all pages */
  totalItems: number;
}

/**
 * News Feed Pagination State
 * Manages pagination for RSS news feeds
 * @default { currentPage: 1, itemsPerPage: 10, totalItems: 0 }
 */
export const newsFeedPaginationAtom = atom<PaginationState>({
  currentPage: 1,
  itemsPerPage: 5,
  totalItems: 0,
});

/**
 * Derived atom for calculating total pages in news feed
 * Automatically updates when itemsPerPage or totalItems changes
 * @returns Total number of pages (0 if no items)
 */
export const newsFeedTotalPagesAtom = atom((get) => {
  const { totalItems, itemsPerPage } = get(newsFeedPaginationAtom);
  return Math.ceil(totalItems / itemsPerPage);
});

/**
 * WordPress Feed Pagination State
 * Manages pagination for WordPress RSS feeds
 * @default { currentPage: 1, itemsPerPage: 10, totalItems: 0 }
 */
export const wpFeedPaginationAtom = atom<PaginationState>({
  currentPage: 1,
  itemsPerPage: 5,
  totalItems: 0,
});

/**
 * Derived atom for calculating total pages in WordPress feed
 * @returns Total number of pages (0 if no items)
 */
export const wpFeedTotalPagesAtom = atom((get) => {
  const { totalItems, itemsPerPage } = get(wpFeedPaginationAtom);
  return Math.ceil(totalItems / itemsPerPage);
});

/**
 * YouTube Feed Pagination State
 * Uses fewer items per page (6) since video embeds are heavier
 * @default { currentPage: 1, itemsPerPage: 6, totalItems: 0 }
 */
export const ytFeedPaginationAtom = atom<PaginationState>({
  currentPage: 1,
  itemsPerPage: 3,
  totalItems: 0,
});

/**
 * Derived atom for calculating total pages in YouTube feed
 * @returns Total number of pages (0 if no items)
 */
export const ytFeedTotalPagesAtom = atom((get) => {
  const { totalItems, itemsPerPage } = get(ytFeedPaginationAtom);
  return Math.ceil(totalItems / itemsPerPage);
});

/**
 * Extended pagination state for catalogues
 * Includes sorting and searching capabilities for dashboard
 */
export interface CataloguePaginationState {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Number of catalogues to display per page */
  itemsPerPage: number;
  /** Total number of catalogues across all pages */
  totalItems: number;
  /** Total number of pages (calculated by server) */
  totalPages: number;
  /** Field to sort catalogues by */
  sortBy: "name" | "createdAt" | "updatedAt";
  /** Sort direction */
  sortOrder: "asc" | "desc";
  /** Search query to filter catalogues by name */
  searchQuery: string;
}

/**
 * Catalogue Pagination State (for dashboard)
 * Manages server-side pagination with sorting and search
 * @default { currentPage: 1, itemsPerPage: 10, sortBy: "name", sortOrder: "asc" }
 */
export const cataloguePaginationAtom = atom<CataloguePaginationState>({
  currentPage: 1,
  itemsPerPage: 5,
  totalItems: 0,
  totalPages: 0,
  sortBy: "name",
  sortOrder: "asc",
  searchQuery: "",
});

/**
 * Derived atom for accessing total pages in catalogue pagination
 * @returns Total number of pages from server response
 */
export const catalogueTotalPagesAtom = atom((get) => {
  const { totalPages } = get(cataloguePaginationAtom);
  return totalPages;
});

/**
 * Helper atom to reset pagination state to defaults
 * Useful when switching feed sources or clearing filters
 * 
 * @example
 * ```typescript
 * const reset = useSetAtom(resetPaginationAtom);
 * reset("news"); // Reset news feed pagination
 * ```
 * 
 * @param feedType - Type of feed to reset ("news" | "wp" | "yt" | "catalogue")
 */
export const resetPaginationAtom = atom(
  null,
  (
    _get,
    set,
    feedType: "news" | "wp" | "yt" | "catalogue"
  ) => {
    switch (feedType) {
      case "news":
        set(newsFeedPaginationAtom, { currentPage: 1, itemsPerPage: 5, totalItems: 0 });
        break;
      case "wp":
        set(wpFeedPaginationAtom, { currentPage: 1, itemsPerPage: 5, totalItems: 0 });
        break;
      case "yt":
        set(ytFeedPaginationAtom, { currentPage: 1, itemsPerPage: 3, totalItems: 0 });
        break;
      case "catalogue":
        set(cataloguePaginationAtom, {
          currentPage: 1,
          itemsPerPage: 5,
          totalItems: 0,
          totalPages: 0,
          sortBy: "name",
          sortOrder: "asc",
          searchQuery: "",
        });
        break;
    }
  }
);
