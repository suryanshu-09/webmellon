"use server";
import { NewsRSS, WpRSS, YtRSS } from "@/prisma/zod";
import Parser from "rss-parser";

const ytParser = new Parser({});

export async function getYTFeed(yt_channels: YtRSS[]) {
  const ytFeed = [];

  if (Array.isArray(yt_channels)) {
    for (const channel of yt_channels) {
      try {
        const feed = await ytParser.parseURL(
          `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.channelId.trim()}`,
        );

        if (feed) {
          const safeItems = JSON.parse(JSON.stringify(feed.items));
          ytFeed.push({
            title: feed.title,
            items: safeItems,
            channelId: channel.channelId,
          });
        }
      } catch (error) {
        console.error(
          `Failed to fetch feed for channel ID ${channel.channelId}:`,
          error,
        );
      }
    }
  }

  return ytFeed;
}

const newsParser = new Parser({
  customFields: {
    item: ["media:content"],
  },
});

export async function getNewsFeed(news: NewsRSS[]) {
  const newsFeed = [];

  if (Array.isArray(news)) {
    for (const site of news) {
      try {
        const feed = await newsParser.parseURL(site.url.trim());

        if (feed) {
          const safeItems = JSON.parse(JSON.stringify(feed.items));
          newsFeed.push({
            title: feed.title,
            items: safeItems,
            url: site.url.trim(),
          });
        }
      } catch (error) {
        console.error(`Failed to fetch news feed from ${site.url}:`, error);
      }
    }
  }

  return newsFeed;
}

const wpParser = new Parser({
  customFields: {
    item: [["media:content", "media:content", { keepArray: true }]],
  },
});

export async function getWPFeed(wp: WpRSS[]) {
  const wpFeed = [];

  if (Array.isArray(wp)) {
    for (const blog of wp) {
      try {
        const feed = await wpParser.parseURL(`${blog.url.trim()}/feed`);

        if (feed) {
          const safeItems = JSON.parse(JSON.stringify(feed.items));
          wpFeed.push({
            title: feed.title,
            items: safeItems,
            image: blog.image,
            url: blog.url.trim(),
          });
        }
      } catch (error) {
        console.error(`Failed to fetch WP feed from ${blog.url}:`, error);
      }
    }
  }

  return wpFeed;
}
