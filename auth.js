import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { connectToDatabase } from "@/app/utils/db";
import Credentials from 'next-auth/providers/credentials';
import DiscordProvider from "next-auth/providers/discord";
import bcryptjs from "bcryptjs";
import Users from "@/app/lib/user.model";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                await connectToDatabase();
                const user = await Users.findOne({
                    $or: [{ email: credentials.email }, { discordId: credentials.discordId }],
                });

                if (user && user.password) {
                    console.log('user found');
                    // If email login, verify password
                    const passwordsMatch = bcryptjs.compare(credentials.password, user.password);
                    if (passwordsMatch) {
                        return user;
                    }
                } else if (user && user.discordId) {
                    console.log('discord exist');
                    // Existing Discord user, return user data
                    return user;
                }
            }
        }),
        DiscordProvider({
            name: "DISCORD",
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            authorization: {
                params: { scope: "identify guilds" }, // Request user info and guilds
            },
        }),
    ],
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
    },
});