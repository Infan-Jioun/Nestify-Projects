import { Role } from "@/lib/roles"

export type User = {
    _id: string
    name: string
    email: string
    image?: string | null
    role: Role;
    provider?: string
    createdAt?: string
  }
  