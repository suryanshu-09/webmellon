"use server"
import { prisma } from "@/lib/db";

export async function putCatalogue({ name, userId }: { name: string, userId: string }) {
  const cat = await prisma.catalogue.create({
    data: {
      name,
      userId
    }
  })
  if (!cat) {
    throw new Error(`Could not create ${name}.`)
  }

  return cat;
}

export async function putWebsite({ name, url, userId, catalogueId }: { name: string, url: string, userId: string, catalogueId: number }) {
  const web = await prisma.website.create({
    data: {
      name: name,
      url: url,
      favicon: `https://www.google.com/s2/favicons?sz=64&domain=${new URL(url).hostname}`,
      userId: userId,
      catalogueId: catalogueId
    }
  })

  if (!web) {
    throw new Error(`Could not create ${name}.`)
  }

  return web;
}
