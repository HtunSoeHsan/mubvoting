import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedRoute =
  pathname.startsWith("/admin") ||
  pathname.startsWith("/king") ||
  pathname.startsWith("/queen") ||
  pathname.startsWith("/innocent") ||
  pathname.startsWith("/popular");

if (isProtectedRoute) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (pathname.startsWith("/admin")) {
    const response = await fetch(
      new URL("/api/auth/me", req.url),
      {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
      }
    );

    const user = await response.json();
    if (!response.ok) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if(user.user.role !== "Admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}
}

export const config = {
  matcher: [
    "/((?!login|logo.png|.*\\.svg$|_next/static|_next/images|.*\\.png$).*)",
    {
      source: "/((?!login|_next/static|_next/images|favicon.ico|logo.png|.*\\.svg$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "next-action" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
