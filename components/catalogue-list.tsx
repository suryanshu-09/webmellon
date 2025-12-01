"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { CatalogueWithWebsites } from "@/types/types";
import DisplayCatalogue from "@/components/display-catalogue";
import { paginatedCataloguesLoadable } from "@/store/atoms/everythingAtom";
import { dashboardAtom } from "@/store/atoms/dashboardAtom";
import { Button } from "@/components/ui/button";
import { catalogueById } from "@/store/atoms/catalogueAtom";
import { X } from "lucide-react";
import Link from "next/link";
import { usePersistedDashboardAtom } from "@/hooks/use-persisted-dashboard-atom";
import { Skeleton } from "@/components/ui/skeleton";
import { cataloguePaginationAtom } from "@/store/atoms/paginationAtom";
import { FeedPagination } from "@/components/feed-pagination";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function CatalogueList() {
  usePersistedDashboardAtom();
  const cataloguesData = useAtomValue(paginatedCataloguesLoadable);
  const [pagination, setPagination] = useAtom(cataloguePaginationAtom);
  const { search, catalogueId } = useAtomValue(dashboardAtom);
  const setDashboardAtom = useSetAtom(dashboardAtom);
  const catalogue: CatalogueWithWebsites | null = useAtomValue(
    catalogueById(catalogueId)
  );
  const queryClient = useQueryClient();

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Prefetch next page when user is on current page
  useEffect(() => {
    if (cataloguesData.state === "hasData") {
      const { pagination: paginationInfo } = cataloguesData.data;
      const hasNextPage = paginationInfo.currentPage < paginationInfo.totalPages;
      
      if (hasNextPage) {
        // Prefetch next page after a short delay
        const timer = setTimeout(() => {
          const nextPage = paginationInfo.currentPage + 1;
          // This will trigger a background fetch for the next page
          // The data will be cached by React Query for instant loading
          queryClient.prefetchQuery({
            queryKey: ["catalogues", nextPage, pagination.itemsPerPage, pagination.sortBy],
            queryFn: async () => {
              const params = new URLSearchParams({
                page: nextPage.toString(),
                limit: pagination.itemsPerPage.toString(),
                sortBy: pagination.sortBy,
              });
              const response = await fetch(`/api/catalogues?${params}`);
              if (!response.ok) throw new Error("Failed to prefetch catalogues");
              return response.json();
            },
          });
        }, 1000); // Prefetch after 1 second

        return () => clearTimeout(timer);
      }
    }
  }, [cataloguesData, pagination, queryClient]);

  // Show individual catalogue when search is active
  if (catalogue && search) {
    return (
      <div className="m-3">
        <div className="flex justify-end">
          <Button
            className="hover:cursor-pointer"
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

  // Loading state
  if (cataloguesData.state !== "hasData") {
    return (
      <div className="min-h-screen flex flex-col items-center mt-12 px-4">
        {Array.from({ length: 3 }).map((_, outerIdx) => (
          <div key={outerIdx} className="w-full max-w-screen mb-12">
            <Skeleton className="rounded-lg w-60 h-14 mb-6 mx-auto" />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, innerIdx) => (
                <Skeleton
                  key={innerIdx}
                  className="border rounded-lg p-3 w-[80%] lg:w-[70%] xl:[60%] h-14 mx-auto"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const { catalogues, pagination: paginationInfo } = cataloguesData.data;
  const typedCatalogues = catalogues as unknown as CatalogueWithWebsites[];

  // Empty state - no catalogues at all
  if (typedCatalogues.length === 0) {
    return (
      <div className="flex justify-center mt-4 text-justify">
        <div className="flex justify-center mt-6 text-lg text-center max-w-[90vw]">
          <div>
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
      </div>
    );
  }

  return (
    <div className="m-3">
      {/* Catalogues Grid */}
      <div>
        {typedCatalogues.map((cat: CatalogueWithWebsites, index: number) => {
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

      {/* Pagination Controls */}
      <FeedPagination
        currentPage={paginationInfo.currentPage}
        totalPages={paginationInfo.totalPages}
        onPageChange={handlePageChange}
      />

      {/* Pagination Info */}
      <div className="text-center text-sm text-gray-500 mt-2">
        Showing {typedCatalogues.length} of {paginationInfo.totalItems}{" "}
        catalogue(s)
      </div>
    </div>
  );
}
