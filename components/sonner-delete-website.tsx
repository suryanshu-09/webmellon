"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useAtomValue } from "jotai"
import { selectedWebsiteAtomLoadable } from "@/store/atoms/selectedAtom"
import { deleteWebsite } from "@/actions/delete"

export function SonnerDeleteWebsite() {
  const selectedWebsite = useAtomValue(selectedWebsiteAtomLoadable)

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

  const handleDelete = async () => {
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
      console.log(selectedWebsite.data)
      await deleteWebsite(selectedWebsite.data)

      toast.success("Website Deleted", {
        description: `Successfully deleted ${selectedWebsite.data.name}`,
        action: {
          label: "Close",
          onClick: () => {
            window.location.reload()
          },
        },
      })

      // Reload if you're not managing state updates manually
    } catch (err) {
      toast.error("Error", {
        description: "Something went wrong while deleting the website.",
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
      Delete Website
    </Button>
  )
}
