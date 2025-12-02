"use client";

/**
 * @deprecated This hook is deprecated and no longer needed.
 * 
 * With the Phase 3 state management refactoring, data persistence is now
 * handled by React Query's built-in cache. React Query provides:
 * 
 * - Automatic cache invalidation and refetching
 * - Configurable stale time and garbage collection
 * - Background refetching on window focus (configurable)
 * 
 * This file is kept for backwards compatibility during the migration period.
 * Components that were using useSavedData() should simply remove the call.
 * 
 * The old implementation:
 * - Read from sessionStorage on mount
 * - Wrote to sessionStorage on data changes
 * 
 * This is no longer necessary because:
 * 1. React Query caches data in memory
 * 2. The DataSynchronizer component in providers.tsx syncs React Query data to Jotai atoms
 * 3. Jotai atoms are used for UI state only (pagination, selections, filters)
 */
export function useSavedData() {
  // No-op: React Query now handles data caching
  // This function is kept for backwards compatibility
}
