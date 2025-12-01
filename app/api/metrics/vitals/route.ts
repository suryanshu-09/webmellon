// app/api/metrics/vitals/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Counter, Histogram } from "prom-client";

// Create metrics collectors
const webVitalsCounter = new Counter({
  name: "web_vitals_total",
  help: "Total count of web vitals metrics",
  labelNames: ["metric", "rating"],
});

const webVitalsHistogram = new Histogram({
  name: "web_vitals_duration",
  help: "Web vitals metric values",
  labelNames: ["metric"],
  buckets: [100, 300, 500, 1000, 2500, 5000, 10000],
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { metric, value, rating } = body;

    // Record the metric
    webVitalsCounter.labels(metric, rating).inc();
    webVitalsHistogram.labels(metric).observe(value);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error recording web vital:", error);
    return NextResponse.json(
      { error: "Failed to record metric" },
      { status: 500 }
    );
  }
}
