"use server";
import { prisma } from "@/lib/db";

export async function putCatalogue({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) {
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

export async function putWebsite({
  name,
  url,
  userId,
  catalogueId,
}: {
  name: string;
  url: string;
  userId: string;
  catalogueId: number;
}) {
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

export async function putYT({
  userId,
  channelId,
}: {
  userId: string;
  channelId: string;
}) {
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

export async function putWP({
  userId,
  url,
  image,
}: {
  userId: string;
  url: string;
  image: number;
}) {
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
export async function putNews({
  userId,
  url,
}: {
  userId: string;
  url: string;
}) {
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
