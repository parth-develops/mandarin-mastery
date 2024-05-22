import NextAuth from 'next-auth';
import { connectToDatabase } from "@/app/utils/db";
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from "next-auth/providers/discord";
import Users from "@/app/lib/user.model";
import bcryptjs from "bcryptjs";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectToDatabase();

                let user;

                if (credentials.email) {
                    user = await Users.findOne({ email: credentials.email });
                }

                console.log("Credentials received:", credentials);
                console.log("User fetched:", user);
                // console.log("user pass", user.password);

                if (user && user.password) {

                    // If email login, verify password
                    const passwordsMatch = await bcryptjs.compare(credentials.password, user.password);
                    if (passwordsMatch) {
                        console.log("yep they match");
                        return user;
                    } else {
                        console.log("Passwords do not match");
                        return null;
                    }
                } else if (user && user.discordId) {
                    // Existing Discord user, return user data
                    return user;
                }

                return null;
            }
        }),
        DiscordProvider({
            // name: "DISCORDX",
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            authorization: {
                params: { scope: "identify guilds" },
            },
        }),
    ],
    pages: {
        signIn: "signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.user.id;
            return session;
        },
        async signIn({ user, profile, account }) {
            
        }
    },
});