import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { connectToDatabase } from "@/app/utils/db";
import Credentials from 'next-auth/providers/credentials';
import DiscordProvider from "next-auth/providers/discord";
import bcryptjs from "bcryptjs";
import Users from "@/app/lib/user.model";

async function createUser(data) {
    try {
        await connectToDatabase();

        const newUser = new Users({
            email: data.email,
            password: await bcryptjs.hash(data.password, 10), // Hash password for security
        });
        await newUser.save();
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error.message);
        return null;
    }
}

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
                    if (await bcryptjs.compare(credentials.password, user.password)) {
                        return user;
                    }
                } else if (user && user.discordId) {
                    console.log('discord exist');
                    // Existing Discord user, return user data
                    return user;
                } else if (credentials.email) {
                    console.log('new mail');
                    // New email signup, call createUser server-side action
                    const newUser = await createUser(credentials);
                    return newUser;
                }

                throw new Error("Invalid email or password");
            }
        }),
        DiscordProvider({
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