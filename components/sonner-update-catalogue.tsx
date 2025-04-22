"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useAtomValue } from "jotai"
import { nameCatalogueAtom, selectedCatalogueAtomLoadable } from "@/store/atoms/selectedAtom"
import { updateCatalogue } from "@/actions/update"

export function SonnerUpdateCatalogue() {
  const selectedCatalogue = useAtomValue(selectedCatalogueAtomLoadable)
  const newName = useAtomValue(nameCatalogueAtom)

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

  const handleUpdate = async () => {
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
      // Update catalogue with the new name (or retain old name if not updated)
      const updatedCatalogue = { ...selectedCatalogue.data, name: newName || selectedCatalogue.data.name }

      await updateCatalogue(updatedCatalogue) // Send updated catalogue

      toast.success("Catalogue has been updated", {
        description: `Successfully updated ${updatedCatalogue.name}`,
        action: {
          label: "Close",
          onClick: () => {
            window.location.reload()
          },
        },
      })


    } catch (_) {
      toast.error("Update failed", {
        description: "Something went wrong while updating.",
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
    <Button variant="default" onClick={handleUpdate}>
      Save Changes
    </Button>
  )
}
