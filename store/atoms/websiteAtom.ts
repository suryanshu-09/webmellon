import { Catalogue } from "@/prisma/generated/zod";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { everythingAtom } from "@/store/atoms/everythingAtom";
import { CatalogueWithWebsites } from "@/types/types";

export const websitesAtom = atomFamily((catalogueId: number | undefined) =>
  atom((get) => {
    const { data: result, loading } = get(everythingAtom);

    if (catalogueId === undefined) {
      const allwebsites = get(allWebsitesAtom);
      return allwebsites;
    }

    if (!loading && Array.isArray(result)) {
      const catalogue = result.find((c: Catalogue) => c.id === catalogueId);
      return catalogue ? catalogue.websites : [];
    }

    return [];
  }),
);

export const allWebsitesAtom = atom((get) => {
  const { data: everything, loading } = get(everythingAtom);

  if (!loading && Array.isArray(everything)) {
    // Flatten the nested arrays into a single array
    const websites = everything.flatMap(
      (cat: CatalogueWithWebsites) => cat.websites,
    );
    return websites;
  }

  return null;
});
