import { CatalogueWithWebsites } from "@/types/types";
import { atom } from "jotai";

export const everythingAtom = atom<{
  data: CatalogueWithWebsites[] | null;
  loading: boolean;
}>({ data: null, loading: true });
