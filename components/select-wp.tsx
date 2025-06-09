"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedWPAtom } from "@/store/atoms/selectedAtom";
import { wpFeedAtomLoadable } from "@/store/atoms/feedAtom";
export type DataType = "catalogue" | "website";

export default function SelectWP() {
  const wp = useAtomValue(wpFeedAtomLoadable);
  const setSelectWP = useSetAtom(selectedWPAtom);

  const handleSelect = (value: string) => {
    if (wp.state == "hasData") {
      const selected = wp.data.find(({ url }: { url: string }) => url == value);
      setSelectWP(selected?.url ?? "");
    }
  };
  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a WordPress Publication" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>WordPress Feed</SelectLabel>
          {wp.state == "hasData" &&
          Array.isArray(wp.data) &&
          wp.data.length != 0 ? (
            wp.data.map((pub) => (
              <SelectItem key={pub.url} value={pub.url}>
                {pub.title}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="publication" disabled>
              No Publication in system. Please add a few.
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
