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
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

// TODO: Pagination, publication priority, article carousel
export default function NewsFeed() {
  usePersistedNewsDashboardAtom();
  const newsFeed = useAtomValue(newsFeedAtomLoadable);

  return (
    <div>
      <div className="flex justify-center text-2xl font-semibold text-[#FB8500]">
        <SearchNews />
      </div>
      {newsFeed.state === "hasData" && newsFeed.data.length > 0 ? (
        <DisplayNEWSFeed newsFeed={newsFeed.data as NEWSFeed[]} />
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
