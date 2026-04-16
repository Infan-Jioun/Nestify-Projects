

import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import RealEsateDeveloperPage from "../components/RealEsateDeveloperPage";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name;

  return {
    title: `${name}'s Dashboard`,
    description: `Welcome back, ${name}. Manage your real estate listings, track performance, and monitor your portfolio.`,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `${name}'s Dashboard | Nestify`,
      description: `Manage your real estate portfolio with Nestify's developer dashboard.`,
      siteName: "Nestify",
      type: "website",
    },
  };
}

export default function Page() {
  return <RealEsateDeveloperPage />;
}