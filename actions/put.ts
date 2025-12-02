"use server";
import { prisma } from "@/lib/db";
import { z } from "zod";

// ============================================
// Validation Schemas
// ============================================

const CreateCatalogueSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be 100 characters or less"),
  userId: z.string().min(1, "User ID is required"),
});

const CreateWebsiteSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be 100 characters or less"),
  url: z.string().url("Invalid URL format"),
  userId: z.string().min(1, "User ID is required"),
  catalogueId: z.number().int().positive("Catalogue ID must be a positive integer"),
});

const CreateYTSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  channelId: z.string().min(1, "Channel ID is required").max(100, "Channel ID must be 100 characters or less"),
});

const CreateWPSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  url: z.string().url("Invalid URL format"),
  image: z.number().int().min(0).max(10, "Image must be between 0 and 10"),
});

const CreateNewsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  url: z.string().url("Invalid URL format"),
});

// Batch validation schemas
const BatchCreateWebsitesSchema = z.object({
  websites: z.array(z.object({
    name: z.string().min(1).max(100),
    url: z.string().url(),
    catalogueId: z.number().int().positive(),
  })).max(100, "Cannot create more than 100 websites at once"),
  userId: z.string().min(1),
});

const BatchCreateCataloguesSchema = z.object({
  names: z.array(z.string().min(1).max(100)).max(50, "Cannot create more than 50 catalogues at once"),
  userId: z.string().min(1),
});

const BatchCreateYTSchema = z.object({
  channelIds: z.array(z.string().min(1).max(100)).max(100, "Cannot create more than 100 feeds at once"),
  userId: z.string().min(1),
});

const BatchCreateWPSchema = z.object({
  feeds: z.array(z.object({
    url: z.string().url(),
    image: z.number().int().min(0).max(10),
  })).max(100, "Cannot create more than 100 feeds at once"),
  userId: z.string().min(1),
});

const BatchCreateNewsSchema = z.object({
  urls: z.array(z.string().url()).max(100, "Cannot create more than 100 feeds at once"),
  userId: z.string().min(1),
});

// ============================================
// Create Operations with Validation
// ============================================

export async function putCatalogue(input: unknown) {
  const parsed = CreateCatalogueSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { name, userId } = parsed.data;
  
  const cat = await prisma.catalogue.create({
    data: {
      name,
      userId,
    },
  });
  if (!cat) {
    throw new Error(`Could not create ${name}.`);
  }

  return cat;
}

export async function putWebsite(input: unknown) {
  const parsed = CreateWebsiteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { name, url, userId, catalogueId } = parsed.data;
  
  const web = await prisma.website.create({
    data: {
      name,
      url,
      favicon: `https://www.google.com/s2/favicons?sz=64&domain=${new URL(url).hostname}`,
      userId,
      catalogueId,
    },
  });

  if (!web) {
    throw new Error(`Could not create ${name}.`);
  }

  return web;
}

export async function putYT(input: unknown) {
  const parsed = CreateYTSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { userId, channelId } = parsed.data;
  
  const yt = await prisma.ytRSS.create({
    data: {
      channelId,
      userId,
    },
  });

  if (!yt) {
    throw new Error(`Could not create ${channelId}`);
  }

  return yt;
}

export async function putWP(input: unknown) {
  const parsed = CreateWPSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { userId, url, image } = parsed.data;
  
  const wp = await prisma.wpRSS.create({
    data: {
      url,
      image,
      userId,
    },
  });

  if (!wp) {
    throw new Error(`Could not create ${url}`);
  }

  return wp;
}

export async function putNews(input: unknown) {
  const parsed = CreateNewsSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { userId, url } = parsed.data;
  
  const news = await prisma.newsRSS.create({
    data: {
      url,
      userId,
    },
  });

  if (!news) {
    throw new Error(`Could not create ${url}`);
  }

  return news;
}

// ============================================
// Batch Create Operations with Validation
// ============================================

/**
 * Batch create multiple websites at once.
 * @param input - Object containing websites array and userId
 * @returns Count of created websites
 */
export async function batchCreateWebsites(input: unknown) {
  const parsed = BatchCreateWebsitesSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { websites, userId } = parsed.data;
  
  if (!websites.length) {
    return { count: 0, message: "No websites to create" };
  }

  const data = websites.map((website) => ({
    name: website.name,
    url: website.url,
    favicon: `https://www.google.com/s2/favicons?sz=64&domain=${new URL(website.url).hostname}`,
    userId,
    catalogueId: website.catalogueId,
  }));

  const result = await prisma.website.createMany({
    data,
    skipDuplicates: true, // Skip if name or url already exists for user
  });

  return {
    count: result.count,
    message: `Successfully created ${result.count} website(s)`,
  };
}

/**
 * Batch create multiple catalogues at once.
 * @param input - Object containing names array and userId
 * @returns Count of created catalogues
 */
export async function batchCreateCatalogues(input: unknown) {
  const parsed = BatchCreateCataloguesSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { names, userId } = parsed.data;
  
  if (!names.length) {
    return { count: 0, message: "No catalogues to create" };
  }

  const data = names.map((name) => ({
    name,
    userId,
  }));

  const result = await prisma.catalogue.createMany({
    data,
    skipDuplicates: true, // Skip if name already exists for user
  });

  return {
    count: result.count,
    message: `Successfully created ${result.count} catalogue(s)`,
  };
}

/**
 * Batch create multiple YouTube RSS feeds at once.
 * @param input - Object containing channelIds array and userId
 * @returns Count of created feeds
 */
export async function batchCreateYT(input: unknown) {
  const parsed = BatchCreateYTSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { channelIds, userId } = parsed.data;
  
  if (!channelIds.length) {
    return { count: 0, message: "No YouTube feeds to create" };
  }

  const data = channelIds.map((channelId) => ({
    channelId,
    userId,
  }));

  const result = await prisma.ytRSS.createMany({
    data,
    skipDuplicates: true,
  });

  return {
    count: result.count,
    message: `Successfully created ${result.count} YouTube feed(s)`,
  };
}

/**
 * Batch create multiple WordPress RSS feeds at once.
 * @param input - Object containing feeds array and userId
 * @returns Count of created feeds
 */
export async function batchCreateWP(input: unknown) {
  const parsed = BatchCreateWPSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { feeds, userId } = parsed.data;
  
  if (!feeds.length) {
    return { count: 0, message: "No WordPress feeds to create" };
  }

  const data = feeds.map((feed) => ({
    url: feed.url,
    image: feed.image,
    userId,
  }));

  const result = await prisma.wpRSS.createMany({
    data,
    skipDuplicates: true,
  });

  return {
    count: result.count,
    message: `Successfully created ${result.count} WordPress feed(s)`,
  };
}

/**
 * Batch create multiple News RSS feeds at once.
 * @param input - Object containing urls array and userId
 * @returns Count of created feeds
 */
export async function batchCreateNews(input: unknown) {
  const parsed = BatchCreateNewsSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { urls, userId } = parsed.data;
  
  if (!urls.length) {
    return { count: 0, message: "No News feeds to create" };
  }

  const data = urls.map((url) => ({
    url,
    userId,
  }));

  const result = await prisma.newsRSS.createMany({
    data,
    skipDuplicates: true,
  });

  return {
    count: result.count,
    message: `Successfully created ${result.count} News feed(s)`,
  };
}
