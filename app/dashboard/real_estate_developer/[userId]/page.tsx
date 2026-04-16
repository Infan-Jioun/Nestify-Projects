import { Metadata } from "next";
import { getServerSession } from "next-auth";// adjust path to your authOptions
import RealEsateDeveloperPage from "../components/RealEsateDeveloperPage";
import { authOptions } from "@/lib/auth-options";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name;

  return {
    title: `${name}'s Dashboard | Nestify`,
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