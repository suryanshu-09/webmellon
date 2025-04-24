'use server'

import { prisma } from '@/lib/db'
import type { Website } from '@/prisma/generated/zod'

export async function importJSON(file: any, userId: string) {
  const text = await file.text();
  const data = JSON.parse(text);

  try {
    for (const catalogue of data) {
      const savedCatalogue = await prisma.catalogue.upsert({
        where: {
          user_catalogue_name_unique: { name: catalogue.name, userId }
        },
        update: {},
        create: { name: catalogue.name, userId }
      });

      // Process websites one by one to catch individual errors
      for (const site of catalogue.websites) {
        try {
          await prisma.website.upsert({
            where: {
              user_website_url_unique: { userId, url: site.url }
            },
            update: {
              favicon: site.favicon
            },
            create: {
              name: site.name,
              url: site.url,
              favicon: site.favicon,
              userId,
              catalogueId: savedCatalogue.id
            }
          });
        } catch (err) {
          if (err instanceof Error) {
            console.error(`Error processing site:`, {
              name: site.name,
              url: site.url,
              catalogue: catalogue.name,
              error: err.message
            });
          } else {
            console.error('Unknown error processing site:', {
              site,
              error: err
            });
          }
          continue;
        }
      }
    }
  } catch (err) {
    console.error('Import error:', err);
    throw new Error('Failed to import data');
  }
}
