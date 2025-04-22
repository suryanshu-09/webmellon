'use client';

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { CatalogueWithWebsites } from "@/types/types";
import DisplayCatalogue from "@/components/display-catalogue";
import { everythingAtomLoadable } from "@/store/atoms/everythingAtom";
import { dashboardAtom } from "@/store/atoms/dashboardAtom";
import { Button } from "@/components/ui/button";
import { catalogueById } from "@/store/atoms/catalogueAtom";
import { X } from "lucide-react";
import Link from "next/link";

export default function CatalogueList() {
  const [catalogues] = useAtom(everythingAtomLoadable);
  const { search, catalogueId } = useAtomValue(dashboardAtom);
  const setDashboardAtom = useSetAtom(dashboardAtom)
  const catalogue: CatalogueWithWebsites | null = useAtomValue(catalogueById(catalogueId))
  if (!search) {

    if (catalogues.state === "loading") {
      return <div>Loading...</div>;
    }

    if (catalogues.state === "hasError") {
      return <div>Error</div>;
    }
    if (catalogues.state === "hasData" && Array.isArray(catalogues.data)) {

      if (catalogues.data.length === 0) {
        return (
          <div className="flex justify-center mt-4">
            <div className="flex justify-center mt-6 text-lg">
              Please go to the edit page to add
              <span className="font-serif font-normal text-[#FB8500] text-2xl italic px-0.75 lg:px-1">
                <Link href={"/edit/catalogues"}>Catalogue</Link>
              </span>
              and
              <span className="font-serif font-normal text-[#FB8500] text-2xl italic px-1">
                <Link href={"/edit/websites"}>Websites</Link>
              </span>
            </div>
          </div>
        )
      }
      return (
        <div className="m-3">
          {catalogues.data.map((cat: CatalogueWithWebsites, index: number) => {
            const delay = 0.1 + index * 0.2;
            return (
              <div
                key={cat.id}
                className="animate-slide-up"
                style={{ animationDelay: `${delay}s` }}
              >
                <DisplayCatalogue catalogue={cat} />
              </div>
            );
          })}
        </div>
      );
    }
  }
  if (catalogue && search) {
    return (
      <div className="m-3">
        <div className="flex justify-end">
          <Button onClick={() => setDashboardAtom({ search: false, catalogueId: NaN })} variant={"destructive"}><X /></Button>
        </div>
        <div>
          <div className="my-6">
            <DisplayCatalogue catalogue={catalogue} />
          </div>
        </div>
      </div>
    )

  }

}
