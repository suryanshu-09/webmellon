"use client";
import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  everythingAtom,
  everythingAtomLoadable,
} from "@/store/atoms/everythingAtom";
import {
  hydratedNewsFeedAtom,
  hydratedWPFeedAtom,
  hydratedYTFeedAtom,
  newsFeedAtomLoadable,
  wpFeedAtomLoadable,
  ytFeedAtomLoadable,
} from "@/store/atoms/feedAtom";

export function useSavedData() {
  const data = useAtomValue(everythingAtomLoadable);
  const setData = useSetAtom(everythingAtom);

  const dataYT = useAtomValue(ytFeedAtomLoadable);
  const setDataYT = useSetAtom(hydratedYTFeedAtom);

  const dataWP = useAtomValue(wpFeedAtomLoadable);
  const setDataWP = useSetAtom(hydratedWPFeedAtom);

  const dataNews = useAtomValue(newsFeedAtomLoadable);
  const setDataNews = useSetAtom(hydratedNewsFeedAtom);

  useEffect(() => {
    const rawCatalogues = sessionStorage.getItem("catalogues");
    const rawYTFeed = sessionStorage.getItem("ytfeed");
    const rawWPFeed = sessionStorage.getItem("wpfeed");
    const rawNewsFeed = sessionStorage.getItem("newsfeed");

    if (rawCatalogues) {
      try {
        const storedCatalogues = JSON.parse(rawCatalogues);
        setData(storedCatalogues);
      } catch (err) {
        console.warn("Failed to parse catalogues:", err);
      }
    }

    if (rawYTFeed) {
      try {
        const storedYTFeed = JSON.parse(rawYTFeed);
        if (storedYTFeed.length > 0) {
          setDataYT(storedYTFeed);
        }
      } catch (err) {
        console.warn("Failed to parse ytfeed:", err);
      }
    }

    if (rawWPFeed) {
      try {
        const storedWPFeed = JSON.parse(rawWPFeed);
        if (storedWPFeed.length != 0) {
          setDataWP(storedWPFeed);
        }
      } catch (err) {
        console.warn("Failed to parse wpfeed:", err);
      }
    }

    if (rawNewsFeed) {
      try {
        const storedNewsFeed = JSON.parse(rawNewsFeed);
        if (storedNewsFeed.length > 0) {
          setDataNews(storedNewsFeed);
        }
      } catch (err) {
        console.warn("Failed to parse newsfeed:", err);
      }
    }
  }, [setData, setDataYT, setDataWP, setDataNews]);

  // Save to sessionStorage on change
  useEffect(() => {
    if (data.state === "hasData" && data.data.length > 0) {
      sessionStorage.setItem("catalogues", JSON.stringify(data.data));
    }
    if (dataYT.state === "hasData" && dataYT.data.length > 0) {
      sessionStorage.setItem("ytfeed", JSON.stringify(dataYT.data));
    }
    if (dataWP.state === "hasData" && dataWP.data.length > 0) {
      sessionStorage.setItem("wpfeed", JSON.stringify(dataWP.data));
    }
    if (dataNews.state === "hasData" && dataNews.data.length > 0) {
      sessionStorage.setItem("newsfeed", JSON.stringify(dataNews.data));
    }
  }, [data, dataYT, dataWP, dataNews]);
}
