import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

export const authOption: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SCRET_ID as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SCRET_ID as string,
        }),

    ],
    session: {
        strategy: "jwt",

    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/RegisterPage",

    }
}