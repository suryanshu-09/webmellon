'use server'

import { prisma } from '@/lib/db'
import type { Website } from '@/prisma/generated/zod'

export async function importJSON(file: any, userId: string) {
  const text = await file.text();
  const data = JSON.parse(text);
  try {
    for (const catalogue of data) {
      await prisma.catalogue.upsert({
        where: {
          user_catalogue_name_unique: {
            name: catalogue.name,
            userId
          },
        },
        update: {},
        create: {
          name: catalogue.name,
          userId,
          websites: {
            create: catalogue.websites.map((website: Website) => ({
              name: website.name,
              url: website.url,
              favicon: website.favicon,
              userId
            })),
          },
        },
      })
    }
  } catch (err) {
    console.log(err)
    throw new Error('Whoopsie we got an error')
  }
}
