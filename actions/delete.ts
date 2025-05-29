"use server";
import { prisma } from "@/lib/db";
import { Catalogue, User, Website } from "@/prisma/generated/zod";

export async function deleteUser(user: User) {
  const usr = await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  if (!usr) {
    throw new Error(`User: ${user.name} not deleted`);
  }

  return { message: `User: ${user.name} successfully deleted` };
}

export async function deleteCatalogue(catalogue: Catalogue) {
  const cat = await prisma.catalogue.delete({
    where: {
      id: catalogue.id,
    },
  });

  if (!cat) {
    throw new Error(`Catalogue: ${catalogue.name} not deleted`);
  }

  return { message: `Catalogue: ${catalogue.name} successfully deleted` };
}

export async function deleteWebsite(website: Website) {
  const web = await prisma.website.delete({
    where: {
      id: website.id,
    },
  });

  if (!web) {
    throw new Error(`Website: ${website.name} not deleted`);
  }

  return { message: `Website: ${website.name} successfully deleted` };
}

export async function deleteYT({
  channelId,
  userId,
}: {
  channelId: string;
  userId: string;
}) {
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

export async function deleteWP({
  url,
  userId,
}: {
  url: string;
  userId: string;
}) {
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

export async function deleteNews({
  url,
  userId,
}: {
  url: string;
  userId: string;
}) {
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
