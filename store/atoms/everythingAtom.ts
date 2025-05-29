import { CatalogueWithWebsites } from "@/types/types";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const everythingAtom = atom<CatalogueWithWebsites[] | null>(null);

export const everythingDataAtom = atom(async (get) => {
  const everything = get(everythingAtom);
  if (!everything) return [] as CatalogueWithWebsites[];
  return everything;
});

export const everythingAtomLoadable = loadable(everythingDataAtom);
