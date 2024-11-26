import NextAuth, { CredentialsSignin } from 'next-auth';
import { connectToDatabase } from "@/app/utils/db";
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from "next-auth/providers/discord";
import Users from "@/app/lib/user.model";
import bcryptjs from "bcryptjs";
import { authConfig } from './authConfig';

class InvalidLoginError extends CredentialsSignin {
    code = "Email not verified"
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    ...authConfig,
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
                    if (!user) {
                        return null;
                    }
                    if (!!user && !user.emailVerified) {
                        throw new InvalidLoginError();
                    }
                }
                if (user && user.password) {
                    const passwordsMatch = await bcryptjs.compare(credentials.password, user.password);
                    if (passwordsMatch) {
                        return {
                            id: user._id.toString(),
                            email: user.email,
                            username: user.username,
                            userImg: user?.userImg ? user.userImg : null,
                            userChapters: user.chapters,
                            quizzes: user.quizzes,
                        };
                    } else {
                        return null;
                    }
                }
                return null;
            }
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            authorization: "https://discord.com/api/oauth2/authorize?scope=identify+guilds+email"
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.userImg = user.userImg;
                token.userChapters = user.userChapters;
                token.quizzes = user.quizzes;
            }

            if (trigger === "update" && session) {
                return {
                    ...token,
                    ...session.user
                };
            };

            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.username = token.username;
            session.user.userImg = token.userImg;
            session.user.userChapters = token.userChapters;
            session.user.quizzes = token.quizzes;
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
                        chapters: [],
                        quizzes: []
                    });

                    const savedUser = await newUser.save();
                    user.userChapters = savedUser.chapters;
                    user.quizzes = savedUser.quizzes;
                } else {
                    user.id = existingUser._id.toString();
                    user.username = existingUser.username;
                    user.email = existingUser.email;
                    user.userImg = existingUser.userImg;
                    user.userChapters = existingUser ? existingUser.chapters : [];
                    user.quizzes = existingUser ? existingUser.quizzes : [];
                }

                return true;
            }

            if (account.provider === 'credentials') {
                if (user) {
                    return true;
                }
            }

            return false;
        },
    },
});