import { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Account, Profile } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import connectToDatabase from "./mongodb";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";

interface ExtendedUser extends NextAuthUser {
  _id?: string;
}

interface ExtendedProfile extends Profile {
  picture?: string;
  avatar_url?: string;
}

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials?.email });
          if (!user) throw new Error("User not found");

          const isVaildPassword = await bcrypt.compare(
            credentials?.password ?? "",
            user.password as string
          );
          if (!isVaildPassword) throw new Error("Invalid password");

          return user;
        } catch {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET_ID as string,
    }),
  ],
  callbacks: {
    async signIn({
      account,
      profile,
    }: {
      account: Account | null;
      profile?: ExtendedProfile;
    }) {
      if (!account || !profile?.email) return false;

      await connectToDatabase();
      const existingUser = await User.findOne({ email: profile.email });

      if (!existingUser) {
        await User.create({
          name: profile.name,
          email: profile.email,
          image: profile.picture || profile.avatar_url || null,
          provider: account.provider,
        });
      }
      return true;
    },

    async jwt({ token, user }: { token: JWT; user?: ExtendedUser }) {
      if (user && user._id) {
        token.id = user._id;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email,
          image: token.picture,
        } as ExtendedUser;
      }
      return session;
    },
  },

  pages: {
    signIn: "/RegisterPage",
  },
  secret: process.env.AUTH_SECRET,
};
