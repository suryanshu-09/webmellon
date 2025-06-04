import { getNewsFeed, getWPFeed, getYTFeed } from "@/actions/feed";
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { NewsRSS, WpRSS, YtRSS } from "@/prisma/zod";
import { NEWSFeed, WordpressFeed, YoutubeFeed } from "@/types/types";

export const getYT = atom<YtRSS[] | null>(null);
export const ytFeedAtom = atom(async (get) => {
  const ytFeed = get(getYT);
  if (!ytFeed) return [];
  const ytf = await getYTFeed(ytFeed as YtRSS[]);
  sessionStorage.setItem("ytfeed", JSON.stringify(ytf));
  return ytf;
});
export const hydratedYTFeedAtom = atom<YoutubeFeed[] | null>(null);

export const ytFeedHydratedOrFetchAtom = atom(async (get) => {
  const hydrated = get(hydratedYTFeedAtom);
  if (hydrated) return hydrated;

  return await get(ytFeedAtom);
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
  const nf = await getNewsFeed(newsFeed as NewsRSS[]);
  if (nf) {
    sessionStorage.setItem("newsfeed", JSON.stringify(nf));
  }
  return nf;
});
export const hydratedNewsFeedAtom = atom<NEWSFeed[] | null>(null);
export const newsFeedHydratedOrFetchAtom = atom(async (get) => {
  const hydrated = get(hydratedNewsFeedAtom);
  if (hydrated) return hydrated;
  return await get(newsFeedAtom);
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
  const wpf = await getWPFeed(wpFeed as WpRSS[]);
  sessionStorage.setItem("wpfeed", JSON.stringify(wpf));
  return wpf;
});
export const hydratedWPFeedAtom = atom<WordpressFeed[] | null>(null);
export const wpFeedHydratedOrFetchAtom = atom(async (get) => {
  const hydrated = get(hydratedWPFeedAtom);
  if (hydrated) return hydrated;
  return await get(wpFeedAtom);
});

export const wpFeedAtomLoadable = loadable(wpFeedHydratedOrFetchAtom);

export const getWPTitles = atom(async (get) => {
  const wpTitles = await get(wpFeedAtom);
  const titles = wpTitles.map(({ title }) => title);
  return titles;
});
