import { Role } from "./user";

export enum UserRole {
    USER = "user",
    REAL_ESTATE_DEVELOPER = "real_estate_developer",
    ADMIN = "ADMIN"
}
export interface User {
    _id: string;
    name: string;
    email: string;
    role: Role;
    image?: string | null;
    bio?: string | null;
    location?: string | null;
    website?: string | null;
    mobile?: string | null;
    slug?: string | null;
    provider?: string;
    createdAt?: string;
}
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
}

export interface ProtectedRouteConfig {
    allowedRoles: UserRole[];
    redirectPath: string;
}