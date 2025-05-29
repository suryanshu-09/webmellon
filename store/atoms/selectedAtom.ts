import { Catalogue, Website } from "@/prisma/generated/zod";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const selectedCatalogueAtom = atom<Catalogue | null>(null);
export const selectedCatalogueAtomLoadable = loadable<Catalogue | null>(
  selectedCatalogueAtom,
);
export const selectedWebsiteAtom = atom<Website | null>(null);
export const selectedWebsiteAtomLoadable = loadable<Website | null>(
  selectedWebsiteAtom,
);

export const nameCatalogueAtom = atom("");
export const nameWebsiteAtom = atom("");
export const urlWebsiteAtom = atom("");

export const selectedYTAtom = atom<string>("");
export const selectedWPAtom = atom<string>("");
export const selectedNewsAtom = atom<string>("");

export const channelYTAtom = atom("");
export const urlWPAtom = atom("");
export const urlNewsAtom = atom("");
export const imageWPAtom = atom(0);
