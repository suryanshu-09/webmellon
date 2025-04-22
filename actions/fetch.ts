"use server"

import { prisma } from "@/lib/db";
import { User } from "@/lib/generated/prisma";

export async function fetchEverything(user: User) {
  const everything = await prisma.user.findUnique({
    where: {
      id: user.id
    },
    include: {
      catalogues: {
        include: {
          websites: true
        }
      }
    },
  });

  if (!everything) {
    throw new Error(`Data not found`);
  }
  return everything.catalogues;
}

export async function fetchAllCatalogues(user: User) {
  const catalogues = await prisma.user.findMany({
    where: {
      id: user.id
    },
    include: {
      catalogues: true
    },
  });

  if (!catalogues) {
    throw new Error(`Catalogues not found`);
  }

  return catalogues;
}

export async function fetchCatalogueAll(id: number) {
  const catalogue = await prisma.catalogue.findUnique({
    where: {
      id
    },
    include: {
      websites: true
    }
  })

  if (!catalogue) {
    throw new Error(`Catalogue with ID ${id} not found`);
  }

  return catalogue;
}

export async function fetchCatalogue(id: number) {
  const catalogue = await prisma.catalogue.findUnique({
    where: {
      id
    }
  })

  if (!catalogue) {
    throw new Error(`Catalogue with ID ${id} not found`);
  }

  return catalogue;
}

export async function fetchAllWebsites(user: User) {
  const [websites] = await prisma.user.findMany({
    where: {
      id: user.id
    },
    include: {
      websites: true
    }
  });

  if (!websites) {
    throw new Error(`Websites not found`);
  }

  return websites;
}

export async function fetchWebsite(id: number) {
  const website = await prisma.website.findUnique({
    where: {
      id
    }
  })

  if (!website) {
    throw new Error(`Website with ID ${id} not found`);
  }

  return website;
}
