
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'
import connectToDatabase from '@/lib/mongodb'
import { UserRole } from '@/app/Types/auth'
import UserModel from '@/app/models/user'

export const { handlers, auth, signIn, signOut } = NextAuth({
    session: { strategy: 'jwt' },

    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials.password) {
                        return null
                    }

                    await connectToDatabase()
                    const user = await UserModel.findOne({ email: credentials.email })
                    if (!user) return null

                    if (!user.password) return null

                    const isValidPassword = await bcrypt.compare(
                        credentials.password,
                        user.password as string
                    )
                    if (!isValidPassword) return null

                    return {
                        id: (user._id as Types.ObjectId).toString(),
                        name: user.name,
                        email: user.email,
                        image: user.image || null,
                        role: user.role || UserRole.USER,
                    }
                } catch (err) {
                    console.error('Authorize error:', err)
                    return null
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        })
    ],

    callbacks: {
        async signIn({ user, account, profile }: any) {
            try {
                if (!account || account.provider === 'credentials') return true

                await connectToDatabase()

                const email = user?.email
                if (!email) return false

                const existing = await UserModel.findOne({ email })

                if (existing) {
                    if (existing.provider && existing.provider !== account.provider) {
                        return false
                    }
                }

                const img = user?.image || profile?.picture || profile?.avatar_url || null
                const base = {
                    name: user?.name || profile?.name || 'User',
                    email,
                    image: img,
                    provider: account.provider as 'google' | 'github',
                    providerAccountId: account.providerAccountId ?? profile?.id?.toString() ?? null,
                    role: UserRole.USER,
                }

                if (!existing) {
                    await UserModel.create(base)
                } else {
                    const updates: Record<string, unknown> = {}
                    if (!existing.provider) updates.provider = base.provider
                    if (!existing.providerAccountId) updates.providerAccountId = base.providerAccountId
                    if (!existing.image && base.image) updates.image = base.image
                    if (existing.name !== base.name && base.name) updates.name = base.name
                    if (!existing.role) updates.role = base.role

                    if (Object.keys(updates).length > 0) {
                        await UserModel.updateOne({ _id: existing._id }, { $set: updates })
                    }
                }
                return true
            } catch (error) {
                console.error('SignIn callback error:', error)
                return false
            }
        },

        async jwt({ token, user, account }: any) {
            try {
                if (user) {
                    token.id = user.id
                    token.name = user.name
                    token.email = user.email
                    token.image = user.image || null
                    token.role = user.role || UserRole.USER
                }

                if ((account?.provider === 'google' || account?.provider === 'github') && user) {
                    token.role = UserRole.USER
                }

                return token
            } catch (error) {
                console.error('JWT callback error:', error)
                return token
            }
        },

        async session({ session, token }: any) {
            try {
                if (session.user) {
                    session.user.id = token.id as string
                    session.user.name = token.name as string
                    session.user.email = token.email as string
                    session.user.image = token.image ?? null
                    session.user.role = token.role as UserRole
                }
                return session
            } catch (error) {
                console.error('Session callback error:', error)
                return session
            }
        },
    },

    pages: {
        signIn: '/LoginPage',
    },

    secret: process.env.NEXTAUTH_SECRET,
})