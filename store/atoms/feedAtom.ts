import { getNewsFeed, getWPFeed, getYTFeed } from "@/actions/feed";
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { NewsRSS, WpRSS, YtRSS } from "@/prisma/zod";

export const getYT = atom<YtRSS[] | null>(null);
export const ytFeedAtom = atom(async (get) => {
  const ytFeed = get(getYT);
  if (!ytFeed) return [];
  return getYTFeed(ytFeed as YtRSS[]);
});
export const ytFeedAtomLoadable = loadable(ytFeedAtom);

export const getYTTitles = atom(async (get) => {
  const ytTitles = await get(ytFeedAtom);
  const titles = ytTitles.map(({ title }) => title);
  return titles;
});

export const getNews = atom<NewsRSS[] | null>(null);
export const newsFeedAtom = atom(async (get) => {
  const newsFeed = get(getNews);
  if (!newsFeed) return [];
  return getNewsFeed(newsFeed as NewsRSS[]);
});
export const newsFeedAtomLoadable = loadable(newsFeedAtom);

export const getNewsTitles = atom(async (get) => {
  const newsTitles = await get(newsFeedAtom);
  const titles = newsTitles.map(({ title }) => title);
  return titles;
});

export const getWP = atom<WpRSS[] | null>(null);
export const wpFeedAtom = atom(async (get) => {
  const wpFeed = get(getWP);
  if (!wpFeed) return [];
  return getWPFeed(wpFeed as WpRSS[]);
});

export const wpFeedAtomLoadable = loadable(wpFeedAtom);

export const getWPTitles = atom(async (get) => {
  const wpTitles = await get(wpFeedAtom);
  const titles = wpTitles.map(({ title }) => title);
  return titles;
});
