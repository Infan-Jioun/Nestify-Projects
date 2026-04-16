import { Metadata } from "next";
import BlogComponents from "./BlogComponents";


export const metadata: Metadata = {
  title: "Real Estate Blog",
  description: "Explore expert insights on real estate trends, investment guides, home improvement tips, and market analytics to make smarter property decisions.",
  keywords: ["real estate blog", "property investment", "market trends", "home buying tips", "nestify"],
  openGraph: {
    title: "Real Estate Blog",
    description: "Strategic insights, market analytics, and expert perspectives to empower your property investment decisions.",
    siteName: "Nestify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: " Nestify Blog",
    description: "Strategic insights and expert perspectives on real estate.",
  },
};

export default function Page() {
  return <BlogComponents />;
}