import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import NextAuth, { User as NextAuthUser, Account, Profile } from "next-auth";
import { Types } from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import User from "@/app/models/user";

// নির্দিষ্ট ইমেজ পিক করার ফাংশন
function pickImage(
  user: Partial<NextAuthUser> | null | undefined,
  profile: Profile | null | undefined
): string | null {
  if (user?.image) return user.image as string;
  if (profile && "picture" in profile && profile.picture) return profile.picture as string;
  if (profile && "avatar_url" in profile && profile.avatar_url) return profile.avatar_url as string;
  return null;
}

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
          if (!credentials?.email || !credentials.password) {
            throw new Error("Missing email or password");
          }

          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email });
          if (!user) throw new Error("User not found");

          // user.password null হলে error
          if (!user.password) throw new Error("No password set for this user");

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password as string
          );
          if (!isValidPassword) throw new Error("Invalid password");

          return {
            id: (user._id as Types.ObjectId).toString(),
            name: user.name,
            email: user.email,
            image: user.image || null,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // credentials হলে নতুন ইউজার তৈরি করার দরকার নাই
      if (!account || account.provider === "credentials") return true;

      await connectToDatabase();

      const email = user?.email;
      if (!email) return false;

      const existing = await User.findOne({ email });

      const img = pickImage(user, profile);
      const base = {
        name: user?.name || (profile as any)?.name || "User",
        email,
        image: img,
        provider: account.provider as "google" | "github",
        providerAccountId:
          account.providerAccountId ?? (profile as any)?.id?.toString() ?? null,
      };

      if (!existing) {
        await User.create(base);
      } else {
        const updates: Record<string, any> = {};
        if (!existing.provider) updates.provider = base.provider;
        if (!existing.providerAccountId) updates.providerAccountId = base.providerAccountId;
        if (!existing.image && base.image) updates.image = base.image;
        if (existing.name !== base.name && base.name) updates.name = base.name;

        if (Object.keys(updates).length > 0) {
          await User.updateOne({ _id: existing._id }, { $set: updates });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
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
