"use client";

import dynamic from "next/dynamic";
import AppBar from "@/components/appbar";
import Footer from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";

// Loading skeleton for the feed
function FeedSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center mt-8 space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="w-[80vw]">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="flex-shrink-0 w-[300px]">
                <Skeleton className="w-full h-[240px] rounded-lg" />
                <Skeleton className="h-5 w-full mt-2" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Lazy load the feed component
const YTFeed = dynamic(() => import("@/components/yt-feed"), {
  loading: () => <FeedSkeleton />,
  ssr: false,
});

export default function Feed() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <AppBar />
        <div className="flex justify-center mt-30">
          <YTFeed />
        </div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
