import NextAuth from "next-auth";
import { UserRole } from "@/app/Types/auth";

declare module "next-auth" {
  interface User {
    role: UserRole;
  }
  interface Session {
    user: User;
  }
  interface JWT {
    role: UserRole;
  }
}
