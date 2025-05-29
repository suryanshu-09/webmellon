import { atom } from "jotai";
import { everythingAtomLoadable } from "@/store/atoms/everythingAtom";
import { CatalogueWithWebsites } from "@/types/types";
import { atomFamily } from "jotai/utils";
import { Catalogue } from "@/prisma/generated/zod";

export const catalogueAtom = atom((get) => {
  const everything = get(everythingAtomLoadable);
  if (everything.state == "hasData" && Array.isArray(everything.data)) {
    return everything.data.map((catalogue: CatalogueWithWebsites) => ({
      id: catalogue.id,
      name: catalogue.name,
      userId: catalogue.userId,
    }));
  }
  return [];
});

export const catalogueById = atomFamily((catalogueId: number) =>
  atom((get) => {
    const everything = get(everythingAtomLoadable);

    if (everything.state == "hasData" && Array.isArray(everything.data)) {
      const catalogue = everything.data.find(
        (c: Catalogue) => c.id === catalogueId,
      ) as CatalogueWithWebsites;
      return catalogue || null;
    }

    return null;
  }),
);
