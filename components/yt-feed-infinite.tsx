"use client";
import { usePersistedYTDashboardAtom } from "@/hooks/use-persisted-dashboard-atom";
import { ytFeedAtomLoadable } from "@/store/atoms/feedAtom";
import { YoutubeFeed, YoutubeFeedItem } from "@/types/types";
import { useAtomValue, useSetAtom } from "jotai";
import { SearchYT } from "@/components/search-yt";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ytDashboardAtom } from "@/store/atoms/dashboardAtom";
import { X, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function YTFeedInfinite() {
  usePersistedYTDashboardAtom();
  const ytFeed = useAtomValue(ytFeedAtomLoadable);
  const [displayedItems, setDisplayedItems] = useState(6); // Fewer items for videos
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.5 });

  // Calculate total items across all publications
  const totalItems =
    ytFeed.state === "hasData"
      ? ytFeed.data.reduce((sum: number, pub: YoutubeFeed) => sum + pub.items.length, 0)
      : 0;

  const hasMore = displayedItems < totalItems;

  // Load more items when in view (fewer at a time for videos)
  useEffect(() => {
    if (inView && hasMore) {
      setDisplayedItems((prev) => Math.min(prev + 6, totalItems));
    }
  }, [inView, hasMore, totalItems]);

  // Track scroll position for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Create paginated feed data
  const paginatedFeedData =
    ytFeed.state === "hasData"
      ? (() => {
          const allItems: { pub: YoutubeFeed; item: YoutubeFeedItem }[] = [];
          ytFeed.data.forEach((pub: YoutubeFeed) => {
            pub.items.forEach((item: YoutubeFeedItem) => {
              allItems.push({ pub, item });
            });
          });

          // Group back by publication for display
          const displayed = allItems.slice(0, displayedItems);
          const groupedByPub: Map<string, { pub: YoutubeFeed; items: YoutubeFeedItem[] }> = new Map();

          displayed.forEach(({ pub, item }) => {
            const key = pub.title || pub.channelId;
            if (!groupedByPub.has(key)) {
              groupedByPub.set(key, { pub, items: [] });
            }
            groupedByPub.get(key)!.items.push(item);
          });

          return Array.from(groupedByPub.values()).map(({ pub, items }) => ({
            ...pub,
            items,
          }));
        })()
      : [];

  return (
    <div>
      <div className="flex justify-center text-2xl font-semibold text-[#FB8500]">
        <SearchYT />
      </div>
      {ytFeed.state === "hasData" && ytFeed.data.length > 0 ? (
        <>
          <DisplayYTFeed ytFeed={paginatedFeedData as YoutubeFeed[]} />
          
          {/* Loading indicator */}
          {hasMore && (
            <div ref={ref} className="flex justify-center py-8">
              <Skeleton className="w-20 h-20 rounded-full" />
              <p className="ml-4 text-gray-500">Loading more videos...</p>
            </div>
          )}

          {/* End of feed indicator */}
          {!hasMore && displayedItems > 0 && (
            <div className="text-center py-8 text-gray-500">
              You&apos;ve reached the end of your feed
            </div>
          )}

          {/* Back to top button */}
          {showBackToTop && (
            <Button
              className="fixed bottom-8 right-8 rounded-full w-12 h-12 p-0 shadow-lg"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <ArrowUp className="h-6 w-6" />
            </Button>
          )}
        </>
      ) : ytFeed.state === "hasData" && ytFeed.data.length == 0 ? (
        <div>
          <div className="flex justify-center mt-18 text-xl text-center max-w-[90vw] text-wrap">
            <div>
              Feed is empty, go to edit and add your favourite{" "}
              <span className="text-[#FB8500] font-serif italic text-2xl text-nowrap">
                Youtube channels
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
                          <Card className="w-[75vw] md:w-[35vw] xl:w-[25vw]">
                            <CardContent>
                              <Skeleton className="w-[100%] h-[240px]" />
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

function DisplayYTFeed({ ytFeed }: { ytFeed: YoutubeFeed[] }) {
  const { search, feedTitle } = useAtomValue(ytDashboardAtom);
  const setwpDashboardAtom = useSetAtom(ytDashboardAtom);

  if (!search) {
    return (
      <div className="flex flex-col justify-center">
        {ytFeed.map((pub: YoutubeFeed) => (
          <div key={pub.title || pub.channelId} id={pub.title || pub.channelId} className="mt-4">
            <div className="text-xl font-semibold">{pub.title || pub.channelId}</div>
            <div className="flex justify-center mt-4">
              <Carousel>
                <CarouselContent className="max-w-[80vw]">
                  {pub.items.map((item: YoutubeFeedItem) => (
                    <CarouselItem
                      key={item.title}
                      className="md:basis-1/2 xl:basis-1/3"
                    >
                      <Card>
                        <CardContent>
                          <Link href={item.link || "#"} target="_blank">
                            <div
                              key={item.id}
                              className="relative rounded-xl border overflow-hidden w-full h-[240px]"
                            >
                              <iframe
                                src={`https://www.youtube.com/embed/${(item.link || "").slice(32)}`}
                                title={item.title || "YouTube video player"}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                className="absolute top-0 left-0 w-full h-full"
                                allowFullScreen
                              ></iframe>
                            </div>
                            <p className="truncate mt-2 max-w-[426px] font-medium text-lg">
                              {item.title}
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

  const newYT = ytFeed.filter((pub) => pub.title === feedTitle);
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
          {newYT.map((pub: YoutubeFeed) => (
            <div key={pub.title || pub.channelId} id={pub.title || pub.channelId} className="mt-4">
              <div className="text-xl font-semibold">{pub.title || pub.channelId}</div>
              <div className="flex justify-center mt-4">
                <Carousel>
                  <CarouselContent className="max-w-[80vw]">
                    {pub.items.map((item: YoutubeFeedItem) => (
                      <CarouselItem
                        key={item.title}
                        className="md:basis-1/2 xl:basis-1/3"
                      >
                        <Card>
                          <CardContent>
                            <Link href={item.link || "#"} target="_blank">
                              <div
                                key={item.id}
                                className="relative rounded-xl border overflow-hidden w-full h-[240px]"
                              >
                                <iframe
                                  src={`https://www.youtube.com/embed/${(item.link || "").slice(32)}`}
                                  title={item.title || "YouTube video player"}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  referrerPolicy="strict-origin-when-cross-origin"
                                  className="absolute top-0 left-0 w-full h-full"
                                  allowFullScreen
                                ></iframe>
                              </div>
                              <p className="truncate mt-2 max-w-[426px] font-medium text-lg">
                                {item.title}
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
