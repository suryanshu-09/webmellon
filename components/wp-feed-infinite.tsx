"use client";
import { wpFeedAtomLoadable } from "@/store/atoms/feedAtom";
import { useAtomValue, useSetAtom } from "jotai";
import { WordpressFeed, WordpressFeedItem } from "@/types/types";
import { SearchWP } from "@/components/search-wp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { wpDashboardAtom } from "@/store/atoms/dashboardAtom";
import { X, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePersistedWPDashboardAtom } from "@/hooks/use-persisted-dashboard-atom";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useInView } from "react-intersection-observer";
import { useVirtualizer } from "@tanstack/react-virtual";
import { FeedCard } from "@/components/feed-card";

export default function WPFeedInfinite() {
  usePersistedWPDashboardAtom();
  const wpFeed = useAtomValue(wpFeedAtomLoadable);
  const [displayedItems, setDisplayedItems] = useState(10);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.5 });

  // Calculate total items across all publications
  const totalItems =
    wpFeed.state === "hasData"
      ? wpFeed.data.reduce((sum: number, pub: WordpressFeed) => sum + pub.items.length, 0)
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
    wpFeed.state === "hasData"
      ? (() => {
          const allItems: { pub: WordpressFeed; item: WordpressFeedItem }[] = [];
          wpFeed.data.forEach((pub: WordpressFeed) => {
            pub.items.forEach((item: WordpressFeedItem) => {
              allItems.push({ pub, item });
            });
          });

          // Group back by publication for display
          const displayed = allItems.slice(0, displayedItems);
          const groupedByPub: Map<string, { pub: WordpressFeed; items: WordpressFeedItem[] }> = new Map();

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
        <SearchWP />
      </div>
      {wpFeed.state === "hasData" && wpFeed.data.length > 0 ? (
        <>
          <DisplayWPFeed wpFeed={paginatedFeedData as WordpressFeed[]} />
          
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

// Helper to get WordPress image URL
function getWPImageUrl(item: WordpressFeedItem, imageIndex: number): string {
  if (!item["media:content"]) return "/assets/notfound.jpg";
  const safeIndex = imageIndex < item["media:content"].length ? imageIndex : 0;
  return item["media:content"][safeIndex]?.$.url ?? "/assets/notfound.jpg";
}

// Memoized carousel item for feed items
const WPCarouselItem = memo(function WPCarouselItem({
  item,
  imageIndex,
  index,
}: {
  item: WordpressFeedItem;
  imageIndex: number;
  index: number;
}) {
  return (
    <CarouselItem className="md:basis-1/2 xl:basis-1/3">
      <FeedCard
        title={item.title}
        link={item.link}
        imageUrl={getWPImageUrl(item, imageIndex)}
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
  pub: WordpressFeed;
}) {
  return (
    <div id={pub.title} className="mt-4">
      <div className="text-xl font-semibold">{pub.title}</div>
      <div className="flex justify-center mt-4">
        <Carousel>
          <CarouselContent className="max-w-[80vw]">
            {pub.items.map((item: WordpressFeedItem, index: number) => (
              <WPCarouselItem
                key={item.guid}
                item={item}
                imageIndex={pub.image}
                index={index}
              />
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
function VirtualizedWPFeed({ wpFeed }: { wpFeed: WordpressFeed[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: wpFeed.length,
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
          const pub = wpFeed[virtualItem.index];
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

function DisplayWPFeed({ wpFeed }: { wpFeed: WordpressFeed[] }) {
  const { search, feedTitle } = useAtomValue(wpDashboardAtom);
  const setwpDashboardAtom = useSetAtom(wpDashboardAtom);

  const handleClearSearch = useCallback(() => {
    setwpDashboardAtom({ search: false, feedTitle: "" });
  }, [setwpDashboardAtom]);

  if (!search) {
    // Use virtualization for feeds with many publications (more than 5)
    if (wpFeed.length > 5) {
      return (
        <div className="flex flex-col justify-center">
          <VirtualizedWPFeed wpFeed={wpFeed} />
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-center">
        {wpFeed.map((pub: WordpressFeed) => (
          <PublicationSection key={pub.title} pub={pub} />
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
            onClick={handleClearSearch}
            variant={"destructive"}
          >
            <X />
          </Button>
        </div>
        <div className="flex flex-col justify-center">
          {newWP.map((pub: WordpressFeed) => (
            <PublicationSection key={pub.title} pub={pub} />
          ))}
        </div>
      </div>
    </>
  );
}
