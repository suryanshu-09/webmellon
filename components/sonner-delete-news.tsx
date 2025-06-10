"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { selectedNewsAtom } from "@/store/atoms/selectedAtom";
import { deleteNews } from "@/actions/delete";
import { userAtom } from "@/store/atoms/userAtom";

export function SonnerDeleteNews() {
  const selectedPub = useAtomValue(selectedNewsAtom);
  const user = useAtomValue(userAtom);

  const handleDelete = async () => {
    if (selectedPub == "") {
      toast.warning("Please select a Publication", {
        description: "No Publication Selected",
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
      await deleteNews({ url: selectedPub, userId: user?.id ?? "" });

      sessionStorage.setItem("newsfeed", "");
      toast.success("Publication Deleted", {
        description: `Successfully deleted ${selectedPub}`,
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
        description: "Something went wrong while deleting the publication.",
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
      Delete Publication
    </Button>
  );
}
