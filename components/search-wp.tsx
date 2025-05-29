"use client";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSetAtom, useAtomValue } from "jotai";
import { wpDashboardAtom } from "@/store/atoms/dashboardAtom";
import { wpFeedAtomLoadable } from "@/store/atoms/feedAtom";

export function SearchWP() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const wp = useAtomValue(wpFeedAtomLoadable);
  const setFeedDashboardAtom = useSetAtom(wpDashboardAtom);
  return (
    <>
      <div
        className="border rounded-lg px-12 sm:px-36 py-3 bg-white dark:bg-[#17171A]"
        onClick={() => setOpen(true)}
      >
        <p className="text-xs text-muted-foreground">
          Search With{"  "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>/
          </kbd>
        </p>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for WordpressFeed..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="WordPress Feed">
            {wp.state == "hasData" &&
              Array.isArray(wp.data) &&
              wp.data.map((pub) => {
                return (
                  <CommandItem
                    key={pub.title}
                    onSelect={() => {
                      setOpen(false);
                      setFeedDashboardAtom({
                        search: true,
                        feedTitle: pub.title ?? "",
                      });
                    }}
                  >
                    {pub.title}
                  </CommandItem>
                );
              })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
