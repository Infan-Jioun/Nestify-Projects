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
import { Profile } from "next-auth";

interface ExtendedProfile extends Profile {
  picture?: string;
  avatar_url?: string;
  id?: string | number;
}

interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: UserRole;
}

interface ExtendedJWT {
  id?: string;
  name?: string;
  email?: string;
  image?: string | null;
  role?: UserRole;
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
        if (!credentials?.email || !credentials.password) return null;

        await connectToDatabase();
        const userDoc = await UserModel.findOne({ email: credentials.email });
        if (!userDoc || !userDoc.password) return null;

        const isValid = await bcrypt.compare(credentials.password, userDoc.password);
        if (!isValid) return null;

        return {
          id: (userDoc._id as Types.ObjectId).toString(),
          name: userDoc.name,
          email: userDoc.email,
          image: userDoc.image ?? null,
          role: userDoc.role ?? UserRole.USER,
        };
      },


    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET_ID ?? "",
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET_ID ?? "",
    }),
  ],

  callbacks: {

    async signIn({ user, account, profile }) {
      if (!account || account.provider === "credentials") return true;

      await connectToDatabase();
      const email = user?.email;
      if (!email) return false;

      const existing = await UserModel.findOne({ email });
      const p = profile as ExtendedProfile | undefined;
      const img = (user as ExtendedUser).image ?? p?.picture ?? p?.avatar_url ?? null;

      const base = {
        name: user?.name ?? p?.name ?? "User",
        email,
        image: img,
        provider: account.provider,
        providerAccountId: account.providerAccountId ?? p?.id?.toString() ?? null,
        role: existing?.role ?? UserRole.USER,
      };

      if (!existing) {
        await UserModel.create(base);
      } else {
        const updates: Record<string, unknown> = {};
        if (!existing.provider) updates.provider = base.provider;
        if (!existing.providerAccountId) updates.providerAccountId = base.providerAccountId;
        if (!existing.image && base.image) updates.image = base.image;
        if (!existing.name && base.name) updates.name = base.name;
        if (!existing.role) updates.role = base.role;

        if (Object.keys(updates).length > 0) {
          await UserModel.updateOne({ _id: existing._id }, { $set: updates });
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      const t = token as ExtendedJWT;

      if (user) {
        const u = user as ExtendedUser;
        t.id = u.id;
        t.name = u.name ?? t.name;
        t.email = u.email ?? t.email;
        t.image = u.image ?? t.image ?? null;
        t.role = u.role ?? t.role ?? UserRole.USER;
      }

    
      if (!t.role && t.email) {
        await connectToDatabase();
        const dbUser = await UserModel.findOne({ email: t.email });
        t.role = dbUser?.role ?? UserRole.USER;
      }

      return t as any; 
    },

   
    async session({ session, token }) {
      const t = token as ExtendedJWT;

      session.user = {
        id: t.id as string,
        name: t.name as string,
        email: t.email as string,
        image: t.image ?? null,
        role: t.role ?? UserRole.USER,
      };

      return session;
    },
  },

  pages: {
    signIn: "/LoginPage",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
