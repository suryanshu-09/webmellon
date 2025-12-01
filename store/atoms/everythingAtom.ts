import { CatalogueWithWebsites } from "@/types/types";
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { cataloguePaginationAtom } from "./paginationAtom";
import { PaginatedCataloguesResult } from "@/actions/fetch";

export const everythingAtom = atom<CatalogueWithWebsites[] | null>(null);

export const everythingDataAtom = atom(async (get) => {
  const everything = get(everythingAtom);
  if (!everything) return [] as CatalogueWithWebsites[];
  return everything;
});

export const everythingAtomLoadable = loadable(everythingDataAtom);

// Paginated catalogues atom - fetches from API
export const paginatedCataloguesAtom = atom(async (get) => {
  const pagination = get(cataloguePaginationAtom);
  const params = new URLSearchParams({
    page: pagination.currentPage.toString(),
    limit: pagination.itemsPerPage.toString(),
    sortBy: pagination.sortBy,
    sortOrder: pagination.sortOrder,
  });

  if (pagination.searchQuery) {
    params.append("search", pagination.searchQuery);
  }

  const response = await fetch(`/api/catalogues?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch catalogues");
  }

  const data: PaginatedCataloguesResult = await response.json();
  return data;
});

// Loadable wrapper for paginated catalogues
export const paginatedCataloguesLoadable = loadable(paginatedCataloguesAtom);
