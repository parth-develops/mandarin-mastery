// import { authRoutes, DEFAULT_REDIRECT_HOME_URL, DEFAULT_REDIRECT_LOGIN_URL } from "@/routes";

export const authConfig = {
    providers: [],
    pages: {
        signIn: "/signin"
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        authorized({ auth, request }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/dashboard", request.nextUrl))
            }

            return true;
        }
    }
}