import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // NextAuth session is checked on every request (every URL change / navigation)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Example: protect routes that require auth (e.g. /dashboard)
  // const isProtected = request.nextUrl.pathname.startsWith("/dashboard");
  // if (isProtected && !token) {
  //   const signInUrl = new URL("/", request.url);
  //   signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
  //   return NextResponse.redirect(signInUrl);
  // }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
