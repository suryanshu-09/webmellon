"use server";
import { prisma } from "@/lib/db";
import { z } from "zod";

// ============================================
// Validation Schemas
// ============================================

const DeleteUserSchema = z.object({
  id: z.string().min(1, "User ID is required"),
  name: z.string().nullable().optional(),
});

const DeleteCatalogueSchema = z.object({
  id: z.number().int().positive("Catalogue ID must be a positive integer"),
  name: z.string().optional(),
});

const DeleteWebsiteSchema = z.object({
  id: z.number().int().positive("Website ID must be a positive integer"),
  name: z.string().optional(),
});

const DeleteYTSchema = z.object({
  channelId: z.string().min(1, "Channel ID is required"),
  userId: z.string().min(1, "User ID is required"),
});

const DeleteWPSchema = z.object({
  url: z.string().url("Invalid URL format"),
  userId: z.string().min(1, "User ID is required"),
});

const DeleteNewsSchema = z.object({
  url: z.string().url("Invalid URL format"),
  userId: z.string().min(1, "User ID is required"),
});

// Batch validation schemas
const BatchDeleteIdsSchema = z.object({
  ids: z.array(z.number().int().positive()).max(100, "Cannot delete more than 100 items at once"),
  userId: z.string().min(1, "User ID is required"),
});

const BatchDeleteStringsSchema = z.object({
  items: z.array(z.string().min(1)).max(100, "Cannot delete more than 100 items at once"),
  userId: z.string().min(1, "User ID is required"),
});

const SoftDeleteSchema = z.object({
  itemId: z.number().int().positive("ID must be a positive integer"),
  userId: z.string().min(1, "User ID is required"),
});

// ============================================
// Delete Operations with Validation
// ============================================

export async function deleteUser(input: unknown) {
  const parsed = DeleteUserSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { id, name } = parsed.data;
  
  const usr = await prisma.user.delete({
    where: {
      id,
    },
  });

  if (!usr) {
    throw new Error(`User: ${name} not deleted`);
  }

  return { message: `User: ${name} successfully deleted` };
}

export async function deleteCatalogue(input: unknown) {
  const parsed = DeleteCatalogueSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { id, name } = parsed.data;
  
  const cat = await prisma.catalogue.delete({
    where: {
      id,
    },
  });

  if (!cat) {
    throw new Error(`Catalogue: ${name} not deleted`);
  }

  return { message: `Catalogue: ${name} successfully deleted` };
}

export async function deleteWebsite(input: unknown) {
  const parsed = DeleteWebsiteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { id, name } = parsed.data;
  
  const web = await prisma.website.delete({
    where: {
      id,
    },
  });

  if (!web) {
    throw new Error(`Website: ${name} not deleted`);
  }

  return { message: `Website: ${name} successfully deleted` };
}

export async function deleteYT(input: unknown) {
  const parsed = DeleteYTSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { channelId, userId } = parsed.data;
  
  const yt = await prisma.ytRSS.delete({
    where: {
      user_ytrss_channelId_unique: { userId, channelId },
    },
  });

  if (!yt) {
    throw new Error(`Youtube channel: ${channelId} not deleted`);
  }
  return { message: `Youtube Channel: ${channelId} successfully deleted` };
}

export async function deleteWP(input: unknown) {
  const parsed = DeleteWPSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { url, userId } = parsed.data;
  
  const wp = await prisma.wpRSS.delete({
    where: {
      user_wprss_url_unique: { userId, url },
    },
  });

  if (!wp) {
    throw new Error(`WordPress: ${url} not deleted`);
  }
  return { message: `WordPress: ${url} successfully deleted` };
}

export async function deleteNews(input: unknown) {
  const parsed = DeleteNewsSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { url, userId } = parsed.data;
  
  const news = await prisma.newsRSS.delete({
    where: {
      user_newsrss_url_unique: { userId, url },
    },
  });

  if (!news) {
    throw new Error(`News: ${url} not deleted`);
  }
  return { message: `News: ${url} successfully deleted` };
}

// ============================================
// Batch Operations with Validation
// ============================================

/**
 * Batch delete multiple websites by their IDs.
 * @param input - Object containing ids array and userId
 * @returns Count of deleted websites
 */
export async function batchDeleteWebsites(input: unknown) {
  const parsed = BatchDeleteIdsSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { ids, userId } = parsed.data;
  
  if (!ids.length) {
    return { count: 0, message: "No websites to delete" };
  }

  const result = await prisma.website.deleteMany({
    where: {
      id: { in: ids },
      userId, // Ensure user owns these websites
    },
  });

  return {
    count: result.count,
    message: `Successfully deleted ${result.count} website(s)`,
  };
}

/**
 * Batch delete multiple catalogues by their IDs.
 * Note: This will cascade delete all associated websites.
 * @param input - Object containing ids array and userId
 * @returns Count of deleted catalogues
 */
export async function batchDeleteCatalogues(input: unknown) {
  const parsed = BatchDeleteIdsSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { ids, userId } = parsed.data;
  
  if (!ids.length) {
    return { count: 0, message: "No catalogues to delete" };
  }

  const result = await prisma.catalogue.deleteMany({
    where: {
      id: { in: ids },
      userId, // Ensure user owns these catalogues
    },
  });

  return {
    count: result.count,
    message: `Successfully deleted ${result.count} catalogue(s)`,
  };
}

// Batch delete schemas for string-based identifiers
const BatchDeleteYTSchema = z.object({
  channelIds: z.array(z.string().min(1)).max(100, "Cannot delete more than 100 feeds at once"),
  userId: z.string().min(1, "User ID is required"),
});

