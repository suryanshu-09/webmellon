import { CatalogueWithWebsites } from "@/types/types";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const everythingAtom = atom<CatalogueWithWebsites[] | null>(null);
export const everythingAtomLoadable = loadable<CatalogueWithWebsites[] | null>(everythingAtom);
