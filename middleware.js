import { NextResponse } from "next/server";
import { authMiddleware } from "./auth-edge"; // Path to your edge-compatible auth
import {
    authRoutes,
    DEFAULT_REDIRECT_LOGIN_URL,
    DEFAULT_REDIRECT_HOME_URL,
} from "./routes";

export default async function middleware(req) {
    const { isAuthenticated } = await authMiddleware(req);
    const url = req.nextUrl;
    const route = req.nextUrl.pathname;

    // Redirect logged-in users away from auth pages
    if (authRoutes.some((authRoute) => route.startsWith(authRoute))) {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL(DEFAULT_REDIRECT_HOME_URL, url));
        }
        return NextResponse.next();
    }

    // Protect routes except public pages
    if (!(route === "/" || route === "/signin" || route === "/signup")) {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL(DEFAULT_REDIRECT_LOGIN_URL, url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
