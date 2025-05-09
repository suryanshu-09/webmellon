"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { CatalogueWithWebsites } from "@/types/types";
import DisplayCatalogue from "@/components/display-catalogue";
import { everythingAtom } from "@/store/atoms/everythingAtom";
import { dashboardAtom } from "@/store/atoms/dashboardAtom";
import { Button } from "@/components/ui/button";
import { catalogueById } from "@/store/atoms/catalogueAtom";
import { X } from "lucide-react";
import Link from "next/link";
import { usePersistedDashboardAtom } from "@/hooks/use-persisted-dashboard-atom";
import { Skeleton } from "@/components/ui/skeleton";

export default function CatalogueList() {
  usePersistedDashboardAtom();
  const { data: catalogues, loading } = useAtomValue(everythingAtom);
  const { search, catalogueId } = useAtomValue(dashboardAtom);
  const setDashboardAtom = useSetAtom(dashboardAtom);
  const catalogue: CatalogueWithWebsites | null = useAtomValue(
    catalogueById(catalogueId),
  );
  if (!search) {
    if (loading) {
      return (
        <div className="min-h-screen flex flex-col items-center mt-12 px-4">
          {Array.from({ length: 3 }).map((_, outerIdx) => (
            <div key={outerIdx} className="w-full max-w-screen mb-12">
              <Skeleton className="rounded-lg w-60 h-15 mb-6 mx-auto" />

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, innerIdx) => (
                  <Skeleton
                    key={innerIdx}
                    className="border rounded-lg p-3 w-[60%] h-15 mx-auto"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (Array.isArray(catalogues)) {
      if (catalogues.length === 0) {
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
        );
      }
      return (
        <div className="m-3">
          {catalogues.map((cat: CatalogueWithWebsites, index: number) => {
            const delay = 0.1 + index * 0.15;
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
          <Button
            onClick={() =>
              setDashboardAtom({ search: false, catalogueId: NaN })
            }
            variant={"destructive"}
          >
            <X />
          </Button>
        </div>
        <div>
          <div className="my-6">
            <DisplayCatalogue catalogue={catalogue} />
          </div>
        </div>
      </div>
    );
  }
}