const BatchDeleteUrlsSchema = z.object({
  urls: z.array(z.string().url()).max(100, "Cannot delete more than 100 feeds at once"),
  userId: z.string().min(1, "User ID is required"),
});

/**
 * Batch delete multiple YouTube RSS feeds.
 * @param input - Object containing channelIds array and userId
 * @returns Count of deleted feeds
 */
export async function batchDeleteYT(input: unknown) {
  const parsed = BatchDeleteYTSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { channelIds, userId } = parsed.data;
  
  if (!channelIds.length) {
    return { count: 0, message: "No YouTube feeds to delete" };
  }

  const result = await prisma.ytRSS.deleteMany({
    where: {
      channelId: { in: channelIds },
      userId,
    },
  });

  return {
    count: result.count,
    message: `Successfully deleted ${result.count} YouTube feed(s)`,
  };
}

/**
 * Batch delete multiple WordPress RSS feeds.
 * @param input - Object containing urls array and userId
 * @returns Count of deleted feeds
 */
export async function batchDeleteWP(input: unknown) {
  const parsed = BatchDeleteUrlsSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { urls, userId } = parsed.data;
  
  if (!urls.length) {
    return { count: 0, message: "No WordPress feeds to delete" };
  }

  const result = await prisma.wpRSS.deleteMany({
    where: {
      url: { in: urls },
      userId,
    },
  });

  return {
    count: result.count,
    message: `Successfully deleted ${result.count} WordPress feed(s)`,
  };
}

/**
 * Batch delete multiple News RSS feeds.
 * @param input - Object containing urls array and userId
 * @returns Count of deleted feeds
 */
export async function batchDeleteNews(input: unknown) {
  const parsed = BatchDeleteUrlsSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { urls, userId } = parsed.data;
  
  if (!urls.length) {
    return { count: 0, message: "No News feeds to delete" };
  }

  const result = await prisma.newsRSS.deleteMany({
    where: {
      url: { in: urls },
      userId,
    },
  });

  return {
    count: result.count,
    message: `Successfully deleted ${result.count} News feed(s)`,
  };
}

// ============================================
// Soft Delete Operations with Validation
// Note: These functions will work after running `npx prisma migrate dev`
// to apply the schema changes that add the `deletedAt` field.
// ============================================

/**
 * Soft delete a catalogue (marks as deleted instead of removing).
 * @param input - Object containing catalogueId and userId
 * @returns Updated catalogue with deletedAt timestamp
 */
export async function softDeleteCatalogue(input: unknown) {
  const schema = z.object({
    catalogueId: z.number().int().positive("Catalogue ID must be a positive integer"),
    userId: z.string().min(1, "User ID is required"),
  });
  
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { catalogueId, userId } = parsed.data;
  
  const cat = await prisma.catalogue.update({
    where: {
      id: catalogueId,
      userId,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  if (!cat) {
    throw new Error(`Catalogue not found or cannot be archived`);
  }

  return { message: `Catalogue: ${cat.name} successfully archived` };
}

/**
 * Restore a soft-deleted catalogue.
 * @param input - Object containing catalogueId and userId
 * @returns Restored catalogue
 */
export async function restoreCatalogue(input: unknown) {
  const schema = z.object({
    catalogueId: z.number().int().positive("Catalogue ID must be a positive integer"),
    userId: z.string().min(1, "User ID is required"),
  });
  
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { catalogueId, userId } = parsed.data;
  
  const cat = await prisma.catalogue.update({
    where: {
      id: catalogueId,
      userId,
    },
    data: {
      deletedAt: null,
    },
  });

  if (!cat) {
    throw new Error(`Catalogue not found or cannot be restored`);
  }

  return { message: `Catalogue: ${cat.name} successfully restored` };
}

/**
 * Permanently delete all soft-deleted catalogues for a user.
 * @param input - User ID string
 * @returns Count of permanently deleted catalogues
 */
export async function purgeDeletedCatalogues(input: unknown) {
  const schema = z.string().min(1, "User ID is required");
  
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const userId = parsed.data;
  
  const result = await prisma.catalogue.deleteMany({
    where: {
      userId,
      deletedAt: { not: null },
    },
  });

  return {
    count: result.count,
    message: `Permanently deleted ${result.count} archived catalogue(s)`,
  };
}

/**
 * Soft delete a website (marks as deleted instead of removing).
 * @param input - Object containing websiteId and userId
 * @returns Updated website with deletedAt timestamp
 */
export async function softDeleteWebsite(input: unknown) {
  const schema = z.object({
    websiteId: z.number().int().positive("Website ID must be a positive integer"),
    userId: z.string().min(1, "User ID is required"),
  });
  
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { websiteId, userId } = parsed.data;
  
  const web = await prisma.website.update({
    where: {
      id: websiteId,
      userId,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  if (!web) {
    throw new Error(`Website not found or cannot be archived`);
  }

  return { message: `Website: ${web.name} successfully archived` };
}

/**
 * Restore a soft-deleted website.
 * @param input - Object containing websiteId and userId
 * @returns Restored website
 */
export async function restoreWebsite(input: unknown) {
  const schema = z.object({
    websiteId: z.number().int().positive("Website ID must be a positive integer"),
    userId: z.string().min(1, "User ID is required"),
  });
  
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { websiteId, userId } = parsed.data;
  
  const web = await prisma.website.update({
    where: {
      id: websiteId,
      userId,
    },
    data: {
      deletedAt: null,
    },
  });

  if (!web) {
    throw new Error(`Website not found or cannot be restored`);
  }

  return { message: `Website: ${web.name} successfully restored` };
}
