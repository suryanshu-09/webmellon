// app/api/metrics/pagination/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Counter, Histogram } from "prom-client";

// Create pagination metrics collectors
const paginationActionCounter = new Counter({
  name: "pagination_actions_total",
  help: "Total count of pagination actions",
  labelNames: ["type", "action"],
});

const paginationDurationHistogram = new Histogram({
  name: "pagination_duration_milliseconds",
  help: "Duration of pagination actions in milliseconds",
  labelNames: ["type", "action"],
  buckets: [10, 50, 100, 200, 500, 1000, 2000, 5000],
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pagType, action, duration } = body;

    // Record the metric
    paginationActionCounter.labels(pagType, action).inc();
    paginationDurationHistogram.labels(pagType, action).observe(duration);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error recording pagination metric:", error);
    return NextResponse.json(
      { error: "Failed to record metric" },
      { status: 500 }
    );
  }
}
