"use client";

import React, { useMemo, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider as JotaiProvider, createStore } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Session } from "next-auth";
import { userAtom } from "@/store/atoms/userAtom";
import { everythingAtom } from "@/store/atoms/everythingAtom";
import {
  fetchEverything,
  fetchNewsFeed,
  fetchWPFeed,
  fetchYTFeed,
} from "@/actions/fetch";
import { User } from "@/prisma/generated/zod/index";
import {
  CatalogueWithWebsites,
  NEWSFeed,
  WordpressFeed,
  YoutubeFeed,
} from "@/types/types";
import {
  getNews,
  getWP,
  getYT,
  hydratedNewsFeedAtom,
  hydratedWPFeedAtom,
  hydratedYTFeedAtom,
} from "@/store/atoms/feedAtom";
import { YtRSS, NewsRSS, WpRSS } from "@/prisma/zod";
import { useSavedData } from "@/hooks/save-data";

export const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  // Create React Query client with optimal settings for pagination
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }));

  const store = useMemo(() => {
    const s = createStore();
    if (session?.user) {
      s.set(userAtom, session.user);
    }
    return s;
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        const everything: CatalogueWithWebsites[] = await fetchEverything(
          session.user as { id: string; email?: string | null; name?: string | null; image?: string | null },
        );
        store.set(everythingAtom, everything);
        sessionStorage.setItem("catalogues", JSON.stringify(everything));

        const rawWPFeed = sessionStorage.getItem("wpfeed");
        const rawYTFeed = sessionStorage.getItem("ytfeed");
        const rawNewsFeed = sessionStorage.getItem("newsfeed");

        try {
          if (rawWPFeed) {
            const storedWPFeed = JSON.parse(rawWPFeed);

            if (Array.isArray(storedWPFeed) && storedWPFeed.length > 0) {
              store.set(hydratedWPFeedAtom, storedWPFeed as WordpressFeed[]);
            } else {
              throw new Error("Empty or invalid wpfeed");
            }
          } else {
            throw new Error("No wpfeed in sessionStorage");
          }
        } catch {
          const wpFeed: WpRSS[] = await fetchWPFeed(session.user as { id: string; email?: string | null; name?: string | null; image?: string | null });

          store.set(getWP, wpFeed);
        }

        try {
          if (rawYTFeed) {
            const storedYTFeed = JSON.parse(rawYTFeed);

            if (Array.isArray(storedYTFeed) && storedYTFeed.length > 0) {
              store.set(hydratedYTFeedAtom, storedYTFeed as YoutubeFeed[]);
            } else {
              throw new Error("Empty or invalid ytfeed");
            }
          } else {
            throw new Error("No ytfeed in sessionStorage");
          }
        } catch {
          const ytFeed: YtRSS[] = await fetchYTFeed(session.user as { id: string; email?: string | null; name?: string | null; image?: string | null });
          store.set(getYT, ytFeed);
        }
        try {
          if (rawNewsFeed) {
            const storedNewsFeed = JSON.parse(rawNewsFeed);

            if (Array.isArray(storedNewsFeed) && storedNewsFeed.length > 0) {
              store.set(hydratedNewsFeedAtom, storedNewsFeed as NEWSFeed[]);
            } else {
              throw new Error("Empty or invalid newsfeed");
            }
          } else {
            throw new Error("No newsfeed in sessionStorage");
          }
        } catch {
          const newsFeed: NewsRSS[] = await fetchNewsFeed(session.user as { id: string; email?: string | null; name?: string | null; image?: string | null });
          store.set(getNews, newsFeed);
        }
      }
    };

    fetchData();
  }, [session, store]);

  useSavedData();
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider store={store}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
};
