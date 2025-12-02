/**
 * In-memory cache for RSS feeds to avoid hitting external APIs on every request.
 * Cache entries expire after 5 minutes.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const feedCache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Get cached feed data or fetch fresh data if cache is expired/missing.
 * @param key - Unique cache key for the feed
 * @param fetcher - Async function to fetch fresh data
 * @returns Cached or freshly fetched data
 */
export async function getCachedFeed<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = feedCache.get(key) as CacheEntry<T> | undefined;
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await fetcher();
  feedCache.set(key, { data, timestamp: Date.now() });
  return data;
}

/**
 * Clear all cached feed data.
 * Useful for testing or when user explicitly refreshes.
 */
export function clearFeedCache(): void {
  feedCache.clear();
}

/**
 * Remove a specific entry from the cache.
 * @param key - Cache key to invalidate
 */
export function invalidateFeedCache(key: string): void {
  feedCache.delete(key);
}

/**
 * Get current cache size for monitoring.
 */
export function getCacheSize(): number {
  return feedCache.size;
}
