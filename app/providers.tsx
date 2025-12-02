"use client";

import React, { useMemo, useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider as JotaiProvider, createStore, useStore } from "jotai";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import { userAtom } from "@/store/atoms/userAtom";
import { everythingAtom } from "@/store/atoms/everythingAtom";
import {
  fetchEverything,
  fetchNewsFeed,
  fetchWPFeed,
  fetchYTFeed,
} from "@/actions/fetch";
import { getYTFeed, getWPFeed, getNewsFeed } from "@/actions/feed";
import { CatalogueWithWebsites } from "@/types/types";
import {
  ytRssAtom,
  wpRssAtom,
  newsRssAtom,
  ytFeedDataAtom,
  wpFeedDataAtom,
  newsFeedDataAtom,
} from "@/store/atoms/feedAtom";
import { YtRSS, NewsRSS, WpRSS } from "@/prisma/zod";
import { queryKeys } from "@/hooks/use-feeds";

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

// Query client singleton - created once outside component
const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * Component to sync React Query data with Jotai atoms
 * This bridges the gap between React Query (primary data layer) and Jotai (UI state)
 */
function DataSynchronizer({ session }: { session: Session | null }) {
  const store = useStore();
  const userId = session?.user?.id;
  const userInfo = userId ? { id: userId } : null;

  // Fetch catalogues with React Query
  const { data: catalogues } = useQuery({
    queryKey: queryKeys.catalogues,
    queryFn: () => fetchEverything(userInfo!),
    enabled: !!userInfo,
  });

  // Fetch RSS subscriptions with React Query
  const { data: ytRss } = useQuery({
    queryKey: queryKeys.ytRss,
    queryFn: () => fetchYTFeed(userInfo!),
    enabled: !!userInfo,
  });

  const { data: wpRss } = useQuery({
    queryKey: queryKeys.wpRss,
    queryFn: () => fetchWPFeed(userInfo!),
    enabled: !!userInfo,
  });

  const { data: newsRss } = useQuery({
    queryKey: queryKeys.newsRss,
    queryFn: () => fetchNewsFeed(userInfo!),
    enabled: !!userInfo,
  });

  // Fetch actual feed content based on RSS subscriptions
  const { data: ytFeed } = useQuery({
    queryKey: queryKeys.ytFeed,
    queryFn: () => getYTFeed(ytRss!),
    enabled: !!ytRss && ytRss.length > 0,
  });

  const { data: wpFeed } = useQuery({
    queryKey: queryKeys.wpFeed,
    queryFn: () => getWPFeed(wpRss!),
    enabled: !!wpRss && wpRss.length > 0,
  });

  const { data: newsFeed } = useQuery({
    queryKey: queryKeys.newsFeed,
    queryFn: () => getNewsFeed(newsRss!),
    enabled: !!newsRss && newsRss.length > 0,
  });

  // Sync catalogues to Jotai
  useEffect(() => {
    if (catalogues) {
      store.set(everythingAtom, catalogues as CatalogueWithWebsites[]);
    }
  }, [catalogues, store]);

  // Sync RSS subscriptions to Jotai
  useEffect(() => {
    if (ytRss) store.set(ytRssAtom, ytRss as YtRSS[]);
  }, [ytRss, store]);

  useEffect(() => {
    if (wpRss) store.set(wpRssAtom, wpRss as WpRSS[]);
  }, [wpRss, store]);

  useEffect(() => {
    if (newsRss) store.set(newsRssAtom, newsRss as NewsRSS[]);
  }, [newsRss, store]);

  // Sync parsed feed data to Jotai
  useEffect(() => {
    if (ytFeed) {
      store.set(ytFeedDataAtom, ytFeed);
    }
  }, [ytFeed, store]);

  useEffect(() => {
    if (wpFeed) {
      store.set(wpFeedDataAtom, wpFeed);
    }
  }, [wpFeed, store]);

  useEffect(() => {
    if (newsFeed) {
      store.set(newsFeedDataAtom, newsFeed);
    }
  }, [newsFeed, store]);

  return null;
}

/**
 * Simplified provider component
 * - Uses React Query as the primary data fetching layer
 * - Keeps Jotai for UI state only (pagination, selections, search filters)
 * - Removes sessionStorage hydration in favor of React Query cache
 */
export const Providers = ({ children, session }: ProvidersProps) => {
  // Create React Query client with stable reference
  const [queryClient] = useState(createQueryClient);

  // Create Jotai store with user session
  const store = useMemo(() => {
    const s = createStore();
    if (session?.user) {
      s.set(userAtom, session.user);
    }
    return s;
  }, [session]);

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider store={store}>
        <SessionProvider session={session}>
          <DataSynchronizer session={session} />
          {children}
        </SessionProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
};
