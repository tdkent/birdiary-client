import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/account"];
const authRoutes = ["/signin", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // if the user is logged in, redirect from auth routes to home page

  // if user is not logged in, redirect from protected routes to login page

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|globals.css|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
