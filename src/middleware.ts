import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Legacy /pt or /pt/* paths fold back to /
  if (pathname === "/pt" || pathname.startsWith("/pt/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/pt" ? "/" : pathname.slice(3);
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pt", "/pt/:path*"],
};
