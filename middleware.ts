import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

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

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "__Secure-authjs.session-token",
  });
  // const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = request.nextUrl;
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
