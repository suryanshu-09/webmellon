/**
 * Simple in-memory rate limiter for API routes.
 * Uses a sliding window algorithm to track request counts.
 * 
 * For production with multiple instances, consider using:
 * - @upstash/ratelimit with Redis for distributed rate limiting
 * - Database-backed rate limiting
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically (every 5 minutes)
let cleanupInterval: NodeJS.Timeout | null = null;

function startCleanup() {
  if (cleanupInterval) return;
  cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  limit: number;
  /** Time window in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  /** Whether the request is allowed */
  success: boolean;
  /** Number of requests remaining in the current window */
  remaining: number;
  /** Unix timestamp when the rate limit resets */
  reset: number;
  /** Total limit for the window */
  limit: number;
}

/**
 * Check if a request should be rate limited.
 * @param identifier - Unique identifier for the client (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns Rate limit result with success status and headers info
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  startCleanup();
  
  const now = Date.now();
  const key = identifier;
  const entry = rateLimitStore.get(key);

  // If no entry or expired, create new window
  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.windowMs;
    rateLimitStore.set(key, { count: 1, resetTime });
    return {
      success: true,
      remaining: config.limit - 1,
      reset: resetTime,
      limit: config.limit,
    };
  }

  // Increment count
  entry.count++;

  // Check if over limit
  if (entry.count > config.limit) {
    return {
      success: false,
      remaining: 0,
      reset: entry.resetTime,
      limit: config.limit,
    };
  }

  return {
    success: true,
    remaining: config.limit - entry.count,
    reset: entry.resetTime,
    limit: config.limit,
  };
}

/**
 * Get rate limit headers for HTTP response.
 * @param result - Rate limit result from rateLimit()
 * @returns Headers object with standard rate limit headers
 */
export function getRateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": Math.ceil(result.reset / 1000).toString(),
  };
}

/**
 * Create rate limit response for rejected requests.
 * @param result - Rate limit result from rateLimit()
 * @returns Standard 429 response with retry info
 */
export function createRateLimitResponse(result: RateLimitResult): Response {
  const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);
  return new Response(
    JSON.stringify({
      error: "Too Many Requests",
      message: "Rate limit exceeded. Please try again later.",
      retryAfter,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": retryAfter.toString(),
        ...getRateLimitHeaders(result),
      },
    }
  );
}

// Default configurations for different use cases
export const RATE_LIMIT_CONFIGS = {
  /** Standard API rate limit: 100 requests per minute */
  api: { limit: 100, windowMs: 60 * 1000 },
  /** Strict limit for sensitive operations: 10 requests per minute */
  strict: { limit: 10, windowMs: 60 * 1000 },
  /** Relaxed limit for read operations: 200 requests per minute */
  relaxed: { limit: 200, windowMs: 60 * 1000 },
} as const;
