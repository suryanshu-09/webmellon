import { getNewsFeed, getWPFeed, getYTFeed } from "@/actions/feed";
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { NewsRSS, WpRSS, YtRSS } from "@/prisma/zod";
import { NEWSFeed, WordpressFeed, YoutubeFeed } from "@/types/types";

export const getYT = atom<YtRSS[] | null>(null);
export const ytFeedAtom = atom(async (get) => {
  const ytFeed = get(getYT);
  if (!ytFeed) return [];
  return await getYTFeed(ytFeed as YtRSS[]);
});
export const hydratedYTFeedAtom = atom<YoutubeFeed[] | null>(null);

export const ytFeedHydratedOrFetchAtom = atom(async (get) => {
  const storedData = sessionStorage.getItem("ytfeed");
  if (storedData && storedData.length > 2) {
    const feed = JSON.parse(storedData);
    return feed;
  }
  const hydrated = get(hydratedYTFeedAtom);
  if (hydrated) return hydrated;

  const ytf = await get(ytFeedAtom);
  sessionStorage.setItem("ytfeed", JSON.stringify(ytf));
  return ytf;
});
export const ytFeedAtomLoadable = loadable(ytFeedHydratedOrFetchAtom);

export const getYTTitles = atom(async (get) => {
  const ytTitles = await get(ytFeedAtom);
  const titles = ytTitles.map(({ title }) => title);
  return titles;
});

export const getNews = atom<NewsRSS[] | null>(null);
export const newsFeedAtom = atom(async (get) => {
  const newsFeed = get(getNews);
  if (!newsFeed) return [];
  return await getNewsFeed(newsFeed as NewsRSS[]);
});
export const hydratedNewsFeedAtom = atom<NEWSFeed[] | null>(null);
export const newsFeedHydratedOrFetchAtom = atom(async (get) => {
  const storedData = sessionStorage.getItem("newsfeed");
  if (storedData && storedData.length > 2) {
    const feed = JSON.parse(storedData);
    return feed;
  }
  const hydrated = get(hydratedNewsFeedAtom);
  if (hydrated) return hydrated;

  const nf = await get(newsFeedAtom);
  sessionStorage.setItem("newsfeed", JSON.stringify(nf));
  return nf;
});
export const newsFeedAtomLoadable = loadable(newsFeedHydratedOrFetchAtom);

export const getNewsTitles = atom(async (get) => {
  const newsTitles = await get(newsFeedAtom);
  const titles = newsTitles.map(({ title }) => title);
  return titles;
});

export const getWP = atom<WpRSS[] | null>(null);
export const wpFeedAtom = atom(async (get) => {
  const wpFeed = get(getWP);
  if (!wpFeed) return [];
  return await getWPFeed(wpFeed as WpRSS[]);
});
export const hydratedWPFeedAtom = atom<WordpressFeed[] | null>(null);
export const wpFeedHydratedOrFetchAtom = atom(async (get) => {
  const storedData = sessionStorage.getItem("wpfeed");
  if (storedData && storedData.length > 2) {
    const feed = JSON.parse(storedData);
    return feed;
  }
  const hydrated = get(hydratedWPFeedAtom);
  if (hydrated) return hydrated;
  const wpf = await get(wpFeedAtom);
  sessionStorage.setItem("wpfeed", JSON.stringify(wpf));
  return wpf;
});

export const wpFeedAtomLoadable = loadable(wpFeedHydratedOrFetchAtom);

export const getWPTitles = atom(async (get) => {
  const wpTitles = await get(wpFeedAtom);
  const titles = wpTitles.map(({ title }) => title);
  return titles;
});
