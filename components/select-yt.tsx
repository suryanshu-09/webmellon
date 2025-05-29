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
import { selectedYTAtom } from "@/store/atoms/selectedAtom";
import { ytFeedAtomLoadable } from "@/store/atoms/feedAtom";
import { YoutubeFeed } from "@/types/types";
export type DataType = "catalogue" | "website";

export default function SelectYT() {
  const yt = useAtomValue(ytFeedAtomLoadable);
  const setSelectYT = useSetAtom(selectedYTAtom);

  const handleSelect = (value: string) => {
    if (yt.state == "hasData") {
      const selected = yt.data.find(({ channelId }) => channelId == value);
      setSelectYT(selected?.channelId ?? "");
    }
  };
  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a YT channel" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Youtube Channels</SelectLabel>
          {yt.state == "hasData" &&
          Array.isArray(yt.data) &&
          yt.data.length != 0 ? (
            yt.data.map((channel: YoutubeFeed) => (
              <SelectItem key={channel.channelId} value={channel.channelId}>
                {channel.title}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="channel" disabled>
              No Channel in system. Please add a few.
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
