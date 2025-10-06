export enum UserRole {
    USER = "user",
    ADMIN = "admin",
    REAL_ESTATE_DEVELOPER = "real_estate_developer"
}

export interface User {
    id: string
    email: string
    name: string
    role: UserRole
    image?: string | null
    bio?: string | null
    location?: string | null
    mobile?: string | null
    website?: string | null
    createdAt?: Date
    updatedAt?: Date
}