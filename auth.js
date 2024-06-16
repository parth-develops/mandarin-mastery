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

                if (user && user.password) {
                    const passwordsMatch = await bcryptjs.compare(credentials.password, user.password);
                    if (passwordsMatch) {
                        console.log("yep they match");
                        console.log("the user", user);

                        return {
                            id: user._id.toString(),
                            email: user.email,
                            username: user.username,
                            userChapters: user.chapters,
                        };
                    } else {
                        console.log("Passwords do not match");
                        return null;
                    }
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
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.userChapters = user.userChapters;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.username = token.username;
            session.user.userChapters = token.userChapters;
            return session;
        },
        async signIn({ user, profile, account }) {
            if (account.provider === 'discord') {
                await connectToDatabase();
                const existingUser = await Users.findOne({ discordId: profile.id });

                if (!existingUser) {
                    const newUser = new Users({
                        discordId: profile.id,
                        username: user.name,
                        email: user.email,
                        userImg: user.image,
                    });

                    const resp = await newUser.save();
                }
                return true;
            }

            if (account.provider === 'credentials') {
                if (user) {
                    return true;
                }
            }

            return false;
        }
    },
});