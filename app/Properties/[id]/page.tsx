import { Metadata } from "next";
import { getPropertyMeta } from "@/lib/seo/getPropertyMeta";
import PropertyClient from "./components/Details";

type Props = {
    params: Promise<{ id: string }>;
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const meta = await getPropertyMeta(id);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nestify-projects.vercel.app";

    return {
        title: meta.title,
        description: meta.description,
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: `${baseUrl}/Properties/${id}`,
            siteName: "Nestify",
            type: "website",
            ...(meta.image && {
                images: [{ url: meta.image, width: 1200, height: 630, alt: meta.title }],
            }),
        },
        twitter: {
            card: "summary_large_image",
            title: meta.title,
            description: meta.description,
            ...(meta.image && { images: [meta.image] }),
        },
    };
}
export default async function Page({ params }: Props) {
    const { id } = await params;
    return <PropertyClient id={id} />;
}