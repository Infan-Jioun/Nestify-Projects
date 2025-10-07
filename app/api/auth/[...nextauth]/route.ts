// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
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

const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials.password) {
            return null;
          }

          await connectToDatabase();
          const userDoc = await UserModel.findOne({ email: credentials.email });

          if (!userDoc || !userDoc.password) {
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, userDoc.password);
          if (!isValid) {
            return null;
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
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
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
        const extendedProfile = profile as ExtendedProfile;

        const image = user.image || extendedProfile?.picture || extendedProfile?.avatar_url || null;

        const userData = {
          name: user.name || extendedProfile?.name || "User",
          email: email,
          image: image,
          provider: account.provider,
          providerAccountId: account.providerAccountId || extendedProfile?.id?.toString() || null,
          role: existingUser?.role || UserRole.USER,
        };

        if (!existingUser) {
          // Create new user
          await UserModel.create(userData);
        } else {
          // Update existing user
          const updates: Record<string, unknown> = {};

          if (!existingUser.provider) updates.provider = userData.provider;
          if (!existingUser.providerAccountId) updates.providerAccountId = userData.providerAccountId;
          if (!existingUser.image && userData.image) updates.image = userData.image;
          if (existingUser.name !== userData.name) updates.name = userData.name;
          if (!existingUser.role) updates.role = userData.role;

          if (Object.keys(updates).length > 0) {
            await UserModel.updateOne({ _id: existingUser._id }, { $set: updates });
          }
        }

        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      try {

        if (user) {
          token.id = user.id;
          token.role = user.role || UserRole.USER;
        }

        if ((account?.provider === "google" || account?.provider === "github") && token.email) {
          await connectToDatabase();
          const dbUser = await UserModel.findOne({ email: token.email });
          if (dbUser) {
            token.role = dbUser.role || UserRole.USER;
            token.id = (dbUser._id as Types.ObjectId).toString();
          }
        }
        if (token.email) {
          await connectToDatabase();
          const dbUser = await UserModel.findOne({ email: token.email })
          if (dbUser) {
            token.role = dbUser.role ?? token.role ?? UserRole.USER
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };