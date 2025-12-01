"use client";
import { wpFeedAtomLoadable, paginatedWPFeedAtom } from "@/store/atoms/feedAtom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { WordpressFeed, WordpressFeedItem } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { SearchWP } from "@/components/search-wp";
import { Skeleton } from "@/components/ui/skeleton";
import { wpDashboardAtom } from "@/store/atoms/dashboardAtom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePersistedWPDashboardAtom } from "@/hooks/use-persisted-dashboard-atom";
import { wpFeedPaginationAtom, wpFeedTotalPagesAtom } from "@/store/atoms/paginationAtom";
import { FeedPagination } from "@/components/feed-pagination";
import { useEffect } from "react";

export default function WPFeed() {
  usePersistedWPDashboardAtom();
  const wpFeed = useAtomValue(wpFeedAtomLoadable);
  const paginatedFeed = useAtomValue(paginatedWPFeedAtom);
  const [pagination, setPagination] = useAtom(wpFeedPaginationAtom);
  const totalPages = useAtomValue(wpFeedTotalPagesAtom);

  useEffect(() => {
    if (paginatedFeed.totalItems !== pagination.totalItems) {
      setPagination((prev) => ({
        ...prev,
        totalItems: paginatedFeed.totalItems,
      }));
    }
  }, [paginatedFeed.totalItems, pagination.totalItems, setPagination]);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <div>
      <div className="flex justify-center text-2xl font-semibold text-[#FB8500]">
        <SearchWP />
      </div>
      {wpFeed.state === "hasData" && wpFeed.data.length > 0 ? (
        <>
          <DisplayWPFeed wpFeed={paginatedFeed.data as WordpressFeed[]} />
          <FeedPagination
            currentPage={pagination.currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : wpFeed.state === "hasData" && wpFeed.data.length == 0 ? (
        <div>
          <div className="flex justify-center mt-18 text-xl text-center max-w-[90vw] text-wrap">
            <div>
              Feed is empty, go to edit and add your favourite{" "}
              <span className="text-[#FB8500] font-serif italic text-2xl text-nowrap">
                WordPress Feed
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col justify-center">
            {Array.from({ length: 3 }).map((_, outerIdx) => (
              <div key={outerIdx} className="mt-4">
                <div className="flex justify-center mt-4">
                  <Carousel>
                    <CarouselContent className="max-w-[80vw]">
                      {Array.from({ length: 6 }).map((_, InnerIdx) => (
                        <CarouselItem
                          key={InnerIdx}
                          className="md:basis-1/2 xl:basis-1/3"
                        >
                          <Card className="w-[75vw] sm:w-[60vw] md:w-[35vw] xl:w-[25vw]">
                            <CardContent>
                              <Skeleton className="w-[100%] h-[360px]" />
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DisplayWPFeed({ wpFeed }: { wpFeed: WordpressFeed[] }) {
  const { search, feedTitle } = useAtomValue(wpDashboardAtom);
  const setwpDashboardAtom = useSetAtom(wpDashboardAtom);
  if (!search) {
    return (
      <div className="flex flex-col justify-center">
        {wpFeed.map((pub: WordpressFeed) => (
          <div key={pub.title} id={pub.title} className="mt-4">
            <div className="text-xl font-semibold">{pub.title}</div>
            <div className="flex justify-center mt-4">
              <Carousel>
                <CarouselContent className="max-w-[80vw]">
                  {pub.items.map((item: WordpressFeedItem) => (
                    <CarouselItem
                      key={item.guid}
                      className={pub.items.length === 1 ? "" : "md:basis-1/2 xl:basis-1/3"}
                    >
                      <Card>
                        <CardContent>
                          <Link href={item.link} target="_blank">
                            <div className="relative w-full h-[240px] md:h-[360px]">
                              <Image
                                src={
                                  item["media:content"]?.[
                                    pub.image < item["media:content"]?.length
                                      ? pub.image
                                      : 0
                                  ]?.$.url ?? "/assets/notfound.jpg"
                                }
                                alt={item.title}
                                fill
                                className="rounded-lg object-cover"
                              />
                            </div>
                            <p className="truncate mt-2 max-w-[426px] font-semibold text-lg">
                              {item.title}
                            </p>
                            <p className="line-clamp-3 mt-2 max-w-[426px] text-sm">
                              {item.contentSnippet}
                            </p>
                          </Link>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        ))}
      </div>
    );
  }
  const newWP = wpFeed.filter((pub) => pub.title === feedTitle);
  return (
    <>
      <div className="m-3">
        <div className="flex justify-end">
          <Button
            className="hover:cursor-pointer"
            onClick={() => setwpDashboardAtom({ search: false, feedTitle: "" })}
            variant={"destructive"}
          >
            <X />
          </Button>
        </div>
        <div className="flex flex-col justify-center">
          {newWP.map((pub: WordpressFeed) => (
            <div key={pub.title} id={pub.title} className="mt-4">
              <div className="text-xl font-semibold">{pub.title}</div>
              <div className="flex justify-center mt-4">
                <Carousel>
                  <CarouselContent className="max-w-[80vw]">
                    {pub.items.map((item: WordpressFeedItem) => (
                      <CarouselItem
                        key={item.guid}
                        className={pub.items.length === 1 ? "" : "md:basis-1/2 xl:basis-1/3"}
                      >
                        <Card>
                          <CardContent>
                            <Link href={item.link} target="_blank">
                              <div className="relative w-full h-[240px] md:h-[360px]">
                                <Image
                                  src={
                                    item["media:content"]?.[
                                      pub.image < item["media:content"]?.length
                                        ? pub.image
                                        : 0
                                    ]?.$.url ?? "/assets/notfound.jpg"
                                  }
                                  alt={item.title}
                                  fill
                                  className="rounded-lg object-cover"
                                />
                              </div>
                              <p className="truncate mt-2 max-w-[426px] font-semibold text-lg">
                                {item.title}
                              </p>
                              <p className="line-clamp-3 mt-2 max-w-[426px] text-sm">
                                {item.contentSnippet}
                              </p>
                            </Link>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
