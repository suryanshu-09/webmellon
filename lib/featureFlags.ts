/**
 * Feature flags for gradual rollout and A/B testing
 * These can be controlled via environment variables or database settings
 */

export interface FeatureFlags {
  /** Enable/disable pagination features globally */
  PAGINATION_ENABLED: boolean;
  /** Enable infinite scroll for feeds */
  INFINITE_SCROLL: boolean;
  /** Enable virtual scrolling for dashboard */
  VIRTUAL_SCROLL: boolean;
  /** Enable server-side pagination for catalogues */
  SERVER_SIDE_PAGINATION: boolean;
}

/**
 * Default feature flags based on environment variables
 * Can be overridden by user preferences or A/B testing
 */
export const FEATURE_FLAGS: FeatureFlags = {
  PAGINATION_ENABLED:
    process.env.NEXT_PUBLIC_PAGINATION_ENABLED !== "false", // Enabled by default
  INFINITE_SCROLL:
    process.env.NEXT_PUBLIC_INFINITE_SCROLL === "true", // Disabled by default
  VIRTUAL_SCROLL:
    process.env.NEXT_PUBLIC_VIRTUAL_SCROLL === "true", // Disabled by default
  SERVER_SIDE_PAGINATION:
    process.env.NEXT_PUBLIC_SERVER_SIDE_PAGINATION !== "false", // Enabled by default
};

/**
 * Check if a feature is enabled
 * @param featureName - Name of the feature to check
 * @returns true if the feature is enabled
 */
export function isFeatureEnabled(
  featureName: keyof FeatureFlags
): boolean {
  return FEATURE_FLAGS[featureName];
}

/**
 * Get all feature flags
 * @returns Object containing all feature flags
 */
export function getAllFeatureFlags(): FeatureFlags {
  return { ...FEATURE_FLAGS };
}

/**
 * Migration helper - fallback to old behavior if pagination is disabled
 * @param paginatedComponent - Component with pagination
 * @param fallbackComponent - Original component without pagination
 * @returns The appropriate component based on feature flag
 */
export function withPaginationFlag<T>(
  paginatedComponent: T,
  fallbackComponent: T
): T {
  return FEATURE_FLAGS.PAGINATION_ENABLED
    ? paginatedComponent
    : fallbackComponent;
}
