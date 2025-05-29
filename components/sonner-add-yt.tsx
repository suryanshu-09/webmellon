"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { channelYTAtom } from "@/store/atoms/selectedAtom";
import { putYT } from "@/actions/put";
import { userAtom } from "@/store/atoms/userAtom";

export function SonnerAddYT() {
  const newChannel = useAtomValue(channelYTAtom);
  const user = useAtomValue(userAtom);

  const handleAdd = async () => {
    if (newChannel === "") {
      toast.warning("Incorrect Id", {
        description: "Please enter a valid Id",
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
      if (newChannel != "") {
        await putYT({ userId: user?.id ?? "", channelId: newChannel });
      }

      toast.success("Channel Added", {
        description: `Successfully added ${newChannel}`,
        action: {
          label: "Close",
          onClick: () => {
            window.location.reload();
          },
        },
      });

      // Reload if you're not managing state updates manually
    } catch {
      toast.error("Error", {
        description: "Something went wrong while adding the channel.",
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
    <Button variant="default" onClick={handleAdd}>
      Add Channel
    </Button>
  );
}
