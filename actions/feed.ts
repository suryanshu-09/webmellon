"use server";
import { NewsRSS, WpRSS, YtRSS } from "@/prisma/zod";
import Parser from "rss-parser";
import { getCachedFeed } from "@/lib/cache";

const ytParser = new Parser({});

export async function getYTFeed(yt_channels: YtRSS[]) {
  if (!Array.isArray(yt_channels) || yt_channels.length === 0) return [];

  const results = await Promise.allSettled(
    yt_channels.map(async (channel) => {
      const channelId = channel.channelId.trim();
      return getCachedFeed(`yt:${channelId}`, async () => {
        const feed = await ytParser.parseURL(
          `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
        );
        return {
          title: feed.title,
          items: JSON.parse(JSON.stringify(feed.items)),
          channelId: channelId,
        };
      });
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<{ title: string | undefined; items: unknown[]; channelId: string }> => r.status === "fulfilled")
    .map((r) => r.value);
}

const newsParser = new Parser({
  customFields: {
    item: ["media:content"],
  },
});

export async function getNewsFeed(news: NewsRSS[]) {
  if (!Array.isArray(news) || news.length === 0) return [];

  const results = await Promise.allSettled(
    news.map(async (site) => {
      const url = site.url.trim();
      return getCachedFeed(`news:${url}`, async () => {
        const feed = await newsParser.parseURL(url);
        return {
          title: feed.title,
          items: JSON.parse(JSON.stringify(feed.items)),
          url: url,
        };
      });
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<{ title: string | undefined; items: unknown[]; url: string }> => r.status === "fulfilled")
    .map((r) => r.value);
}

const wpParser = new Parser({
  customFields: {
    item: [["media:content", "media:content", { keepArray: true }]],
  },
});

export async function getWPFeed(wp: WpRSS[]) {
  if (!Array.isArray(wp) || wp.length === 0) return [];

  const results = await Promise.allSettled(
    wp.map(async (blog) => {
      const url = blog.url.trim();
      return getCachedFeed(`wp:${url}`, async () => {
        const feed = await wpParser.parseURL(`${url}/feed`);
        return {
          title: feed.title,
          items: JSON.parse(JSON.stringify(feed.items)),
          image: blog.image,
          url: url,
        };
      });
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<{ title: string | undefined; items: unknown[]; image: number; url: string }> => r.status === "fulfilled")
    .map((r) => r.value);
}
