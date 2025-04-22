"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useAtomValue } from "jotai"
import { selectedCatalogueAtomLoadable, } from "@/store/atoms/selectedAtom"
import { deleteCatalogue } from "@/actions/delete"

export function SonnerDeleteCatalogue() {
  const selectedCatalogue = useAtomValue(selectedCatalogueAtomLoadable)

  // Show loading state until the data is fetched
  if (selectedCatalogue.state === "loading") {
    return (
      <div>Loading...</div>
    )
  }

  // Show error if something went wrong during fetch
  if (selectedCatalogue.state === "hasError") {
    return (
      <div>Error loading catalogue</div>
    )
  }

  const handleDelete = async () => {
    if (selectedCatalogue.state !== "hasData" || !selectedCatalogue.data) {
      toast.warning("Please select a Catalogue", {
        description: "No Catalogue Selected",
        action: {
          label: "Close",
          onClick: () => {
            window.location.reload()
          },
        },
      })
      return
    }

    try {
      await deleteCatalogue(selectedCatalogue.data)

      toast.success("Catalogue Deleted", {
        description: `Successfully deleted ${selectedCatalogue.data.name}`,
        action: {
          label: "Close",
          onClick: () => {
            window.location.reload()
          },
        },
      })

      // Reload if you're not managing state updates manually
    } catch (_) {
      toast.error("Error", {
        description: "Something went wrong while deleting the catalogue.",
        action: {
          label: "Close",
          onClick: () => {
            window.location.reload()
          },
        },
      })
    }
  }

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete Catalogue
    </Button>
  )
}
