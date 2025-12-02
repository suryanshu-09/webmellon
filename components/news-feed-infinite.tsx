"use client";
import { usePersistedNewsDashboardAtom } from "@/hooks/use-persisted-dashboard-atom";
import { newsFeedAtomLoadable } from "@/store/atoms/feedAtom";
import { NEWSFeed, NEWSFeedItem } from "@/types/types";
import { useAtomValue, useSetAtom } from "jotai";
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
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useInView } from "react-intersection-observer";
import { useVirtualizer } from "@tanstack/react-virtual";
import { FeedCard } from "@/components/feed-card";

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

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
        <LoadingSkeleton />
      )}
    </div>
  );
}

// Memoized loading skeleton
const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
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
  );
});

// Memoized carousel item for feed items
const NewsCarouselItem = memo(function NewsCarouselItem({
  item,
  index,
}: {
  item: NEWSFeedItem;
  index: number;
}) {
  return (
    <CarouselItem className="md:basis-1/2 xl:basis-1/3">
      <FeedCard
        title={item.title}
        link={item.link}
        imageUrl={item["media:content"]?.$.url}
        snippet={item.contentSnippet}
        index={index}
      />
    </CarouselItem>
  );
});

// Memoized publication section
const PublicationSection = memo(function PublicationSection({
  pub,
}: {
  pub: NEWSFeed;
}) {
  return (
    <div id={pub.title} className="mt-4">
      <div className="text-xl font-semibold">{pub.title}</div>
      <div className="flex justify-center mt-4">
        <Carousel>
          <CarouselContent className="max-w-[80vw]">
            {pub.items.map((item: NEWSFeedItem, index: number) => (
              <NewsCarouselItem key={item.guid} item={item} index={index} />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
});

// Virtualized display for large feeds
function VirtualizedNewsFeed({ newsFeed }: { newsFeed: NEWSFeed[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: newsFeed.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 500, // Estimated height per publication section
    overscan: 2,
  });

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-200px)] overflow-auto"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const pub = newsFeed[virtualItem.index];
          return (
            <div
              key={pub.title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <PublicationSection pub={pub} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DisplayNEWSFeed({ newsFeed }: { newsFeed: NEWSFeed[] }) {
  const { search, feedTitle } = useAtomValue(newsDashboardAtom);
  const setnewsDashboardAtom = useSetAtom(newsDashboardAtom);

  const handleClearSearch = useCallback(() => {
    setnewsDashboardAtom({ search: false, feedTitle: "" });
  }, [setnewsDashboardAtom]);

  if (!search) {
    // Use virtualization for feeds with many publications (more than 5)
    if (newsFeed.length > 5) {
      return (
        <div className="flex flex-col justify-center">
          <VirtualizedNewsFeed newsFeed={newsFeed} />
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-center">
        {newsFeed.map((pub: NEWSFeed) => (
          <PublicationSection key={pub.title} pub={pub} />
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
            onClick={handleClearSearch}
            variant={"destructive"}
          >
            <X />
          </Button>
        </div>
        <div className="flex flex-col justify-center">
          {newNews.map((pub: NEWSFeed) => (
            <PublicationSection key={pub.title} pub={pub} />
          ))}
        </div>
      </div>
    </>
  );
}
