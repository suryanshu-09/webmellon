"use client";

import { useEffect } from "react";
import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from "web-vitals";
import { sendWebVitalsToAnalytics } from "@/lib/analytics";

export function WebVitals() {
  useEffect(() => {
    const handleMetric = (metric: Metric) => {
      sendWebVitalsToAnalytics({
        id: metric.id,
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
      });
    };

    // Report all web vitals
    onCLS(handleMetric);
    onINP(handleMetric); // INP replaced FID in web-vitals v3
    onFCP(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);
  }, []);

  return null;
}
