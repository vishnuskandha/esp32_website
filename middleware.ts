import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get("auth_token");
    const isAuthenticated = !!authToken;

    // Paths that don't require authentication
    const publicPaths = ["/login", "/api/auth/login", "/api/button", "/api/status"];

    // Check if the current path is public
    const isPublicPath = publicPaths.some(path =>
        request.nextUrl.pathname.startsWith(path) ||
        request.nextUrl.pathname === "/favicon.ico"
    );

    if (!isAuthenticated && !isPublicPath) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuthenticated && request.nextUrl.pathname === "/login") {
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
        '/((?!_next/static|_next/image).*)',
    ],
};
