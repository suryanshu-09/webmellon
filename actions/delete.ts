"use server"
import { prisma } from "@/lib/db";
import { Catalogue, User, Website } from "@/prisma/generated/zod";

export async function deleteUser(user: User) {
  const usr = await prisma.user.delete({
    where: {
      id: user.id
    }
  })

  if (!usr) {
    throw new Error(`User: ${user.name} not deleted`);
  }

  return { message: `User: ${user.name} successfully deleted` };
}

export async function deleteCatalogue(catalogue: Catalogue) {
  const cat = await prisma.catalogue.delete({
    where: {
      id: catalogue.id
    }
  })

  if (!cat) {
    throw new Error(`Catalogue: ${catalogue.name} not deleted`);
  }

  return { message: `Catalogue: ${catalogue.name} successfully deleted` };
}

export async function deleteWebsite(website: Website) {
  const web = await prisma.website.delete({
    where: {
      id: website.id
    }
  })

  if (!web) {
    throw new Error(`Website: ${website.name} not deleted`);
  }

  return { message: `Website: ${website.name} successfully deleted` };
}
