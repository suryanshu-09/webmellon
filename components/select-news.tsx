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
import { selectedNewsAtom } from "@/store/atoms/selectedAtom";
import { newsFeedAtomLoadable } from "@/store/atoms/feedAtom";
export type DataType = "catalogue" | "website";

export default function SelectNews() {
  const news = useAtomValue(newsFeedAtomLoadable);
  const setSelectNews = useSetAtom(selectedNewsAtom);

  const handleSelect = (value: string) => {
    if (news.state == "hasData") {
      const selected = news.data.find(({ url }) => url == value);
      setSelectNews(selected?.url ?? "");
    }
  };
  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a News Publication" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>News Feed</SelectLabel>
          {news.state == "hasData" &&
          Array.isArray(news.data) &&
          news.data.length != 0 ? (
            news.data.map((pub) => (
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
