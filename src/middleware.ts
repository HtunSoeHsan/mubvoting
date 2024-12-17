import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { links } from "./config/link";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  console.log({token})
  console.log("path", req.nextUrl.pathname)
  if (pathname.startsWith("/admin")) {
    if(!token) return NextResponse.redirect(new URL(links.login, req.url));
    if (token?.role !== "ADMIN") return NextResponse.redirect(new URL(links.homme, req.url))
  }

  return NextResponse.next();
}
// Specify the path regex to apply the middleware to
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
