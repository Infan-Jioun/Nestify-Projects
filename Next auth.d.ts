import "next-auth";
import "next-auth/jwt";
import { UserRole } from "@/app/Types/auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            image?: string | null;
            role: UserRole;
            emailVerified: boolean;
            needsVerification: boolean;
        };
    }

    interface User {
        id?: string;
        role?: UserRole;
        emailVerified?: boolean;
        needsVerification?: boolean;
        bio?: string | null;
        location?: string | null;
        website?: string | null;
        mobile?: string | null;
        slug?: string | null;
        provider?: string | null;
        createdAt?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        role?: UserRole;
        emailVerified?: boolean;
        needsVerification?: boolean;
    }
}