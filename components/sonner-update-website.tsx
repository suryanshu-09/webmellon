"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useAtomValue } from "jotai"
import { nameWebsiteAtom, selectedWebsiteAtomLoadable, urlWebsiteAtom } from "@/store/atoms/selectedAtom"
import { updateWebsite } from "@/actions/update"

export function SonnerUpdateWebsite() {

  const selectedWebsite = useAtomValue(selectedWebsiteAtomLoadable)
  const newName = useAtomValue(nameWebsiteAtom)
  const newUrl = useAtomValue(urlWebsiteAtom)

  // Show loading state until the data is fetched
  if (selectedWebsite.state === "loading") {
    return (
      <div>Loading...</div>
    )
  }

  // Show error if something went wrong during fetch
  if (selectedWebsite.state === "hasError") {
    return (
      <div>Error loading website</div>
    )
  }

  const handleUpdate = async () => {
    if (selectedWebsite.state !== "hasData" || !selectedWebsite.data) {
      toast.warning("Please select a Website", {
        description: "No Website Selected",
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
      // Update website with the new name (or retain old name if not updated)
      const updatedWebsite = {
        ...selectedWebsite.data,
        name: newName || selectedWebsite.data.name,
        url: newUrl ? new URL(newUrl).toString() : selectedWebsite.data.url,
        favicon: `https://www.google.com/s2/favicons?sz=64&domain=${new URL(newUrl || selectedWebsite.data.url).hostname}`
      };

      await updateWebsite(updatedWebsite) // Send updated website

      toast.success("Catalogue has been updated", {
        description: `Successfully updated ${updatedWebsite.name}`,
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
