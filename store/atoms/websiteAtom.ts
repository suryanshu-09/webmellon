import { Catalogue } from "@/prisma/generated/zod";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { everythingAtomLoadable } from "@/store/atoms/everythingAtom";
import { CatalogueWithWebsites } from "@/types/types";

export const websitesAtom = atomFamily((catalogueId: number | undefined) =>
  atom((get) => {
    const everything = get(everythingAtomLoadable);

    if (everything.state == "loading") {
      const allwebsites = get(allWebsitesAtom);
      return allwebsites;
    }

    if (everything.state == "hasData" && Array.isArray(everything.data)) {
      const catalogue = everything.data.find(
        (c: Catalogue) => c.id === catalogueId,
      );
      return catalogue ? catalogue.websites : [];
    }

    return [];
  }),
);

export const allWebsitesAtom = atom((get) => {
  const everything = get(everythingAtomLoadable);

  if (everything.state == "hasData" && Array.isArray(everything.data)) {
    // Flatten the nested arrays into a single array
    const websites = everything.data.flatMap(
      (cat: CatalogueWithWebsites) => cat.websites,
    );
    return websites;
  }

  return null;
});
