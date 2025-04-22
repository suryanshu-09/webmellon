"use server"
import { prisma } from "@/lib/db";
import { Catalogue, User, Website } from "@/prisma/generated/zod";

export async function updateUser(user: User) {
  const updateData = {
    email: user.email,
    name: user.name,
    image: user.image,
  };

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: updateData,
  });

  if (!updatedUser) {
    throw new Error(`User: ${user.name} not updated`);
  }

  return updatedUser;
}
export async function updateCatalogue(catalogue: Catalogue) {
  const cat = await prisma.catalogue.update({
    where: {
      id: catalogue.id
    },
    data: {
      name: catalogue.name,
    }
  })

  if (!cat) {
    throw new Error(`Catalogue: ${catalogue.name} not updated`)
  }

  return cat;
}

export async function updateWebsite(website: Website) {
  const web = await prisma.website.update({
    where: {
      id: website.id
    },
    data: {
      name: website.name,
      url: website.url,
      favicon: website.favicon
    }
  })

  if (!web) {
    throw new Error(`Website: ${website.name} not updated`)
  }

  return web;
}
