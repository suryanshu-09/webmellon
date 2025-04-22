"use client"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { useAtomValue, useSetAtom } from "jotai";
import { catalogueAtom } from "@/store/atoms/catalogueAtom";
import { websitesAtom } from "@/store/atoms/websiteAtom";
import { Catalogue, Website } from "@/prisma/generated/zod";
import { selectedCatalogueAtom, selectedCatalogueAtomLoadable, selectedWebsiteAtom } from "@/store/atoms/selectedAtom";
export type DataType = "catalogue" | "website";

export function SelectEdit({ dataType }: { dataType: DataType }) {
  const catalogues = useAtomValue(catalogueAtom);
  const setCatalogueAtom = useSetAtom(selectedCatalogueAtom);
  const setWebsiteAtom = useSetAtom(selectedWebsiteAtom);
  const selectedCatalogue = useAtomValue(selectedCatalogueAtomLoadable);
  const websites = useAtomValue(
    websitesAtom(selectedCatalogue.state === "hasData" && selectedCatalogue.data?.id ? selectedCatalogue.data.id : undefined)
  );
  const handleSelect = (value: string) => {
    if (dataType === "catalogue") {
      const selected = Array.isArray(catalogues) && catalogues.find((cat) => String(cat.id) === value);
      if (selected) setCatalogueAtom(selected);
    } else {
      const selected = Array.isArray(websites) && websites.find((web) => String(web.id) === value);
      if (selected) setWebsiteAtom(selected);
    }
  };
  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select a ${dataType}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{dataType === "catalogue" ? "Catalogue" : "Website"}</SelectLabel>

          {dataType === "catalogue" ? (
            catalogues.length === 0 ? (
              <SelectItem value="catalogue" disabled>
                No Catalogue in system. Please add a few.
              </SelectItem>
            ) : (
              catalogues.map((cat: Catalogue) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))
            )
          ) : !Array.isArray(websites) || websites.length === 0 ? (
            <SelectItem value="website" disabled>
              No Website in system. Please add a few.
            </SelectItem>
          ) : (
            websites.map((web: Website) => (
              <SelectItem key={web.id} value={String(web.id)}>
                {web.name}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select >
  );
}
