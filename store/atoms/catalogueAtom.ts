import { atom } from "jotai";
import { everythingAtomLoadable } from "@/store/atoms/everythingAtom";
import { CatalogueWithWebsites } from "@/types/types";
import { atomFamily } from "jotai/utils";
import { Catalogue } from "@/prisma/generated/zod";

export const catalogueAtom = atom((get) => {
  const catalogues = get(everythingAtomLoadable);
  if (catalogues.state === "hasData" && Array.isArray(catalogues.data)) {
    return catalogues.data.map((catalogue: CatalogueWithWebsites) => ({
      id: catalogue.id,
      name: catalogue.name,
      userId: catalogue.userId,
    }));
  }
  return [];
});

export const catalogueById = atomFamily((catalogueId: number) =>
  atom((get) => {
    const result = get(everythingAtomLoadable);

    if (result.state === 'hasData' && Array.isArray(result.data)) {
      const catalogue = result.data.find((c: Catalogue) => c.id === catalogueId) as CatalogueWithWebsites;
      return catalogue || null;
    }

    if (result.state === 'loading') return null;
    if (result.state === 'hasError') throw result.error;

    return null;
  })
) 
