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
                            userImg: user?.userImg ? user.userImg : null,
                            userChapters: user.chapters,
                            quizzes: user.quizzes,
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
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
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
        }
    },
});