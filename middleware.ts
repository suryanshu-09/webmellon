import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  rateLimit,
  createRateLimitResponse,
  getRateLimitHeaders,
  RATE_LIMIT_CONFIGS,
} from "@/lib/rate-limit";

const protectedRoutes = [
  "/edit",
  "/dashboard",
  "/edit/catalogues",
  "/edit/websites",
  "/edit/feed",
  "/feed",
  "/feed/ytfeed",
  "/feed/wpfeed",
  "/feed/newsfeed",
  "/user",
];

const offLimits = [
  "/edit",
  "/edit/catalogues",
  "/edit/websites",
  "/edit/feed",
  "/user",
];

// Routes that should be rate limited
const rateLimitedPaths = ["/api/"];

/**
 * Get client identifier for rate limiting.
 * Uses IP address from headers, falling back to a default.
 */
function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0] || realIp || "unknown";
  return ip;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply rate limiting to API routes
  const isRateLimited = rateLimitedPaths.some((path) =>
    pathname.startsWith(path),
  );

  if (isRateLimited) {
    const identifier = getClientIdentifier(request);
    const result = rateLimit(identifier, RATE_LIMIT_CONFIGS.api);

    if (!result.success) {
      return createRateLimitResponse(result);
    }

    // Add rate limit headers to successful responses
    const response = NextResponse.next();
    const headers = getRateLimitHeaders(result);
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  // CSRF protection for non-GET requests
  if (request.method !== "GET") {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (origin && host && !origin.includes(host)) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "__Secure-authjs.session-token",
  });

  // const token = await getToken({
  //   req: request,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isOffLimits = offLimits.some((route) => pathname.startsWith(route));

  if (isOffLimits && token?.email == "pleaselogin") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}
