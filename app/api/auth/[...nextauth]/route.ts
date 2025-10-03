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

interface ExtendedProfile extends Profile {
  id?: string | number;
  picture?: string;
  avatar_url?: string;
}


type ExtendedUser = NextAuthUser & {
  id?: string;
  image?: string | null;
}


function pickImage(
  user: Partial<ExtendedUser> | null | undefined,
  profile: ExtendedProfile | null | undefined
): string | null {
  if (user?.image) return user.image;
  if (profile?.picture) return profile.picture;
  if (profile?.avatar_url) return profile.avatar_url;
  return null;
}

const handel = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID! as string,
      clientSecret: process.env.GOOGLE_SECRET_ID! as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID! as string,
      clientSecret: process.env.GITHUB_SECRET_ID! as string,
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
          } as ExtendedUser;
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: ExtendedUser;
      account: Account | null;
      profile?: ExtendedProfile;
    }) {
      if (!account || account.provider === "credentials") return true;

      await connectToDatabase();

      const email = user?.email;
      if (!email) return false;

      const existing = await User.findOne({ email });
      if (account.provider === "credentials") return true;
      if (existing) {
        if (
          existing.provider &&
          existing.provider !== account.provider
        ) {
          return false;
        }
      }
      const img = pickImage(user, profile || null);
      const base = {
        name: user?.name || profile?.name || "User",
        email,
        image: img,
        provider: account.provider as "google" | "github",
        providerAccountId:
          account.providerAccountId ?? profile?.id?.toString() ?? null,
      };

      if (!existing) {
        await User.create(base);
      } else {
        const updates: Record<string, unknown> = {};
        if (!existing.provider) updates.provider = base.provider;
        if (!existing.providerAccountId)
          updates.providerAccountId = base.providerAccountId;
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
        const u = user as ExtendedUser;
        token.id = u.id;
        token.name = u.name;
        token.email = u.email;
        token.image = u.image || null;
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT & { id?: string; image?: string | null };
    }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        image: token.image ?? null,
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
