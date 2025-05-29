import { atom } from "jotai";
import { dashboardState, feedState } from "@/types/types";

export const dashboardAtom = atom<dashboardState>({
  search: false,
  catalogueId: NaN,
});

export const wpDashboardAtom = atom<feedState>({
  search: false,
  feedTitle: "",
});

export const ytDashboardAtom = atom<feedState>({
  search: false,
  feedTitle: "",
});

export const newsDashboardAtom = atom<feedState>({
  search: false,
  feedTitle: "",
});
