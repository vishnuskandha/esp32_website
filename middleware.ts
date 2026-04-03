import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get("auth_token");
    const isAuthenticated = !!authToken;
    const pathname = request.nextUrl.pathname;

    // Paths that don't require authentication
    const publicPaths = ["/login", "/api/auth/login", "/api/button", "/api/status"];

    // Check if the current path is public
    const isPublicPath = publicPaths.some((path) =>
        pathname === path || pathname.startsWith(`${path}/`)
    );

    if (!isAuthenticated && !isPublicPath) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuthenticated && pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
