import { getToken } from "next-auth/jwt";

export async function authMiddleware(req) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    return {
        isAuthenticated: !!token,
        user: token, // Add user info if needed
    };
}
