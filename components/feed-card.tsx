"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

// Blur placeholder for images
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8Av9PurjT7mO7s5XhuI2DI6HBBHuiuKzYLJKyxIFQEkKOwPXWaKKouoAXZkZLbJicn//Z";

interface FeedCardProps {
  title: string;
  link: string;
  imageUrl?: string;
  snippet?: string;
  index?: number;
}

// Memoized FeedCard component to prevent unnecessary re-renders
export const FeedCard = memo(function FeedCard({
  title,
  link,
  imageUrl,
  snippet,
  index = 0,
}: FeedCardProps) {
  const handleClick = useCallback(() => {
    // Allow default link behavior
  }, []);

  return (
    <Card>
      <CardContent>
        <Link href={link} target="_blank" onClick={handleClick}>
          <div className="relative w-full h-[240px] md:h-[360px]">
            <Image
              src={imageUrl ?? "/assets/notfound.jpg"}
              alt={title}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading={index < 3 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
          <p className="truncate mt-2 max-w-[426px] font-semibold text-lg">
            {title}
          </p>
          {snippet && (
            <p className="line-clamp-3 mt-2 max-w-[426px] text-sm">{snippet}</p>
          )}
        </Link>
      </CardContent>
    </Card>
  );
});

interface YouTubeCardProps {
  title: string;
  link: string;
  videoId: string;
  index?: number;
}

// Memoized YouTube card component
export const YouTubeCard = memo(function YouTubeCard({
  title,
  link,
  videoId,
  index = 0,
}: YouTubeCardProps) {
  return (
    <Card>
      <CardContent>
        <Link href={link || "#"} target="_blank">
          <div className="relative rounded-xl border overflow-hidden w-full h-[240px]">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title || "YouTube video player"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              loading={index < 2 ? "eager" : "lazy"}
            ></iframe>
          </div>
          <p className="truncate mt-2 max-w-[426px] font-medium text-lg">
            {title}
          </p>
        </Link>
      </CardContent>
    </Card>
  );
});

export default FeedCard;
