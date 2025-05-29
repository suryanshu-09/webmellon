"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { imageWPAtom, urlWPAtom } from "@/store/atoms/selectedAtom";
import { putWP } from "@/actions/put";
import { userAtom } from "@/store/atoms/userAtom";

export function SonnerAddWP() {
  const newPub = useAtomValue(urlWPAtom);
  const newImage = useAtomValue(imageWPAtom);
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
        await putWP({ userId: user?.id ?? "", url: newPub, image: newImage });
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
