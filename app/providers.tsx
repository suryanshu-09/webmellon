"use client";

import React, { useMemo, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider as JotaiProvider, createStore } from "jotai";
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
import { CatalogueWithWebsites } from "@/types/types";
import { getNews, getWP, getYT } from "@/store/atoms/feedAtom";
import { YtRSS, NewsRSS, WpRSS } from "@/prisma/zod";
import { useSavedData } from "@/hooks/save-data";

export const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const store = useMemo(() => {
    const s = createStore();
    if (session?.user) {
      s.set(userAtom, session.user);
    }
    return s;
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user) {
        const everything: CatalogueWithWebsites[] = await fetchEverything(
          session.user as User,
        );
        store.set(everythingAtom, everything);
        sessionStorage.setItem("catalogues", JSON.stringify(everything));

        const wpFeed: WpRSS[] = await fetchWPFeed(session.user as User);
        store.set(getWP, wpFeed);

        const ytFeed: YtRSS[] = await fetchYTFeed(session.user as User);
        store.set(getYT, ytFeed);

        const newsFeed: NewsRSS[] = await fetchNewsFeed(session.user as User);
        store.set(getNews, newsFeed);
      }
    };

    fetchData();
  }, [session, store]);

  useSavedData();
  return (
    <JotaiProvider store={store}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </JotaiProvider>
  );
};
