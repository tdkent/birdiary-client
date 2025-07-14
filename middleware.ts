import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/helpers/auth";

const protectedRoutes = [
  "/account",
  "/lifelist",
  "/locations",
  "/profile",
  "/sightings",
];
const authRoutes = ["/signin", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const segment = "/" + path.split("/")[1];
  const isLoggedIn = await checkSession();

  // redirect from protected routes if not logged in
  if (!isLoggedIn && protectedRoutes.includes(segment)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // redirect from auth routes if logged in
  if (isLoggedIn && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|globals.css|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
