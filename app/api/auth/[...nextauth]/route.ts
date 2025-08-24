import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { Types } from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import User from "@/app/models/user";

const handel = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET_ID as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials?.email });
          if (!user) throw new Error("User not found");

          const isValidPassword = await bcrypt.compare(
            credentials?.password ?? "",
            user.password as string
          );
          if (!isValidPassword) throw new Error("Invalid password");

          return {
            id: (user._id as Types.ObjectId).toString(),
            name: user.name,
            email: user.email,
            image: user.image || null,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        await connectToDatabase();
        const existinUser = await User.findOne({ email: user.email });
        if (!existinUser) {
          const newUser = new User({
            name: user.name,
            email: user.email,
            image: user?.image || null,
            password: null, // Password is not required for OAuth users
          })
          await newUser.save();
        }
        return true;
      } catch (error) {
           console.log("Error in signIn callback:", error);
           return false;
      }

    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image || null;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        image: token.image as string | null,
      };
      return session;
    },
  },

  pages: {
    signIn: "/RegisterPage",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handel as GET, handel as POST };