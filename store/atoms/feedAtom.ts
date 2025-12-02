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

// ============================================================================
// RSS Subscription Atoms (Database Records)
// These store the user's RSS subscriptions fetched from the database
// ============================================================================

/** YouTube RSS subscriptions from database */
export const ytRssAtom = atom<YtRSS[] | null>(null);
/** WordPress RSS subscriptions from database */
export const wpRssAtom = atom<WpRSS[] | null>(null);
/** News RSS subscriptions from database */
export const newsRssAtom = atom<NewsRSS[] | null>(null);

// Legacy exports for backwards compatibility
export const getYT = ytRssAtom;
export const getWP = wpRssAtom;
export const getNews = newsRssAtom;

// ============================================================================
// Parsed Feed Data Atoms
// These store the actual parsed feed content
// Note: Using flexible types as RSS parser returns loosely typed data
// ============================================================================

/** Parsed YouTube feed data - using any[] to accommodate RSS parser output */
export const ytFeedDataAtom = atom<YoutubeFeed[] | any[] | null>(null);
/** Parsed WordPress feed data - using any[] to accommodate RSS parser output */
export const wpFeedDataAtom = atom<WordpressFeed[] | any[] | null>(null);
/** Parsed News feed data - using any[] to accommodate RSS parser output */
export const newsFeedDataAtom = atom<NEWSFeed[] | any[] | null>(null);

// Async wrappers that return empty arrays when null
export const ytFeedAtom = atom(async (get) => {
  const data = get(ytFeedDataAtom);
  return data ?? [];
});

export const wpFeedAtom = atom(async (get) => {
  const data = get(wpFeedDataAtom);
  return data ?? [];
});

export const newsFeedAtom = atom(async (get) => {
  const data = get(newsFeedDataAtom);
  return data ?? [];
});

// Loadable wrappers for components
export const ytFeedAtomLoadable = loadable(ytFeedAtom);
export const wpFeedAtomLoadable = loadable(wpFeedAtom);
export const newsFeedAtomLoadable = loadable(newsFeedAtom);

/**
 * @deprecated These hydration atoms are no longer needed.
 * React Query now handles caching, and DataSynchronizer syncs data to Jotai.
 * Kept for backwards compatibility during migration.
 */
export const hydratedYTFeedAtom = atom<YoutubeFeed[] | null>(null);
export const hydratedNewsFeedAtom = atom<NEWSFeed[] | null>(null);
export const hydratedWPFeedAtom = atom<WordpressFeed[] | null>(null);

// ============================================================================
// Title Getters (Derived Atoms)
// ============================================================================

export const getYTTitles = atom(async (get) => {
  const ytData = await get(ytFeedAtom);
  return ytData.map(({ title }) => title);
});

export const getNewsTitles = atom(async (get) => {
  const newsData = await get(newsFeedAtom);
  return newsData.map(({ title }) => title);
});

export const getWPTitles = atom(async (get) => {
  const wpData = await get(wpFeedAtom);
  return wpData.map(({ title }) => title);
});

// ============================================================================
// Paginated Feed Atoms
// ============================================================================

// Helper types for items with publication info
type NewsItemWithPub = NEWSFeedItem & { publication: string; publicationUrl: string };
type WPItemWithPub = WordpressFeedItem & { publication: string; publicationUrl: string; image: number };
type YTItemWithChannel = YoutubeFeedItem & { channelTitle?: string; channelId: string };

/**
 * Paginated News Feed Atom
 * Flattens all items, sorts by date, and paginates
 */
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

/**
 * Paginated WordPress Feed Atom
 */
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

/**
 * Paginated YouTube Feed Atom
 */
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
