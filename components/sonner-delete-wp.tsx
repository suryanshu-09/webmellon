"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { selectedWPAtom } from "@/store/atoms/selectedAtom";
import { deleteWP } from "@/actions/delete";
import { userAtom } from "@/store/atoms/userAtom";

export function SonnerDeleteWP() {
  const selectedPub = useAtomValue(selectedWPAtom);
  const user = useAtomValue(userAtom);

  const handleDelete = async () => {
    if (selectedPub == "") {
      toast.warning("Please select a Publication", {
        description: "No Publication Selected",
        action: {
          label: "Close",
          onClick: () => {
            window.location.reload();
          },
        },
      });
      return;
    }

    try {
      await deleteWP({ url: selectedPub, userId: user?.id ?? "" });

      toast.success("Publication Deleted", {
        description: `Successfully deleted ${selectedPub}`,
        action: {
          label: "Close",
          onClick: () => {
            window.location.reload();
          },
        },
      });
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
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete Publication
    </Button>
  );
}
