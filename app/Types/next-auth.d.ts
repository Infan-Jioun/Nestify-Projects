// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth"
import { UserRole } from "@/app/Types/auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image?: string | null
      role: UserRole
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string // Must be required string
    image?: string | null
    role: UserRole
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string // Must be required string
    image?: string | null
    role: UserRole
  }
}