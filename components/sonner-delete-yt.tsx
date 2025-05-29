"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { selectedYTAtom } from "@/store/atoms/selectedAtom";
import { deleteYT } from "@/actions/delete";
import { userAtom } from "@/store/atoms/userAtom";

export function SonnerDeleteYT() {
  const selectedChannel = useAtomValue(selectedYTAtom);
  const user = useAtomValue(userAtom);

  const handleDelete = async () => {
    if (selectedChannel == "") {
      toast.warning("Please select a Channel", {
        description: "No Channel Selected",
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
      await deleteYT({ channelId: selectedChannel, userId: user?.id ?? "" });

      toast.success("Channel Deleted", {
        description: `Successfully deleted ${selectedChannel}`,
        action: {
          label: "Close",
          onClick: () => {
            window.location.reload();
          },
        },
      });
    } catch {
      toast.error("Error", {
        description: "Something went wrong while deleting the channel.",
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
      Delete Channel
    </Button>
  );
}
