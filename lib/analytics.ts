// lib/analytics.ts
export function sendWebVitalsToAnalytics(metric: {
  id: string;
  name: string;
  value: number;
  rating: string;
}) {
  // Send to analytics endpoint
  if (typeof window !== "undefined") {
    // Using navigator.sendBeacon for reliable metric sending
    const body = JSON.stringify({
      type: "web-vital",
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      timestamp: Date.now(),
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/metrics/vitals", body);
    } else {
      // Fallback to fetch
      fetch("/api/metrics/vitals", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
        keepalive: true,
      }).catch(console.error);
    }
  }
}

export function trackPaginationPerformance(
  type: "feed" | "catalogue",
  action: "page_change" | "search" | "sort",
  duration: number,
  metadata?: Record<string, unknown>
) {
  if (typeof window !== "undefined") {
    const body = JSON.stringify({
      type: "pagination-performance",
      pagType: type,
      action,
      duration,
      metadata,
      timestamp: Date.now(),
    });

    fetch("/api/metrics/pagination", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(console.error);
  }
}
