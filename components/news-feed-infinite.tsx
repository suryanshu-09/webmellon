"use client";
import { usePersistedNewsDashboardAtom } from "@/hooks/use-persisted-dashboard-atom";
import { newsFeedAtomLoadable } from "@/store/atoms/feedAtom";
import { NEWSFeed, NEWSFeedItem } from "@/types/types";
import { useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { SearchNews } from "@/components/search-news";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { newsDashboardAtom } from "@/store/atoms/dashboardAtom";
import { X, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function NewsFeedInfinite() {
  usePersistedNewsDashboardAtom();
  const newsFeed = useAtomValue(newsFeedAtomLoadable);
  const [displayedItems, setDisplayedItems] = useState(10);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.5 });

  // Calculate total items across all publications
  const totalItems =
    newsFeed.state === "hasData"
      ? newsFeed.data.reduce((sum: number, pub: NEWSFeed) => sum + pub.items.length, 0)
      : 0;

  const hasMore = displayedItems < totalItems;

  // Load more items when in view
  useEffect(() => {
    if (inView && hasMore) {
      setDisplayedItems((prev) => Math.min(prev + 10, totalItems));
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
    newsFeed.state === "hasData"
      ? (() => {
          const allItems: { pub: NEWSFeed; item: NEWSFeedItem }[] = [];
          newsFeed.data.forEach((pub: NEWSFeed) => {
            pub.items.forEach((item: NEWSFeedItem) => {
              allItems.push({ pub, item });
            });
          });

          // Group back by publication for display
          const displayed = allItems.slice(0, displayedItems);
          const groupedByPub: Map<string, { pub: NEWSFeed; items: NEWSFeedItem[] }> = new Map();

          displayed.forEach(({ pub, item }) => {
            if (!groupedByPub.has(pub.title)) {
              groupedByPub.set(pub.title, { pub, items: [] });
            }
            groupedByPub.get(pub.title)!.items.push(item);
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
        <SearchNews />
      </div>
      {newsFeed.state === "hasData" && newsFeed.data.length > 0 ? (
        <>
          <DisplayNEWSFeed newsFeed={paginatedFeedData as NEWSFeed[]} />
          
          {/* Loading indicator */}
          {hasMore && (
            <div ref={ref} className="flex justify-center py-8">
              <Skeleton className="w-20 h-20 rounded-full" />
              <p className="ml-4 text-gray-500">Loading more...</p>
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
      ) : newsFeed.state === "hasData" && newsFeed.data.length == 0 ? (
        <div>
          <div className="flex justify-center mt-18 text-xl text-center max-w-[90vw] text-wrap">
            <div>
              Feed is empty, go to edit and add your favourite{" "}
              <span className="text-[#FB8500] font-serif italic text-2xl text-nowrap">
                News Websites
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

function DisplayNEWSFeed({ newsFeed }: { newsFeed: NEWSFeed[] }) {
  const { search, feedTitle } = useAtomValue(newsDashboardAtom);
  const setnewsDashboardAtom = useSetAtom(newsDashboardAtom);

  if (!search) {
    return (
      <div className="flex flex-col justify-center">
        {newsFeed.map((pub: NEWSFeed) => (
          <div key={pub.title} id={pub.title} className="mt-4">
            <div className="text-xl font-semibold">{pub.title}</div>
            <div className="flex justify-center mt-4">
              <Carousel>
                <CarouselContent className="max-w-[80vw]">
                  {pub.items.map((item: NEWSFeedItem) => (
                    <CarouselItem
                      key={item.guid}
                      className="md:basis-1/2 xl:basis-1/3"
                    >
                      <Card>
                        <CardContent>
                          <Link href={item.link} target="_blank">
                            <div className="relative w-full h-[240px] md:h-[360px]">
                              <Image
                                src={
                                  item["media:content"]?.$.url ??
                                  "/assets/notfound.jpg"
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

  const newNews = newsFeed.filter((pub) => pub.title === feedTitle);
  return (
    <>
      <div className="m-3">
        <div className="flex justify-end">
          <Button
            className="hover:cursor-pointer"
            onClick={() =>
              setnewsDashboardAtom({ search: false, feedTitle: "" })
            }
            variant={"destructive"}
          >
            <X />
          </Button>
        </div>
        <div className="flex flex-col justify-center">
          {newNews.map((pub: NEWSFeed) => (
            <div key={pub.title} id={pub.title} className="mt-4">
              <div className="text-xl font-semibold">{pub.title}</div>
              <div className="flex justify-center mt-4">
                <Carousel>
                  <CarouselContent className="max-w-[80vw]">
                    {pub.items.map((item: NEWSFeedItem) => (
                      <CarouselItem
                        key={item.guid}
                        className="md:basis-1/2 xl:basis-1/3"
                      >
                        <Card>
                          <CardContent>
                            <Link href={item.link} target="_blank">
                              <div className="relative w-full h-[240px] md:h-[360px]">
                                <Image
                                  src={
                                    item["media:content"]?.$.url ??
                                    "/assets/notfound.jpg"
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
