"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { urlNewsAtom } from "@/store/atoms/selectedAtom";
import { putNews } from "@/actions/put";
import { userAtom } from "@/store/atoms/userAtom";

export function SonnerAddNews() {
  const newPub = useAtomValue(urlNewsAtom);
  const user = useAtomValue(userAtom);

  const handleAdd = async () => {
    if (newPub === "") {
      toast.warning("Incorrect Url", {
        description: "Please enter a valid Url",
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
      if (newPub != "") {
        await putNews({ userId: user?.id ?? "", url: newPub });
      }

      toast.success("Publication Added", {
        description: `Successfully added ${newPub}`,
        action: {
          label: "Close",
          onClick: () => {
            window.location.reload();
          },
        },
      });
    } catch {
      toast.error("Error", {
        description: "Something went wrong while adding the publication.",
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
      Add Publication
    </Button>
  );
}
