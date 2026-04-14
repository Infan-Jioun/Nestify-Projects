import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./Footer/page";
import SessionWrapping from "@/lib/SessionWrapping";
import { Toaster } from "react-hot-toast";
import NavbarPage from "./NavbarPage/page";
import DisplayLoader from "./DisplayLoader/page";
import Providers from "./Providers/providers";
import TanstackProvider from "./Providers/tanstack-provider";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import Chatbot from "./ChatBot";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Nestify - Real Estate Platform in Bangladesh",
    template: "%s | Nestify",
  },
  description:
    "Nestify is a trusted real estate platform in Bangladesh. Buy, sell, and rent apartments, houses, and land with verified listings and secure connections.",
  keywords: [
    "real estate Bangladesh",
    "property buy sell rent",
    "apartments Dhaka",
    "house rent Bangladesh",
    "land sale Bangladesh",
    "Nestify real estate",
  ],
  authors: [{ name: "Nestify" }],
  creator: "Nestify",
  publisher: "Nestify",

  openGraph: {
    title: "Nestify - Real Estate Platform in Bangladesh",
    description:
      "Find verified properties in Bangladesh. Buy, sell, and rent homes, apartments, and land easily with Nestify.",
    url: "https://nestify-projects.vercel.app/",
    siteName: "Nestify",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nestify - Real Estate Platform",
    description:
      "Buy, sell, and rent properties in Bangladesh with trusted listings.",
  },

  metadataBase: new URL("https://nestify-projects.vercel.app/"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white min-h-screen text-black`}>
        <Providers>
          <SessionWrapping>
            <Toaster />

            <NavbarPage />

            <TanstackProvider>
              <DisplayLoader>
                {children}
                <Chatbot />
                <CookieConsent />
                <Analytics />
                <SpeedInsights />
              </DisplayLoader>
            </TanstackProvider>

            <Footer />
          </SessionWrapping>
        </Providers>
      </body>
    </html>
  );
}