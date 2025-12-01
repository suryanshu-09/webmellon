import { getNewsFeed, getWPFeed, getYTFeed } from "@/actions/feed";
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { NewsRSS, WpRSS, YtRSS } from "@/prisma/zod";
import { 
  NEWSFeed, 
  NEWSFeedItem,
  WordpressFeed, 
  WordpressFeedItem,
  YoutubeFeed,
  YoutubeFeedItem
} from "@/types/types";
import {
  newsFeedPaginationAtom,
  wpFeedPaginationAtom,
  ytFeedPaginationAtom,
} from "./paginationAtom";

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

// Paginated News Feed
export const paginatedNewsFeedAtom = atom((get) => {
  const fullFeed = get(newsFeedAtomLoadable);
  const pagination = get(newsFeedPaginationAtom);

  if (fullFeed.state !== "hasData") {
    return { data: [], totalItems: 0, state: fullFeed.state };
  }

  // Calculate total items across all publications
  const totalItems = fullFeed.data.reduce(
    (sum: number, pub: NEWSFeed) => sum + pub.items.length,
    0
  );

  // Flatten all items with their publication info
  type NewsItemWithPub = NEWSFeedItem & { publication: string; publicationUrl: string };
  const allItems: NewsItemWithPub[] = fullFeed.data.flatMap((pub: NEWSFeed) =>
    pub.items.map((item) => ({ ...item, publication: pub.title, publicationUrl: pub.url }))
  );

  // Sort by date (most recent first)
  allItems.sort((a: NewsItemWithPub, b: NewsItemWithPub) => 
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  // Paginate
  const startIdx = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIdx = startIdx + pagination.itemsPerPage;
  const paginatedItems = allItems.slice(startIdx, endIdx);

  // Group back by publication
  const groupedByPublication: Record<string, NEWSFeed> = {};
  paginatedItems.forEach((item) => {
    const pubTitle = item.publication;
    if (!groupedByPublication[pubTitle]) {
      groupedByPublication[pubTitle] = {
        title: pubTitle,
        url: item.publicationUrl,
        items: [],
      };
    }
    const { publication, publicationUrl, ...itemWithoutPub } = item;
    groupedByPublication[pubTitle].items.push(itemWithoutPub as NEWSFeedItem);
  });

  return {
    data: Object.values(groupedByPublication),
    totalItems,
    state: "hasData" as const,
  };
});

// Paginated WordPress Feed
export const paginatedWPFeedAtom = atom((get) => {
  const fullFeed = get(wpFeedAtomLoadable);
  const pagination = get(wpFeedPaginationAtom);

  if (fullFeed.state !== "hasData") {
    return { data: [], totalItems: 0, state: fullFeed.state };
  }

  const totalItems = fullFeed.data.reduce(
    (sum: number, pub: WordpressFeed) => sum + pub.items.length,
    0
  );

  type WPItemWithPub = WordpressFeedItem & { publication: string; publicationUrl: string; image: number };
  const allItems: WPItemWithPub[] = fullFeed.data.flatMap((pub: WordpressFeed) =>
    pub.items.map((item) => ({ 
      ...item, 
      publication: pub.title, 
      publicationUrl: pub.url,
      image: pub.image 
    }))
  );

  allItems.sort((a: WPItemWithPub, b: WPItemWithPub) => 
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  const startIdx = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIdx = startIdx + pagination.itemsPerPage;
  const paginatedItems = allItems.slice(startIdx, endIdx);

  const groupedByPublication: Record<string, WordpressFeed> = {};
  paginatedItems.forEach((item) => {
    const pubTitle = item.publication;
    if (!groupedByPublication[pubTitle]) {
      groupedByPublication[pubTitle] = {
        title: pubTitle,
        url: item.publicationUrl,
        items: [],
        image: item.image,
      };
    }
    const { publication, publicationUrl, image, ...itemWithoutPub } = item;
    groupedByPublication[pubTitle].items.push(itemWithoutPub as WordpressFeedItem);
  });

  return {
    data: Object.values(groupedByPublication),
    totalItems,
    state: "hasData" as const,
  };
});

// Paginated YouTube Feed
export const paginatedYTFeedAtom = atom((get) => {
  const fullFeed = get(ytFeedAtomLoadable);
  const pagination = get(ytFeedPaginationAtom);

  if (fullFeed.state !== "hasData") {
    return { data: [], totalItems: 0, state: fullFeed.state };
  }

  const totalItems = fullFeed.data.reduce(
    (sum: number, pub: YoutubeFeed) => sum + pub.items.length,
    0
  );

  type YTItemWithChannel = YoutubeFeedItem & { channelTitle?: string; channelId: string };
  const allItems: YTItemWithChannel[] = fullFeed.data.flatMap((pub: YoutubeFeed) =>
    pub.items.map((item) => ({ 
      ...item, 
      channelTitle: pub.title,
      channelId: pub.channelId 
    }))
  );

  allItems.sort((a: YTItemWithChannel, b: YTItemWithChannel) => 
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  const startIdx = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIdx = startIdx + pagination.itemsPerPage;
  const paginatedItems = allItems.slice(startIdx, endIdx);

  const groupedByChannel: Record<string, YoutubeFeed> = {};
  paginatedItems.forEach((item) => {
    const channelId = item.channelId;
    if (!groupedByChannel[channelId]) {
      groupedByChannel[channelId] = {
        title: item.channelTitle,
        channelId: channelId,
        items: [],
      };
    }
    const { channelTitle, channelId: cId, ...itemWithoutChannel } = item;
    groupedByChannel[channelId].items.push(itemWithoutChannel as YoutubeFeedItem);
  });

  return {
    data: Object.values(groupedByChannel),
    totalItems,
    state: "hasData" as const,
  };
});
