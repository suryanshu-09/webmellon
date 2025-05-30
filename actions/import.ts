"use server";

import { prisma } from "@/lib/db";

export async function importJSON(file: File, userId: string) {
  const text = await file.text();
  const data = JSON.parse(text);

  try {
    if (data.WordPress) {
      for (const wp of data.WordPress) {
        await prisma.wpRSS.upsert({
          where: {
            user_wprss_url_unique: { userId, url: wp.url },
          },
          update: {},
          create: { url: wp.url, userId, image: wp.image },
        });
      }
    }
    if (data.Youtube) {
      for (const yt of data.Youtube) {
        await prisma.ytRSS.upsert({
          where: {
            user_ytrss_channelId_unique: { userId, channelId: yt.channelId },
          },
          update: {},
          create: { userId, channelId: yt.channelId },
        });
      }
    }
    if (data.News) {
      for (const news of data.News) {
        await prisma.newsRSS.upsert({
          where: {
            user_newsrss_url_unique: { userId, url: news.url },
          },
          update: {},
          create: { userId, url: news.url },
        });
      }
    }
    if (data.Catalogues) {
      for (const catalogue of data.Catalogues) {
        const savedCatalogue = await prisma.catalogue.upsert({
          where: {
            user_catalogue_name_unique: { name: catalogue.name, userId },
          },
          update: {},
          create: { name: catalogue.name, userId },
        });

        for (const site of catalogue.websites) {
          try {
            await prisma.website.upsert({
              where: {
                user_website_url_unique: { userId, url: site.url },
              },
              update: {
                favicon: site.favicon,
              },
              create: {
                name: site.name,
                url: site.url,
                favicon: site.favicon,
                userId,
                catalogueId: savedCatalogue.id,
              },
            });
          } catch (err) {
            if (err instanceof Error) {
              console.error(`Error processing site:`, {
                name: site.name,
                url: site.url,
                catalogue: catalogue.name,
                error: err.message,
              });
            } else {
              console.error("Unknown error processing site:", {
                site,
                error: err,
              });
            }
            continue;
          }
        }
      }
    }
  } catch (err) {
    console.error("Import error:", err);
    throw new Error("Failed to import data");
  }
}
