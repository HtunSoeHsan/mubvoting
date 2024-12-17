import { NextRequest, NextResponse } from "next/server";


// Ensure you import or define updateSession and adminLink with their types

export default async function middleware(request: NextRequest) {
  

}

// Specify the path regex to apply the middleware to
export const config = {
  matcher: [
    "/((?!sign-in|logo.png|_next/static|_next/images|.*\\.png$).*)",
    {
      source: "/((?!sign-in|_next/static|_next/images|favicon.ico|logo.png).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "next-action" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
