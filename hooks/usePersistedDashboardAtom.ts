"use client"

import { useEffect } from "react"
import { useAtom } from "jotai"
import { dashboardAtom } from "@/store/atoms/dashboardAtom"

export function usePersistedDashboardAtom() {
  const [dashboard, setDashboard] = useAtom(dashboardAtom)

  useEffect(() => {
    const storedSearch = sessionStorage.getItem("dashboard_search")
    const storedCatalogueId = sessionStorage.getItem("dashboard_catalogueId")

    if (storedSearch !== null && storedCatalogueId !== null) {
      setDashboard({
        search: storedSearch === "true",
        catalogueId: parseInt(storedCatalogueId, 10),
      })
    }
  }, [setDashboard])

  // Save to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem("dashboard_search", dashboard.search.toString())
    sessionStorage.setItem("dashboard_catalogueId", dashboard.catalogueId.toString())
  }, [dashboard])
}
