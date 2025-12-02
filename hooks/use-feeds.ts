"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  fetchEverything,
  fetchYTFeed,
  fetchWPFeed,
  fetchNewsFeed,
} from "@/actions/fetch";
import { getYTFeed, getWPFeed, getNewsFeed } from "@/actions/feed";
import { CatalogueWithWebsites } from "@/types/types";
import { NewsRSS, WpRSS, YtRSS } from "@/prisma/zod";

// Query keys for React Query
export const queryKeys = {
  catalogues: ["catalogues"] as const,
  ytRss: ["yt-rss"] as const,
  wpRss: ["wp-rss"] as const,
  newsRss: ["news-rss"] as const,
  ytFeed: ["yt-feed"] as const,
  wpFeed: ["wp-feed"] as const,
  newsFeed: ["news-feed"] as const,
  paginatedCatalogues: (params: Record<string, unknown>) => ["catalogues", "paginated", params] as const,
};

/**
 * Hook to fetch all catalogues with websites
 * This replaces the everythingAtom pattern
 */
export function useCatalogues() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: queryKeys.catalogues,
    queryFn: async () => {
      if (!userId) return [] as CatalogueWithWebsites[];
      const userInfo = { id: userId };
      return fetchEverything(userInfo) as Promise<CatalogueWithWebsites[]>;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch YouTube RSS subscriptions from database
 */
export function useYTRss() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: queryKeys.ytRss,
    queryFn: async () => {
      if (!userId) return [] as YtRSS[];
      const userInfo = { id: userId };
      return fetchYTFeed(userInfo) as Promise<YtRSS[]>;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to fetch WordPress RSS subscriptions from database
 */
export function useWPRss() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: queryKeys.wpRss,
    queryFn: async () => {
      if (!userId) return [] as WpRSS[];
      const userInfo = { id: userId };
      return fetchWPFeed(userInfo) as Promise<WpRSS[]>;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to fetch News RSS subscriptions from database
 */
export function useNewsRss() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: queryKeys.newsRss,
    queryFn: async () => {
      if (!userId) return [] as NewsRSS[];
      const userInfo = { id: userId };
      return fetchNewsFeed(userInfo) as Promise<NewsRSS[]>;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to fetch YouTube feed content from RSS subscriptions
 * Depends on ytRss query
 */
export function useYTFeed() {
  const { data: ytRss, isLoading: isRssLoading } = useYTRss();

  return useQuery({
    queryKey: queryKeys.ytFeed,
    queryFn: async () => {
      if (!ytRss || ytRss.length === 0) return [];
      return getYTFeed(ytRss);
    },
    enabled: !!ytRss && ytRss.length > 0 && !isRssLoading,
    staleTime: 5 * 60 * 1000, // 5 minutes - RSS feeds don't update that often
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
}

/**
 * Hook to fetch WordPress feed content from RSS subscriptions
 * Depends on wpRss query
 */
export function useWPFeed() {
  const { data: wpRss, isLoading: isRssLoading } = useWPRss();

  return useQuery({
    queryKey: queryKeys.wpFeed,
    queryFn: async () => {
      if (!wpRss || wpRss.length === 0) return [];
      return getWPFeed(wpRss);
    },
    enabled: !!wpRss && wpRss.length > 0 && !isRssLoading,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
}

/**
 * Hook to fetch News feed content from RSS subscriptions
 * Depends on newsRss query
 */
export function useNewsFeed() {
  const { data: newsRss, isLoading: isRssLoading } = useNewsRss();

  return useQuery({
    queryKey: queryKeys.newsFeed,
    queryFn: async () => {
      if (!newsRss || newsRss.length === 0) return [];
      return getNewsFeed(newsRss);
    },
    enabled: !!newsRss && newsRss.length > 0 && !isRssLoading,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
}

/**
 * Hook to invalidate feed caches after mutations
 */
export function useInvalidateFeeds() {
  const queryClient = useQueryClient();

  return {
    invalidateCatalogues: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.catalogues });
    },
    invalidateYTFeed: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ytRss });
      queryClient.invalidateQueries({ queryKey: queryKeys.ytFeed });
    },
    invalidateWPFeed: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wpRss });
      queryClient.invalidateQueries({ queryKey: queryKeys.wpFeed });
    },
    invalidateNewsFeed: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.newsRss });
      queryClient.invalidateQueries({ queryKey: queryKeys.newsFeed });
    },
    invalidateAll: () => {
      queryClient.invalidateQueries();
    },
  };
}
