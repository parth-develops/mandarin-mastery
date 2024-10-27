import { auth } from "@/auth";
import {
    authRoutes,
    DEFAULT_REDIRECT_LOGIN_URL,
    DEFAULT_REDIRECT_HOME_URL
} from './routes';

export default auth((req) => {

    const url = req.nextUrl;
    const route = req.nextUrl.pathname;

    const isLoggedIn = !!req.auth;

    function checkAuthRoute(authRoute) {
        if (route.startsWith(authRoute)) {
            return true;
        }
        return null;
    }

    if (!!authRoutes.filter(checkAuthRoute).length) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_REDIRECT_HOME_URL, url));
        }
        return null;
    }

    if (route.startsWith(...authRoutes)) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_REDIRECT_HOME_URL, url));
        }
        return null;
    }

    if (!(route === "/" || route === "/signin" || route === "/signup")) {
        if (!isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_REDIRECT_LOGIN_URL, url));
        }
        return null;
    }

    return null;

})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};