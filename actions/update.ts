"use server";
import { prisma } from "@/lib/db";
import { z } from "zod";

// ============================================
// Validation Schemas
// ============================================

const UpdateUserSchema = z.object({
  id: z.string().min(1, "User ID is required"),
  email: z.string().email("Invalid email format"),
  name: z.string().max(100, "Name must be 100 characters or less").nullable().optional(),
  image: z.string().url("Invalid image URL").nullable().optional(),
});

const UpdateCatalogueSchema = z.object({
  id: z.number().int().positive("Catalogue ID must be a positive integer"),
  name: z.string().min(1, "Name is required").max(100, "Name must be 100 characters or less"),
});

const UpdateWebsiteSchema = z.object({
  id: z.number().int().positive("Website ID must be a positive integer"),
  name: z.string().min(1, "Name is required").max(100, "Name must be 100 characters or less"),
  url: z.string().url("Invalid URL format"),
  favicon: z.string().url("Invalid favicon URL"),
});

// ============================================
// Update Operations with Validation
// ============================================

export async function updateUser(input: unknown) {
  const parsed = UpdateUserSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { id, email, name, image } = parsed.data;
  
  const updateData = {
    email,
    name,
    image,
  };

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  if (!updatedUser) {
    throw new Error(`User: ${name} not updated`);
  }

  return updatedUser;
}

export async function updateCatalogue(input: unknown) {
  const parsed = UpdateCatalogueSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { id, name } = parsed.data;
  
  const cat = await prisma.catalogue.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  if (!cat) {
    throw new Error(`Catalogue: ${name} not updated`);
  }

  return cat;
}

export async function updateWebsite(input: unknown) {
  const parsed = UpdateWebsiteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid input: ${parsed.error.errors.map(e => e.message).join(", ")}`);
  }
  
  const { id, name, url, favicon } = parsed.data;
  
  const web = await prisma.website.update({
    where: {
      id,
    },
    data: {
      name,
      url,
      favicon,
    },
  });

  if (!web) {
    throw new Error(`Website: ${name} not updated`);
  }

  return web;
}
