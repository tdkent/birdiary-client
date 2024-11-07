import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWTPayload } from "jose";
import { decrypt } from "@/lib/session";

const protectedRoutes = ["/account"];
const authRoutes = ["/signin", "/signup"];

export default async function middleware(req: NextRequest) {
  let session: JWTPayload | undefined;
  const cookie = (await cookies()).get("session")?.value;
  const path = req.nextUrl.pathname;

  if (cookie) {
    session = await decrypt(cookie);
  }

  const userId: string | undefined = session?.id as string;

  // redirect from protected routes if not logged in
  if (!userId && protectedRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // redirect from auth routes if logged in
  if (userId && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|globals.css|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
