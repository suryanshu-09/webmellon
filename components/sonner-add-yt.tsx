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
            // window.location.reload();
          },
        },
      });
      return;
    }

    try {
      if (newChannel != "") {
        await putYT({ userId: user?.id ?? "", channelId: newChannel });
      }

      sessionStorage.setItem("ytfeed", "");
      toast.success("Channel Added", {
        description: `Successfully added ${newChannel}`,
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
        description: "Something went wrong while adding the channel.",
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
    <Button variant="default" onClick={handleAdd}>
      Add Channel
    </Button>
  );
}
