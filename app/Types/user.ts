export type Role = "user" | "admin" | "real_estate_developer";

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

export interface EditForm {
  name: string;
  bio: string;
  location: string;
  website: string;
  mobile: string;
  image: string;
}