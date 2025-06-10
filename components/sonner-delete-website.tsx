"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { selectedWebsiteAtomLoadable } from "@/store/atoms/selectedAtom";
import { deleteWebsite } from "@/actions/delete";

export function SonnerDeleteWebsite() {
  const selectedWebsite = useAtomValue(selectedWebsiteAtomLoadable);

  // Show loading state until the data is fetched
  if (selectedWebsite.state === "loading") {
    return <div>Loading...</div>;
  }

  // Show error if something went wrong during fetch
  if (selectedWebsite.state === "hasError") {
    return <div>Error loading website</div>;
  }

  const handleDelete = async () => {
    if (selectedWebsite.state !== "hasData" || !selectedWebsite.data) {
      toast.warning("Please select a Website", {
        description: "No Website Selected",
        action: {
          label: "Close",
          onClick: () => {
            // window.location.reload();
          },
        },
      });
      return;
    }

    try {
      await deleteWebsite(selectedWebsite.data);

      sessionStorage.setItem("catalogues", "");
      toast.success("Website Deleted", {
        description: `Successfully deleted ${selectedWebsite.data.name}`,
        action: {
          label: "Close",
          onClick: () => {
            window.location.reload();
          },
        },
      });

      setTimeout(() => window.location.reload(), 2000);
    } catch {
      toast.error("Error", {
        description: "Something went wrong while deleting the website.",
        action: {
          label: "Close",
          onClick: () => {
            window.location.reload();
          },
        },
      });
      setTimeout(() => window.location.reload(), 2000);
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete Website
    </Button>
  );
}
