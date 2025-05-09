import { atom } from "jotai";
import { everythingAtom } from "@/store/atoms/everythingAtom";
import { CatalogueWithWebsites } from "@/types/types";
import { atomFamily } from "jotai/utils";
import { Catalogue } from "@/prisma/generated/zod";

export const catalogueAtom = atom((get) => {
  const { data: catalogues, loading } = get(everythingAtom);
  if (!loading && Array.isArray(catalogues)) {
    return catalogues.map((catalogue: CatalogueWithWebsites) => ({
      id: catalogue.id,
      name: catalogue.name,
      userId: catalogue.userId,
    }));
  }
  return [];
});

export const catalogueById = atomFamily((catalogueId: number) =>
  atom((get) => {
    const { data: result, loading } = get(everythingAtom);

    if (!loading && Array.isArray(result)) {
      const catalogue = result.find(
        (c: Catalogue) => c.id === catalogueId,
      ) as CatalogueWithWebsites;
      return catalogue || null;
    }

    return null;
  }),
);
