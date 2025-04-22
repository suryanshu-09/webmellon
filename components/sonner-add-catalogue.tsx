"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useAtomValue } from "jotai"
import { nameCatalogueAtom } from "@/store/atoms/selectedAtom"
import { putCatalogue } from "@/actions/put"
import { userAtom } from "@/store/atoms/userAtom"

export function SonnerAddCatalogue() {
  const name = useAtomValue(nameCatalogueAtom);
  const user = useAtomValue(userAtom)

  const handleAdd = async () => {
    if (name === "") {
      toast.warning("Incorrect name", {
        description: "Please enter a valid name",
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
      const catalogue = { name, userId: user?.id ?? "" };
      await putCatalogue(catalogue)

      toast.success("Catalogue Added", {
        description: `Successfully added ${name}`,
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
        description: "Something went wrong while adding the catalogue.",
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
    <Button variant="default" onClick={handleAdd}>
      Add Catalogue
    </Button>
  )
}
