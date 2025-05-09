"use client";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export function LoadImage() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className="animate-slide-up relative flex justify-center w-[90%] mx-auto"
      style={{ animationDelay: "0.1s" }}
    >
      {!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/assets/demo.jpg"
          alt="Demo JPG"
          className={`block rounded-lg object-cover 
                    transition-opacity duration-500
                    ${loaded ? "opacity-100" : "opacity-0"}`}
          fill
          onLoad={() => setLoaded(true)}
        />
      </AspectRatio>
    </div>
  );
}
