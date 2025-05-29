"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  dashboardAtom,
  newsDashboardAtom,
  wpDashboardAtom,
  ytDashboardAtom,
} from "@/store/atoms/dashboardAtom";

export function usePersistedDashboardAtom() {
  const [dashboard, setDashboard] = useAtom(dashboardAtom);

  useEffect(() => {
    const storedSearch = sessionStorage.getItem("dashboard_search");
    const storedCatalogueId = sessionStorage.getItem("dashboard_catalogueId");

    if (storedSearch !== null && storedCatalogueId !== null) {
      setDashboard({
        search: storedSearch === "true",
        catalogueId: parseInt(storedCatalogueId, 10),
      });
    }
  }, [setDashboard]);

  // Save to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem("dashboard_search", dashboard.search.toString());
    sessionStorage.setItem(
      "dashboard_catalogueId",
      dashboard.catalogueId.toString(),
    );
  }, [dashboard]);
}

export function usePersistedWPDashboardAtom() {
  const [dashboard, setDashboard] = useAtom(wpDashboardAtom);

  useEffect(() => {
    const storedSearch = sessionStorage.getItem("wp_dashboard_search");
    const storedFeedTitle = sessionStorage.getItem("wp_dashboard_feedTitle");

    if (storedSearch !== null && storedFeedTitle !== null) {
      setDashboard({
        search: storedSearch === "true",
        feedTitle: storedFeedTitle,
      });
    }
  }, [setDashboard]);

  // Save to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem("wp_dashboard_search", dashboard.search.toString());
    sessionStorage.setItem("wp_dashboard_feedTitle", dashboard.feedTitle);
  }, [dashboard]);
}

export function usePersistedNewsDashboardAtom() {
  const [dashboard, setDashboard] = useAtom(newsDashboardAtom);

  useEffect(() => {
    const storedSearch = sessionStorage.getItem("news_dashboard_search");
    const storedFeedTitle = sessionStorage.getItem("news_dashboard_feedTitle");

    if (storedSearch !== null && storedFeedTitle !== null) {
      setDashboard({
        search: storedSearch === "true",
        feedTitle: storedFeedTitle,
      });
    }
  }, [setDashboard]);

  // Save to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem(
      "news_dashboard_search",
      dashboard.search.toString(),
    );
    sessionStorage.setItem("news_dashboard_feedTitle", dashboard.feedTitle);
  }, [dashboard]);
}

export function usePersistedYTDashboardAtom() {
  const [dashboard, setDashboard] = useAtom(ytDashboardAtom);

  useEffect(() => {
    const storedSearch = sessionStorage.getItem("yt_dashboard_search");
    const storedFeedTitle = sessionStorage.getItem("yt_dashboard_feedTitle");

    if (storedSearch !== null && storedFeedTitle !== null) {
      setDashboard({
        search: storedSearch === "true",
        feedTitle: storedFeedTitle,
      });
    }
  }, [setDashboard]);

  // Save to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem("yt_dashboard_search", dashboard.search.toString());
    sessionStorage.setItem("yt_dashboard_feedTitle", dashboard.feedTitle);
  }, [dashboard]);
}
