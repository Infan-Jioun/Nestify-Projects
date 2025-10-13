import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import UserModel from "@/app/models/user";
import { UserRole } from "@/app/Types/auth";

interface ExtendedProfile {
    picture?: string;
    avatar_url?: string;
    id?: string | number;
    name?: string;
}
interface ExtendedUser {
    id?: string;
    role?: UserRole;
    emailVerified?: boolean;
}

export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            // Update your authOptions - the authorize function
            authorize: async (credentials) => {
                try {
                    if (!credentials?.email || !credentials.password) {
                        throw new Error('MISSING_CREDENTIALS');
                    }

                    await connectToDatabase();
                    const userDoc = await UserModel.findOne({ email: credentials.email });

                    if (!userDoc || !userDoc.password) {
                        throw new Error('INVALID_CREDENTIALS');
                    }

                    // Check if email is verified for credential users
                    if (userDoc.provider === 'credentials' && !userDoc.emailVerified) {
                        // Return user data but with a special flag
                        return {
                            id: (userDoc._id as Types.ObjectId).toString(),
                            name: userDoc.name,
                            email: userDoc.email,
                            image: userDoc.image || null,
                            role: userDoc.role || UserRole.USER,
                            bio: userDoc.bio || null,
                            location: userDoc.location || null,
                            website: userDoc.website || null,
                            mobile: userDoc.mobile || null,
                            slug: userDoc.slug || null,
                            provider: userDoc.provider || null,
                            createdAt: userDoc.createdAt?.toISOString?.() || undefined,
                            emailVerified: false // Add this flag
                        };
                    }

                    const isValid = await bcrypt.compare(credentials.password, userDoc.password);
                    if (!isValid) {
                        throw new Error('INVALID_CREDENTIALS');
                    }

                    return {
                        id: (userDoc._id as Types.ObjectId).toString(),
                        name: userDoc.name,
                        email: userDoc.email,
                        image: userDoc.image || null,
                        role: userDoc.role || UserRole.USER,
                        bio: userDoc.bio || null,
                        location: userDoc.location || null,
                        website: userDoc.website || null,
                        mobile: userDoc.mobile || null,
                        slug: userDoc.slug || null,
                        provider: userDoc.provider || null,
                        createdAt: userDoc.createdAt?.toISOString?.() || undefined,
                        emailVerified: true // Add this flag
                    };
                } catch (error) {
                    if (error instanceof Error) {
                        throw error;
                    }
                    console.error("Authorization error:", error);
                    throw new Error('LOGIN_FAILED');
                }
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET_ID || "",
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET_ID || "",
        }),
    ],

    callbacks: {

        async signIn({ user, account, profile }) {
            try {
                if (!account || account.provider === "credentials") {
                    return true;
                }

                await connectToDatabase();
                const email = user.email;

                if (!email) {
                    return false;
                }

                const existingUser = await UserModel.findOne({ email });


                if (!existingUser) {
                    throw new Error('USER_NOT_FOUND');
                }

                const extendedProfile = profile as ExtendedProfile;

                const image = user.image || extendedProfile?.picture || extendedProfile?.avatar_url || null;

                const userData = {
                    name: user.name || extendedProfile?.name || "User",
                    email: email,
                    image: image,
                    provider: account.provider,
                    providerAccountId: account.providerAccountId || extendedProfile?.id?.toString() || null,
                    role: existingUser.role || UserRole.USER,
                };

                // শুধু existing user এর ডাটা আপডেট করবো
                const updates: Record<string, unknown> = {};

                if (!existingUser.provider) updates.provider = userData.provider;
                if (!existingUser.providerAccountId) updates.providerAccountId = userData.providerAccountId;
                if (!existingUser.image && userData.image) updates.image = userData.image;
                if (existingUser.name !== userData.name) updates.name = userData.name;
                if (!existingUser.role) updates.role = userData.role;

                if (Object.keys(updates).length > 0) {
                    await UserModel.updateOne({ _id: existingUser._id }, { $set: updates });
                }

                return true;
            } catch (error) {
                console.error("SignIn callback error:", error);

                // Specific error handle করবো
                if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
                    throw error; // NextAuth কে error pass করবো
                }

                return false;
            }
        },
        // Update the jwt callback in authOptions
        async jwt({ token, user, account, trigger }) {
            try {
                if (user) {
                    token.id = user.id;
                    token.role = user.role || UserRole.USER;
                    token.emailVerified = (user as ExtendedUser).emailVerified || false;
                }

                // Handle email verification updates
                if (trigger === "update") {
                    await connectToDatabase();
                    const dbUser = await UserModel.findOne({ email: token.email });
                    if (dbUser) {
                        token.emailVerified = dbUser.emailVerified;
                    }
                }

                if ((account?.provider === "google" || account?.provider === "github") && token.email) {
                    await connectToDatabase();
                    const dbUser = await UserModel.findOne({ email: token.email });
                    if (dbUser) {
                        token.role = dbUser.role || UserRole.USER;
                        token.id = (dbUser._id as Types.ObjectId).toString();
                        token.emailVerified = dbUser.emailVerified || true; // OAuth users are auto-verified
                    }
                }

                if (token.email) {
                    await connectToDatabase();
                    const dbUser = await UserModel.findOne({ email: token.email })
                    if (dbUser) {
                        token.role = dbUser.role ?? token.role ?? UserRole.USER;
                        token.emailVerified = dbUser.emailVerified ?? token.emailVerified ?? false;
                    }
                }

                return token;
            } catch (error) {
                console.error("JWT callback error:", error);
                return token;
            }
        },

        async session({ session, token }) {
            try {
                if (session.user && token.id && token.role) {
                    session.user.id = token.id;
                    session.user.role = token.role;
                }
                return session;
            } catch (error) {
                console.error("Session callback error:", error);
                return session;
            }
        },
    },

    pages: {
        signIn: "/LoginPage",
    },

    secret: process.env.NEXTAUTH_SECRET,
};