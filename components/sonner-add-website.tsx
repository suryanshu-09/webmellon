"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useAtomValue } from "jotai"
import { nameWebsiteAtom, selectedCatalogueAtomLoadable, urlWebsiteAtom } from "@/store/atoms/selectedAtom"
import { putWebsite } from "@/actions/put"
import { userAtom } from "@/store/atoms/userAtom"

export function SonnerAddWebsite() {
  const selectedCatalogue = useAtomValue(selectedCatalogueAtomLoadable);
  const name = useAtomValue(nameWebsiteAtom);
  const url = useAtomValue(urlWebsiteAtom)
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
      if (selectedCatalogue.state === "hasData" && selectedCatalogue.data?.id) {
        const website = {
          name,
          url: new URL(url).toString(),
          favicon: `https://www.google.com/s2/favicons?sz=64&domain=${new URL(url).hostname}`,
          catalogueId: selectedCatalogue.data.id,
          userId: user?.id ?? ""
        };
        await putWebsite(website)
      }

      toast.success("Website Added", {
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
        description: "Something went wrong while adding the website.",
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
      Add Website
    </Button>
  )
}
