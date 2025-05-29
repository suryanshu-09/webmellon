import { z } from "zod/";
import { CatalogueSchema, WebsiteSchema } from "../prisma/generated/zod/index";
import { WpRSSSchema, YtRSSSchema } from "@/prisma/zod";

export const CatalogueWithWebsitesSchema = CatalogueSchema.extend({
  websites: z.array(WebsiteSchema),
});

export type CatalogueWithWebsites = z.infer<typeof CatalogueWithWebsitesSchema>;

export const UserSessionSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image: z.string().url(),
  id: z.string(),
});

export type UserSessionType = z.infer<typeof UserSessionSchema>;

export type dashboardState = {
  search: boolean;
  catalogueId: number;
};

export type feedState = {
  search: boolean;
  feedTitle: string;
};

const YoutubeItemSchema = YtRSSSchema.extend({
  title: z.string(),
  link: z.string().url(),
  pubDate: z.string().datetime(),
});

export const YoutubeFeedSchema = z.object({
  title: z.string().optional(),
  channelId: z.string(),
  items: z.array(YoutubeItemSchema),
});
export type YoutubeFeed = z.infer<typeof YoutubeFeedSchema>;
export type YoutubeFeedItem = z.infer<typeof YoutubeItemSchema>;

const WordpressItemSchema = WpRSSSchema.extend({
  guid: z.string(),
  title: z.string(),
  link: z.string().url(),
  pubDate: z.string().datetime(),
  contentSnippet: z.string(),
  "media:content": z.array(
    z.object({
      $: z.object({
        url: z.string().url(),
      }),
    }),
  ),
});

export const WordpressFeedSchema = z.object({
  title: z.string(),
  url: z.string(),
  items: z.array(WordpressItemSchema),
  image: z.number(),
});

export type WordpressFeed = z.infer<typeof WordpressFeedSchema>;
export type WordpressFeedItem = z.infer<typeof WordpressItemSchema>;

export const NEWSFeedItemSchema = z.object({
  guid: z.string(),
  title: z.string(),
  link: z.string().url(),
  pubDate: z.string().datetime(),
  contentSnippet: z.string(),
  "media:content": z.object({
    $: z.object({
      url: z.string().url(),
    }),
  }),
});
export const NEWSFeedSchema = z.object({
  title: z.string(),
  url: z.string(),
  items: z.array(NEWSFeedItemSchema),
});
export type NEWSFeedItem = z.infer<typeof NEWSFeedItemSchema>;
export type NEWSFeed = z.infer<typeof NEWSFeedSchema>;

export const EverythingSchema = z.object({
  cww: z.array(CatalogueWithWebsitesSchema),
  wp: z.array(WordpressFeedSchema),
  news: z.array(NEWSFeedSchema),
  yt: z.array(YoutubeFeedSchema),
});
export type Everything = z.infer<typeof EverythingSchema>;
