// app/api/metrics/route.ts
import { NextResponse } from "next/server";
import { collectDefaultMetrics, register } from "prom-client";

// Collect default metrics (CPU, memory, etc.)
collectDefaultMetrics();

export async function GET() {
  try {
    const metrics = await register.metrics();
    return new NextResponse(metrics, {
      status: 200,
      headers: {
        "Content-Type": register.contentType,
      },
    });
  } catch (error) {
    console.error("Error generating metrics:", error);
    return new NextResponse("Error generating metrics", { status: 500 });
  }
}
