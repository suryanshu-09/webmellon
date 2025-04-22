"use client"

import * as React from "react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useSetAtom, useAtomValue } from "jotai"
import { Catalogue, Website } from "@/prisma/generated/zod"
import { allWebsitesAtom } from "@/store/atoms/websiteAtom"
import { catalogueAtom } from "@/store/atoms/catalogueAtom"
import { dashboardAtom } from "@/store/atoms/dashboardAtom"

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const websites = useAtomValue(allWebsitesAtom);
  const catalogues = useAtomValue(catalogueAtom);
  const setDashboardAtom = useSetAtom(dashboardAtom);
  return (
    <>
      <div className="border rounded-lg px-36 py-3 bg-white" onClick={() => setOpen(true)}>
        <p className="text-xs text-muted-foreground">
          Search With{"  "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>/
          </kbd>
        </p>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for Websites or Catalogues..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Catalogues">
            {Array.isArray(catalogues) && catalogues.map((cat: Catalogue) => {
              return <CommandItem
                key={cat.id}
                onSelect={() => {
                  setOpen(false)
                  setDashboardAtom({ search: true, catalogueId: cat.id })
                }}
              >
                {cat.name}
              </CommandItem>
            })
            }
          </CommandGroup>
          <CommandGroup heading="Websites">
            {Array.isArray(websites) && websites.map((web: Website) => {
              return <CommandItem
                key={web.id}
                onSelect={() => window.open(web.url ?? "", "_blank")}
              >
                {web.name}
              </CommandItem>
            })
            }
          </CommandGroup>
        </CommandList>
      </CommandDialog >
    </>
  )
}
