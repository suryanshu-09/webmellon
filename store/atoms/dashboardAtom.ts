import { atom } from "jotai";
import { dashboardState } from "@/types/types";

export const dashboardAtom = atom<dashboardState>({ search: false, catalogueId: NaN })
