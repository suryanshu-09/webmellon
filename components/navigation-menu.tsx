"use client";

import React from "react";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
  // navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { redirect } from "next/navigation";

export function TopMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            onClick={() => redirect("/dashboard")}
            className="text-[#FB8500] text-base"
          >
            Catalogue
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-[#FB8500] dark:bg-[#FB8500] dark:text-sky-900 text-base hover:dark:bg-sky-900 hover:dark:text-[#FB8500]">
            RSS Feed
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col justify-center p-2 text-nowrap">
              <ListItem
                title="YT Feed"
                href="/feed/ytfeed"
                className="test-wrap"
              >
                Get the latest of your favourite youtube channels right from
                here.
              </ListItem>
              <ListItem
                title="News Feed"
                href="/feed/newsfeed"
                className="test-wrap"
              >
                Catch up to the current affairs as they happen.
              </ListItem>
              <ListItem
                title="WP Feed"
                href="/feed/wpfeed"
                className="test-wrap"
              >
                Read the articles from your collection of niche WordPress
                writers.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
